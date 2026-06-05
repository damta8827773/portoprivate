import { useEffect } from 'react';

/**
 * Ports the original document-wide vanilla-JS effects into one effect:
 *  - IntersectionObserver reveal (.hidden → .show)
 *  - 3D tilt on cards
 *  - magnetic CTA buttons
 *  - spotlight mouse-tracking (--mouse-x/--mouse-y) on cards
 * Uses a MutationObserver so dynamically added cards (repos, see-more) also bind.
 */
export function useGlobalEffects() {
  useEffect(() => {
    const REVEAL_SEL =
      '.hero, .profil-card, .skill-section, .project-card, .cert-card, .visi-misi-container, .vm-card, section h2, #comments, #dashboard, .vscode-window, .stack-desc';
    const TILT_SEL = '.project-card, .cert-card, .vm-card, .dash-card, .stat-card';
    const SPOT_SEL =
      '.profil-card, .tech-item, .project-card, .cert-card, .vm-card, .timeline-card, .stat-card';
    const MAX_TILT = 10;

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('show');
        });
      },
      { threshold: 0.1 },
    );
    document.querySelectorAll(REVEAL_SEL).forEach((el) => revealObserver.observe(el));

    const spotMove = (e: MouseEvent) => {
      const card = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const el = e.currentTarget as HTMLElement;
      el.style.setProperty('--mouse-x', `${e.clientX - card.left}px`);
      el.style.setProperty('--mouse-y', `${e.clientY - card.top}px`);
    };

    const tiltMove = (e: MouseEvent) => {
      const el = e.currentTarget as HTMLElement;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateY(${x * MAX_TILT}deg) rotateX(${-y * MAX_TILT}deg) scale(1.025)`;
    };
    const tiltLeave = (e: MouseEvent) => {
      (e.currentTarget as HTMLElement).style.transform = '';
    };

    const magMove = (e: MouseEvent) => {
      const el = e.currentTarget as HTMLElement;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.25;
      const y = (e.clientY - r.top - r.height / 2) * 0.25;
      el.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
    };
    const magLeave = (e: MouseEvent) => {
      (e.currentTarget as HTMLElement).style.transform = '';
    };

    const bound = new WeakSet<HTMLElement>();
    function bind(root: ParentNode) {
      root.querySelectorAll<HTMLElement>(SPOT_SEL).forEach((el) => {
        if (bound.has(el)) return;
        el.addEventListener('mousemove', spotMove);
      });
      root.querySelectorAll<HTMLElement>(TILT_SEL).forEach((el) => {
        if (bound.has(el)) return;
        el.classList.add('tilt-card');
        el.addEventListener('mousemove', tiltMove);
        el.addEventListener('mouseleave', tiltLeave);
        bound.add(el);
      });
      root.querySelectorAll<HTMLElement>('.magnetic-btn').forEach((el) => {
        if (bound.has(el)) return;
        el.addEventListener('mousemove', magMove);
        el.addEventListener('mouseleave', magLeave);
        bound.add(el);
      });
    }

    bind(document);

    const mo = new MutationObserver((muts) => {
      muts.forEach((m) =>
        m.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return;
          const el = node as HTMLElement;
          if (el.matches?.(REVEAL_SEL)) revealObserver.observe(el);
          el.querySelectorAll?.(REVEAL_SEL).forEach((c) => revealObserver.observe(c));
          bind(el);
        }),
      );
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      revealObserver.disconnect();
      mo.disconnect();
    };
  }, []);
}
