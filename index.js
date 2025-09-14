import cron from 'node-cron';
import formData from 'form-data';
import Mailgun from 'mailgun.js';
import { config } from 'dotenv';
import { emailConfig } from './config.js';

// Load environment variables
config();

// Initialize Mailgun
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY || '',
  url: process.env.MAILGUN_URL || 'https://api.mailgun.net'
});

// Function to send email
async function sendWeeklyEmail() {
  // Check if emails are paused
  if (process.env.PAUSE_EMAILS === 'true') {
    console.log('Email sending is paused. Set PAUSE_EMAILS=false to resume.');
    return;
  }

  const now = new Date();
  const sydneyTime = new Intl.DateTimeFormat('en-AU', {
    timeZone: 'Australia/Sydney',
    dateStyle: 'full',
    timeStyle: 'long'
  }).format(now);

  console.log(`Attempting to send email at ${sydneyTime}`);

  try {
    const messageData = {
      from: emailConfig.from,
      to: emailConfig.to,
      subject: emailConfig.getSubject(), // Now calling the function to get dynamic subject
      text: emailConfig.body
    };

    const response = await mg.messages.create(process.env.MAILGUN_DOMAIN, messageData);
    console.log('Email sent successfully:', response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

// Schedule the email to be sent every week
// Format: 'minute hour * * day-of-week'
// Example: '0 9 * * 1' = Every Monday at 9:00 AM
const cronSchedule = process.env.CRON_SCHEDULE || '0 9 * * 1';

// Validate environment variables
if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
  console.error('Missing required environment variables: MAILGUN_API_KEY and MAILGUN_DOMAIN');
  process.exit(1);
}

console.log(`Email scheduler started. Will send emails on schedule: ${cronSchedule} (Sydney time)`);
console.log('From:', emailConfig.from);
console.log('To:', emailConfig.to.join(', '));

// Schedule the cron job with Sydney timezone
cron.schedule(cronSchedule, sendWeeklyEmail, {
  scheduled: true,
  timezone: "Australia/Sydney"
});

// Keep the process running
process.on('SIGINT', () => {
  console.log('Scheduler stopped');
  process.exit(0);
});

// Send a test email on startup if TEST_ON_START is set
if (process.env.TEST_ON_START === 'true') {
  console.log('Sending test email on startup...');
  sendWeeklyEmail();
}