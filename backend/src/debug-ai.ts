import { GoogleGenerativeAI } from '@google/generative-ai';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load .env from backend root
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.error("❌ No GEMINI_API_KEY found in .env");
    process.exit(1);
}

const modelsToTry = [
    "gemini-1.5-flash",
    "gemini-2.5-flash", // User suggestion (likely typo but trying)
    "gemini-2.0-flash",
    "gemini-2.0-flash-exp",
    "gemini-1.5-pro",
    "gemini-pro"
];

async function testModels() {
    const key = apiKey as string;
    console.log(`🔑 Testing API Key: ${key.substring(0, 5)}...`);
    const genAI = new GoogleGenerativeAI(key);

    for (const modelName of modelsToTry) {
        console.log(`\nTesting model: ${modelName}...`);
        try {
            const model = genAI.getGenerativeModel({
                model: modelName,
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 100, // Short test
                }
            });
            const result = await model.generateContent("Hello, are you working?");
            const response = result.response;
            console.log(`✅ SUCCESS! Model '${modelName}' is working.`);
            return;
        } catch (error: any) {
            console.log(`❌ FAILED: ${modelName}`);
            // console.log(`   Error: ${error.message.split('\n')[0]}`);
        }
    }
    console.log("\n❌ All models failed.");
}

testModels();
