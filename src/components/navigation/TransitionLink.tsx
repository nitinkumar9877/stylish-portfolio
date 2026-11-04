'use client';

import type { CSSProperties, MouseEvent, ReactNode } from 'react';
import { useRouteTransition } from './TransitionProvider';

interface TransitionLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  scrollTarget?: string;
  style?: CSSProperties;
}

export default function TransitionLink({
  href,
  children,
  className,
  ariaLabel,
  scrollTarget,
  style,
}: TransitionLinkProps) {
  const { navigate } = useRouteTransition();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) return;

    const destination = new URL(href, window.location.href);
    if (destination.pathname === window.location.pathname && destination.hash) return;

    event.preventDefault();
    navigate(href, scrollTarget);
  }

  return (
    <a className={className} href={href} onClick={handleClick} aria-label={ariaLabel} style={style}>
      {children}
    </a>
  );
}
