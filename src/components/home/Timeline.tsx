'use client';

import { useEffect, useRef } from 'react';
import type { Experience } from '@/models/portfolio';
import styles from './Timeline.module.scss';

interface Education {
  period: string;
  qualification: string;
  institution: string;
  description: string;
}

export default function Timeline({
  experience,
  education,
}: {
  experience: Experience[];
  education: Education;
}) {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const viewportLine = window.innerHeight * 0.76;
        const bounds = timeline.getBoundingClientRect();
        const travel = Math.max(1, bounds.height - window.innerHeight * 0.18);
        const nextProgress = Math.max(0, Math.min(1, (viewportLine - bounds.top) / travel));
        timeline.style.setProperty('--timeline-progress', `${nextProgress * 100}%`);
        timeline.querySelectorAll<HTMLElement>('[data-timeline-item]').forEach((item) => {
          item.classList.toggle(styles.active, item.getBoundingClientRect().top < viewportLine);
        });
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
  }, [experience.length]);

  const entries = [
    ...experience.map((item) => ({
      period: item.period,
      role: item.role,
      organization: item.organization,
      details: item.details,
    })),
    {
      period: education.period,
      role: education.qualification,
      organization: education.institution,
      details: [education.description],
    },
  ];

  return (
    <div className={styles.timeline} ref={timelineRef}>
      <span className={styles.rail} aria-hidden="true" />
      <span className={styles.fill} aria-hidden="true" />
      {entries.map((item) => (
        <article
          className={styles.item}
          data-timeline-item
          key={`${item.period}-${item.role}`}
        >
          <span className={styles.marker} aria-hidden="true" />
          <div className={styles.content}>
            <p className={styles.period}>{item.period}</p>
            <h3>{item.role}</h3>
            <p className={styles.organization}>{item.organization}</p>
            {item.details.map((detail) => (
              <p className={styles.detail} key={detail}>{detail}</p>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
