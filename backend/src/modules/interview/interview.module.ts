import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InterviewSessionModel, InterviewSessionSchema } from './infrastructure/interview-session.schema';
import { InterviewController } from './infrastructure/interview.controller';
import { InterviewService } from './application/interview.service';
import { AIModule } from '../ai/ai.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: InterviewSessionModel.name, schema: InterviewSessionSchema }]),
        AIModule,
    ],
    controllers: [InterviewController],
    providers: [InterviewService],
})
export class InterviewModule { }
