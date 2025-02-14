# SubSmash Backend 🔧
The SubSmash Backend powers a Twitch-integrated AI character alert system, enabling real-time subscriber interactions and custom stream overlays. It handles Twitch EventSub WebSockets, OpenAI-generated content, PostgreSQL database management, and AWS S3 storage.

🚀 **Live Version**
The SubSmash application is live at:
👉 subsmash.io

The backend is deployed on Heroku and operates as an API and WebSocket server for the frontend.

🛠️ **Tech Stack**
- Backend: Node.js, Express.js
- Database: PostgreSQL (Sequelize ORM)
- Real-time: WebSockets (Twitch EventSub)
- Authentication: OAuth 2.0 (Twitch)
- Storage: AWS S3 for user images & sounds
- APIs: Twitch API, OpenAI API
- Deployment: Heroku

🎯 **How It Works**
1. New Twitch Subscription Event
- When a streamer gets a new subscriber, Twitch sends an EventSub WebSocket event.
2. AI-Generated Character Creation
- The backend uses OpenAI APIs to generate a unique character name and avatar.
3. Database & Media Storage
- Character data is saved in PostgreSQL, while images/sounds are stored on AWS S3.
4. Real-time WebSocket Update
- The frontend receives a WebSocket notification, triggering a live alert on stream with the user's customized layout.
