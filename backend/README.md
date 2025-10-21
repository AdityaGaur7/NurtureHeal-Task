# TaskMed Backend - MVC Architecture

This backend follows a clean MVC (Model-View-Controller) architecture with proper separation of concerns.

## 📁 Project Structure

```
backend/
├── config/
│   ├── database.js          # Database connection configuration
│   └── constants.js         # Application constants
├── controllers/
│   ├── authController.js     # Authentication endpoints
│   └── healthController.js   # Health analysis endpoints
├── middleware/
│   └── auth.js              # JWT authentication middleware
├── models/
│   ├── user.js              # User model schema
│   └── healthdata.js         # Health data model schema
├── routes/
│   ├── authRoutes.js        # Authentication routes
│   └── healthRoutes.js      # Health analysis routes
├── services/
│   ├── authService.js       # Authentication business logic
│   └── healthService.js     # Health analysis business logic
├── utils/
│   ├── healthAnalysis.js    # Health analysis algorithms
│   └── validation.js        # Input validation utilities
├── index.js                 # Main application entry point
└── package.json            # Dependencies and scripts
```

## 🏗️ Architecture Layers

### 1. **Controllers** (`/controllers`)

- Handle HTTP requests and responses
- Input validation and sanitization
- Call appropriate services
- Return formatted responses

### 2. **Services** (`/services`)

- Contains business logic
- Database operations
- Data processing and transformation
- Error handling for business rules

### 3. **Models** (`/models`)

- Database schemas and validation
- Mongoose model definitions
- Data relationships

### 4. **Routes** (`/routes`)

- API endpoint definitions
- Route-specific middleware
- Route organization

### 5. **Middleware** (`/middleware`)

- Authentication and authorization
- Request processing
- Error handling

### 6. **Utils** (`/utils`)

- Reusable utility functions
- Business logic algorithms
- Helper functions

### 7. **Config** (`/config`)

- Database configuration
- Application constants
- Environment settings

## 🚀 API Endpoints

### Authentication Routes (`/api/auth`)

- `POST /register` - User registration
- `POST /login` - User login

### Health Routes (`/api/health`)

- `POST /analyze` - Submit health analysis (Protected)
- `GET /latest` - Get latest health data (Protected)
- `GET /history` - Get health history (Protected)

### Utility Routes

- `GET /health-check` - Server health check

## 🔧 Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskmed
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
NODE_ENV=development
```

## 📦 Dependencies

### Production Dependencies

- `express` - Web framework
- `mongoose` - MongoDB ODM
- `cors` - Cross-origin resource sharing
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT authentication
- `dotenv` - Environment variable loading

### Development Dependencies

- `nodemon` - Development server with auto-restart

## 🛠️ Development

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

### Production Server

```bash
npm start
```

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Input validation and sanitization
- CORS configuration
- Error handling middleware

## 📝 Code Standards

- ES6+ JavaScript with modules
- Async/await for asynchronous operations
- Proper error handling
- Consistent naming conventions
- Separation of concerns
- DRY (Don't Repeat Yourself) principle

## 🧪 Testing

The architecture supports easy unit testing:

- Controllers can be tested with mocked services
- Services can be tested with mocked models
- Utils can be tested independently
- Models can be tested with test databases

## 📈 Scalability

This architecture supports:

- Easy addition of new features
- Independent testing of components
- Clear separation of concerns
- Maintainable codebase
- Team collaboration
