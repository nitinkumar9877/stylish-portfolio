import TransitionLink from '@/components/navigation/TransitionLink';
import type { PortfolioProfile } from '@/models/portfolio';
import styles from './SiteFooter.module.scss';

export default function SiteFooter({ portfolio }: { portfolio: PortfolioProfile }) {
  return (
    <footer className={styles.footer} id="contact">
      <div className="container">
        <div className={`row align-items-end gy-4 ${styles.cta}`}>
          <div className="col-lg-8">
            <p className={styles.eyebrow}>Have a good one in mind?</p>
            <h2>Let&apos;s make it happen.</h2>
          </div>
          <div className="col-lg-4 text-lg-end">
            <a className={styles.email} href={`mailto:${portfolio.email}`}>
              Get in touch <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} {portfolio.name}. Made with care.</span>
          <TransitionLink href="/">Back to the top ↑</TransitionLink>
        </div>
      </div>
    </footer>
  );
}
