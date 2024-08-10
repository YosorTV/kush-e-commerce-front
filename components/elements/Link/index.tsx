import { FC } from 'react';

import { Link } from '@/lib/navigation';

import { LinkType } from '@/types/components';

export const NextLink: FC<LinkType> = ({ href = '/', children, className, replace, scroll, prefetch, title }) => {
  return (
    <Link href={href} replace={replace} scroll={scroll} prefetch={prefetch} className={className} title={title}>
      {children}
    </Link>
  );
};
