import { Module } from '@nestjs/common';
import { StandupController } from './standup.controller';
import { StandupService } from './standup.service';
import { AIModule } from '../ai/ai.module';

@Module({
    imports: [AIModule],
    controllers: [StandupController],
    providers: [StandupService],
})
export class StandupModule { }
