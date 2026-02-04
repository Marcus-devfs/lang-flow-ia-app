import { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import { useVoiceStore } from '../store/useVoiceStore';
import { Alert } from 'react-native';

export function useAudioRecorder() {
    const [recording, setRecording] = useState<Audio.Recording | null>(null);
    const [permissionResponse, requestPermission] = Audio.usePermissions();

    const { startRecordingSession, stopRecordingSession } = useVoiceStore();

    async function startRecording() {
        try {
            if (permissionResponse?.status !== 'granted') {
                const resp = await requestPermission();
                if (resp.status !== 'granted') {
                    Alert.alert('Permission required', 'Please grant audio recording permissions.');
                    return;
                }
            }

            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            // High quality recording options
            const { recording } = await Audio.Recording.createAsync(
                Audio.RecordingOptionsPresets.HIGH_QUALITY
            );

            setRecording(recording);
            startRecordingSession();
        } catch (err) {
            console.error('Failed to start recording', err);
            Alert.alert('Error', 'Failed to start recording');
        }
    }

    async function stopRecording() {
        if (!recording) return;

        try {
            await recording.stopAndUnloadAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: false,
            });

            const uri = recording.getURI();
            if (uri) {
                stopRecordingSession(uri);
                setRecording(null);
                return uri;
            }
        } catch (err) {
            console.error('Failed to stop recording', err);
        }
        setRecording(null);
    }

    return {
        recording,
        startRecording,
        stopRecording,
        hasPermission: permissionResponse?.status === 'granted',
    };
}
