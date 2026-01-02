# Node.js Express MongoDB Backend Application

A comprehensive Node.js backend application built with Express and MongoDB, following MVC architecture and production-ready best practices.

## Features

### Core Architecture
- **MVC Pattern**: Clean separation of concerns with Models, Views, and Controllers
- **RESTful APIs**: Complete CRUD operations with proper HTTP methods and status codes
- **MongoDB Integration**: Mongoose ODM with schema validation and middleware

### Authentication & Security
- **JWT Authentication**: Secure token-based authentication system
- **Password Encryption**: Bcrypt for secure password hashing
- **Role-Based Authorization**: User roles (user, guide, lead-guide, admin) with permission restrictions
- **Password Reset**: Token-based password reset functionality
- **Security Headers**: Helmet for setting security HTTP headers
- **Rate Limiting**: Protection against brute force attacks
- **Data Sanitization**: Protection against NoSQL injection and XSS attacks
- **HPP Protection**: Prevent parameter pollution

### Advanced API Features
- **Filtering**: Advanced query filtering with operators (gte, gt, lte, lt)
- **Sorting**: Sort results by any field in ascending or descending order
- **Field Limiting**: Select specific fields to return in responses
- **Pagination**: Page-based pagination with customizable limits
- **Aggregation**: Complex data aggregation pipelines for statistics

### Server-Side Rendering
- **Pug Templates**: Dynamic HTML rendering with Pug template engine
- **Responsive UI**: Basic responsive interface for web pages
- **User Authentication UI**: Login, signup, and account management pages
- **Tour Overview**: Display tours with details and ratings

### Error Handling
- **Global Error Handler**: Centralized error handling middleware
- **Custom Error Class**: AppError for operational errors
- **Development vs Production**: Different error responses for development and production
- **MongoDB Error Handling**: Specific handlers for CastError, Validation, and Duplicate errors
- **JWT Error Handling**: Handlers for invalid and expired tokens
- **Async Error Handling**: Catch async errors without try-catch blocks

### Production Ready
- **Environment Configuration**: Separate configs for development and production
- **Compression**: Response compression for better performance
- **Logging**: Morgan for HTTP request logging
- **Process Management**: Graceful shutdown and error handling
- **Uncaught Exception Handling**: Global handlers for uncaught exceptions and rejections

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Node.js-Express-MongoDB-More-The-Complete-Bootcamp
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start MongoDB (make sure MongoDB is installed and running):
```bash
mongod
```

5. Run the application:
```bash
# Development mode with hot reload
npm run dev

# Production mode
npm start
```

## Environment Variables

Create a `config.env` file in the root directory:

```env
NODE_ENV=development
PORT=3000
DATABASE=mongodb://localhost:27017/natours
DATABASE_PASSWORD=yourpassword
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90
```

## API Endpoints

### Authentication
- `POST /api/v1/users/signup` - Register new user
- `POST /api/v1/users/login` - Login user
- `GET /api/v1/users/logout` - Logout user
- `POST /api/v1/users/forgotPassword` - Request password reset
- `PATCH /api/v1/users/resetPassword/:token` - Reset password with token

### Users (Protected Routes)
- `GET /api/v1/users/me` - Get current user
- `PATCH /api/v1/users/updateMe` - Update current user data
- `DELETE /api/v1/users/deleteMe` - Deactivate current user
- `PATCH /api/v1/users/updateMyPassword` - Update current user password

### Users (Admin Only)
- `GET /api/v1/users` - Get all users
- `GET /api/v1/users/:id` - Get user by ID
- `PATCH /api/v1/users/:id` - Update user
- `DELETE /api/v1/users/:id` - Delete user

### Tours
- `GET /api/v1/tours` - Get all tours (with filtering, sorting, pagination)
- `GET /api/v1/tours/:id` - Get single tour
- `POST /api/v1/tours` - Create tour (admin, lead-guide)
- `PATCH /api/v1/tours/:id` - Update tour (admin, lead-guide)
- `DELETE /api/v1/tours/:id` - Delete tour (admin, lead-guide)
- `GET /api/v1/tours/top-5-cheap` - Get top 5 cheap tours
- `GET /api/v1/tours/tour-stats` - Get tour statistics
- `GET /api/v1/tours/monthly-plan/:year` - Get monthly tour plan

