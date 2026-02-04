import { Body, Controller, Post } from '@nestjs/common';
import { FeedService } from './feed.service';

@Controller('feed')
export class FeedController {
    constructor(private readonly feedService: FeedService) { }

    @Post('personalized')
    async getPersonalizedFeed(
        @Body('techStack') techStack: string[],
        @Body('englishLevel') englishLevel: string
    ) {
        return this.feedService.getPersonalizedFeed(techStack, englishLevel);
    }
}
