import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Button } from './Button';
import { VoiceVisualizer } from './VoiceVisualizer';
import { useAudioRecorder } from '../hooks/useAudioRecorder';
import { useTranslation } from '../hooks/useTranslation';
import { useUserStore } from '../store/useUserStore';
import { Briefcase } from 'lucide-react-native';

export function JobInterview({ onFinish }: { onFinish: () => void }) {
    const [questionIndex, setQuestionIndex] = useState(0);
    const { startRecording, stopRecording, recording, isMocking } = useAudioRecorder();
    const { t } = useTranslation();
    const { techStack } = useUserStore();

    const mainTech = techStack[0] || 'General';

    const questions = [
        { id: 1, text: "Tell me about a challenging project you worked on recently." },
        { id: 2, text: `How do you handle state management in ${mainTech}?` },
        { id: 3, text: "Explain a time you disagreed with a coworker's technical decision." },
    ];

    const currentQuestion = questions[questionIndex];

    const handleNext = async () => {
        if (recording) {
            await stopRecording();
        }

        if (questionIndex < questions.length - 1) {
            setQuestionIndex(prev => prev + 1);
        } else {
            onFinish();
        }
    };

    const toggleRecording = async () => {
        if (recording) {
            await stopRecording();
        } else {
            await startRecording();
        }
    };

    return (
        <View className="flex-1 w-full items-center justify-between py-4">

            {/* Header */}
            <View className="items-center mb-6">
                <View className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-full mb-4">
                    <Briefcase size={32} className="text-purple-600 dark:text-purple-400" />
                </View>
                <Text className="text-sm font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest mb-2">
                    {t.practice.interview.question} {questionIndex + 1} / {questions.length}
                </Text>
                <Text className="text-2xl font-bold text-slate-900 dark:text-white text-center px-4 leading-relaxed">
                    "{currentQuestion.text}"
                </Text>
            </View>

            {/* Visualizer */}
            <View className="h-48 justify-center items-center w-full relative">
                {isMocking && (
                    <View className="absolute top-0 bg-orange-100 px-2 py-1 rounded">
                        <Text className="text-xs text-orange-600 font-bold">SIMULATOR MODE</Text>
                    </View>
                )}
                <VoiceVisualizer isRecording={!!recording} />
                <Text className="text-slate-400 text-sm font-medium mt-4">
                    {recording ? "Recording Answer..." : "Tap Start to Answer"}
                </Text>
            </View>

            {/* Controls */}
            <View className="w-full px-8 space-y-4 gap-3">
                <Button
                    label={recording ? t.practice.btnStop : t.practice.btnStart}
                    variant={recording ? "destructive" : "primary"}
                    onPress={toggleRecording}
                />

                {!recording && (
                    <Button
                        label={questionIndex === questions.length - 1 ? t.practice.interview.finish : t.practice.interview.nextQuestion}
                        variant="secondary"
                        onPress={handleNext}
                    />
                )}
            </View>

        </View>
    );
}
