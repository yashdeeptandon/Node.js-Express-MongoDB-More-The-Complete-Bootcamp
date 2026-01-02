# Architecture Documentation

## Application Architecture Overview

This document describes the architecture and design patterns used in the Node.js backend application.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client Layer                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Browser    │  │   Postman    │  │  Mobile App  │          │
│  │   (Pug)      │  │    (API)     │  │    (API)     │          │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
└─────────┼──────────────────┼──────────────────┼──────────────────┘
          │                  │                  │
          └──────────────────┼──────────────────┘
                             │
                    HTTP/HTTPS Requests
                             │
┌────────────────────────────┼──────────────────────────────────────┐
│                     Express.js Server                             │
│                             │                                      │
│  ┌─────────────────────────▼─────────────────────────┐           │
│  │              Middleware Stack                      │           │
│  │  ┌──────────┐ ┌──────────┐ ┌────────────────┐   │           │
│  │  │  Helmet  │ │   CORS   │ │  Rate Limiter  │   │           │
│  │  └──────────┘ └──────────┘ └────────────────┘   │           │
│  │  ┌──────────┐ ┌──────────┐ ┌────────────────┐   │           │
│  │  │   HPP    │ │   XSS    │ │ NoSQL Sanitize │   │           │
│  │  └──────────┘ └──────────┘ └────────────────┘   │           │
│  └────────────────────────┬───────────────────────────┘           │
│                           │                                        │
│  ┌────────────────────────▼───────────────────────────┐           │
│  │                 Router Layer                        │           │
│  │  ┌──────────┐ ┌──────────┐ ┌────────────────┐    │           │
│  │  │View Route│ │Tour Route│ │  User Route    │    │           │
│  │  │  (/)     │ │(/api/v1) │ │  (/api/v1)     │    │           │
│  │  └─────┬────┘ └─────┬────┘ └────┬───────────┘    │           │
│  └────────┼────────────┼───────────┼─────────────────┘           │
│           │            │           │                              │
│  ┌────────▼────────────▼───────────▼─────────────────┐           │
│  │            Controller Layer (MVC)                  │           │
│  │  ┌──────────┐ ┌──────────┐ ┌────────────────┐   │           │
│  │  │   View   │ │   Tour   │ │      User      │   │           │
│  │  │Controller│ │Controller│ │   Controller   │   │           │
│  │  └──────────┘ └─────┬────┘ └────┬───────────┘   │           │
│  │                     │            │                │           │
│  │  ┌──────────────────▼────────────▼──────────┐   │           │
│  │  │      Authentication Controller           │   │           │
│  │  │  • JWT Generation  • Role Check          │   │           │
│  │  └──────────────────┬────────────────────────┘   │           │
│  └────────────────────┼──────────────────────────────┘           │
│                       │                                           │
│  ┌────────────────────▼──────────────────────────────┐           │
│  │              Model Layer (MVC)                     │           │
│  │  ┌──────────┐ ┌──────────┐ ┌────────────────┐   │           │
│  │  │   User   │ │   Tour   │ │  Other Models  │   │           │
│  │  │  Model   │ │  Model   │ │                │   │           │
│  │  └─────┬────┘ └─────┬────┘ └────┬───────────┘   │           │
│  └────────┼────────────┼───────────┼─────────────────┘           │
└───────────┼────────────┼───────────┼───────────────────────────────┘
            │            │           │
            └────────────┼───────────┘
                         │
            ┌────────────▼────────────┐
            │   MongoDB Database      │
            │  • Users Collection     │
            │  • Tours Collection     │
            │  • Indexes & Validation │
            └─────────────────────────┘
```

## MVC Pattern Implementation

### Model Layer
**Responsibility**: Data structure, validation, and business logic

```javascript
// models/userModel.js
- Define schema with Mongoose
- Add validation rules
- Implement instance methods (password comparison, token generation)
- Add pre/post hooks (password hashing, query middleware)
- Export model