### Views (Server-Side Rendered)
- `GET /` - Home page (tour overview)
- `GET /tour/:slug` - Tour details page
- `GET /login` - Login page
- `GET /signup` - Signup page
- `GET /me` - User account page (protected)

## API Query Examples

### Filtering
```bash
# Get tours with price less than 500
GET /api/v1/tours?price[lt]=500

# Get tours with difficulty easy and duration 5 days
GET /api/v1/tours?difficulty=easy&duration=5
```

### Sorting
```bash
# Sort by price ascending
GET /api/v1/tours?sort=price

# Sort by price descending, then by rating
GET /api/v1/tours?sort=-price,ratingsAverage
```

### Field Limiting
```bash
# Get only name, price, and rating
GET /api/v1/tours?fields=name,price,ratingsAverage
```

### Pagination
```bash
# Get page 2 with 10 results per page
GET /api/v1/tours?page=2&limit=10
```

### Combined
```bash
# Complex query combining all features
GET /api/v1/tours?price[lt]=1000&difficulty=easy&sort=-ratingsAverage&fields=name,price,rating&page=1&limit=5
```

## Project Structure

```
.
├── controllers/          # Route controllers (MVC)
│   ├── authController.js    # Authentication logic
│   ├── errorController.js   # Error handling
│   ├── tourController.js    # Tour CRUD operations
│   ├── userController.js    # User management
│   └── viewController.js    # Server-side rendering
├── models/              # Mongoose models (MVC)
│   ├── tourModel.js         # Tour schema and model
│   └── userModel.js         # User schema and model
├── routes/              # Express routes (MVC)
│   ├── tourRoutes.js        # Tour API routes
│   ├── userRoutes.js        # User API routes
│   └── viewRoutes.js        # View rendering routes
├── views/               # Pug templates (MVC)
│   ├── base.pug            # Base template
│   ├── overview.pug        # Tours overview
│   ├── tour.pug            # Tour details
│   ├── login.pug           # Login page
│   ├── signup.pug          # Signup page
│   ├── account.pug         # User account
│   └── error.pug           # Error page
├── public/              # Static files
│   ├── css/
│   │   └── style.css       # Main stylesheet
│   └── js/
│       └── index.js        # Client-side JavaScript
├── utils/               # Utility functions
│   ├── apiFeatures.js      # API features class
│   ├── appError.js         # Custom error class
│   └── catchAsync.js       # Async error wrapper
├── middleware/          # Custom middleware
├── config/              # Configuration files
├── app.js              # Express app configuration
├── server.js           # Server entry point
├── package.json        # Project dependencies
└── config.env          # Environment variables
```

## Technologies Used

- **Node.js**: JavaScript runtime
- **Express**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT**: JSON Web Tokens for authentication
- **Bcrypt**: Password hashing
- **Pug**: Template engine
- **Helmet**: Security HTTP headers
- **Express Rate Limit**: Rate limiting
- **Morgan**: HTTP request logger
- **Validator**: Data validation
- **Compression**: Response compression

## Security Features

1. **Authentication**: JWT-based with secure cookie storage
2. **Authorization**: Role-based access control
3. **Password Security**: Bcrypt hashing with salt rounds
4. **Data Sanitization**: NoSQL injection and XSS prevention
5. **Rate Limiting**: Prevents brute force attacks
6. **HTTP Headers**: Helmet for secure headers
7. **Parameter Pollution**: HPP middleware protection
8. **CORS**: Configurable cross-origin resource sharing

## Development

```bash
# Start development server with nodemon
npm run dev

# Start production server
npm start

# Run in production mode
npm run start:prod
```

## Best Practices Implemented

- MVC architecture for code organization
- Environment-based configuration
- Error handling middleware
- Async/await with proper error catching
- Data validation at model level
- Query middleware for soft deletes
- Document middleware for password hashing
- Virtual properties on schemas
- Aggregation pipelines for statistics
- Comprehensive API features (filtering, sorting, pagination)
- Secure authentication and authorization
- Production-ready error handling
- Graceful shutdown handling

## License

ISC

## Author

Your Name

---

Built with ❤️ using Node.js, Express, and MongoDB