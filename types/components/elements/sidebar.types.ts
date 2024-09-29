export interface SidebarProps {
  opened: boolean;
  position: 'left' | 'right';
  onToggle: () => void;
}
