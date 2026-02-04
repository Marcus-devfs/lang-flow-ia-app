import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Container } from '../src/components/Container';
import { Button } from '../src/components/Button';
import { useUserStore } from '../src/store/useUserStore';
import { Check, ChevronRight, Code, GraduationCap, User } from 'lucide-react-native';

const STEPS = 3;

export default function OnboardingScreen() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const { setUser, setEnglishLevel, setTechStack, completeOnboarding } = useUserStore();

    // Step 2 State
    const [name, setName] = useState('');
    const [level, setLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');

    // Step 3 State
    const [selectedStack, setSelectedStack] = useState<string[]>(['React']);
    const availableStacks = ['React', 'Node', 'TypeScript', 'Python', 'Java', 'AWS', 'Docker', 'Go', 'Flutter', 'Swift'];

    const handleFinish = () => {
        setUser({ id: '1', name: name || 'Developer', email: 'dev@example.com' });
        setEnglishLevel(level);
        setTechStack(selectedStack);
        completeOnboarding();
        router.replace('/(tabs)');
    };

    const nextStep = () => {
        if (step < STEPS) setStep(step + 1);
        else handleFinish();
    };

    const toggleStack = (tech: string) => {
        if (selectedStack.includes(tech)) {
            setSelectedStack(prev => prev.filter(t => t !== tech));
        } else {
            setSelectedStack(prev => [...prev, tech]);
        }
    };

    return (
        <Container safe centered={false}>
            <View className="flex-1 px-6 justify-between py-10">

                {/* Progress Bar */}
                <View className="flex-row gap-2 mb-8">
                    {[1, 2, 3].map(i => (
                        <View key={i} className={`h-1 flex-1 rounded-full ${step >= i ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-700'}`} />
                    ))}
                </View>

                {/* Content */}
                <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>

                    {/* STEP 1: Welcome */}
                    {step === 1 && (
                        <View className="items-center">
                            <View className="w-32 h-32 bg-blue-100 dark:bg-blue-900/30 rounded-full items-center justify-center mb-8">
                                <GraduationCap size={64} className="text-blue-600 dark:text-blue-400" />
                            </View>
                            <Text className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-4">
                                Welcome to LangFlow
                            </Text>
                            <Text className="text-lg text-slate-500 dark:text-slate-400 text-center leading-relaxed">
                                Master English for Engineering through voice practice, smart feedback, and immersive vocabulary.
                            </Text>
                        </View>
                    )}

                    {/* STEP 2: Profile */}
                    {step === 2 && (
                        <View>
                            <Text className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Tell us about you</Text>
                            <Text className="text-slate-500 dark:text-slate-400 mb-8">We'll personalize your challenges.</Text>

                            <View className="mb-6">
                                <Text className="font-bold text-slate-700 dark:text-slate-300 mb-2">Your Name (or Nickname)</Text>
                                <View className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 flex-row items-center">
                                    <User size={20} className="text-slate-400 mr-3" />
                                    <TextInput
                                        value={name}
                                        onChangeText={setName}
                                        placeholder="e.g. Marcus"
                                        placeholderTextColor="#94a3b8"
                                        className="flex-1 text-slate-900 dark:text-white font-medium text-lg"
                                    />
                                </View>
                            </View>

                            <View>
                                <Text className="font-bold text-slate-700 dark:text-slate-300 mb-3">English Level</Text>
                                {['Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
                                    <TouchableOpacity
                                        key={lvl}
                                        onPress={() => setLevel(lvl as any)}
                                        className={`p-4 rounded-xl border mb-3 flex-row items-center justify-between ${level === lvl ? 'bg-blue-50 border-blue-500 dark:bg-blue-900/20 dark:border-blue-500' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'}`}
                                    >
                                        <Text className={`font-bold text-lg ${level === lvl ? 'text-blue-700 dark:text-blue-400' : 'text-slate-600 dark:text-slate-300'}`}>
                                            {lvl}
                                        </Text>
                                        {level === lvl && <Check size={20} className="text-blue-500" />}
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    )}

                    {/* STEP 3: Tech Stack */}
                    {step === 3 && (
                        <View>
                            <Text className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Your Tech Stack</Text>
                            <Text className="text-slate-500 dark:text-slate-400 mb-8">Select technologies you use daily. The AI will tailor interview questions.</Text>

                            <View className="flex-row flex-wrap gap-3">
                                {availableStacks.map((tech) => {
                                    const isSelected = selectedStack.includes(tech);
                                    return (
                                        <TouchableOpacity
                                            key={tech}
                                            onPress={() => toggleStack(tech)}
                                            className={`px-5 py-3 rounded-full border ${isSelected ? 'bg-blue-600 border-blue-600' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'}`}
                                        >
                                            <Text className={`font-bold ${isSelected ? 'text-white' : 'text-slate-600 dark:text-slate-300'}`}>
                                                {tech}
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                })}
                            </View>

                            <View className="mt-8 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-100 dark:border-orange-900/40">
                                <Text className="text-orange-700 dark:text-orange-400 font-bold text-sm">
                                    💡 Tip: Select specific frameworks like React or Node to get more technical questions.
                                </Text>
                            </View>
                        </View>
                    )}

                </ScrollView>

                {/* Footer */}
                <View className="pt-6">
                    <Button
                        label={step === STEPS ? "Start Journey" : "Continue"}
                        icon={ChevronRight}
                        onPress={nextStep}
                        size="lg"
                        disabled={step === 2 && name.length === 0}
                    />
                </View>

            </View>
        </Container>
    );
}
