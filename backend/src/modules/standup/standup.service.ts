import { Injectable } from '@nestjs/common';
import { AIService } from '../ai/ai.service';

@Injectable()
export class StandupService {
    constructor(private aiService: AIService) { }

    async getFeedback(text: string, techStack: string[]) {
        return this.aiService.generateStandupFeedback(text, techStack);
    }
}
