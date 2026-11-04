import type { Service } from '@/models/portfolio';
import TransitionLink from '@/components/navigation/TransitionLink';
import ActionLink from '@/components/ui/ActionLink';
import Eyebrow from '@/components/ui/Eyebrow';
import styles from './ServiceHero.module.scss';

export default function ServiceHero({ service }: { service: Service }) {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.inner}`}>
        <TransitionLink className={styles.back} href="/">← All services</TransitionLink>
        <div className="row align-items-end gy-5">
          <div className={`col-lg-8 ${styles.copy}`}>
            <Eyebrow>{service.number} / Selected service</Eyebrow>
            <h1 className={styles.title}>{service.name}<span>.</span></h1>
            <p className={styles.intro}>{service.intro}</p>
            <ActionLink href="/#contact">Tell me about your project <span aria-hidden="true">↗</span></ActionLink>
          </div>
          <div className="col-lg-4">
            <div
              className={styles.art}
              style={{ '--service-accent': service.accent } as React.CSSProperties}
              aria-hidden="true"
            >
              <span className={`${styles.orbit} ${styles.orbitOne}`} />
              <span className={`${styles.orbit} ${styles.orbitTwo}`} />
              <span className={styles.orb} />
              <span className={styles.number}>{service.number}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
