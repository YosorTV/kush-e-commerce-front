import { FC } from 'react';
import { FaCircleInfo } from 'react-icons/fa6';

type CloseIcon = {
  width?: number;
  height?: number;
  className?: string;
  fill?: string;
};

export const InfoIcon: FC<CloseIcon> = ({ width = 12, height = 12, fill = 'current', className = 'h-3 w-3' }) => {
  return <FaCircleInfo width={width} height={height} className={className} fill={fill} />;
};
