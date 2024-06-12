export const searchVariants = {
  initial: {
    y: '-100%',
    opacity: 0,
  },
  animate: {
    y: '0%',
    opacity: 1,
    transition: {
      duration: 0.25,
      type: 'tween',
      stiffness: 20,
    },
  },
  exit: {
    y: '-100%',
    transition: {
      delay: 0.5,
      duration: 0.25,
      type: 'tween',
      stiffness: 20,
    },
  },
};

export const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const childrenVariants = {
  initial: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5,
    },
  },
  hidden: { opacity: 0 },
};
