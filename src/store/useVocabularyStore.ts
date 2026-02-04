import { create } from 'zustand';

export interface Flashcard {
    id: string;
    term: string;
    definition: string;
    example: string;
    masteryLevel: number; // 0-5
}

interface VocabularyState {
    cards: Flashcard[];
}

interface VocabularyActions {
    addCard: (card: Flashcard) => void;
    updateMastery: (id: string, level: number) => void;
}

export const useVocabularyStore = create<VocabularyState & VocabularyActions>((set) => ({
    cards: [
        { id: '1', term: 'API', definition: 'Application Programming Interface', example: 'I used the API to fetch data.', masteryLevel: 1 },
        { id: '2', term: 'Closure', definition: 'A combination of a function bundled with errors', example: 'Closures are useful for data hiding.', masteryLevel: 0 },
    ],

    addCard: (card) => set((state) => ({ cards: [...state.cards, card] })),
    updateMastery: (id, level) =>
        set((state) => ({
            cards: state.cards.map((card) =>
                card.id === id ? { ...card, masteryLevel: level } : card
            ),
        })),
}));
