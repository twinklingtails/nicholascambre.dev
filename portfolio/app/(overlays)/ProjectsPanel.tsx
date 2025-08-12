'use client';

import { projects } from '../data/projects';

export default function ProjectsPanel() {
  return (
    <div className="space-y-4">
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projects.map(p => (
          <li key={p.slug} className="card p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold">{p.title}</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">{p.summary}</p>
              </div>
              <span className="text-xs px-2 py-1 rounded-lg border border-neutral-200/60 dark:border-neutral-800/60">
                {p.year}
              </span>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {p.tags.map(t => (
                <span key={t} className="text-xs rounded-md px-2 py-1 border border-neutral-200 dark:border-neutral-800">
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-3">
              {p.links.live && (
                <a className="btn text-sm" href={p.links.live} target="_blank" rel="noreferrer">Live</a>
              )}
              {p.links.github && (
                <a className="btn text-sm" href={p.links.github} target="_blank" rel="noreferrer">GitHub</a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
