export const navAnimations = {
  initial: {
    display: 'none',
    opacity: 0,
    transition: { type: 'tween', ease: 'easeOut', duration: 0.3 }
  },
  animate: { display: 'flex', opacity: 1, transition: { type: 'tween', ease: 'easeOut', duration: 0.3 } },
  exit: { display: 'none', opacity: 0, transition: { type: 'tween', ease: 'easeOut', duration: 0.3 } }
};
