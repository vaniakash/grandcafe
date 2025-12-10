import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import { getDatabase } from '@/lib/mongodb';
import { sendUserConfirmationEmail, sendAdminNotificationEmail } from '@/lib/email';
import {
    Booking,
    CreateBookingInput,
    generateBookingId,
    isValidEmail,
    isValidDate,
    isFutureDate,
    normalizeTime,
} from '@/models/Booking';

// Define function declarations for Gemini
const functions = [
    {
        name: 'checkAvailability',
        description: 'Check available time slots for a specific date. Returns list of available times and any existing bookings for that date.',
        parameters: {
            type: SchemaType.OBJECT,
            properties: {
                date: {
                    type: SchemaType.STRING,
                    description: 'Date to check availability for in YYYY-MM-DD format (e.g., 2025-12-15)',
                },
            },
            required: ['date'],
        },
    },
    {
        name: 'createBooking',
        description: 'Create a new booking with user details, date, and time. Only call this after confirming all details with the user.',
        parameters: {
            type: SchemaType.OBJECT,
            properties: {
                userName: {
                    type: SchemaType.STRING,
                    description: 'Full name of the person booking',
                },
                userEmail: {
                    type: SchemaType.STRING,
                    description: 'Email address of the user',
                },
                phone: {
                    type: SchemaType.STRING,
                    description: 'Phone number (optional)',
                },
                date: {
                    type: SchemaType.STRING,
                    description: 'Booking date in YYYY-MM-DD format',
                },
                time: {
                    type: SchemaType.STRING,
                    description: 'Booking time in HH:MM format (24-hour)',
                },
                service: {
                    type: SchemaType.STRING,
                    description: 'Type of service or appointment (optional)',
                },
                notes: {
                    type: SchemaType.STRING,
                    description: 'Any additional notes or requirements (optional)',
                },
            },
            required: ['userName', 'userEmail', 'date', 'time'],
        },
    },
    {
        name: 'getBookingDetails',
        description: 'Retrieve details of a specific booking by booking ID',
        parameters: {
            type: SchemaType.OBJECT,
            properties: {
                bookingId: {
                    type: SchemaType.STRING,
                    description: 'The booking ID to look up',
                },
            },
            required: ['bookingId'],
        },
    },
];

// Function implementations
async function checkAvailability(date: string) {
    try {
        const db = await getDatabase();
        const bookings = await db
            .collection<Booking>('bookings')
            .find({ date, status: { $ne: 'cancelled' } })
            .toArray();

        // Define business hours (9 AM to 5 PM)
        const businessHours = [
            '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
            '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
            '15:00', '15:30', '16:00', '16:30', '17:00',
        ];

        const bookedTimes = bookings.map((b) => b.time);
        const availableTimes = businessHours.filter((time) => !bookedTimes.includes(time));

        return {
            success: true,
            date,
            totalSlots: businessHours.length,
            bookedSlots: bookedTimes.length,
            availableSlots: availableTimes.length,
            availableTimes,
            existingBookings: bookings.map((b) => ({
                time: b.time,
                service: b.service || 'General appointment',
            })),
        };
    } catch (error) {
        return {
            success: false,
            error: `Failed to check availability: ${error}`,
        };
    }
}

