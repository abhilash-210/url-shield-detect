
# PhishGuard Pro - Advanced Phishing Detection Tool

PhishGuard Pro is a web-based cybersecurity tool designed to detect phishing and malicious URLs through advanced pattern recognition and machine learning algorithms. Built with modern web technologies, it provides a professional interface for security professionals to analyze and identify potential threats.

## Features

- **Real-time URL Analysis**: Instantly analyze URLs for phishing indicators
- **Machine Learning Detection**: Utilizes advanced algorithms to identify modern phishing techniques
- **User Authentication**: Secure login and registration system
- **Detection History**: Track and review your URL analysis history
- **Real-time Statistics**: View up-to-date phishing detection statistics
- **Responsive Design**: Professional interface optimized for both desktop and mobile devices
- **Database Integration**: Stores analysis results and known threats for improved detection

## Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Shadcn UI
- **Backend**: Supabase (Authentication, Database)
- **State Management**: React Query
- **Routing**: React Router
- **UI Components**: Custom cyber-themed components

## Installation and Setup

1. Clone the repository
```bash
git clone https://github.com/yourusername/phishguard-pro.git
cd phishguard-pro
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server
```bash
npm run dev
```

## Database Schema

The project uses the following tables in Supabase:

1. **detection_history**
   - `id` (uuid, primary key)
   - `user_id` (uuid, foreign key)
   - `url` (text)
   - `result` (jsonb)
   - `detected_at` (timestamp)

2. **known_threats**
   - `id` (uuid, primary key)
   - `pattern` (text)
   - `description` (text)
   - `threat_level` (text)

## Usage

1. **Register/Login**: Create an account or log in to access the tool
2. **URL Analysis**: Enter a URL in the analysis field to check it
3. **Review Results**: View the detailed analysis results, including safety score and identified threat factors
4. **View History**: Access your previous URL analyses in the dashboard
5. **Statistics**: Review real-time phishing detection statistics

## Security Features

- Password hashing and secure authentication via Supabase
- Real-time threat database updates
- Pattern recognition for modern phishing techniques
- Identification of suspicious TLDs, redirects, and domain impersonation

## Deployment

The application can be deployed to any static hosting service that supports single-page applications. For optimal performance, deploy the frontend to a CDN-backed service like Vercel, Netlify, or Cloudflare Pages.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
