export const animCart = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  basket: {
    initial: { opacity: 0, scale: 0.5, rotateZ: -10 },
    animate: { opacity: 0.75, scale: 1, rotateZ: 0 },
    exit: { opacity: 0, scale: 0.5, rotateZ: -10 },
  },
};
