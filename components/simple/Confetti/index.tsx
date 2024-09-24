'use client';

import useWindowSize from 'react-use/lib/useWindowSize';
import ReactConfetti from 'react-confetti';

export const Confetti = ({ className }: { className?: string }) => {
  const { width, height } = useWindowSize();

  return <ReactConfetti width={width} height={height} className={className} />;
};
