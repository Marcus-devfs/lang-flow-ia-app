import React, { useState } from 'react';
import { View, Text, TextInput, ActivityIndicator, ScrollView, Alert, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Button } from './Button';
import { VoiceVisualizer } from './VoiceVisualizer';
import { useAudioRecorder } from '../hooks/useAudioRecorder';
import { useTranslation } from '../hooks/useTranslation';
import { CheckCircle, Circle, Edit2, Zap, ArrowRight, Save } from 'lucide-react-native';
import { useUserStore } from '../store/useUserStore';

export function DailyStandup({ onFinish }: { onFinish: () => void }) {
    const [step, setStep] = useState(1);
    const { startRecording, stopRecording, recording, isMocking } = useAudioRecorder();
    const { t } = useTranslation();
    const { techStack } = useUserStore();

    const [transcript, setTranscript] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [feedback, setFeedback] = useState<any>(null);

    const steps = [
        { id: 1, label: t.practice.daily.step1 }, // Record
        { id: 2, label: "Review & Edit" },        // Edit
        { id: 3, label: "AI Coach Code" },        // Feedback
    ];

    const handleStopRecording = async () => {
        await stopRecording();
        // SIMULATE TRANSCRIPTION
        const simulatedText = isMocking
            ? "Yesterday I have finished the header component. Today I doing the footer. No stucks." // Bad English
            : "Yesterday I completed the API integration. Today I am working on the unit tests. I have no blockers.";

        setTranscript(simulatedText);
        setStep(2);
    };

    const toggleRecording = async () => {
        if (recording) {
            await handleStopRecording();
        } else {
            setTranscript('');
            await startRecording();
        }
    };

    const submitForFeedback = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:3000/standup/feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: transcript, techStack })
            });
            const data = await response.json();
            setFeedback(data);
            setStep(3);
        } catch (error) {
            Alert.alert("Error", "Could not get feedback");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1 w-full" keyboardVerticalOffset={100}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between', paddingVertical: 16 }}>

                {/* Progress Steps */}
                <View className="flex-row items-center justify-center space-x-4 mb-6">
                    {steps.map((s) => (
                        <View key={s.id} className="flex-row items-center">
                            {s.id <= step ? (
                                <CheckCircle size={20} className={s.id === step ? "text-blue-500" : "text-green-500"} />
                            ) : (
                                <Circle size={20} className="text-slate-300 dark:text-slate-600" />
                            )}
                            {s.id < 3 && <View className="w-8 h-0.5 bg-slate-200 dark:bg-slate-700 mx-2" />}
                        </View>
                    ))}
                </View>

                {/* Header Text */}
                <View className="items-center px-4 mb-6">
                    <Text className="text-2xl font-bold text-slate-900 dark:text-white text-center">
                        {steps[step - 1].label}
                    </Text>
                    {step === 1 && isMocking && (
                        <Text className="text-xs text-orange-500 font-bold bg-orange-100 px-2 py-1 rounded mt-2">
                            SIMULATOR MODE
                        </Text>
                    )}
                </View>

                {/* Step 1: Record */}
                {step === 1 && (
                    <View className="flex-1 justify-center items-center w-full">
                        <View className="h-48 justify-center items-center w-full mb-8">
                            <VoiceVisualizer isRecording={!!recording} />
                        </View>
                        <View className="w-full px-8">
                            <Button
                                label={recording ? t.practice.btnStop : t.practice.btnStart}
                                variant={recording ? "destructive" : "primary"}
                                onPress={toggleRecording}
                            />
                        </View>
                    </View>
                )}

                {/* Step 2: Edit Transcript */}
                {step === 2 && (
                    <View className="flex-1 px-6 w-full">
                        <Text className="text-slate-500 mb-2">Check your text before submitting:</Text>
                        <TextInput
                            className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl text-slate-900 dark:text-white text-lg h-48 border border-slate-200 dark:border-slate-700"
                            multiline
                            textAlignVertical="top"
                            value={transcript}
                            onChangeText={setTranscript}
                        />
                        <View className="mt-8 gap-4">
                            <Button
                                label={isLoading ? "Analyzing..." : "Get AI Coach Feedback"}
                                onPress={submitForFeedback}
                                disabled={isLoading}
                            />
                            <TouchableOpacity onPress={() => setStep(1)} className="py-3 items-center">
                                <Text className="text-slate-400 font-medium">Record Again</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                {/* Step 3: AI FeedbackResult */}
                {step === 3 && feedback && (
                    <View className="flex-1 px-6 w-full">
                        <View className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm mb-6">
                            <View className="flex-row justify-between items-center mb-4">
                                <Text className="text-slate-500 font-medium">Score</Text>
                                <Text className={`text-2xl font-bold ${feedback.score > 80 ? 'text-green-500' : 'text-orange-500'}`}>
                                    {feedback.score}/100
                                </Text>
                            </View>

                            <Text className="font-bold text-slate-900 dark:text-white mb-2">Better Version:</Text>
                            <View className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-100 dark:border-green-800 mb-4">
                                <Text className="text-green-800 dark:text-green-300 text-lg leading-relaxed">
                                    {feedback.improvedVersion}
                                </Text>
                            </View>

                            {feedback.professionalTips?.length > 0 && (
                                <View className="mt-2">
                                    <View className="flex-row items-center mb-2">
                                        <Zap size={16} className="text-yellow-500 mr-2" />
                                        <Text className="font-bold text-slate-700 dark:text-slate-300">Coach Tips</Text>
                                    </View>
                                    {feedback.professionalTips.map((tip: string, i: number) => (
                                        <Text key={i} className="text-slate-600 dark:text-slate-400 mb-1">• {tip}</Text>
                                    ))}
                                </View>
                            )}
                        </View>

                        <Button label="Finish Practice" onPress={onFinish} />
                    </View>
                )}
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
