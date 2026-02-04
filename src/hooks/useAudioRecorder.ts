import { useState, useRef } from 'react';
import { Audio } from 'expo-av';
import { useVoiceStore } from '../store/useVoiceStore';
import { Alert } from 'react-native';

export function useAudioRecorder() {
    const [recording, setRecording] = useState<Audio.Recording | null>(null);
    const [permissionResponse, requestPermission] = Audio.usePermissions();
    const [isMocking, setIsMocking] = useState(false);

    const { startRecordingSession, stopRecordingSession } = useVoiceStore();

    async function startRecording() {
        try {
            let hasPerm = permissionResponse?.status === 'granted';

            if (!hasPerm) {
                const resp = await requestPermission();
                hasPerm = resp.status === 'granted';
            }

            // SIMULATOR BYPASS: If still no permission and DEV mode, start Mock
            if (!hasPerm && __DEV__) {
                console.warn("Permission denied. Starting MOCK recording for Simulator.");
                setIsMocking(true);
                startRecordingSession();
                return;
            }

            if (!hasPerm) {
                Alert.alert('Permission required', 'Please grant audio recording permissions.');
                return;
            }

            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

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
        // Stop Mock
        if (isMocking) {
            setIsMocking(false);
            const mockUri = 'file:///mock-audio.m4a';
            stopRecordingSession(mockUri);
            return mockUri;
        }

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
        isMocking
    };
}
