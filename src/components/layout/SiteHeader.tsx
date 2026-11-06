import type { Service } from '@/models/portfolio';
import TransitionLink from '@/components/navigation/TransitionLink';
import HangingRope from '@/components/theme/HangingRope';
import styles from './SiteHeader.module.scss';

export default function SiteHeader({ services }: { services: Service[] }) {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.inner}>
          <div className={styles.identityBox}>
            <TransitionLink className={styles.wordmark} href="/" ariaLabel="Rishi Thakor home">
              RT<span>.</span>
            </TransitionLink>
          </div>
          <nav className={styles.navigationBox} aria-label="Main navigation">
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
          </nav>
          <TransitionLink className={styles.contact} href="/#contact">
            Let&apos;s talk <span aria-hidden="true">↗</span>
          </TransitionLink>
        </div>
      </header>
      <div className={styles.ropeLayer}>
        <HangingRope />
      </div>
    </>
  );
}
