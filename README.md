# 🤖 AI Booking Automation System

> **Intelligent appointment booking powered by Gemini 2.5 Flash**

Transform your booking process with AI-powered conversations. No forms, no complex interfaces - just natural chat that handles everything automatically.

![Gemini AI](https://img.shields.io/badge/Gemini-2.5%20Flash-blue?logo=google)
![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?logo=mongodb)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)

---

## ✨ Features

- 🤖 **AI-Powered Conversations** - Natural language booking using Gemini 2.5 Flash
- 📅 **Smart Availability Checking** - AI automatically queries available time slots
- 💾 **MongoDB Integration** - Persistent booking storage with validation
- 📧 **Automated Emails** - Beautiful HTML confirmations sent instantly
- 🎨 **Modern UI** - Stunning gradient design with smooth animations
- 🔒 **Type Safe** - Full TypeScript implementation
- ⚡ **Real-time** - Instant AI responses and updates

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- MongoDB Atlas account
- Gmail account with App Password
- Google AI (Gemini) API key

### Installation

1. **Clone and install**
   ```bash
   npm install
   ```

2. **Configure environment variables**
   
   Create/update `.env` file:
   ```env
   MONGODB_URI=mongodb+srv://your-connection-string
   EMAIL_USER=your-email@gmail.com
   EMAIL_APP_PASSWORD=your-app-password
   GEMINI_API_KEY=your-gemini-api-key
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open the app**
   ```
   http://localhost:3000
   ```

---

## 📖 Usage

### For End Users

1. Navigate to `http://localhost:3000`
2. Click **"Start Booking Now"**
3. Chat naturally with the AI:
   ```
   "I want to book tomorrow at 2 PM"
   "Check availability for next Monday"
   "Book a consultation for Dec 15 at 3 PM"
   ```
4. Receive instant email confirmation

### Example Conversation

```
You: "What times are available tomorrow?"
AI: "Let me check... Available times: 9:00 AM, 10:00 AM, 11:00 AM..."

You: "I'll take 10 AM"
AI: "Great! May I have your full name?"

You: "John Doe"
AI: "Thank you! What's your email address?"

You: "john@example.com"
AI: "Perfect! Confirming your booking for [date] at 10:00 AM..."
AI: "✅ Booking confirmed! Booking ID: BK-123ABC"
```

---

## 🏗️ Architecture

```
┌─────────────┐
│   User      │
│   Chat      │
└──────┬──────┘
       │
       ▼
┌─────────────────────┐
│   Next.js Frontend  │
│   (React + TS)      │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  API Route Handler  │
│  /api/gemini-booking│
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐     ┌──────────────┐
│  Gemini 2.5 Flash   │────▶│  Functions   │
│  (AI Orchestrator)  │     │  - Check     │
└─────────────────────┘     │  - Create    │
                            │  - Get       │
                            └──────┬───────┘
                                   │
                    ┌──────────────┴──────────────┐
                    ▼                             ▼
            ┌───────────────┐          ┌─────────────────┐
            │   MongoDB     │          │  Email Service  │
            │   Database    │          │  (Nodemailer)   │
            └───────────────┘          └─────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **TailwindCSS 4** - Styling
- **React Hooks** - State management

### Backend
- **Gemini 2.5 Flash** - AI conversations & function calling
- **MongoDB Atlas** - Cloud database
- **Nodemailer** - Email delivery
- **Next.js API Routes** - Serverless functions

### DevOps
- **Git** - Version control
- **ESLint** - Code quality
- **npm** - Package management

---

## 📁 Project Structure

```
automationone/
├── app/
│   ├── api/
│   │   ├── gemini-booking/
│   │   │   └── route.ts          # Main AI endpoint
│   │   └── bookings/
│   │       └── route.ts          # CRUD operations
│   ├── booking/
│   │   └── page.tsx              # Chat interface
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   └── globals.css               # Global styles
├── lib/
│   ├── mongodb.ts                # DB connection utility
│   └── email.ts                  # Email service
├── models/
│   └── Booking.ts                # TypeScript types
├── .env                          # Environment variables
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript config
├── README.md                     # This file
└── QUICK_START.md                # Detailed guide
```

---

## 🎯 Key Features Explained

### 1. Gemini Function Calling

The AI can automatically execute three functions:

#### `checkAvailability(date)`
Queries MongoDB for existing bookings and returns available time slots.

```typescript
// Example function call by AI
{
  name: "checkAvailability",
  args: { date: "2025-12-15" }
}
```

#### `createBooking(userData)`
Validates data and creates a new booking in MongoDB.

```typescript
{
  name: "createBooking",
  args: {
    userName: "John Doe",
    userEmail: "john@example.com",
    date: "2025-12-15",
    time: "14:00"
  }
}
```

#### `getBookingDetails(bookingId)`
Retrieves booking information by ID.

---

### 2. Email Templates

Beautiful HTML emails with gradient designs:

- **User Confirmation** - Purple gradient with booking details
- **Admin Notification** - Pink gradient with customer info

Both include:
- Booking ID
- Date and time
- Customer information
- Service details
- Special notes

---

### 3. Smart Date/Time Handling

AI understands natural language:
- "tomorrow" → calculates date
- "2 PM" → converts to 24-hour format
- "next Monday" → determines date
- "December 15" → formats to YYYY-MM-DD

---

## 🧪 Testing

### Manual Testing

1. **Check availability**
   ```
   "What times are available tomorrow?"
   ```

2. **Book appointment**
   ```
   "Book for [date] at [time]"
   ```

3. **Verify emails**
   - Check user inbox
   - Check admin inbox

### API Testing

```bash
# Test Gemini endpoint
curl -X POST http://localhost:3000/api/gemini-booking \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Check availability for 2025-12-15"
  }'

