import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Container } from '../src/components/Container';
import { Button } from '../src/components/Button';
import { useUserStore } from '../src/store/useUserStore';
import { PLACEMENT_QUESTIONS, calculateLevel, LEVEL_DESCRIPTIONS } from '../src/data/placementQuestions';
import { Check, X, ChevronRight, Award, RotateCcw, Info } from 'lucide-react-native';
import clsx from 'clsx';

export default function PlacementTestScreen() {
    const router = useRouter();
    const { setEnglishLevel, setHasTakenPlacementTest } = useUserStore();

    // State
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);

    const question = PLACEMENT_QUESTIONS[currentIndex];
    const progress = ((currentIndex + 1) / PLACEMENT_QUESTIONS.length) * 100;

    const handleSelect = (index: number) => {
        if (isAnswered) return;
        setSelectedOption(index);
    };

    const confirmAnswer = () => {
        if (selectedOption === null) return;

        const isCorrect = selectedOption === question.correctAnswer;
        if (isCorrect) setScore(s => s + 1);

        setIsAnswered(true);

        // Wait a bit then move to next or finish
        setTimeout(() => {
            if (currentIndex < PLACEMENT_QUESTIONS.length - 1) {
                setCurrentIndex(prev => prev + 1);
                setSelectedOption(null);
                setIsAnswered(false);
            } else {
                setIsFinished(true);
            }
        }, 1000); // 1s delay to show feedback
    };

    const finishTest = () => {
        const finalLevel = calculateLevel(score);
        setEnglishLevel(finalLevel);
        setHasTakenPlacementTest(true);
        Alert.alert("Profile Updated", `Your English level has been set to ${finalLevel}.`);
        router.back();
    };

    if (isFinished) {
        const finalLevel = calculateLevel(score);
        const levelInfo = LEVEL_DESCRIPTIONS[finalLevel];

        return (
            <Container safe centered>
                <View className="items-center justify-center p-6 w-full">
                    <View className="w-28 h-28 bg-yellow-100 dark:bg-yellow-900/30 rounded-full items-center justify-center mb-6">
                        <Award size={56} className="text-yellow-600 dark:text-yellow-400" />
                    </View>
                    <Text className="text-3xl font-bold text-slate-900 dark:text-white mb-1">Test Complete!</Text>
                    <Text className="text-slate-500 dark:text-slate-400 text-center mb-6">
                        Based on your results, your calculated level is:
                    </Text>

                    <View className="bg-blue-600 w-full py-6 rounded-3xl shadow-lg shadow-blue-300 dark:shadow-blue-900 mb-6 items-center">
                        <Text className="text-6xl font-extrabold text-white text-center mb-2">{finalLevel}</Text>
                        <View className="bg-blue-500 px-4 py-1 rounded-full">
                            <Text className="text-white font-bold text-lg">{levelInfo.title}</Text>
                        </View>
                    </View>

                    <View className="bg-slate-50 dark:bg-slate-800 p-5 rounded-2xl mb-8 w-full border border-slate-100 dark:border-slate-700">
                        <View className="flex-row items-center mb-2 gap-2">
                            <Info size={18} className="text-blue-500" />
                            <Text className="font-bold text-slate-700 dark:text-slate-300">What does {finalLevel} mean?</Text>
                        </View>
                        <Text className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            {levelInfo.description}
                        </Text>
                    </View>

                    <Button
                        label="Save & Continue"
                        onPress={finishTest}
                        size="lg"
                        className="w-full"
                    />
                </View>
            </Container>
        );
    }

    return (
        <Container safe centered={false}>
            <View className="flex-1 px-4 py-6">

                {/* Header */}
                <View className="flex-row items-center justify-between mb-8">
                    <Pressable onPress={() => router.back()} className="p-2">
                        <X size={24} className="text-slate-400" />
                    </Pressable>
                    <View className="flex-1 mx-4 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <View className="h-full bg-blue-600 rounded-full" style={{ width: `${progress}%` }} />
                    </View>
                    <Text className="font-bold text-slate-500 dark:text-slate-400 text-xs w-8 text-right">
                        {currentIndex + 1}/{PLACEMENT_QUESTIONS.length}
                    </Text>
                </View>

                {/* Question */}
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
                    <View className="mb-8">
                        <View className="self-start bg-blue-100 dark:bg-blue-900/40 px-3 py-1 rounded-full mb-4">
                            <Text className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                                Question {currentIndex + 1}
                            </Text>
                        </View>
                        <Text className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                            {question.text}
                        </Text>
                    </View>

                    {/* Options */}
                    <View className="gap-3">
                        {question.options.map((opt, idx) => {
                            const isSelected = selectedOption === idx;
                            const isCorrect = idx === question.correctAnswer;

                            // Feedback styles
                            let borderStyle = "border-slate-200 dark:border-slate-700";
                            let bgStyle = "bg-white dark:bg-slate-800";
                            let textStyle = "text-slate-700 dark:text-slate-200";

                            if (isAnswered) {
                                if (isCorrect) {
                                    borderStyle = "border-green-500 bg-green-50 dark:bg-green-900/20";
                                    textStyle = "text-green-700 dark:text-green-300";
                                } else if (isSelected) {
                                    borderStyle = "border-red-500 bg-red-50 dark:bg-red-900/20";
                                    textStyle = "text-red-700 dark:text-red-300";
                                }
                            } else if (isSelected) {
                                borderStyle = "border-blue-500 bg-blue-50 dark:bg-blue-900/20";
                                textStyle = "text-blue-700 dark:text-blue-300";
                            }

                            return (
                                <Pressable
                                    key={idx}
                                    onPress={() => handleSelect(idx)}
                                    disabled={isAnswered}
                                    className={clsx(
                                        "p-5 rounded-2xl border-2 flex-row items-center",
                                        borderStyle,
                                        bgStyle
                                    )}
                                >
                                    <View className={clsx(
                                        "w-6 h-6 rounded-full border-2 mr-4 items-center justify-center",
                                        isSelected || (isAnswered && isCorrect) ? "border-current" : "border-slate-300 dark:border-slate-600"
                                    )}>
                                        {(isSelected || (isAnswered && isCorrect)) && <View className="w-3 h-3 rounded-full bg-current" />}
                                    </View>
                                    <Text className={clsx("font-bold text-lg flex-1", textStyle)}>
                                        {opt}
                                    </Text>
                                    {isAnswered && isCorrect && <Check size={20} className="text-green-500" />}
                                    {isAnswered && isSelected && !isCorrect && <X size={20} className="text-red-500" />}
                                </Pressable>
                            );
                        })}
                    </View>
                </ScrollView>

                {/* Confirm Button */}
                <View className="pt-4 border-t border-slate-100 dark:border-slate-800">
                    <Button
                        label={isAnswered ? "Next Question" : "Confirm Answer"}
                        onPress={isAnswered ? () => { } : confirmAnswer} // Handled by timeout, but button shows status
                        disabled={selectedOption === null || isAnswered}
                        variant="primary"
                        size="lg"
                        className={isAnswered ? "opacity-0" : "opacity-100"} // Hide button during feedback
                    />
                </View>

            </View>
        </Container>
    );
}
