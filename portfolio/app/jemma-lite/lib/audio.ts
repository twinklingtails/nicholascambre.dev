// app/jemma-lite/lib/audio.ts
//
// Sequential playback of base64-MP3 frames coming from the C++ Jemma
// server's `event: audio` SSE messages.
//
// One HTMLAudioElement reused across the whole conversation. When a
// frame finishes, the next one starts; if the queue is empty, we wait
// for enqueue() to wake us up. setMuted(true) stops playback and
// discards anything pending.
//
// Browser-only — uses Audio, atob, URL.createObjectURL. Don't import
// from a server component.

export interface AudioQueue {
  /** Push a base64-encoded MP3 (Jemma's wire format) into the queue. */
  enqueueBase64Mp3(b64: string): void;
  /** Mute drops in-flight + pending; unmute resumes from the next enqueue. */
  setMuted(muted: boolean): void;
  /** Stop and forget everything. Safe to call mid-stream. */
  clear(): void;
  /** Tear down on unmount. The queue is unusable after this. */
  destroy(): void;
}

export function createAudioQueue(initialMuted = true): AudioQueue {
  let muted = initialMuted;
  let destroyed = false;
  let playing = false;
  let currentUrl: string | null = null;
  const pending: string[] = []; // blob URLs waiting to play
  let el: HTMLAudioElement | null = null;

  function audio(): HTMLAudioElement {
    if (!el) {
      el = new Audio();
      el.preload = "auto";
      el.onended = onTrackFinished;
      el.onerror = onTrackFinished;
    }
    return el;
  }

  function revokeCurrent(): void {
    if (currentUrl) {
      URL.revokeObjectURL(currentUrl);
      currentUrl = null;
    }
  }

  function onTrackFinished(): void {
    revokeCurrent();
    playing = false;
    playNext();
  }

  function playNext(): void {
    if (destroyed || muted || playing) return;
    const next = pending.shift();
    if (!next) return;
    currentUrl = next;
    playing = true;
    const a = audio();
    a.src = next;
    a.play().catch(() => {
      // Autoplay blocked (no user gesture yet) or decode error.
      // Drop this frame and try the next — don't let one bad frame
      // wedge the whole queue.
      revokeCurrent();
      playing = false;
      playNext();
    });
  }

  function base64ToBlobUrl(b64: string): string {
    const binary = atob(b64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const blob = new Blob([bytes], { type: "audio/mpeg" });
    return URL.createObjectURL(blob);
  }

  function drainPending(): void {
    while (pending.length) {
      const u = pending.shift();
      if (u) URL.revokeObjectURL(u);
    }
  }

  function stopPlayback(): void {
    if (el) {
      el.pause();
      el.removeAttribute("src");
      el.load(); // forces the element to release the resource
    }
    revokeCurrent();
    playing = false;
  }

  function clear(): void {
    stopPlayback();
    drainPending();
  }

  return {
    enqueueBase64Mp3(b64: string): void {
      if (destroyed) return;
      // While muted, drop frames on the floor instead of queueing them up
      // for a surprise blast when the user unmutes 30 seconds later.
      if (muted) return;
      let url: string;
      try {
        url = base64ToBlobUrl(b64);
      } catch {
        return; // bad base64 — drop silently
      }
      pending.push(url);
      if (!playing) playNext();
    },

    setMuted(next: boolean): void {
      if (next === muted) return;
      muted = next;
      if (muted) {
        clear();
      }
      // Unmuting doesn't replay history — frames during mute were dropped.
      // The next enqueue() will start playing.
    },

    clear,

    destroy(): void {
      destroyed = true;
      clear();
      el = null;
    },
  };
}