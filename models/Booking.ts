import { ObjectId } from 'mongodb';

export interface Booking {
    _id?: ObjectId;
    bookingId: string;
    userName: string;
    userEmail: string;
    phone?: string;
    date: string;
    time: string;
    service?: string;
    notes?: string;
    status: 'confirmed' | 'pending' | 'cancelled';
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateBookingInput {
    userName: string;
    userEmail: string;
    phone?: string;
    date: string;
    time: string;
    service?: string;
    notes?: string;
}

export interface AvailabilityQuery {
    date: string;
    time?: string;
}

// Generate a unique booking ID
export function generateBookingId(): string {
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substring(2, 7);
    return `BK-${timestamp}-${randomStr}`.toUpperCase();
}

// Validate email format
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate date format (YYYY-MM-DD)
export function isValidDate(dateStr: string): boolean {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dateStr)) return false;

    const date = new Date(dateStr);
    return date instanceof Date && !isNaN(date.getTime());
}

// Check if date is in the future
export function isFutureDate(dateStr: string, timeStr?: string): boolean {
    const now = new Date();
    const bookingDate = new Date(dateStr);

    if (timeStr) {
        const [hours, minutes] = timeStr.split(':').map(Number);
        bookingDate.setHours(hours, minutes, 0, 0);
    }

    return bookingDate > now;
}

// Parse common date formats
export function parseUserDate(input: string): string | null {
    // Try to parse various date formats
    const date = new Date(input);
    if (!isNaN(date.getTime())) {
        return date.toISOString().split('T')[0];
    }
    return null;
}

// Format time to 24-hour format
export function normalizeTime(timeStr: string): string {
    // Handle "2 PM", "14:00", "2:30 PM", etc.
    const time = timeStr.trim().toUpperCase();

    // Already in HH:MM format
    if (/^\d{1,2}:\d{2}$/.test(time)) {
        const [hours, minutes] = time.split(':').map(Number);
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }

    // Handle AM/PM format
    const match = time.match(/(\d{1,2})(?::(\d{2}))?\s*(AM|PM)/);
    if (match) {
        let hours = parseInt(match[1]);
        const minutes = match[2] ? parseInt(match[2]) : 0;
        const period = match[3];

        if (period === 'PM' && hours !== 12) hours += 12;
        if (period === 'AM' && hours === 12) hours = 0;

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }

    return timeStr;
}
