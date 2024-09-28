import React, { FC } from 'react';

import { cn } from '@/lib';
import { getStatusColor } from '@/helpers/formatters';
import { IStatusBadge } from '@/types/components';

const StatusBadge: FC<IStatusBadge> = ({ status }) => {
  return <span className={cn('ml-2 rounded-md px-2.5 py-1.5 text-white', getStatusColor(status))}>{status}</span>;
};

export default StatusBadge;
