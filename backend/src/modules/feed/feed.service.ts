import { Injectable } from '@nestjs/common';
import { AIService } from '../ai/ai.service';

@Injectable()
export class FeedService {
    constructor(private aiService: AIService) { }

    async getPersonalizedFeed(techStack: string[], englishLevel: string) {
        return this.aiService.generateFeed(techStack, englishLevel);
    }
}