# Get all bookings
curl http://localhost:3000/api/bookings
```

---

## 🔒 Security

- ✅ API keys stored in `.env` (server-side only)
- ✅ Input validation (email, date formats)
- ✅ MongoDB parameterized queries
- ✅ Past date rejection
- ✅ Duplicate booking prevention

---

## 📧 Email Configuration

### Gmail Setup

1. Enable 2-factor authentication
2. Generate App Password:
   - Google Account → Security → 2-Step Verification → App passwords
3. Use the 16-character password in `.env`

### Troubleshooting Emails

- Check spam folder
- Verify EMAIL_USER and EMAIL_APP_PASSWORD
- Ensure Gmail account is active
- Test with: `await testEmailConnection()`

---

## 🎨 Customization

### Business Hours

Edit in `app/api/gemini-booking/route.ts`:

```typescript
const businessHours = [
  '09:00', '09:30', '10:00', ... '17:00'
];
```

### Email Templates

Modify HTML in `lib/email.ts`:

```typescript
const htmlContent = `
  <!DOCTYPE html>
  <html>
    <!-- Your custom template -->
  </html>
`;
```

### AI Instructions

Update system prompt in `app/api/gemini-booking/route.ts`:

```typescript
systemInstruction: `
  You are a helpful booking assistant...
  [Add your custom instructions]
`
```

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
```

### Environment Variables Required
- `MONGODB_URI`
- `EMAIL_USER`
- `EMAIL_APP_PASSWORD`
- `GEMINI_API_KEY`

---

## 📊 Database Schema

### Bookings Collection

```typescript
interface Booking {
  _id?: ObjectId;
  bookingId: string;          // BK-XXXXX
  userName: string;
  userEmail: string;
  phone?: string;
  date: string;               // YYYY-MM-DD
  time: string;               // HH:MM
  service?: string;
  notes?: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📝 License

MIT License - feel free to use this for your projects!

---

## 🆘 Support

### Common Issues

**Q: AI not responding?**  
A: Check Gemini API key and internet connection

**Q: Emails not sending?**  
A: Verify Gmail app password and EMAIL_* variables

**Q: MongoDB connection failed?**  
A: Check MONGODB_URI and IP whitelist

**Q: Build errors?**  
A: Run `npm install` and check Node.js version (18+ required)

---

## 🌟 Credits

Built with:
- [Gemini AI](https://ai.google.dev/) - Google's AI
- [Next.js](https://nextjs.org/) - React framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Nodemailer](https://nodemailer.com/) - Email service

---

## 📚 Documentation

- [Quick Start Guide](./QUICK_START.md) - Detailed setup and testing
- [API Documentation](./docs/API.md) - Endpoint reference
- [Architecture Guide](./docs/ARCHITECTURE.md) - System design

---

**Made with ❤️ using Gemini AI**

**Questions?** Open an issue or contact: akashrana49927@gmail.com

---

**🎉 Ready to revolutionize your booking process? Get started now!**

```bash
npm install
npm run dev
```

Visit: http://localhost:3000 🚀
