import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { Booking } from '@/models/Booking';

// GET - Fetch all bookings
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const date = searchParams.get('date');
        const status = searchParams.get('status');

        const db = await getDatabase();
        const query: any = {};

        if (date) query.date = date;
        if (status) query.status = status;

        const bookings = await db
            .collection<Booking>('bookings')
            .find(query)
            .sort({ date: -1, time: -1 })
            .toArray();

        return NextResponse.json({
            success: true,
            count: bookings.length,
            bookings,
        });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}

// POST - Create booking manually (alternative to Gemini)
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { userName, userEmail, phone, date, time, service, notes } = body;

        if (!userName || !userEmail || !date || !time) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const db = await getDatabase();
        const booking: Booking = {
            bookingId: `BK-${Date.now()}`,
            userName,
            userEmail,
            phone,
            date,
            time,
            service,
            notes,
            status: 'confirmed',
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        await db.collection<Booking>('bookings').insertOne(booking);

        return NextResponse.json({
            success: true,
            booking,
        });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
