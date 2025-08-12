'use client';

import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type OverlayProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Overlay({ open, title, onClose, children }: OverlayProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  // ESC to close + basic focus management
  useEffect(() => {
    if (!open) return;

    lastFocused.current = document.activeElement as HTMLElement;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);

    // focus the panel on open
    panelRef.current?.focus();

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      lastFocused.current?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          className="fixed inset-0 z-50"
          initial={false}
        >
          {/* Backdrop */}
          <motion.button
            aria-label="Close overlay"
            onClick={onClose}
            className="absolute inset-0 w-full h-full bg-black/60 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Panel */}
          <motion.div
            ref={panelRef}
            tabIndex={-1}
            className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-3xl rounded-t-2xl bg-white dark:bg-neutral-900 shadow-2xl ring-1 ring-neutral-200/50 dark:ring-neutral-800/50 p-6 sm:p-8"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
          >
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-xl sm:text-2xl font-semibold">{title}</h2>
              <button
                onClick={onClose}
                className="btn"
                aria-label="Close panel"
              >
                Close
              </button>
            </div>

            <div className="mt-5">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
