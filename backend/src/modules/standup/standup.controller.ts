import { Body, Controller, Post } from '@nestjs/common';
import { StandupService } from './standup.service';

@Controller('standup')
export class StandupController {
    constructor(private readonly standupService: StandupService) { }

    @Post('feedback')
    async getFeedback(
        @Body('text') text: string,
        @Body('techStack') techStack: string[]
    ) {
        return this.standupService.getFeedback(text, techStack);
    }
}
