import { create } from 'zustand';

export interface Keyword {
    word: string;
    score: number; // 0-100
    category: 'green' | 'yellow' | 'red';
}

export interface SessionResult {
    originalTranscript: string;
    correctedTranscript: string;
    keywords: Keyword[];
}

interface VoiceState {
    isRecording: boolean;
    recordingUri: string | null;
    isProcessing: boolean;
    feedback: string | null;
    sessionResult: SessionResult | null;
}

interface VoiceActions {
    startRecordingSession: () => void;
    stopRecordingSession: (uri: string) => void;
    setProcessing: (isProcessing: boolean) => void;
    setFeedback: (feedback: string) => void;
    setSessionResult: (result: SessionResult | null) => void;
    resetSession: () => void;
}

export const useVoiceStore = create<VoiceState & VoiceActions>((set) => ({
    isRecording: false,
    recordingUri: null,
    isProcessing: false,
    feedback: null,
    sessionResult: null,

    startRecordingSession: () => set({ isRecording: true, recordingUri: null, feedback: null, sessionResult: null }),
    stopRecordingSession: (uri) => set({ isRecording: false, recordingUri: uri }),
    setProcessing: (isProcessing) => set({ isProcessing }),
    setFeedback: (feedback) => set({ feedback }),
    setSessionResult: (sessionResult) => set({ sessionResult }),
    resetSession: () => set({ isRecording: false, recordingUri: null, isProcessing: false, feedback: null, sessionResult: null }),
}));
