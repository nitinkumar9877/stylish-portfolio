import TransitionLink from '@/components/navigation/TransitionLink';
import type { Service } from '@/models/portfolio';
import styles from './ServiceCard.module.scss';

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <TransitionLink
      className={styles.card}
      href={`/${service.slug}`}
      style={{ '--service-accent': service.accent } as React.CSSProperties}
    >
      <div className={styles.top}>
        <span>{service.number} / 04</span>
        <span className={styles.arrow} aria-hidden="true">↗</span>
      </div>
      <div className={styles.description}>
        <h3>{service.name}</h3>
        <p>{service.description}</p>
      </div>
      <span className={styles.link}>Explore service <span aria-hidden="true">→</span></span>
      <span className={styles.shape} aria-hidden="true" />
    </TransitionLink>
  );
}
