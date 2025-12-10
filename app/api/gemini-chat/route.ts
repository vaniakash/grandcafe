import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
    try {
        const { message } = await request.json();

        if (!message) {
            return NextResponse.json(
                { error: 'Message is required' },
                { status: 400 }
            );
        }

        // Initialize Gemini Flash 2.5 model
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        // System context for the cafe
        const context = `You are a helpful AI assistant for a premium cafe. You can help customers with:
- Information about our coffee and menu items
- Opening hours and location
- Recommendations for drinks and food
- Answering questions about our services
- General hospitality and cafe-related queries

Be friendly, professional, and helpful. Keep responses concise and engaging.`;

        const prompt = `${context}\n\nCustomer: ${message}\n\nAssistant:`;

        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        return NextResponse.json({ response: text });
    } catch (error) {
        console.error('Gemini API Error:', error);
        return NextResponse.json(
            { error: 'Failed to generate response', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
