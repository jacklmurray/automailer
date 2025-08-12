# Automailer - Weekly Email Automation

A simple Node.js application that sends automated emails once per week using Mailgun, scheduled for Sydney, Australia timezone.

## Features

- Sends plain text emails automatically once per week
- Configurable day and time (Sydney timezone)
- Easy email content customization
- Mailgun integration for reliable delivery
- Lightweight and simple to deploy

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Mailgun

1. Sign up for a [Mailgun account](https://www.mailgun.com/)
2. Verify your domain or use the sandbox domain for testing
3. Get your API key from the Mailgun dashboard

### 3. Configure Environment Variables

Copy `.env.example` to `.env` and fill in your details:

```bash
cp .env.example .env
```

Edit `.env` with your Mailgun credentials:
- `MAILGUN_API_KEY`: Your Mailgun API key
- `MAILGUN_DOMAIN`: Your Mailgun domain
- `CRON_SCHEDULE`: When to send emails (default: Monday 9 AM Sydney time)

### 4. Customize Email Content

Edit `config.js` to customize:
- Sender email address
- Recipients list
- Email subject
- Email body text

## Running Locally

```bash
npm start
```

To test email sending immediately on startup:
```bash
TEST_ON_START=true npm start
```

## Deployment Options

### Option 1: Railway (Recommended - Always Running)

1. Push code to GitHub
2. Sign up at [Railway](https://railway.app)
3. Create new project from GitHub repo
4. Add environment variables in Railway dashboard
5. Deploy - it will run continuously

### Option 2: Render

1. Push code to GitHub
2. Sign up at [Render](https://render.com)
3. Create new Web Service
4. Connect GitHub repo
5. Add environment variables
6. Deploy as background worker

### Option 3: VPS (DigitalOcean, Linode, etc.)

1. Deploy to a VPS
2. Use PM2 to keep it running:
```bash
npm install -g pm2
pm2 start index.js --name automailer
pm2 save
pm2 startup
```

### Option 4: Heroku

1. Create `Procfile`:
```
worker: node index.js
```
2. Deploy to Heroku
3. Scale worker dyno: `heroku ps:scale worker=1`

## Cron Schedule Format

The schedule uses standard cron format with Sydney timezone:

```
* * * * *
│ │ │ │ │
│ │ │ │ └── Day of Week (0-7, 0 and 7 are Sunday)
│ │ │ └──── Month (1-12)
│ │ └────── Day of Month (1-31)
│ └──────── Hour (0-23)
└────────── Minute (0-59)
```

Examples:
- `0 9 * * 1` - Every Monday at 9:00 AM
- `30 14 * * 5` - Every Friday at 2:30 PM
- `0 10 * * 3` - Every Wednesday at 10:00 AM

## Testing

Set `TEST_ON_START=true` in your `.env` file to send a test email when the application starts.

## Monitoring

The application logs all email send attempts to the console. In production, these logs will be available in your hosting platform's dashboard.

## License

MIT