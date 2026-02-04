
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { Button } from './Button';
import { VoiceVisualizer } from './VoiceVisualizer';
import { useAudioRecorder } from '../hooks/useAudioRecorder';
import { useTranslation } from '../hooks/useTranslation';
import { useUserStore } from '../store/useUserStore';
import { Briefcase, Volume2, StopCircle, Languages } from 'lucide-react-native';
import { useTextToSpeech } from '../hooks/useTextToSpeech';
import { api } from '../services/api';
import { FeedbackView } from './FeedbackView';

export function JobInterview({ onFinish }: { onFinish: () => void }) {
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [questions, setQuestions] = useState<any[]>([]);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [processingFeedback, setProcessingFeedback] = useState(false);
    const [currentFeedback, setCurrentFeedback] = useState<{ score: number, feedback: string } | null>(null);
    const [showTranslation, setShowTranslation] = useState(false);

    const { startRecording, stopRecording, recording, isMocking } = useAudioRecorder();
    const { t } = useTranslation();
    const { techStack, englishLevel } = useUserStore();
    const { speak, stop: stopSpeaking, isSpeaking } = useTextToSpeech();

    const mainTech = techStack[0] || 'General';

    useEffect(() => {
        startInterview();
    }, []);

    const startInterview = async () => {
        try {
            setLoading(true);
            const session = await api.interview.start(mainTech, englishLevel);
            setSessionId(session.id);
            setQuestions(session.questions);
            setLoading(false);

            // Speak first question automatically? Maybe optional.
        } catch (error) {
            Alert.alert("Error", "Could not start interview session.");
            onFinish();
        }
    };

    const currentQuestion = questions[questionIndex];

    const handleNext = () => {
        setCurrentFeedback(null);
        setShowTranslation(false);
        if (questionIndex < questions.length - 1) {
            setQuestionIndex(prev => prev + 1);
        } else {
            onFinish();
        }
    };

    const handleStopRecording = async () => {
        if (!sessionId || !currentQuestion) return;

        await stopRecording();
        setProcessingFeedback(true);

        try {
            // Simulate transcription for now since we don't have Whisper yet
            const mockTranscription = "I used React Context API to manage global state because it was a small application.";

            const result = await api.interview.submitAnswer(sessionId, currentQuestion.id, mockTranscription);

            // Find the updated question in the result
            const updatedQuestion = result.questions.find((q: any) => q.id === currentQuestion.id);
            if (updatedQuestion && updatedQuestion.feedback) {
                setCurrentFeedback({
                    score: updatedQuestion.score,
                    feedback: updatedQuestion.feedback
                });
            }
        } catch (error) {
            Alert.alert("Error", "Failed to submit answer.");
        } finally {
            setProcessingFeedback(false);
        }
    };

    const toggleRecording = async () => {
        stopSpeaking();
        if (recording) {
            await handleStopRecording();
        } else {
            setCurrentFeedback(null);
            await startRecording();
        }
    };

    const toggleSpeech = () => {
        if (isSpeaking) {
            stopSpeaking();
        } else {
            speak(currentQuestion.text);
        }
    };

    if (loading) {
        return (
            <View className="flex-1 items-center justify-center">
                <ActivityIndicator size="large" color="#4F46E5" />
                <Text className="mt-4 text-slate-500 font-medium">Generating Interview Questions...</Text>
            </View>
        );
    }

    if (currentFeedback) {
        return (
            <FeedbackView
                score={currentFeedback.score}
                feedback={currentFeedback.feedback}
                onNext={handleNext}
                isLast={questionIndex === questions.length - 1}
            />
        );
    }

    return (
        <View className="flex-1 w-full items-center justify-between py-4">

            {/* Header */}
            <View className="items-center mb-6 px-4">
                <View className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-full mb-4">
                    <Briefcase size={32} className="text-purple-600 dark:text-purple-400" />
                </View>
                <Text className="text-sm font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest mb-2">
                    {t.practice.interview.question} {questionIndex + 1} / {questions.length}
                </Text>

                <ScrollView
                    className="w-full max-h-64 mb-4 bg-white/50 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-100 dark:border-slate-700"
                    contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
                    showsVerticalScrollIndicator={true}
                >
                    <Text className="text-2xl font-bold text-slate-900 dark:text-white text-center leading-relaxed">
                        "{showTranslation && currentQuestion?.translation ? currentQuestion.translation : currentQuestion?.text}"
                    </Text>
                </ScrollView>

                <View className="flex-row gap-4 mb-2">
                    <TouchableOpacity
                        onPress={() => setShowTranslation(!showTranslation)}
                        className={`flex-row items-center px-4 py-2 rounded-full border ${showTranslation ? 'bg-purple-100 border-purple-200' : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700'}`}
                    >
                        <Languages size={18} className={showTranslation ? "text-purple-600" : "text-slate-500"} />
                        <Text className={`ml-2 font-bold ${showTranslation ? "text-purple-600" : "text-slate-500"}`}>
                            {showTranslation ? "Original" : "Translate"}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={toggleSpeech}
                        className="flex-row items-center px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700"
                    >
                        {isSpeaking ? (
                            <StopCircle size={18} className="text-red-500 mr-2" />
                        ) : (
                            <Volume2 size={18} className="text-blue-500 mr-2" />
                        )}
                        <Text className={`font-bold ${isSpeaking ? 'text-red-500' : 'text-blue-500'} `}>
                            {isSpeaking ? "Stop" : "Listen"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View className="flex-1 w-full items-center justify-center">
                {/* Visualizer */}
                <View className="h-48 justify-center items-center w-full relative">
                    {isMocking && (
                        <View className="absolute top-0 bg-orange-100 px-2 py-1 rounded">
                            <Text className="text-xs text-orange-600 font-bold">SIMULATOR MODE</Text>
                        </View>
                    )}

                    {processingFeedback ? (
                        <View className="items-center">
                            <ActivityIndicator className="mb-2" color="#4F46E5" />
                            <Text className="text-slate-500 font-medium">Analyzing Answer...</Text>
                        </View>
                    ) : (
                        <>
                            <VoiceVisualizer isRecording={!!recording} />
                            <Text className="text-slate-400 text-sm font-medium mt-4">
                                {recording ? "Recording Answer..." : "Tap Start to Answer"}
                            </Text>
                        </>
                    )}
                </View>

                {/* Controls */}
                <View className="w-full px-8 space-y-4 gap-3">
                    <Button
                        label={recording ? t.practice.btnStop : t.practice.btnStart}
                        variant={recording ? "destructive" : "primary"}
                        onPress={toggleRecording}
                        disabled={processingFeedback}
                    />
                </View>
            </View>

        </View>
    );
}
