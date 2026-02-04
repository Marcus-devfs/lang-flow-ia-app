export class InterviewSession {
    constructor(
        public readonly id: string,
        public readonly userId: string,
        public readonly techStack: string,
        public readonly questions: InterviewQuestion[],
        public status: 'IN_PROGRESS' | 'COMPLETED',
        public readonly createdAt: Date,
    ) { }
}

export class InterviewQuestion {
    constructor(
        public readonly id: number,
        public readonly text: string,
        public readonly translation?: string, // Portuguese translation
        public answerAudioUrl?: string,
        public answerText?: string,
        public feedback?: string,
        public score?: number,
    ) { }
}