async function createBooking(input: CreateBookingInput) {
    try {
        // Validate inputs
        if (!isValidEmail(input.userEmail)) {
            return { success: false, error: 'Invalid email address' };
        }

        if (!isValidDate(input.date)) {
            return { success: false, error: 'Invalid date format. Use YYYY-MM-DD' };
        }

        if (!isFutureDate(input.date, input.time)) {
            return { success: false, error: 'Cannot book appointments in the past' };
        }

        // Check if slot is available
        const db = await getDatabase();
        const existingBooking = await db.collection<Booking>('bookings').findOne({
            date: input.date,
            time: normalizeTime(input.time),
            status: { $ne: 'cancelled' },
        });

        if (existingBooking) {
            return {
                success: false,
                error: `Time slot ${input.time} on ${input.date} is already booked`,
            };
        }

        // Create booking
        const bookingId = generateBookingId();
        const booking: Booking = {
            bookingId,
            userName: input.userName,
            userEmail: input.userEmail,
            phone: input.phone,
            date: input.date,
            time: normalizeTime(input.time),
            service: input.service,
            notes: input.notes,
            status: 'confirmed',
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        await db.collection<Booking>('bookings').insertOne(booking);

        // Send emails
        const emailData = {
            userName: booking.userName,
            userEmail: booking.userEmail,
            phone: booking.phone,
            date: booking.date,
            time: booking.time,
            service: booking.service,
            notes: booking.notes,
            bookingId: booking.bookingId,
        };

        try {
            await Promise.all([
                sendUserConfirmationEmail(emailData),
                sendAdminNotificationEmail(emailData),
            ]);
        } catch (emailError) {
            console.error('Email sending failed:', emailError);
            // Don't fail the booking if email fails
        }

        return {
            success: true,
            bookingId: booking.bookingId,
            message: 'Booking created successfully! Confirmation emails sent.',
            booking: {
                bookingId: booking.bookingId,
                userName: booking.userName,
                date: booking.date,
                time: booking.time,
                service: booking.service,
            },
        };
    } catch (error) {
        return {
            success: false,
            error: `Failed to create booking: ${error}`,
        };
    }
}

async function getBookingDetails(bookingId: string) {
    try {
        const db = await getDatabase();
        const booking = await db.collection<Booking>('bookings').findOne({ bookingId });

        if (!booking) {
            return { success: false, error: 'Booking not found' };
        }

        return {
            success: true,
            booking: {
                bookingId: booking.bookingId,
                userName: booking.userName,
                userEmail: booking.userEmail,
                phone: booking.phone,
                date: booking.date,
                time: booking.time,
                service: booking.service,
                notes: booking.notes,
                status: booking.status,
                createdAt: booking.createdAt,
            },
        };
    } catch (error) {
        return {
            success: false,
            error: `Failed to retrieve booking: ${error}`,
        };
    }
}

// Handle function calls from Gemini
async function handleFunctionCall(functionCall: any) {
    const { name, args } = functionCall;

    switch (name) {
        case 'checkAvailability':
            return await checkAvailability(args.date);
        case 'createBooking':
            return await createBooking(args);
        case 'getBookingDetails':
            return await getBookingDetails(args.bookingId);
        default:
            return { error: 'Unknown function' };
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { message, history = [] } = body;

        if (!message) {
            return NextResponse.json({ error: 'Message is required' }, { status: 400 });
        }

        // Check for API key
        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json(
                { error: 'GEMINI_API_KEY is not configured' },
                { status: 500 }
            );
        }

        // Initialize Gemini at runtime
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

        // Initialize Gemini model with function calling
        const model = genAI.getGenerativeModel({
            model: 'gemini-2.0-flash-exp',
            tools: [{ functionDeclarations: functions as any }],
            systemInstruction: `You are a helpful booking assistant. Your role is to help users book appointments efficiently and professionally.

Guidelines:
- Always be friendly and professional
- Ask for missing information one item at a time
- Confirm all details before creating a booking
- Use the checkAvailability function to show available times
- Use the createBooking function only after confirming all details
- Date format should be YYYY-MM-DD (e.g., 2025-12-15)
- Time should be in 24-hour format HH:MM (e.g., 14:00 for 2 PM)
- Business hours are 9:00 AM to 5:00 PM
- Always provide booking ID after successful booking
- If user asks about existing bookings, use getBookingDetails

Required information for booking:
1. User's full name
2. Email address
3. Preferred date
4. Preferred time
5. Optional: phone number, service type, special notes`,
        });

        // Build conversation history
        const chat = model.startChat({
            history: history.map((msg: any) => ({
                role: msg.role,
                parts: [{ text: msg.content }],
            })),
        });

        // Send message and handle function calling
        let result = await chat.sendMessage(message);
        let response = result.response;

        // Handle function calls
        while (response.candidates?.[0]?.content?.parts?.some((part: any) => part.functionCall)) {
            const functionCalls = response.candidates[0].content.parts.filter(
                (part: any) => part.functionCall
            );

            // Execute all function calls
            const functionResponses = await Promise.all(
                functionCalls.map(async (part: any) => {
                    const functionResult = await handleFunctionCall(part.functionCall);
                    return {
                        functionResponse: {
                            name: part.functionCall.name,
                            response: functionResult,
                        },
                    };
                })
            );

            // Send function results back to Gemini
            result = await chat.sendMessage(functionResponses);
            response = result.response;
        }

        // Extract text response
        const textResponse = response.text();

        return NextResponse.json({
            response: textResponse,
            functionCalls: response.candidates?.[0]?.content?.parts
                ?.filter((part: any) => part.functionCall)
                ?.map((part: any) => part.functionCall.name),
        });
    } catch (error: any) {
        console.error('Gemini API Error:', error);
        return NextResponse.json(
            { error: 'Failed to process request', details: error.message },
            { status: 500 }
        );
    }
}
