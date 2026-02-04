import React from 'react';
import { Text, View, Alert } from 'react-native';
import { Container } from '../../src/components/Container';
import { Button } from '../../src/components/Button';
import { VoiceVisualizer } from '../../src/components/VoiceVisualizer';
import { useAudioRecorder } from '../../src/hooks/useAudioRecorder';
import { useVoiceStore } from '../../src/store/useVoiceStore';
import { useTranslation } from '../../src/hooks/useTranslation';
import { Info } from 'lucide-react-native';

export default function PracticeScreen() {
    const { startRecording, stopRecording, hasPermission } = useAudioRecorder();
    const { isRecording, recordingUri, setProcessing, isProcessing } = useVoiceStore();
    const { t } = useTranslation();

    const handleToggleRecording = async () => {
        if (isRecording) {
            setProcessing(true);
            await stopRecording();
            // Simulate API call
            setTimeout(() => {
                setProcessing(false);
                Alert.alert(t.practice.savedAlertTitle, t.practice.savedAlertMsg);
            }, 1500);
        } else {
            await startRecording();
        }
    };

    return (
        <Container safe centered>
            <View className="flex-1 justify-center items-center w-full space-y-8 gap-8">

                {/* Header & Explanation */}
                <View className="items-center px-4">
                    <Text className="text-3xl font-bold text-slate-900 dark:text-white mb-2 text-center">
                        {t.practice.title}
                    </Text>
                    <View className="flex-row items-start bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl mt-2">
                        <Info size={20} color="#3b82f6" className="mr-2 mt-0.5" />
                        <Text className="text-sm text-slate-600 dark:text-slate-300 flex-1 leading-relaxed">
                            {t.practice.explanation.replace(/\*\*(.*?)\*\*/g, '$1')}
                        </Text>
                    </View>
                </View>

                {/* Visualizer Area */}
                <View className="h-64 justify-center items-center">
                    <Text className="text-slate-500 dark:text-slate-400 mb-6 font-medium">
                        {isRecording ? t.practice.statusListening : t.practice.statusIdle}
                    </Text>
                    <VoiceVisualizer isRecording={isRecording} />
                </View>

                {/* Controls */}
                <View className="w-full px-8">
                    <Button
                        label={isRecording ? t.practice.btnStop : t.practice.btnStart}
                        variant={isRecording ? "destructive" : "primary"}
                        size="lg"
                        onPress={handleToggleRecording}
                        isLoading={isProcessing}
                        disabled={!hasPermission}
                    />
                    {!hasPermission && (
                        <Text className="text-red-500 text-sm text-center mt-2">
                            {t.practice.permRequired}
                        </Text>
                    )}
                </View>

                {recordingUri && !isRecording && (
                    <Text className="text-xs text-slate-400">
                        {t.practice.lastRecording}: ...{recordingUri.slice(-15)}
                    </Text>
                )}
            </View>
        </Container>
    );
}
