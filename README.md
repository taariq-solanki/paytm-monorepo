# Paytm Demo Monorepo

A comprehensive full-stack application demonstrating modern web development practices with React, Node.js, MongoDB, and Docker.

## 🏗️ Architecture

This monorepo contains:

- **Backend**: Node.js Express API with MongoDB
- **Frontend**: React + Vite + TypeScript + Tailwind CSS
- **Database**: MongoDB with sample data
- **Infrastructure**: Docker containers with docker-compose
- **CI/CD**: GitHub Actions for ECR build and ECS deployment

## 🚀 Features

### Backend Features
- ✅ RESTful API with Express.js
- ✅ MongoDB integration with Mongoose
- ✅ CORS enabled for frontend communication
- ✅ Health check endpoints
- ✅ Complete CRUD operations for users
- ✅ Input validation and error handling
- ✅ Rate limiting and security headers
- ✅ Docker containerization

### Frontend Features
- ✅ Modern React with TypeScript
- ✅ Vite for fast development and building
- ✅ Tailwind CSS for styling
- ✅ React Router for navigation
- ✅ User management interface
- ✅ Responsive design
- ✅ Multi-stage Docker build with Nginx

### DevOps Features
- ✅ Docker Compose for local development
- ✅ GitHub Actions CI/CD pipeline
- ✅ ECR image building and pushing
- ✅ ECS service deployment
- ✅ Security scanning with Trivy

## 📁 Project Structure

```
paytm-monorepo/
├── backend/                 # Node.js Express API
│   ├── src/
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   └── server.js       # Main server file
│   ├── Dockerfile          # Backend container
│   ├── package.json
│   └── env.example
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   └── main.tsx        # App entry point
│   ├── Dockerfile          # Frontend container
│   ├── nginx.conf          # Nginx configuration
│   └── package.json
├── scripts/
│   └── mongo-init.js       # MongoDB initialization
├── .github/
│   └── workflows/
│       └── deploy.yml      # CI/CD pipeline
├── docker-compose.yml      # Local development
└── README.md
```

## 🛠️ Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Docker](https://www.docker.com/) and Docker Compose
- [Git](https://git-scm.com/)

## 🚀 Quick Start

### Option 1: Docker Compose (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd paytm-monorepo
   ```

2. **Start all services**
   ```bash
   docker-compose up -d
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:4000
   - MongoDB Express: http://localhost:8081 (admin/admin123)

### Option 2: Local Development

1. **Start MongoDB**
   ```bash
   docker run -d --name mongodb -p 27017:27017 mongo:7.0
   ```

2. **Setup Backend**
   ```bash
   cd backend
   cp env.example .env
   npm install
   npm run dev
   ```

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## 📚 API Documentation

### Base URL
```
http://localhost:4000/api
```

### Endpoints

#### Health Check
- **GET** `/health` - Basic health check
- **GET** `/health/detailed` - Detailed health information

#### Users
- **GET** `/users` - Get all users (with pagination and search)
- **GET** `/users/:id` - Get user by ID
- **POST** `/users` - Create new user
- **PUT** `/users/:id` - Update user
- **DELETE** `/users/:id` - Delete user
- **PATCH** `/users/:id/activate` - Activate user
- **PATCH** `/users/:id/deactivate` - Deactivate user

### Example API Usage

```bash
# Get all users
curl http://localhost:4000/api/users

# Create a new user
curl -X POST http://localhost:4000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+91-9876543210",
    "address": {
      "city": "Mumbai",
      "state": "Maharashtra",
      "country": "India"
    }
  }'

# Update user
curl -X PUT http://localhost:4000/api/users/USER_ID \
  -H "Content-Type: application/json" \
  -d '{"name": "John Smith"}'
```

## 🐳 Docker Commands

### Development
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Rebuild and restart
docker-compose up -d --build
```

### Individual Services
```bash
# Backend only
docker-compose up -d backend mongodb

# Frontend only
docker-compose up -d frontend

# Database only
docker-compose up -d mongodb mongo-express
```

## 🚀 Deployment

### AWS ECS Deployment

1. **Setup AWS Resources**
   - Create ECR repositories for backend and frontend
   - Create ECS cluster and services
   - Configure task definitions

2. **Configure GitHub Secrets**
   ```
   AWS_ACCESS_KEY_ID
   AWS_SECRET_ACCESS_KEY
   AWS_ACCOUNT_ID
   ECS_CLUSTER_NAME
   BACKEND_SERVICE_NAME
   FRONTEND_SERVICE_NAME
   ```

3. **Deploy**
   - Push to `main` branch
   - GitHub Actions will automatically build and deploy

### Manual Deployment

```bash
# Build and push backend
cd backend
docker build -t your-ecr-repo/paytm-backend .
docker push your-ecr-repo/paytm-backend

# Build and push frontend
cd frontend
docker build -t your-ecr-repo/paytm-frontend .
docker push your-ecr-repo/paytm-frontend

# Update ECS services
aws ecs update-service --cluster your-cluster --service your-backend-service --force-new-deployment
aws ecs update-service --cluster your-cluster --service your-frontend-service --force-new-deployment
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm run lint
npm run build
```

### Integration Tests
```bash
# Start services
docker-compose up -d

# Test API
curl http://localhost:4000/api/health
curl http://localhost:4000/api/users

# Test frontend
open http://localhost:3000
```

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
NODE_ENV=development
PORT=4000
MONGODB_URI=mongodb://localhost:27017/paytm_db
CORS_ORIGIN=http://localhost:3000
```

#### Frontend (vite.config.ts)
```typescript
export default defineConfig({
  server: {
    port: 3000,
    host: true
  }
})
```

### MongoDB Configuration
- Database: `paytm_db`
- Admin user: `admin/password123`
- Application user: `paytm_user/paytm_password`

## 🛡️ Security

- Helmet.js for security headers
- CORS configuration
- Rate limiting
- Input validation
- Non-root Docker users
- Security scanning in CI/CD

## 📊 Monitoring

### Health Checks
- Backend: `http://localhost:4000/api/health`
- Frontend: `http://localhost:3000/health`

### Database Management
- MongoDB Express: `http://localhost:8081`
- Credentials: `admin/admin123`

## 🐛 Troubleshooting

### Common Issues

1. **Port conflicts**
   ```bash
   # Check if ports are in use
   netstat -tulpn | grep :3000
   netstat -tulpn | grep :4000
   ```

2. **MongoDB connection issues**
   ```bash
   # Check MongoDB logs
   docker-compose logs mongodb
   
   # Restart MongoDB
   docker-compose restart mongodb
   ```

3. **Build failures**
   ```bash
   # Clean Docker cache
   docker system prune -a
   
   # Rebuild without cache
   docker-compose build --no-cache
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - Frontend framework
- [Express.js](https://expressjs.com/) - Backend framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Docker](https://www.docker.com/) - Containerization
- [AWS](https://aws.amazon.com/) - Cloud platform

---

**Built with ❤️ for learning and demonstration purposes**
