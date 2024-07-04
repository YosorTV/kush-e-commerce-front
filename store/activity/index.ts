import { StateCreator } from 'zustand';

import { TActivityState } from '@/types/store';

export const activitySlice: StateCreator<TActivityState> = (set) => ({
  lastActivity: new Date().getTime(),
  setLastActivity: (time) => set({ lastActivity: time }),
});
