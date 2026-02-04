import React, { useEffect } from 'react';
import { Text, View, Alert } from 'react-native';
import { Container } from '../../src/components/Container';
import { Button } from '../../src/components/Button';
import { VoiceVisualizer } from '../../src/components/VoiceVisualizer';
import { useAudioRecorder } from '../../src/hooks/useAudioRecorder';
import { useVoiceStore } from '../../src/store/useVoiceStore';

export default function PracticeScreen() {
    const { startRecording, stopRecording, hasPermission } = useAudioRecorder();
    const { isRecording, recordingUri, feedback, setProcessing, isProcessing } = useVoiceStore();

    const handleToggleRecording = async () => {
        if (isRecording) {
            setProcessing(true);
            const uri = await stopRecording();
            // Simulate API call
            setTimeout(() => {
                setProcessing(false);
                // Here you would call the API service with the URI
                Alert.alert('Recording Saved', 'Audio ready for analysis.');
            }, 1500);
        } else {
            await startRecording();
        }
    };

    return (
        <Container safe centered>
            <View className="flex-1 justify-center items-center w-full space-y-12">
                <View className="items-center">
                    <Text className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                        Speaking Practice
                    </Text>
                    <Text className="text-slate-500 dark:text-slate-400">
                        {isRecording ? 'Listening...' : 'Tap below to start speaking'}
                    </Text>
                </View>

                <View className="h-64 justify-center items-center">
                    <VoiceVisualizer isRecording={isRecording} />
                </View>

                <View className="w-full px-8">
                    <Button
                        label={isRecording ? "Stop Recording" : "Start Voice Chat"}
                        variant={isRecording ? "destructive" : "primary"}
                        size="lg"
                        onPress={handleToggleRecording}
                        isLoading={isProcessing}
                        disabled={!hasPermission}
                    />
                    {!hasPermission && (
                        <Text className="text-red-500 text-sm text-center mt-2">
                            Microphone permission required
                        </Text>
                    )}
                </View>

                {recordingUri && !isRecording && (
                    <Text className="text-xs text-slate-400 mt-4">
                        Last recording: ...{recordingUri.slice(-15)}
                    </Text>
                )}
            </View>
        </Container>
    );
}
