export const animLang = ({ flipped }: { flipped: boolean }) => ({
  initial: { rotateY: 0 },
  animate: { rotateY: flipped ? 180 : 0 },
  exit: { opacity: 0 },
});
