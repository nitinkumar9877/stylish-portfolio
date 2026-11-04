import TransitionLink from '@/components/navigation/TransitionLink';
import styles from './ActionLink.module.scss';

interface ActionLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: 'dark' | 'text';
  className?: string;
}

export default function ActionLink({
  href,
  children,
  variant = 'dark',
  className = '',
}: ActionLinkProps) {
  const variantClass = variant === 'dark' ? styles.dark : styles.text;

  return (
    <TransitionLink className={`${styles.action} ${variantClass} ${className}`} href={href}>
      {children}
    </TransitionLink>
  );
}
