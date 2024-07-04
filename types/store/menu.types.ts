export type MenuState = {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
};

export type TSubMenuState = {
  isOpen: boolean;
  showSubmenu: () => void;
  hideSubmenu: () => void;
};
