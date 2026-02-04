import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
}

interface UserState {
    user: User | null;
    country: 'BR' | 'US' | 'CA' | 'World' | null;
    techStack: string[];
    englishLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'Beginner' | 'Intermediate' | 'Advanced';
    hasCompletedOnboarding: boolean;
    hasTakenPlacementTest: boolean;
    isAuthenticated: boolean;
    isLoading: boolean;
}

interface UserActions {
    setUser: (user: User) => void;
    setCountry: (country: 'BR' | 'US' | 'CA' | 'World') => void;
    setTechStack: (stack: string[]) => void;
    setEnglishLevel: (level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'Beginner' | 'Intermediate' | 'Advanced') => void;
    setHasTakenPlacementTest: (hasTaken: boolean) => void;
    completeOnboarding: () => void;
    logout: () => void;
    setLoading: (isLoading: boolean) => void;
}

export const useUserStore = create<UserState & UserActions>()(
    persist(
        (set) => ({
            user: null,
            country: 'BR',
            techStack: ['React', 'TypeScript'],
            englishLevel: 'B1',
            hasCompletedOnboarding: false,
            hasTakenPlacementTest: false,
            isAuthenticated: false,
            isLoading: false,

            setUser: (user) => set({ user, isAuthenticated: true }),
            setCountry: (country) => set({ country }),
            setTechStack: (techStack) => set({ techStack }),
            setEnglishLevel: (englishLevel) => set({ englishLevel }),
            setHasTakenPlacementTest: (hasTaken) => set({ hasTakenPlacementTest: hasTaken }),
            completeOnboarding: () => set({ hasCompletedOnboarding: true }),
            logout: () => set({ user: null, isAuthenticated: false, hasCompletedOnboarding: false, hasTakenPlacementTest: false }),
            setLoading: (isLoading) => set({ isLoading }),
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
