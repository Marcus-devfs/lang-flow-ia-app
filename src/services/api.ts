import { useUserStore } from '../store/useUserStore';

const API_URL = 'http://localhost:3000';

// Retrieve userId from store (helper)
const getUserId = () => useUserStore.getState().user?.id || 'guest-user';

export const api = {
    interview: {
        start: async (techStack: string, level: string) => {
            try {
                const response = await fetch(`${API_URL}/interview/start`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        userId: getUserId(),
                        techStack,
                        level
                    })
                });
                return await response.json();
            } catch (error) {
                console.error("API Error (Start Interview):", error);
                throw error;
            }
        },
        submitAnswer: async (sessionId: string, questionId: number, transcription: string) => {
            try {
                const response = await fetch(`${API_URL}/interview/answer`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        sessionId,
                        questionId,
                        transcription
                    })
                });
                return await response.json();
            } catch (error) {
                console.error("API Error (Submit Answer):", error);
                throw error;
            }
        }
    }
};
