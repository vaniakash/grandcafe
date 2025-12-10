import nodemailer from 'nodemailer';

if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
    throw new Error('Please add EMAIL_USER and EMAIL_APP_PASSWORD to .env');
}

// Create reusable transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
    },
});

export interface BookingEmailData {
    userName: string;
    userEmail: string;
    phone?: string;
    date: string;
    time: string;
    service?: string;
    notes?: string;
    bookingId: string;
}

// Send confirmation email to user
export async function sendUserConfirmationEmail(data: BookingEmailData) {
    const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .detail-row { padding: 10px 0; border-bottom: 1px solid #eee; }
          .detail-row:last-child { border-bottom: none; }
          .label { font-weight: bold; color: #667eea; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          .success-icon { font-size: 48px; margin-bottom: 10px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="success-icon">✅</div>
            <h1 style="margin: 0;">Booking Confirmed!</h1>
          </div>
          <div class="content">
            <p>Dear ${data.userName},</p>
            <p>Your booking has been successfully confirmed. Here are your booking details:</p>
            
            <div class="booking-details">
              <div class="detail-row">
                <span class="label">Booking ID:</span> ${data.bookingId}
              </div>
              <div class="detail-row">
                <span class="label">Date:</span> ${data.date}
              </div>
              <div class="detail-row">
                <span class="label">Time:</span> ${data.time}
              </div>
              ${data.service ? `
              <div class="detail-row">
                <span class="label">Service:</span> ${data.service}
              </div>
              ` : ''}
              ${data.phone ? `
              <div class="detail-row">
                <span class="label">Phone:</span> ${data.phone}
              </div>
              ` : ''}
              ${data.notes ? `
              <div class="detail-row">
                <span class="label">Notes:</span> ${data.notes}
              </div>
              ` : ''}
            </div>
            
            <p>We look forward to seeing you!</p>
            <p>If you need to make any changes or have questions, please reply to this email.</p>
          </div>
          <div class="footer">
            <p>This is an automated confirmation email.</p>
            <p>Please do not reply to this email if it was sent from a no-reply address.</p>
          </div>
        </div>
      </body>
    </html>
  `;

    await transporter.sendMail({
        from: `"Booking System" <${process.env.EMAIL_USER}>`,
        to: data.userEmail,
        subject: `Booking Confirmation - ${data.date} at ${data.time}`,
        html: htmlContent,
    });
}

// Send notification email to admin
export async function sendAdminNotificationEmail(data: BookingEmailData) {
    const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .detail-row { padding: 10px 0; border-bottom: 1px solid #eee; }
          .detail-row:last-child { border-bottom: none; }
          .label { font-weight: bold; color: #f5576c; }
          .alert-icon { font-size: 48px; margin-bottom: 10px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="alert-icon">🔔</div>
            <h1 style="margin: 0;">New Booking Received</h1>
          </div>
          <div class="content">
            <p>A new booking has been created:</p>
            
            <div class="booking-details">
              <div class="detail-row">
                <span class="label">Booking ID:</span> ${data.bookingId}
              </div>
              <div class="detail-row">
                <span class="label">Customer Name:</span> ${data.userName}
              </div>
              <div class="detail-row">
                <span class="label">Email:</span> ${data.userEmail}
              </div>
              ${data.phone ? `
              <div class="detail-row">
                <span class="label">Phone:</span> ${data.phone}
              </div>
              ` : ''}
              <div class="detail-row">
                <span class="label">Date:</span> ${data.date}
              </div>
              <div class="detail-row">
                <span class="label">Time:</span> ${data.time}
              </div>
              ${data.service ? `
              <div class="detail-row">
                <span class="label">Service:</span> ${data.service}
              </div>
              ` : ''}
              ${data.notes ? `
              <div class="detail-row">
                <span class="label">Notes:</span> ${data.notes}
              </div>
              ` : ''}
            </div>
            
            <p>Please review and prepare for this appointment.</p>
          </div>
        </div>
      </body>
    </html>
  `;

    await transporter.sendMail({
        from: `"Booking System" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER, // Admin email
        subject: `🔔 New Booking: ${data.userName} - ${data.date} at ${data.time}`,
        html: htmlContent,
    });
}

// Test email connection
export async function testEmailConnection() {
    try {
        await transporter.verify();
        return { success: true, message: 'Email transporter is ready' };
    } catch (error) {
        return { success: false, message: `Email error: ${error}` };
    }
}
