import { useVoiceStore, SessionResult } from '../store/useVoiceStore';
import { useGamificationStore } from '../store/useGamificationStore';
import { useUserStore } from '../store/useUserStore';

export function useSessionFeedback() {
    const { setSessionResult, setProcessing } = useVoiceStore();
    const { addVoiceMinutes } = useGamificationStore();
    const { techStack } = useUserStore();

    const analyzeSession = async (uri: string) => {
        setProcessing(true);

        // Simulate API Latency (1.5s)
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Dynamic Mock based on User Stack
        const mainTech = techStack[0] || 'General';
        let mockResult: SessionResult;

        if (mainTech === 'React') {
            mockResult = {
                originalTranscript: "I worked on update the state with hooks yesterday.",
                correctedTranscript: "I worked on updating the state using hooks yesterday.",
                keywords: [
                    { word: "Hooks", score: 92, category: "green" },
                    { word: "State", score: 88, category: "green" },
                    { word: "Updating", score: 65, category: "yellow" },
                ]
            };
        } else {
            mockResult = {
                originalTranscript: "I fix the bug in server yesterday.",
                correctedTranscript: "I fixed the bug on the server yesterday.",
                keywords: [
                    { word: "Fixed", score: 45, category: "red" },
                    { word: "Server", score: 90, category: "green" },
                    { word: "Bug", score: 85, category: "green" },
                ]
            };
        }

        setSessionResult(mockResult);
        addVoiceMinutes(5); // Simulate 5 mins added
        setProcessing(false);
    };

    return { analyzeSession };
}
