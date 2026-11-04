import type { Service } from '@/models/portfolio';
import TransitionLink from '@/components/navigation/TransitionLink';
import ActionLink from '@/components/ui/ActionLink';
import Eyebrow from '@/components/ui/Eyebrow';
import styles from './RelatedServices.module.scss';

export default function RelatedServices({ current, services }: { current: Service; services: Service[] }) {
  const related = services.filter(({ slug }) => slug !== current.slug).slice(0, 2);

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.heading}>
          <div>
            <Eyebrow>Keep exploring</Eyebrow>
            <h2>More ways to work together.</h2>
          </div>
          <ActionLink href="/" variant="text">View all services <span aria-hidden="true">→</span></ActionLink>
        </div>
        <div className="row g-3">
          {related.map((service) => (
            <div className="col-md-6" key={service.slug}>
              <TransitionLink className={styles.card} href={`/${service.slug}`}>
                <span>{service.number} / {service.name}</span>
                <span className={styles.arrow} aria-hidden="true">↗</span>
                <p>{service.description}</p>
              </TransitionLink>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
