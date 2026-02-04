import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class AIService {
    private genAI: GoogleGenerativeAI;
    private model: any;

    constructor(private configService: ConfigService) {
        const apiKey = this.configService.get<string>('GEMINI_API_KEY');
        if (!apiKey) throw new Error("GEMINI_API_KEY not found in environment variables");
        this.genAI = new GoogleGenerativeAI(apiKey);
        this.model = this.genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 32768,
            }
        });
    }

    async generateFeedback(question: string, userAnswer: string, techStack: string): Promise<{ feedback: string; score: number }> {
        const prompt = `
        Act as a Senior Tech Interviewer in ${techStack}.
        Question: "${question}"
        Candidate Answer: "${userAnswer}"

        Provide:
        1. A concise feedback score (0-100).
        2. A constructive feedback text (max 3 sentences) focusing on technical accuracy and English clarity.

        Format output as JSON: { "score": number, "feedback": "string" }
        `;

        try {
            const result = await this.model.generateContent(prompt);
            const response = result.response;
            const text = response.text();

            // Clean markdown code blocks if present
            const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
            return JSON.parse(cleanJson);
        } catch (error) {
            console.error("AI Generation Error:", error);
            return { score: 0, feedback: "Could not generate feedback at this time." };
        }
    }

    async generateQuestions(techStack: string, level: string, count: number = 3): Promise<{ text: string, translation: string }[]> {
        const prompt = `
        Generate ${count} technical interview questions for a ${level} level Developer specializing in ${techStack}.
        
        Requirements:
        1. Adapt complexity to the level (${level}). For Beginners, keep it simple.
        2. Provide a Portuguese translation for each question.
        
        Return ONLY a JSON array of objects. 
        Format: [{ "text": "Question in English", "translation": "Pergunta em Português" }]
        `;

        try {
            const result = await this.model.generateContent(prompt);
            const response = result.response;
            const text = response.text();

            const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
            return JSON.parse(cleanJson);
        } catch (error) {
            console.error("AI Question Generation Error:", error);
            // Fallback with mock translations
            return [
                { text: `Tell me about a challenging ${techStack} project.`, translation: `Conte-me sobre um projeto desafiador em ${techStack}.` },
                { text: `How do you handle error handling in ${techStack}?`, translation: `Como você lida com tratamento de erros em ${techStack}?` },
                { text: `Describe a situation where you had to learn a tool quickly.`, translation: `Descreva uma situação onde você teve que aprender uma ferramenta rapidamente.` }
            ];
        }
    }
}
