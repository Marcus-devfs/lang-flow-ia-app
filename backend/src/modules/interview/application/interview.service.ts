import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InterviewSessionModel } from '../infrastructure/interview-session.schema';
import { StartInterviewDto, SubmitAnswerDto } from './interview.dto';
import { InterviewSession } from '../domain/interview-session.entity';

import { AIService } from '../../ai/ai.service';

@Injectable()
export class InterviewService {
    constructor(
        @InjectModel(InterviewSessionModel.name)
        private sessionModel: Model<InterviewSessionModel>,
        private aiService: AIService,
    ) { }

    async startSession(dto: StartInterviewDto): Promise<InterviewSession> {
        // Generate dynamic questions using Gemini
        const questionsData = await this.aiService.generateQuestions(dto.techStack, dto.level, 3);

        const questions = questionsData.map((item, index) => ({
            id: index + 1,
            text: item.text,
            translation: item.translation
        }));

        const createdSession = new this.sessionModel({
            userId: dto.userId,
            techStack: dto.techStack,
            questions: questions,
            status: 'IN_PROGRESS',
        });

        const doc = await createdSession.save();

        // Map to Domain Entity
        return new InterviewSession(
            doc._id.toString(),
            doc.userId,
            doc.techStack,
            doc.questions,
            doc.status as any,
            doc.createdAt as any // Mongoose timestamps
        );
    }

    async submitAnswer(dto: SubmitAnswerDto): Promise<InterviewSession> {
        const session = await this.sessionModel.findById(dto.sessionId);
        if (!session) throw new NotFoundException('Session not found');

        const questionIndex = session.questions.findIndex(q => q.id === dto.questionId);
        if (questionIndex === -1) throw new NotFoundException('Question not found');

        const question = session.questions[questionIndex];

        // Update answer
        session.questions[questionIndex].answerText = dto.transcription || "Audio processed";
        session.questions[questionIndex].answerAudioUrl = dto.audioUrl;

        // Generate AI Feedback via Gemini
        const feedbackResult = await this.aiService.generateFeedback(
            question.text,
            session.questions[questionIndex].answerText!,
            session.techStack
        );

        session.questions[questionIndex].feedback = feedbackResult.feedback;
        session.questions[questionIndex].score = feedbackResult.score;

        // Mark Modified for Mongoose Array updates
        session.markModified('questions');

        const updatedDoc = await session.save();

        return new InterviewSession(
            updatedDoc._id.toString(),
            updatedDoc.userId,
            updatedDoc.techStack,
            updatedDoc.questions,
            updatedDoc.status as any,
            updatedDoc.createdAt as any
        );
    }
}
