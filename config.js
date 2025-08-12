// Email configuration - Customize your email content here
export const emailConfig = {
  // Sender email address (must be verified in Mailgun)
  from: 'Weekly Updates <noreply@yourdomain.com>',
  
  // Recipients - can be multiple email addresses
  to: [
    'recipient@example.com'
  ],
  
  // Email subject line
  subject: 'Weekly Update - ' + new Date().toLocaleDateString('en-AU', { 
    timeZone: 'Australia/Sydney',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }),
  
  // Email body - plain text
  body: `Hello,

This is your weekly update email.

Here's what happened this week:
- Item 1
- Item 2
- Item 3

Have a great week ahead!

Best regards,
Your Automated Assistant

---
This email was sent automatically from Sydney, Australia.
To unsubscribe or modify this service, please contact the administrator.`
};