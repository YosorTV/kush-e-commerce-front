export interface AutoLogoutProviderProps {
  timeoutCheckMs?: number;
  requireSession?: boolean;
}

export type WindowActivityEvent = keyof WindowEventMap;
