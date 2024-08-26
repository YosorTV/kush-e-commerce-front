import { FC } from 'react';
import { IoClose } from 'react-icons/io5';

type CloseIcon = {
  width?: number;
  height?: number;
  className?: string;
};

export const CloseIcon: FC<CloseIcon> = ({ width = 12, height = 12, className = 'h-3 w-3' }) => {
  return <IoClose width={width} height={height} className={className} />;
};
