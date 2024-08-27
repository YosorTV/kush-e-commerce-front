import { FC } from 'react';
import { FaHeart } from 'react-icons/fa';

type CloseIcon = {
  width?: number;
  height?: number;
  className?: string;
  fill?: string;
};

export const HeartIcon: FC<CloseIcon> = ({ width = 12, height = 12, fill = 'current', className = 'h-3 w-3' }) => {
  return <FaHeart width={width} height={height} className={className} fill={fill} />;
};
