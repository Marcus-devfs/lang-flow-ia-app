import { Module } from '@nestjs/common';
import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';
import { AIModule } from '../ai/ai.module';

@Module({
    imports: [AIModule],
    controllers: [FeedController],
    providers: [FeedService],
})
export class FeedModule { }
