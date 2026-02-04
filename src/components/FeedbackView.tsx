import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useVoiceStore } from '../store/useVoiceStore';
import { useTranslation } from '../hooks/useTranslation';
import { useVocabularyStore } from '../store/useVocabularyStore';
import { Check, Plus, Volume2, StopCircle } from 'lucide-react-native';
import { Button } from './Button';
import { useTextToSpeech } from '../hooks/useTextToSpeech';

export function FeedbackView({ onContinue }: { onContinue: () => void }) {
    const { sessionResult } = useVoiceStore();
    const { t } = useTranslation();
    const { addCard } = useVocabularyStore();
    const { speak, stop, isSpeaking } = useTextToSpeech();
    const [savedWords, setSavedWords] = React.useState<string[]>([]);

    if (!sessionResult) return null;

    const handleSave = (word: string) => {
        addCard({
            term: word,
            definition: `Definition for ${word} (Auto-generated)`,
            example: `Example usage of ${word}`,
        });
        setSavedWords(prev => [...prev, word]);
    };

    return (
        <ScrollView className="flex-1 w-full" showsVerticalScrollIndicator={false}>
            {/* Header */}
            <Text className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
                {t.practice.feedback.title}
            </Text>

            {/* Transcription Analysis */}
            <View className="bg-white dark:bg-slate-800 p-5 rounded-2xl mb-6 border border-slate-100 dark:border-slate-700">
                <Text className="text-xs font-bold text-slate-500 uppercase mb-2">
                    {t.practice.feedback.original}
                </Text>
                <Text className="text-slate-600 dark:text-slate-300 text-base mb-4 italic">
                    "{sessionResult.originalTranscript}"
                </Text>

                <View className="h-[1px] bg-slate-100 dark:bg-slate-700 mb-4" />

                <View className="flex-row justify-between items-center mb-2">
                    <Text className="text-xs font-bold text-green-600 uppercase">
                        {t.practice.feedback.corrected}
                    </Text>
                    <TouchableOpacity onPress={() => isSpeaking ? stop() : speak(sessionResult.correctedTranscript)}>
                        {isSpeaking ? <StopCircle size={16} className="text-green-600" /> : <Volume2 size={16} className="text-green-600" />}
                    </TouchableOpacity>
                </View>
                <Text className="text-slate-800 dark:text-green-400 text-base font-medium">
                    "{sessionResult.correctedTranscript}"
                </Text>
            </View>

            {/* Key Words & Pronunciation */}
            <View className="mb-6">
                <Text className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                    {t.practice.feedback.pronunciation}
                </Text>

                <View className="flex-row flex-wrap gap-3">
                    {sessionResult.keywords.map((kw, index) => {
                        const isSaved = savedWords.includes(kw.word);
                        let scoreColor = 'bg-slate-100 text-slate-700 border-slate-200';
                        if (kw.category === 'green') scoreColor = 'bg-green-100 text-green-800 border-green-200';
                        if (kw.category === 'yellow') scoreColor = 'bg-yellow-100 text-yellow-800 border-yellow-200';
                        if (kw.category === 'red') scoreColor = 'bg-red-100 text-red-800 border-red-200';

                        // Extract usage for dynamic styles (simplified)
                        const borderColor = scoreColor.split(' ').find(c => c.startsWith('border-')) || 'border-slate-200';
                        const textColor = scoreColor.split(' ').find(c => c.startsWith('text-')) || 'text-slate-700';

                        return (
                            <View key={index} className="flex-grow bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-100 dark:border-slate-700 flex-row justify-between items-center">
                                <View>
                                    <Text className="text-lg font-bold text-slate-900 dark:text-white">{kw.word}</Text>
                                    <View className={`self-start px-2 py-0.5 rounded mt-1 border ${borderColor} ${scoreColor.split(' ')[0]}`}>
                                        <Text className={`text-xs font-bold ${textColor}`}>
                                            {kw.score}% Score
                                        </Text>
                                    </View>
                                </View>

                                <TouchableOpacity
                                    onPress={() => handleSave(kw.word)}
                                    disabled={isSaved}
                                    className={`p-2 rounded-full ${isSaved ? 'bg-green-500' : 'bg-slate-100 dark:bg-slate-700'}`}
                                >
                                    {isSaved ? <Check size={16} color="white" /> : <Plus size={16} className="text-slate-600 dark:text-slate-300" />}
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                </View>
            </View>

            <Button label={t.practice.feedback.continue} onPress={onContinue} size="lg" className="mb-8" />
        </ScrollView>
    );
}
