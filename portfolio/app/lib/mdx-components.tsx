// app/lib/mdx-components.tsx
import type { MDXComponents } from "mdx/types";
import { theme } from "./theme";

/**
 * Style every standard markdown element so MDX bodies match the site.
 * Used by next-mdx-remote/rsc's <MDXRemote components={...}/> prop.
 */
export const mdxComponents: MDXComponents = {
  h1: props => (
    <h1
      className={`mt-12 mb-4 text-3xl font-semibold tracking-tight ${theme.text}`}
      {...props}
    />
  ),
  h2: props => (
    <h2
      className={`mt-10 mb-3 text-2xl font-semibold tracking-tight ${theme.text}`}
      {...props}
    />
  ),
  h3: props => (
    <h3
      className={`mt-8 mb-3 text-lg font-semibold ${theme.text}`}
      {...props}
    />
  ),
  p: props => (
    <p
      className={`my-4 text-base leading-relaxed ${theme.textSoft}`}
      {...props}
    />
  ),
  ul: props => (
    <ul
      className={`my-4 list-disc space-y-1 pl-6 ${theme.textSoft}`}
      {...props}
    />
  ),
  ol: props => (
    <ol
      className={`my-4 list-decimal space-y-1 pl-6 ${theme.textSoft}`}
      {...props}
    />
  ),
  li: props => <li className="leading-relaxed" {...props} />,
  a: props => (
    <a
      className={`underline decoration-[#00b8c8]/40 underline-offset-4 transition-colors hover:text-[#00b8c8] hover:decoration-[#00b8c8] ${theme.text}`}
      {...props}
    />
  ),
  strong: props => (
    <strong className={`font-semibold ${theme.text}`} {...props} />
  ),
  em: props => <em className="italic" {...props} />,
  code: props => (
    <code
      className={`rounded border bg-[#0d1117] px-1.5 py-0.5 text-[0.85em] ${theme.tealText} ${theme.border} ${theme.mono}`}
      {...props}
    />
  ),
  pre: props => (
    <pre
      className={`my-6 overflow-x-auto rounded-xl border bg-[#050505] p-4 text-sm ${theme.border} ${theme.text} ${theme.mono}`}
      {...props}
    />
  ),
  blockquote: props => (
    <blockquote
      className={`my-6 border-l-2 border-l-[#00b8c8] pl-4 italic ${theme.textSoft}`}
      {...props}
    />
  ),
  hr: () => <hr className={`my-10 border-t ${theme.border}`} />,
  // eslint-disable-next-line @next/next/no-img-element
  img: props => (
    <img
      className={`my-6 w-full rounded-xl border ${theme.border}`}
      alt={props.alt ?? ""}
      {...props}
    />
  ),
};