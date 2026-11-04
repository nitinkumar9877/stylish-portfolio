'use client';

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react';
import { useTheme } from './ThemeProvider';
import styles from './HangingRope.module.scss';

const DRAG_THRESHOLD = 34;
const MAX_PULL = 108;

type PullPhase = 'idle' | 'dragging' | 'pulling' | 'holding' | 'returning' | 'settling';

export default function HangingRope() {
  const { theme, toggleTheme } = useTheme();
  const [pullDistance, setPullDistance] = useState(0);
  const [phase, setPhase] = useState<PullPhase>('idle');
  const startY = useRef(0);
  const pullDistanceRef = useRef(0);
  const movedRef = useRef(false);
  const pointerIdRef = useRef<number | null>(null);
  const busyRef = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => {
    timers.current.forEach(clearTimeout);
  }, []);

  function schedule(callback: () => void, delay: number) {
    const timer = setTimeout(() => {
      timers.current = timers.current.filter((scheduled) => scheduled !== timer);
      callback();
    }, delay);
    timers.current.push(timer);
  }

  function updatePull(distance: number) {
    pullDistanceRef.current = distance;
    setPullDistance(distance);
  }

  function returnToRest() {
    if (busyRef.current) return;
    busyRef.current = true;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setPhase(reducedMotion ? 'idle' : 'settling');
    updatePull(0);
    schedule(() => {
      setPhase('idle');
      busyRef.current = false;
    }, reducedMotion ? 0 : 320);
  }

  function startPull() {
    if (busyRef.current) return;
    busyRef.current = true;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      toggleTheme();
      updatePull(0);
      setPhase('idle');
      busyRef.current = false;
      return;
    }

    setPhase('pulling');
    updatePull(MAX_PULL);
    schedule(() => {
      toggleTheme();
      setPhase('holding');
    }, 800);
    schedule(() => {
      setPhase('returning');
      updatePull(0);
    }, 1000);
    schedule(() => {
      setPhase('settling');
      updatePull(3);
    }, 2000);
    schedule(() => updatePull(0), 2150);
    schedule(() => {
      setPhase('idle');
      busyRef.current = false;
    }, 2300);
  }

  function handlePointerDown(event: PointerEvent<HTMLButtonElement>) {
    if (busyRef.current || (event.pointerType === 'mouse' && event.button !== 0)) return;

    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    pointerIdRef.current = event.pointerId;
    startY.current = event.clientY;
    movedRef.current = false;
    setPhase('dragging');
  }

  function handlePointerMove(event: PointerEvent<HTMLButtonElement>) {
    if (phase !== 'dragging' || pointerIdRef.current !== event.pointerId) return;

    const rawDistance = Math.max(0, event.clientY - startY.current);
    if (rawDistance > 6) movedRef.current = true;
    const distance = rawDistance <= 76
      ? rawDistance
      : Math.min(MAX_PULL, 76 + (rawDistance - 76) * 0.22);
    updatePull(distance);
  }

  function handlePointerUp(event: PointerEvent<HTMLButtonElement>) {
    if (pointerIdRef.current !== event.pointerId) return;

    pointerIdRef.current = null;
    const wasClick = !movedRef.current;
    const reachedThreshold = pullDistanceRef.current >= DRAG_THRESHOLD;

    if (wasClick || reachedThreshold) {
      startPull();
    } else {
      returnToRest();
    }
  }

  function handlePointerCancel(event: PointerEvent<HTMLButtonElement>) {
    if (pointerIdRef.current !== event.pointerId) return;

    pointerIdRef.current = null;
    returnToRest();
  }

  function handleClick() {
    startPull();
  }

  const assemblyStyle = {
    '--pull-distance': `${pullDistance}px`,
  } as CSSProperties;
  const assemblyClass = `${styles.assembly} ${styles[phase]}`;

  return (
    <div className={assemblyClass} style={assemblyStyle}>
      <span className={styles.cord} aria-hidden="true">
        <span className={styles.strand} />
      </span>
      <button
        className={styles.pendantButton}
        type="button"
        aria-label={`Pull to switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
        aria-pressed={theme === 'dark'}
        aria-describedby="theme-switch-status"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onLostPointerCapture={handlePointerCancel}
        onClick={handleClick}
      >
        <span className={styles.pendant} aria-hidden="true">
          <span className={styles.grain} />
          <span className={styles.endCap} />
        </span>
      </button>
      <span id="theme-switch-status" className={styles.visuallyHidden} aria-live="polite">
        {theme === 'dark' ? 'Dark mode' : 'Light mode'}
      </span>
    </div>
  );
}
