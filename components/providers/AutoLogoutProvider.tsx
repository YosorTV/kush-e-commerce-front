'use client';

import { FC, PropsWithChildren, useEffect } from 'react';

import { useActivity } from '@/store';
import { logout } from '@/services';
import { useSession } from 'next-auth/react';

export interface AutoLogoutProviderProps {
  timeoutMs?: number;
  timeoutCheckMs?: number;
  requireSession?: boolean;
}

type WindowActivityEvent = keyof WindowEventMap;

export const AutoLogoutProvider: FC<PropsWithChildren<AutoLogoutProviderProps>> = ({
  timeoutMs = 15 * 60 * 1000,
  timeoutCheckMs = 1000,
  children
}) => {
  const session = useSession();

  const { lastActivity, setLastActivity } = useActivity();

  const getCurrentTime = () => new Date().getTime();

  const onUserActivity = () => {
    const now = getCurrentTime();

    setLastActivity(now);
  };

  const checkUserInactivity = async () => {
    const now = getCurrentTime();

    if (session.data && session.data.exp) {
      const expiryTime = new Date(session.data.exp * 1000).getTime();

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
  }, [session.data]);

  return <>{children}</>;
};
