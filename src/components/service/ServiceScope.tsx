import type { Service } from '@/models/portfolio';
import ScrollReveal from '@/components/motion/ScrollReveal';
import Eyebrow from '@/components/ui/Eyebrow';
import styles from './ServiceScope.module.scss';

export default function ServiceScope({ service }: { service: Service }) {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className="row gy-5">
          <ScrollReveal className="col-lg-5">
            <Eyebrow>A good place to start</Eyebrow>
            <h2>What we can make together.</h2>
            <p className={styles.intro}>
              Every project is a little different. We&apos;ll find the right mix of these building blocks for yours.
            </p>
          </ScrollReveal>
          <div className="col-lg-6 offset-lg-1">
            <ol className={styles.list}>
              {service.deliverables.map((item, index) => (
                <li key={item}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <p>{item}</p>
                  <span aria-hidden="true">↗</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
