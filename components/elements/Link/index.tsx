import { LinkType } from '@/types/components';
import Link from 'next/link';

export const NextLink: React.FC<LinkType> = ({
  href,
  children,
  className,
  replace,
  scroll,
  prefetch,
}) => {
  return (
    <Link
      href={href}
      replace={replace}
      scroll={scroll}
      prefetch={prefetch}
      className={className}
    >
      {children}
    </Link>
  );
};
