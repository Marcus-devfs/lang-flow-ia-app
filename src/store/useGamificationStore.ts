import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    setDailyGoals: (minutes: number, cards: number) => void;
    resetDailyGoals: () => void;
}

export const useGamificationStore = create<GamificationState & GamificationActions>()(
    persist(
        (set) => ({
            streak: 5, // Mocked start
            dailyVoiceMinutes: 12,
            dailyCardsReviewed: 8,
            dailyGoalMinutes: 20,
            dailyGoalCards: 15,

            incrementStreak: () => set((state) => ({ streak: state.streak + 1 })),
            addVoiceMinutes: (min) => set((state) => ({ dailyVoiceMinutes: state.dailyVoiceMinutes + min })),
            incrementCardsReviewed: (count = 1) => set((state) => ({ dailyCardsReviewed: state.dailyCardsReviewed + count })),
            setDailyGoals: (minutes, cards) => set({ dailyGoalMinutes: minutes, dailyGoalCards: cards }),
            resetDailyGoals: () => set({ dailyVoiceMinutes: 0, dailyCardsReviewed: 0 }),
        }),
        {
            name: 'gamification-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
