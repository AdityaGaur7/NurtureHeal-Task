# TaskMed - Health Analysis Web Application

A complete MERN stack web application for health analysis with user authentication, health data tracking, and interactive dashboards.

## Features

- **User Authentication**: Secure login/register with JWT tokens
- **Health Analysis**: Comprehensive health assessment form
- **Interactive Dashboard**: Visual charts and health insights
- **Health History**: Track health data over time
- **Responsive Design**: Modern UI with Tailwind CSS

## Technology Stack

### Backend

- Node.js with Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- CORS for cross-origin requests

### Frontend

- React 19 with Vite
- React Router for navigation
- Tailwind CSS for styling
- Recharts for data visualization
- Axios for API calls

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Start MongoDB (if running locally):

```bash
mongod
```

4. Start the backend server:

```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Health Data

- `POST /api/health/analyze` - Submit health analysis (Protected)
- `GET /api/health/latest` - Get latest health data (Protected)
- `GET /api/health/history` - Get health history (Protected)

## Usage

1. **Register/Login**: Create an account or sign in
2. **Health Analysis**: Complete the health assessment form
3. **Dashboard**: View your health analysis results with interactive charts
4. **History**: Track your health data over time

## Health Analysis Logic

The application uses a mock AI system to analyze health data based on:

- Sleep Quality (Poor/Average/Good)
- Stress Level (1-10 scale)
- Appetite (Low/Normal/High)
- Activity Type (Sedentary/Moderate/Active)

Results are generated based on combinations of these factors, providing personalized recommendations.

## Project Structure

```
TaskMed/
├── backend/
│   ├── index.js          # Main server file
│   ├── middleware/
│   │   └── auth.js       # JWT authentication middleware
│   └── package.json      # Backend dependencies
├── src/
│   ├── components/       # React components
│   ├── contexts/         # React contexts
│   ├── App.jsx          # Main app component
│   └── main.jsx         # Entry point
├── package.json         # Frontend dependencies
└── README.md           # This file
```

## Development

- Backend runs on port 5000
- Frontend runs on port 5173
- MongoDB should be running on default port 27017
- All API calls are configured for local development

## Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Protected routes
- Input validation
- CORS configuration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