// models/tourModel.js
- Define tour schema with validation
- Add virtual properties
- Implement document/query/aggregation middleware
- Export model
```

### View Layer
**Responsibility**: User interface presentation

```javascript
// views/*.pug
- Base template (base.pug) - layout and navigation
- Overview (overview.pug) - tour listing
- Tour details (tour.pug) - individual tour
- Authentication (login.pug, signup.pug)
- User account (account.pug)
- Error pages (error.pug)
```

### Controller Layer
**Responsibility**: Handle requests, coordinate between models and views

```javascript
// controllers/authController.js
- User authentication (signup, login, logout)
- JWT token management
- Password reset
- Route protection middleware
- Role-based authorization

// controllers/tourController.js
- CRUD operations for tours
- Advanced query features
- Aggregation pipelines
- Statistics

// controllers/userController.js
- User management
- Profile updates
- Account deletion

// controllers/viewController.js
- Server-side rendering
- Template data preparation
```

## Request Flow

### 1. API Request Flow (e.g., GET /api/v1/tours)

```
Client Request
    ↓
Express Middleware Stack
    ↓ (Security Headers)
Helmet
    ↓ (Rate Limiting)
Rate Limiter
    ↓ (Body Parsing)
JSON Parser
    ↓ (Data Sanitization)
NoSQL Injection Protection → XSS Protection
    ↓ (Routing)
Tour Router
    ↓ (Controller)
Tour Controller → API Features (filter, sort, paginate)
    ↓ (Model)
Tour Model → MongoDB Query
    ↓
MongoDB Database
    ↓ (Response)
JSON Response → Client
```

### 2. Protected Route Flow (e.g., POST /api/v1/tours)

```
Client Request with JWT
    ↓
Express Middleware
    ↓
Auth Middleware (protect)
    ↓ (Verify JWT)
Check Token Validity
    ↓ (Check User)
Verify User Exists
    ↓ (Check Password Change)
Verify Token Not Expired
    ↓
Authorization Middleware (restrictTo)
    ↓ (Check Role)
Verify User Role
    ↓
Controller → Model → Database
    ↓
Response
```

### 3. View Rendering Flow (e.g., GET /)

```
Browser Request
    ↓
Express Middleware
    ↓
View Router
    ↓
View Controller
    ↓ (Check Login Status)
isLoggedIn Middleware
    ↓ (Fetch Data)
Get Tours from Database
    ↓ (Render)
Pug Template Engine
    ↓ (Compile)
HTML Response → Browser
```

## Security Architecture

### Layer 1: Network Security
- HTTPS (in production)
- CORS configuration
- Rate limiting (100 requests/hour per IP)

### Layer 2: Application Security
- Helmet (Security headers)
- HPP (Parameter pollution prevention)
- NoSQL injection sanitization
- XSS protection

### Layer 3: Authentication Security
- JWT tokens (signed with secret)
- Secure HTTP-only cookies
- Password hashing (bcrypt, salt rounds: 12)
- Token expiration

### Layer 4: Authorization Security
- Role-based access control (RBAC)
- Route-level permissions
- Resource ownership checks

### Layer 5: Data Security
- Mongoose schema validation
- Input sanitization
- Password confirmation
- Soft deletes (user deactivation)

## Database Schema Design

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (unique, required, validated),
  photo: String (default),
  role: String (enum: user, guide, lead-guide, admin),
  password: String (hashed, select: false),
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: Boolean (default: true, select: false),
  createdAt: Date
}
```

### Tours Collection
```javascript
{
  _id: ObjectId,
  name: String (required, unique, validated),
  slug: String,
  duration: Number (required),
  maxGroupSize: Number (required),
  difficulty: String (enum: easy, medium, difficult),
  ratingsAverage: Number (default: 4.5, validated),
  ratingsQuantity: Number (default: 0),
  price: Number (required),
  priceDiscount: Number (validated),
  summary: String (required),
  description: String,
  imageCover: String (required),
  images: [String],
  createdAt: Date (default, select: false),
  startDates: [Date],
  secretTour: Boolean (default: false)
}
```

## API Features Implementation

### 1. Filtering
```javascript
// ?difficulty=easy&price[lt]=500
{
  difficulty: 'easy',
  price: { $lt: 500 }
}
```

### 2. Sorting
```javascript
// ?sort=-price,ratingsAverage
sort('-price ratingsAverage')
```

### 3. Field Limiting
```javascript
// ?fields=name,price,difficulty
select('name price difficulty')
```

### 4. Pagination
```javascript
// ?page=2&limit=10
skip(10).limit(10)
```

