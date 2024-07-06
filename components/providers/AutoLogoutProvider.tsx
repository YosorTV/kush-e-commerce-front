'use client';

import { FC, PropsWithChildren, useEffect } from 'react';

import { useActivity } from '@/store';

import { logout } from '@/services';

export interface AutoLogoutProviderProps {
  timeoutMs?: number;
  timeoutCheckMs?: number;
  requireSession?: boolean;
  session: any;
}

type WindowActivityEvent = keyof WindowEventMap;

export const AutoLogoutProvider: FC<
  PropsWithChildren<AutoLogoutProviderProps>
> = ({ timeoutMs, timeoutCheckMs = 1000, session, children }) => {
  const { lastActivity, setLastActivity } = useActivity();

  function activity() {
    return new Date().getTime();
  }

  function onUserActivity() {
    const now = activity();

    setLastActivity(now);
  }

  async function isUserInactive() {
    const now = activity();

    if (session && session.exp) {
      const expiry = new Date(session.exp * 1000).getTime();

      if (now > expiry) {
        await logout();
      }
    }

    if (session && lastActivity + timeoutMs < now) {
      await logout();
    }
    return false;
  }

  useEffect(() => {
    const windowEvents: WindowActivityEvent[] = ['focus', 'scroll', 'click'];

    windowEvents.forEach((eventName) => {
      window.addEventListener(eventName, onUserActivity, false);
    });

    // initialize an interval to check activity
    const intervalId = window.setInterval(isUserInactive, timeoutCheckMs);

    return () => {
      windowEvents.forEach((eventName) => {
        window.removeEventListener(eventName, onUserActivity, false);
      });
      window.clearInterval(intervalId);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastActivity, timeoutCheckMs]);

  return children;
};
