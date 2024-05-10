import React from 'react';

export type PortalProps = {
  children?: React.ReactNode;
  show?: boolean;
  onClose?: () => void;
  selector: string;
};
