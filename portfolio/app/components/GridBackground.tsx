// app/components/GridBackground.tsx

/**
 * The console grid + scanlines + accent edges background.
 * Mount once at the layout level (NOT per-page) — these are
 * fixed-positioned, so a single instance covers the whole viewport.
 *
 * Pulled from the .console-grid / .console-scanlines / .console-edge-*
 * classes in globals.css.
 */
export function GridBackground() {
  return (
    <>
      {/* Solid base — keeps the grid visible behind any non-opaque page */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 bg-[#050505]"
      />

      {/* Subtle dot grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 console-grid"
      />

      {/* Scanline ticks for that CRT/console feel */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 console-scanlines"
      />

      {/* Top teal edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-px console-edge-top"
      />

      {/* Right pink edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-y-0 right-0 -z-10 w-px console-edge-right"
      />
    </>
  );
}