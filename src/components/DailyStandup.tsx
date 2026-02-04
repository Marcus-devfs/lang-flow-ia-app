import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Button } from './Button';
import { VoiceVisualizer } from './VoiceVisualizer';
import { useAudioRecorder } from '../hooks/useAudioRecorder';
import { useTranslation } from '../hooks/useTranslation';
import { CheckCircle, Circle } from 'lucide-react-native';

export function DailyStandup({ onFinish }: { onFinish: () => void }) {
    const [step, setStep] = useState(1);
    const { startRecording, stopRecording, recording, isMocking } = useAudioRecorder();
    const { t } = useTranslation();

    const steps = [
        { id: 1, label: t.practice.daily.step1 },
        { id: 2, label: t.practice.daily.step2 },
        { id: 3, label: t.practice.daily.step3 },
    ];

    const handleNext = async () => {
        if (recording) {
            await stopRecording();
        }

        if (step < 3) {
            setStep(step + 1);
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

            {/* Progress Steps */}
            <View className="flex-row items-center justify-center space-x-4 mb-8">
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

            {/* Question */}
            <View className="items-center px-4">
                <Text className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-4">
                    {steps[step - 1].label}
                </Text>
                {isMocking && (
                    <Text className="text-xs text-orange-500 font-bold bg-orange-100 px-2 py-1 rounded mb-2">
                        SIMULATOR MODE (MOCK)
                    </Text>
                )}
            </View>

            {/* Visualizer */}
            <View className="h-48 justify-center items-center w-full">
                <VoiceVisualizer isRecording={!!recording} />
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
                        label={step === 3 ? t.practice.daily.finish : t.practice.daily.next}
                        variant="secondary"
                        onPress={handleNext}
                    />
                )}
            </View>

        </View>
    );
}