## Error Handling Strategy

### Error Types

1. **Operational Errors** (Expected)
   - Invalid input
   - Failed DB operation
   - User not found
   - JWT expired

2. **Programming Errors** (Unexpected)
   - Reading undefined property
   - Passing number instead of string
   - Using sync instead of async

### Error Flow

```
Error Occurs
    ↓
catchAsync Wrapper / try-catch
    ↓
next(error)
    ↓
Global Error Handler
    ↓ (Check Environment)
Development? → Send detailed error
    ↓
Production? → Check if operational
    ↓
Operational → Send friendly message
    ↓
Programming → Log error + generic message
```

## Technology Stack

### Core Technologies
- **Runtime**: Node.js (v14+)
- **Framework**: Express.js (v5)
- **Database**: MongoDB with Mongoose ODM
- **Template Engine**: Pug

### Security
- **Authentication**: JWT (jsonwebtoken)
- **Password**: bcrypt.js
- **Headers**: Helmet
- **Rate Limiting**: express-rate-limit
- **Sanitization**: express-mongo-sanitize, xss-clean
- **HPP**: hpp

### Utilities
- **Validation**: validator.js
- **Logging**: morgan
- **Compression**: compression
- **Cookie Parsing**: cookie-parser
- **Environment**: dotenv

### Development
- **Hot Reload**: nodemon
- **Code Quality**: ESLint, Prettier

## Deployment Architecture

```
┌──────────────────────────────────────────────────┐
│              Production Environment               │
│                                                   │
│  ┌────────────────────────────────────────────┐  │
│  │          Load Balancer / CDN               │  │
│  │          (Nginx / Cloudflare)              │  │
│  └─────────────────┬──────────────────────────┘  │
│                    │                              │
│  ┌─────────────────▼──────────────────────────┐  │
│  │        Application Servers                 │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐ │  │
│  │  │ Node.js  │  │ Node.js  │  │ Node.js  │ │  │
│  │  │ Instance │  │ Instance │  │ Instance │ │  │
│  │  │    1     │  │    2     │  │    3     │ │  │
│  │  └──────────┘  └──────────┘  └──────────┘ │  │
│  └─────────────────┬──────────────────────────┘  │
│                    │                              │
│  ┌─────────────────▼──────────────────────────┐  │
│  │        MongoDB Cluster                     │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐ │  │
│  │  │ Primary  │  │Secondary │  │Secondary │ │  │
│  │  │  Node    │  │  Node    │  │  Node    │ │  │
│  │  └──────────┘  └──────────┘  └──────────┘ │  │
│  └────────────────────────────────────────────┘  │
│                                                   │
│  ┌────────────────────────────────────────────┐  │
│  │          Monitoring & Logging              │  │
│  │     (PM2, Winston, New Relic, etc.)        │  │
│  └────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────┘
```

## Best Practices Implemented

### 1. Code Organization
- ✅ MVC architecture
- ✅ Separation of concerns
- ✅ Modular structure
- ✅ Reusable utilities

### 2. Security
- ✅ JWT authentication
- ✅ Password encryption
- ✅ Input validation
- ✅ Data sanitization
- ✅ Rate limiting
- ✅ Security headers

### 3. Performance
- ✅ Database indexing
- ✅ Response compression
- ✅ Efficient queries
- ✅ Pagination

### 4. Error Handling
- ✅ Global error handler
- ✅ Async error catching
- ✅ Proper status codes
- ✅ Environment-specific responses

### 5. Development
- ✅ Environment variables
- ✅ Hot reloading
- ✅ Code linting
- ✅ Consistent formatting

### 6. Documentation
- ✅ API documentation
- ✅ Code comments
- ✅ README files
- ✅ Quick start guide

## Scalability Considerations

### Horizontal Scaling
- Stateless authentication (JWT)
- Session-less design
- Load balancer ready

### Database Scaling
- MongoDB indexes on frequently queried fields
- Aggregation pipelines for complex queries
- Connection pooling

### Caching Strategy (Future)
- Redis for session storage
- API response caching
- Static asset CDN

### Monitoring (Future)
- Application performance monitoring
- Error tracking
- Database query analysis
- Resource usage metrics

---

This architecture provides a solid foundation for a production-ready Node.js backend application with room for growth and enhancement.
