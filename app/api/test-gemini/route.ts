import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request: NextRequest) {
    // Check for API key at runtime
    if (!process.env.GEMINI_API_KEY) {
        return NextResponse.json(
            { error: 'GEMINI_API_KEY is not set in environment variables' },
            { status: 500 }
        );
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    try {
        const body = await request.json();
        const { message } = body;

        if (!message) {
            return NextResponse.json(
                { error: 'Message is required' },
                { status: 400 }
            );
        }

        // Initialize Gemini model
        const model = genAI.getGenerativeModel({
            model: 'gemini-2.0-flash-exp'
        });

        // Generate response
        const result = await model.generateContent(message);
        const response = result.response;
        const text = response.text();

        return NextResponse.json({
            success: true,
            response: text,
            model: 'gemini-2.0-flash-exp',
            timestamp: new Date().toISOString(),
        });
    } catch (error: any) {
        console.error('Gemini API Error:', error);

        return NextResponse.json(
            {
                error: 'Failed to get response from Gemini',
                details: error.message,
                stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
            },
            { status: 500 }
        );
    }
}
