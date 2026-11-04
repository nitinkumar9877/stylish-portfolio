'use client';

import { useEffect, useRef } from 'react';
import styles from './ScrollFloat.module.scss';

export default function ScrollFloat({ children }: { children: React.ReactNode }) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const bounds = element.getBoundingClientRect();
        const offset = Math.max(-28, Math.min(28, (window.innerHeight / 2 - bounds.top - bounds.height / 2) * 0.055));
        element.style.setProperty('--scroll-float', `${offset}px`);
      });
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return <div ref={elementRef} className={styles.float}>{children}</div>;
}
