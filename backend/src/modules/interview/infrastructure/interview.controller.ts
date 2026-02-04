import { Body, Controller, Post, Put } from '@nestjs/common';
import { InterviewService } from '../application/interview.service';
import { StartInterviewDto, SubmitAnswerDto } from '../application/interview.dto';

@Controller('interview')
export class InterviewController {
    constructor(private readonly interviewService: InterviewService) { }

    @Post('start')
    async startSession(@Body() dto: StartInterviewDto) {
        return this.interviewService.startSession(dto);
    }

    @Put('answer')
    async submitAnswer(@Body() dto: SubmitAnswerDto) {
        return this.interviewService.submitAnswer(dto);
    }
}
