import styles from './Eyebrow.module.scss';

export default function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <p className={`${styles.eyebrow} ${light ? styles.light : ''}`}>{children}</p>;
}
