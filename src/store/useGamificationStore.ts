import { create } from 'zustand';

interface GamificationState {
    streak: number;
    dailyVoiceMinutes: number;
    dailyCardsReviewed: number;
    dailyGoalMinutes: number;
    dailyGoalCards: number;
}

interface GamificationActions {
    incrementStreak: () => void;
    addVoiceMinutes: (minutes: number) => void;
    incrementCardsReviewed: (count?: number) => void;
    resetDailyGoals: () => void;
}

export const useGamificationStore = create<GamificationState & GamificationActions>((set) => ({
    streak: 5, // Mocked start
    dailyVoiceMinutes: 12,
    dailyCardsReviewed: 8,
    dailyGoalMinutes: 20,
    dailyGoalCards: 15,

    incrementStreak: () => set((state) => ({ streak: state.streak + 1 })),
    addVoiceMinutes: (min) => set((state) => ({ dailyVoiceMinutes: state.dailyVoiceMinutes + min })),
    incrementCardsReviewed: (count = 1) => set((state) => ({ dailyCardsReviewed: state.dailyCardsReviewed + count })),
    resetDailyGoals: () => set({ dailyVoiceMinutes: 0, dailyCardsReviewed: 0 }),
}));
