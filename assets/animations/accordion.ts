export const animAccordion = {
  open: {
    opacity: 1,
    height: 'auto',
    transition: {
      duration: 0.25,
      type: 'tween',
      stiffness: 20,
    },
  },
  collapsed: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.25,
      type: 'tween',
      stiffness: 20,
    },
  },
};
