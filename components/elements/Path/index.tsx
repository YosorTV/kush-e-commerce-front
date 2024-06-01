'use client';

import { FC } from 'react';
import { motion, SVGMotionProps } from 'framer-motion';

interface PathProps extends SVGMotionProps<SVGPathElement> {}

export const Path: FC<PathProps> = (props) => (
  <motion.path
    fill='transparent'
    strokeWidth='2'
    strokeLinecap='round'
    {...props}
  />
);
