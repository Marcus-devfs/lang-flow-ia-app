import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type InterviewSessionDocument = HydratedDocument<InterviewSessionModel>;

@Schema()
export class InterviewQuestionModel {
    @Prop({ required: true })
    id: number;

    @Prop({ required: true })
    text: string;

    @Prop({ required: false })
    translation: string;

    @Prop()
    answerAudioUrl?: string;

    @Prop()
    answerText?: string;

    @Prop()
    feedback?: string;

    @Prop()
    score?: number;
}

const InterviewQuestionSchema = SchemaFactory.createForClass(InterviewQuestionModel);

@Schema({ collection: 'interview_sessions', timestamps: true })
export class InterviewSessionModel {
    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    techStack: string;

    @Prop({ type: [InterviewQuestionSchema], default: [] })
    questions: InterviewQuestionModel[];

    @Prop({ default: 'IN_PROGRESS' })
    status: string;

    createdAt?: Date;
    updatedAt?: Date;
}

export const InterviewSessionSchema = SchemaFactory.createForClass(InterviewSessionModel);
