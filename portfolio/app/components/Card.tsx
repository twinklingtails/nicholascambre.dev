'use client';

import { motion } from 'framer-motion';

type CardProps = {
  title: string;
  subtitle?: string;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
};

export default function Card({ title, subtitle, onClick, className, children }: CardProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={cn(
        'card group w-full text-left p-5 sm:p-6',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
        className
      )}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.985 }}
      aria-label={title}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          {subtitle && (
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{subtitle}</p>
          )}
        </div>
        <span className="rounded-xl border border-neutral-200/60 dark:border-neutral-800/60 px-2 py-1 text-xs">
          View
        </span>
      </div>

      {children && <div className="mt-4">{children}</div>}
    </motion.button>
  );
}

/** tiny className joiner (keeps us dependency-free) */
function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ');
}
