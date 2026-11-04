import type { Service } from '@/models/portfolio';
import TransitionLink from '@/components/navigation/TransitionLink';
import HangingRope from '@/components/theme/HangingRope';
import styles from './SiteHeader.module.scss';

export default function SiteHeader({ services }: { services: Service[] }) {
  return (
    <header className={styles.header}>
      <nav className={`container ${styles.inner}`} aria-label="Main navigation">
        <TransitionLink className={styles.wordmark} href="/" ariaLabel="Rishi Thakor home">
          RT<span>.</span>
        </TransitionLink>
        <div className={styles.navigation}>
          <TransitionLink href="/">Home</TransitionLink>
          {services.map((service) => (
            <TransitionLink
              href={`/${service.slug}`}
              scrollTarget={`#service-${service.slug}`}
              key={service.slug}
            >
              {service.shortName}
            </TransitionLink>
          ))}
          <TransitionLink href="/#story">My story</TransitionLink>
        </div>
        <div className={styles.actions}>
          <TransitionLink className={styles.contact} href="/#contact">
            Let&apos;s talk <span aria-hidden="true">↗</span>
          </TransitionLink>
        </div>
      </nav>
      <HangingRope />
    </header>
  );
}
