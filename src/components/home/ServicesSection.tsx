import type { Service } from '@/models/portfolio';
import ScrollReveal from '@/components/motion/ScrollReveal';
import Eyebrow from '@/components/ui/Eyebrow';
import ServiceCard from './ServiceCard';
import styles from './ServicesSection.module.scss';

export default function ServicesSection({ services }: { services: Service[] }) {
  return (
    <section className={styles.section} id="services">
      <div className="container">
        <ScrollReveal>
          <div className={`row align-items-end gy-3 ${styles.heading}`}>
            <div className="col-lg-7">
              <Eyebrow>A few things I do</Eyebrow>
              <h2>One person, many ways to make it work.</h2>
            </div>
            <p className={`col-lg-4 offset-lg-1 ${styles.intro}`}>
              Design and development work better together. Pick the door that fits your next step.
            </p>
          </div>
        </ScrollReveal>
        <div className="row g-3">
          {services.map((service, index) => (
            <div className="col-md-6" id={`service-${service.slug}`} key={service.slug}>
              <ScrollReveal delay={index * 100}>
                <ServiceCard service={service} />
              </ScrollReveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
