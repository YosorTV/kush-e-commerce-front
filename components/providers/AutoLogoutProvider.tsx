'use client';

import { FC, PropsWithChildren, useEffect } from 'react';

import { useActivity } from '@/store';
import { logout } from '@/services';
import { Session } from 'next-auth';

export interface AutoLogoutProviderProps {
  timeoutMs?: number; // Optional timeout for user inactivity
  timeoutCheckMs?: number; // Interval time to check for user inactivity
  requireSession?: boolean; // Flag to check if session is required
  session: Session; // Session object that contains session-related information
}

type WindowActivityEvent = keyof WindowEventMap; // Type alias for window events

export const AutoLogoutProvider: FC<PropsWithChildren<AutoLogoutProviderProps>> = ({
  timeoutMs = 15 * 60 * 1000,
  timeoutCheckMs = 1000,
  session,
  children
}) => {
  const { lastActivity, setLastActivity } = useActivity();

  const getCurrentTime = () => new Date().getTime();

  const onUserActivity = () => {
    const now = getCurrentTime();

    setLastActivity(now);
  };

  const checkUserInactivity = async () => {
    const now = getCurrentTime();

    if (session && session.exp) {
      const expiryTime = new Date(session.exp * 1000).getTime();

      if (now > expiryTime) {
        await logout();
        return;
      }
    }

    if (lastActivity && now - lastActivity > timeoutMs) {
      await logout();
    }
  };

  useEffect(() => {
    const windowEvents: WindowActivityEvent[] = ['focus', 'scroll', 'click', 'keydown', 'mousemove'];

    windowEvents.forEach((eventName) => {
      window.addEventListener(eventName, onUserActivity, false);
    });

    const intervalId = window.setInterval(checkUserInactivity, timeoutCheckMs);

    return () => {
      windowEvents.forEach((eventName) => {
        window.removeEventListener(eventName, onUserActivity, false);
      });
      window.clearInterval(intervalId);
    };
  }, [session]);

  return <>{children}</>;
};
