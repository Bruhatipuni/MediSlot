import { create } from 'zustand';

export const useAppStore = create((set, get) => ({
  soundEnabled: false,
  lobbyFilterDepartment: 'All',
  announcementTickerVisible: true,
  recentNotifications: [],

  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),

  setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),

  setLobbyFilterDepartment: (department) => set({ lobbyFilterDepartment: department }),

  toggleAnnouncementTicker: () => set((state) => ({ announcementTickerVisible: !state.announcementTickerVisible })),

  addNotification: (message, type = 'info') =>
    set((state) => ({
      recentNotifications: [
        { id: Date.now(), message, type, timestamp: new Date().toLocaleTimeString() },
        ...state.recentNotifications.slice(0, 4),
      ],
    })),

  clearNotifications: () => set({ recentNotifications: [] }),
}));

export default useAppStore;
