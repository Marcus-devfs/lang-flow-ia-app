import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { useVocabularyStore, Flashcard } from '../store/useVocabularyStore';
import { useGamificationStore } from '../store/useGamificationStore';
import { useTranslation } from '../hooks/useTranslation';
import { Button } from './Button';
import { X } from 'lucide-react-native';

export function FlashcardQuiz({ onClose }: { onClose: () => void }) {
    const { cards, updateStatus } = useVocabularyStore();
    const { incrementCardsReviewed } = useGamificationStore();
    const { t } = useTranslation();

    // Filter cards that need review (or all for demo)
    const reviewQueue = cards.filter(c => c.status !== 'mastered');

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    const currentCard = reviewQueue[currentIndex];

    const handleNext = (difficulty: 'hard' | 'good' | 'easy') => {
        // Simple SRS Logic Simulation
        let nextStatus = currentCard.status;
        if (difficulty === 'easy') nextStatus = 'mastered';
        if (difficulty === 'hard') nextStatus = 'learning';

        updateStatus(currentCard.id, nextStatus);
        incrementCardsReviewed(1);

        if (currentIndex < reviewQueue.length - 1) {
            setIsFlipped(false);
            setCurrentIndex(prev => prev + 1);
        } else {
            onClose();
        }
    };

    if (!currentCard) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text className="text-xl font-bold text-slate-800 dark:text-white mb-4">You are all caught up!</Text>
                <Button label="Go back" onPress={onClose} />
            </View>
        );
    }

    return (
        <View className="flex-1 w-full justify-center items-center">
            {/* Header */}
            <View className="absolute top-0 w-full flex-row justify-between items-center px-4 py-4 z-10">
                <Text className="text-slate-500 font-bold">
                    {currentIndex + 1} / {reviewQueue.length}
                </Text>
                <TouchableOpacity onPress={onClose} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full">
                    <X size={20} className="text-slate-900 dark:text-white" />
                </TouchableOpacity>
            </View>

            {/* Card */}
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setIsFlipped(!isFlipped)}
                className="w-full h-96 mb-10"
            >
                <View className={`w-full h-full bg-white dark:bg-slate-800 rounded-3xl shadow-xl items-center justify-center p-8 border-b-4 ${isFlipped ? 'border-blue-500' : 'border-slate-200 dark:border-slate-700'}`}>
                    {!isFlipped ? (
                        <View className="items-center">
                            <Text className="text-sm text-slate-400 font-bold uppercase tracking-widest mb-4">
                                {t.vocabulary.term}
                            </Text>
                            <Text className="text-4xl font-extrabold text-slate-900 dark:text-white text-center">
                                {currentCard.term}
                            </Text>
                            <Text className="text-slate-400 mt-8 text-sm">
                                {t.vocabulary.tapToReveal}
                            </Text>
                        </View>
                    ) : (
                        <View className="items-start w-full">
                            <Text className="text-sm text-blue-500 font-bold uppercase tracking-widest mb-2">
                                {t.vocabulary.definition}
                            </Text>
                            <Text className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6 leading-relaxed">
                                {currentCard.definition}
                            </Text>

                            <View className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl w-full border-l-4 border-blue-400">
                                <Text className="text-xs text-slate-400 font-bold uppercase mb-1">
                                    {t.vocabulary.example}
                                </Text>
                                <Text className="text-slate-600 dark:text-slate-300 italic text-lg">
                                    "{currentCard.example}"
                                </Text>
                            </View>
                        </View>
                    )}
                </View>
            </TouchableOpacity>

            {/* Controls */}
            {isFlipped && (
                <View className="w-full flex-row space-x-4 gap-4 px-4">
                    <TouchableOpacity
                        onPress={() => handleNext('hard')}
                        className="flex-1 py-4 bg-red-100 dark:bg-red-900/30 rounded-2xl items-center border border-red-200 dark:border-red-900"
                    >
                        <Text className="text-red-700 dark:text-red-400 font-bold">{t.vocabulary.srs.hard}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleNext('good')}
                        className="flex-1 py-4 bg-blue-100 dark:bg-blue-900/30 rounded-2xl items-center border border-blue-200 dark:border-blue-900"
                    >
                        <Text className="text-blue-700 dark:text-blue-400 font-bold">{t.vocabulary.srs.good}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleNext('easy')}
                        className="flex-1 py-4 bg-green-100 dark:bg-green-900/30 rounded-2xl items-center border border-green-200 dark:border-green-900"
                    >
                        <Text className="text-green-700 dark:text-green-400 font-bold">{t.vocabulary.srs.easy}</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}
