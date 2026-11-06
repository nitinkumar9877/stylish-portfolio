'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import styles from './TransitionProvider.module.scss';

type TransitionPhase = 'idle' | 'closing' | 'opening';
type TransitionDirection = 'forward' | 'reverse';

function getRouteLabel(pathname: string) {
  const labels: Record<string, string> = {
    '/': 'Home',
    '/web-development': 'Web Development',
    '/app-development': 'App Development',
    '/ui-ux-design': 'UI/UX Design',
    '/graphic-design': 'Graphic Design',
  };

  const knownLabel = labels[pathname];
  if (knownLabel) return knownLabel;

  const segment = pathname.split('/').filter(Boolean).at(-1);
  return segment
    ? segment.replace(/[-_]+/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase())
    : 'Home';
}

function splitRouteLabel(label: string): [string, string] {
  const words = label.trim().split(/\s+/);
  if (words.length < 2) return [label, ''];

  const midpoint = Math.ceil(words.length / 2);
  return [words.slice(0, midpoint).join(' '), words.slice(midpoint).join(' ')];
}

interface TransitionContextValue {
  navigate: (href: string, scrollTarget?: string) => void;
}

const TransitionContext = createContext<TransitionContextValue | null>(null);

function waitForScrollToSettle() {
  return new Promise<void>((resolve) => {
    let settleTimer: ReturnType<typeof setTimeout>;
    const cleanup = () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(settleTimer);
      resolve();
    };
    const onScroll = () => {
      clearTimeout(settleTimer);
      settleTimer = setTimeout(cleanup, 100);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    settleTimer = setTimeout(cleanup, 700);
  });
}

export default function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<TransitionPhase>('idle');
  const [direction, setDirection] = useState<TransitionDirection>('forward');
  const [routeParts, setRouteParts] = useState<[string, string]>(['Home', '']);
  const previousPath = useRef(pathname);
  const phaseRef = useRef(phase);
  const pendingRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  phaseRef.current = phase;

  const navigate = useCallback((href: string, scrollTarget?: string) => {
    if (phaseRef.current !== 'idle' || pendingRef.current) return;

    const destination = new URL(href, window.location.href);
    if (destination.origin !== window.location.origin) {
      window.location.assign(destination.href);
      return;
    }

    if (destination.pathname === window.location.pathname) {
      if (destination.hash) {
        document.querySelector(destination.hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.replaceState(null, '', destination.href);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    const target = scrollTarget?.startsWith('#')
      ? document.getElementById(scrollTarget.slice(1))
      : null;
    const shouldScrollToCard = Boolean(target && pathname === '/');
    pendingRef.current = true;

    const beginNavigation = () => {
      setDirection(destination.pathname === '/' ? 'reverse' : 'forward');
      const nextLabel = getRouteLabel(destination.pathname);
      setRouteParts(splitRouteLabel(nextLabel));
      setPhase('closing');
      const gateDuration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 780;
      timeoutRef.current = setTimeout(() => {
        router.push(destination.pathname + destination.search + destination.hash);
        timeoutRef.current = setTimeout(() => {
          if (phaseRef.current !== 'idle') {
            setPhase('opening');
            timeoutRef.current = setTimeout(() => {
              pendingRef.current = false;
              setPhase('idle');
            }, 700);
          }
        }, 8000);
      }, gateDuration);
    };

    if (shouldScrollToCard) {
      target?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'center',
      });
      void waitForScrollToSettle().then(beginNavigation);
      return;
    }

    beginNavigation();
  }, [pathname, router]);

  useEffect(() => {
    if (previousPath.current !== pathname) {
      previousPath.current = pathname;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (pendingRef.current) {
        setPhase('opening');
        timeoutRef.current = setTimeout(() => {
          pendingRef.current = false;
          setPhase('idle');
        }, 720);
      }
    }
  }, [pathname]);

  useEffect(() => {
    const handlePopState = () => {
      if (phaseRef.current !== 'idle' || pendingRef.current) return;
      pendingRef.current = true;
      setDirection('reverse');
      setRouteParts(['Previous', 'page']);
      setPhase('closing');
      const gateDuration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 780;
      timeoutRef.current = setTimeout(() => {
        setPhase('opening');
        timeoutRef.current = setTimeout(() => {
          pendingRef.current = false;
          setPhase('idle');
        }, 700);
      }, gateDuration);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
      <div
        className={styles.gate}
        data-phase={phase}
        data-direction={direction}
        aria-hidden="true"
      >
        <div className={`${styles.door} ${styles.leftDoor}`}>
          <strong className={styles.panelTitle}>{routeParts[0]}</strong>
        </div>
        <div className={`${styles.door} ${styles.rightDoor}`}>
          <strong className={styles.panelTitle}>{routeParts[1]}</strong>
        </div>
      </div>
    </TransitionContext.Provider>
  );
}

export function useRouteTransition() {
  const context = useContext(TransitionContext);
  if (!context) throw new Error('useRouteTransition must be used within TransitionProvider');
  return context;
}
