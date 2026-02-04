import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ReviewStatus = 'new' | 'learning' | 'review_needed' | 'mastered';

export interface Flashcard {
    id: string;
    term: string;
    definition: string;
    example: string;
    masteryLevel: number; // 0-5
    status: ReviewStatus;
    nextReviewDate?: string;
}

interface VocabularyState {
    cards: Flashcard[];
}

interface VocabularyActions {
    addCard: (card: Omit<Flashcard, 'id' | 'masteryLevel' | 'status'>) => void;
    updateMastery: (id: string, level: number) => void;
    updateStatus: (id: string, status: ReviewStatus) => void;
    resetDeck: () => void;
}

export const useVocabularyStore = create<VocabularyState & VocabularyActions>()(
    persist(
        (set) => ({
            cards: [
                { id: '1', term: 'API', definition: 'Application Programming Interface', example: 'I used the API to fetch data.', masteryLevel: 1, status: 'learning' },
                { id: '2', term: 'Closure', definition: 'A combination of a function bundled with errors', example: 'Closures are useful for data hiding.', masteryLevel: 0, status: 'new' },
                { id: '3', term: 'Debounce', definition: 'Technique to limit the rate of execution', example: 'Debounce the search input handler.', masteryLevel: 4, status: 'mastered' },
            ],

            addCard: (card) => set((state) => ({
                cards: [...state.cards, {
                    ...card,
                    id: Math.random().toString(36).substring(7),
                    masteryLevel: 0,
                    status: 'new'
                }]
            })),

            updateMastery: (id, level) =>
                set((state) => ({
                    cards: state.cards.map((card) =>
                        card.id === id ? { ...card, masteryLevel: level } : card
                    ),
                })),

            updateStatus: (id, status) =>
                set((state) => ({
                    cards: state.cards.map((card) =>
                        card.id === id ? { ...card, status } : card
                    ),
                })),

            resetDeck: () => set({ cards: [] }),
        }),
        {
            name: 'vocabulary-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
