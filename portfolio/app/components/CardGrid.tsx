'use client';

import { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Card from './Card';
import ProjectsPanel from '../(overlays)/ProjectsPanel';
import AboutPanel from '../(overlays)/AboutPanel';
import ContactPanel from '../(overlays)/ContactPanel';
import Overlay from './Overlay';

export default function CardGrid() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const panel = params.get('panel'); // 'projects' | 'about' | 'contact' | null

  const open = useCallback(
    (name: 'projects' | 'about' | 'contact') => {
      const next = new URLSearchParams(params.toString());
      next.set('panel', name);
      router.replace(`/?${next.toString()}`, { scroll: false });
    },
    [params, pathname, router]
  );

  const close = useCallback(() => {
    const next = new URLSearchParams(params.toString());
    next.delete('panel');
    const qs = next.toString();
    router.replace(`${pathname}?${next.toString()}`, { scroll: false });
  }, [params, pathname, router]);

  return (
    <div className="container py-10 sm:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <Card title="Projects" subtitle="What I’ve built" onClick={() => open('projects')} />
        <Card title="About" subtitle="Who I am" onClick={() => open('about')} />
        <Card title="Contact" subtitle="Reach out" onClick={() => open('contact')} />
      </div>

      <Overlay open={panel === 'projects'} title="Projects" onClose={close}>
        <div className="prose dark:prose-invert">
          <ProjectsPanel />
       </div>	
     </Overlay>

      <Overlay open={panel === 'about'} title="About" onClose={close}>
        <div className="prose dark:prose-invert">
          <AboutPanel />
        </div>
      </Overlay>
      
      <Overlay open={panel === 'contact'} title="Contact" onClose={close}>
        <div className="prose dark:prose-invert">
          <ContactPanel />
         </div>
       </Overlay>
    </div>
  );
}
