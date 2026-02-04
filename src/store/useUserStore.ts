import { create } from 'zustand';

interface User {
    id: string;
    name: string;
    email: string;
    role: 'developer' | 'general';
}

interface UserState {
    user: User | null;
    country: 'BR' | 'US' | 'CA' | 'World' | null;
    techStack: string[];
    isAuthenticated: boolean;
    isLoading: boolean;
}

interface UserActions {
    setUser: (user: User) => void;
    setCountry: (country: 'BR' | 'US' | 'CA' | 'World') => void;
    setTechStack: (stack: string[]) => void;
    logout: () => void;
    setLoading: (isLoading: boolean) => void;
}

export const useUserStore = create<UserState & UserActions>((set) => ({
    user: null,
    country: 'BR', // Defaulting to BR for simplicity in MVP, but allows changing
    techStack: ['React', 'TypeScript'], // Default stack
    isAuthenticated: false,
    isLoading: false,

    setUser: (user) => set({ user, isAuthenticated: true }),
    setCountry: (country) => set({ country }),
    setTechStack: (techStack) => set({ techStack }),
    logout: () => set({ user: null, isAuthenticated: false }),
    setLoading: (isLoading) => set({ isLoading }),
}));
