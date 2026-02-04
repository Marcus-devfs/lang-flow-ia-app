export class StartInterviewDto {
    userId: string;
    techStack: string; // e.g., "React", "Node.js"
    level: string; // "B1", "C1"
}

export class SubmitAnswerDto {
    sessionId: string;
    questionId: number;
    audioUrl?: string; // For now simulate with text or mock URL
    transcription?: string; // Text answer
}
