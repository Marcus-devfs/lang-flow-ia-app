import { create } from 'zustand';

interface VoiceState {
    isRecording: boolean;
    recordingUri: string | null;
    isProcessing: boolean;
    feedback: string | null;
}

interface VoiceActions {
    startRecordingSession: () => void;
    stopRecordingSession: (uri: string) => void;
    setProcessing: (isProcessing: boolean) => void;
    setFeedback: (feedback: string) => void;
    resetSession: () => void;
}

export const useVoiceStore = create<VoiceState & VoiceActions>((set) => ({
    isRecording: false,
    recordingUri: null,
    isProcessing: false,
    feedback: null,

    startRecordingSession: () => set({ isRecording: true, recordingUri: null, feedback: null }),
    stopRecordingSession: (uri) => set({ isRecording: false, recordingUri: uri }),
    setProcessing: (isProcessing) => set({ isProcessing }),
    setFeedback: (feedback) => set({ feedback }),
    resetSession: () => set({ isRecording: false, recordingUri: null, isProcessing: false, feedback: null }),
}));
