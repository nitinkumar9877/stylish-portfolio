import type { PortfolioProfile } from '@/models/portfolio';
import ActionLink from '@/components/ui/ActionLink';
import Eyebrow from '@/components/ui/Eyebrow';
import ScrollFloat from '@/components/motion/ScrollFloat';
import styles from './HomeHero.module.scss';

export default function HomeHero({ portfolio }: { portfolio: PortfolioProfile }) {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.content}`}>
        <div className="row align-items-center gy-5">
          <div className={`col-lg-8 ${styles.copy}`}>
            <Eyebrow>{portfolio.role}</Eyebrow>
            <h1 className={styles.title}>
              {portfolio.headline}
            </h1>
            <p className={styles.description}>{portfolio.introduction}</p>
            <div className={styles.actions}>
              <ActionLink href="#services">Explore my work <span aria-hidden="true">↓</span></ActionLink>
              <ActionLink href="/#contact" variant="text">Start a project <span aria-hidden="true">↗</span></ActionLink>
            </div>
          </div>
          <div className="col-lg-4">
            <ScrollFloat>
              <div className={styles.art} role="img" aria-label="Sculptural arch against a warm sunset">
                <div className={styles.sun} />
                <div className={styles.arch}><span /></div>
                <div className={styles.caption}>
                  <span>Independent by choice</span>
                  <span>Based in India · Working everywhere</span>
                </div>
                <span className={styles.index}>01 / 04</span>
              </div>
            </ScrollFloat>
          </div>
        </div>
        <div className={styles.meta}>
          <span><i className={styles.status} />{portfolio.availability}</span>
          <span>{portfolio.location}</span>
        </div>
      </div>
    </section>
  );
}
