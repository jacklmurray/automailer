// Email configuration - Customize your email content here
export const emailConfig = {
  // Sender email address (must be verified in Mailgun)
  from: 'Jack Murray <jack@codacora.com>',
  
  // Recipients - can be multiple email addresses
  to: [
    'jacklillas@pm.me',
    'sarahlillas@protonmail.com'
  ],
  
  // Email subject line
  subject: `Milla Lillas Booking for Week Starting ${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-AU', {
    timeZone: 'Australia/Sydney',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })}`,
  
  // Email body - plain text
  body: `Hello,

Here's our requests for next week's days and times for Milla Lillas.

Monday - 8.30am-1.30pm
Wednesday - 8.30am-1.30pm

Thanks,
Jack + Sarah
`
};