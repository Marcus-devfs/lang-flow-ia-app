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
    englishLevel: 'Beginner' | 'Intermediate' | 'Advanced';
    hasCompletedOnboarding: boolean;
    isAuthenticated: boolean;
    isLoading: boolean;
}

interface UserActions {
    setUser: (user: User) => void;
    setCountry: (country: 'BR' | 'US' | 'CA' | 'World') => void;
    setTechStack: (stack: string[]) => void;
    setEnglishLevel: (level: 'Beginner' | 'Intermediate' | 'Advanced') => void;
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
            englishLevel: 'Intermediate',
            hasCompletedOnboarding: false,
            isAuthenticated: false,
            isLoading: false,

            setUser: (user) => set({ user, isAuthenticated: true }),
            setCountry: (country) => set({ country }),
            setTechStack: (techStack) => set({ techStack }),
            setEnglishLevel: (englishLevel) => set({ englishLevel }),
            completeOnboarding: () => set({ hasCompletedOnboarding: true }),
            logout: () => set({ user: null, isAuthenticated: false, hasCompletedOnboarding: false }),
            setLoading: (isLoading) => set({ isLoading }),
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
