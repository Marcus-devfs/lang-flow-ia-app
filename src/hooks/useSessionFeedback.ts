import { useVoiceStore, SessionResult } from '../store/useVoiceStore';
import { useGamificationStore } from '../store/useGamificationStore';

export function useSessionFeedback() {
    const { setSessionResult, setProcessing } = useVoiceStore();
    const { addVoiceMinutes } = useGamificationStore();

    const analyzeSession = async (uri: string) => {
        setProcessing(true);

        // Simulate API Latency
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Mock Response
        const mockResult: SessionResult = {
            originalTranscript: "I use React for build interfaces and it is very good tool.",
            correctedTranscript: "I use React to build interfaces and it is a very good tool.",
            keywords: [
                { word: "React", score: 95, category: "green" },
                { word: "Interfaces", score: 88, category: "green" },
                { word: "Tool", score: 72, category: "yellow" },
                { word: "Build", score: 45, category: "red" },
            ]
        };

        setSessionResult(mockResult);
        addVoiceMinutes(5); // Simulate 5 mins added
        setProcessing(false);
    };

    return { analyzeSession };
}
