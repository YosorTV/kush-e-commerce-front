import { FC } from 'react';
import { FaTiktok, FaFacebookF, FaInstagram } from 'react-icons/fa';

import NextLink from 'next/link';
import { ReactNode } from 'react';
import { StrapiLinkType } from '@/types/components';

enum Icons {
  TIKTOK = 'tiktok',
  INSTAGRAM = 'instagram',
  FACEBOOK = 'facebook',
}

interface SocialLinkProps extends StrapiLinkType {
  format: Icons;
  className?: string;
}

const icons: Record<Icons, ReactNode> = {
  [Icons.TIKTOK]: <FaTiktok style={{ width: 24, height: 24 }} />,
  [Icons.INSTAGRAM]: <FaInstagram style={{ width: 24, height: 24 }} />,
  [Icons.FACEBOOK]: <FaFacebookF style={{ width: 24, height: 24 }} />,
};

export const SocialLink: FC<SocialLinkProps> = ({
  url,
  format,
  isExternal,
  className,
}) => {
  return (
    <NextLink href={url} replace={isExternal} className={className}>
      {icons[format]}
    </NextLink>
  );
};
