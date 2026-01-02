# API Testing Guide

This document provides comprehensive examples for testing all API endpoints.

## Prerequisites

Before testing, ensure:
1. MongoDB is running
2. Server is started: `npm run dev` or `npm start`
3. Environment variables are configured in `config.env`

## Authentication Endpoints

### 1. Sign Up (Register New User)

```bash
curl -X POST http://localhost:3000/api/v1/users/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "passwordConfirm": "password123"
  }'
```

**Expected Response:**
```json
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "user": {
      "_id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    }
  }
}
```

### 2. Login

```bash
curl -X POST http://localhost:3000/api/v1/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 3. Forgot Password

```bash
curl -X POST http://localhost:3000/api/v1/users/forgotPassword \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com"
  }'
```

### 4. Reset Password

```bash
curl -X PATCH http://localhost:3000/api/v1/users/resetPassword/YOUR_RESET_TOKEN \
  -H "Content-Type: application/json" \
  -d '{
    "password": "newpassword123",
    "passwordConfirm": "newpassword123"
  }'
```

## Tour Endpoints (CRUD Operations)

### 1. Get All Tours

**Basic Request:**
```bash
curl http://localhost:3000/api/v1/tours
```

**With Filtering:**
```bash
# Tours with price less than 500
curl "http://localhost:3000/api/v1/tours?price[lt]=500"

# Tours with difficulty 'easy'
curl "http://localhost:3000/api/v1/tours?difficulty=easy"

# Combined filters
curl "http://localhost:3000/api/v1/tours?difficulty=easy&duration[gte]=5"
```

**With Sorting:**
```bash
# Sort by price (ascending)
curl "http://localhost:3000/api/v1/tours?sort=price"

# Sort by price (descending)
curl "http://localhost:3000/api/v1/tours?sort=-price"

# Sort by multiple fields
curl "http://localhost:3000/api/v1/tours?sort=-ratingsAverage,price"
```

**With Field Limiting:**
```bash
# Get only specific fields
curl "http://localhost:3000/api/v1/tours?fields=name,price,difficulty"
```

**With Pagination:**
```bash
# Get page 2 with 5 results per page
curl "http://localhost:3000/api/v1/tours?page=2&limit=5"
```

**Complex Query:**
```bash
# Combine all features
curl "http://localhost:3000/api/v1/tours?price[lt]=1000&difficulty=easy&sort=-ratingsAverage&fields=name,price,ratingsAverage&page=1&limit=5"
```

### 2. Get Single Tour

```bash
curl http://localhost:3000/api/v1/tours/TOUR_ID
```

### 3. Create Tour (Protected - Admin/Lead-Guide only)

```bash
curl -X POST http://localhost:3000/api/v1/tours \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "The Mountain Hiker",
    "duration": 7,
    "maxGroupSize": 20,
    "difficulty": "medium",
    "price": 597,
    "summary": "Amazing mountain hiking experience",
    "description": "Full description here...",
    "imageCover": "tour-cover.jpg",
    "startDates": ["2024-06-01", "2024-07-15", "2024-08-20"]
  }'
```

### 4. Update Tour (Protected - Admin/Lead-Guide only)

```bash
curl -X PATCH http://localhost:3000/api/v1/tours/TOUR_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "price": 699,
    "difficulty": "difficult"
  }'
```

### 5. Delete Tour (Protected - Admin/Lead-Guide only)

```bash
curl -X DELETE http://localhost:3000/api/v1/tours/TOUR_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 6. Get Top 5 Cheap Tours

```bash
curl http://localhost:3000/api/v1/tours/top-5-cheap
```

### 7. Get Tour Statistics

```bash
curl http://localhost:3000/api/v1/tours/tour-stats
```

### 8. Get Monthly Plan

```bash
curl http://localhost:3000/api/v1/tours/monthly-plan/2024
```

## User Endpoints

### 1. Get All Users (Admin only)

```bash
curl http://localhost:3000/api/v1/users \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 2. Get Current User

```bash
curl http://localhost:3000/api/v1/users/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 3. Update Current User Data

```bash
curl -X PATCH http://localhost:3000/api/v1/users/updateMe \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "John Updated",
    "email": "johnupdated@example.com"
  }'
```

### 4. Update Password

```bash
curl -X PATCH http://localhost:3000/api/v1/users/updateMyPassword \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "passwordCurrent": "password123",
    "password": "newpassword123",
    "passwordConfirm": "newpassword123"
  }'
```

### 5. Delete Current User (Deactivate)

```bash
curl -X DELETE http://localhost:3000/api/v1/users/deleteMe \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Testing with Postman

### Setup Environment Variables in Postman

1. Create a new environment
2. Add variables:
   - `URL`: `http://localhost:3000`
   - `jwt`: (will be set automatically after login)

### Set JWT Token Automatically

Add this script to your login request (Tests tab):

```javascript
if (pm.response.code === 200) {
    const jsonData = pm.response.json();
    pm.environment.set("jwt", jsonData.token);
}
```

### Use JWT Token in Requests

In the Authorization tab:
- Type: Bearer Token
- Token: `{{jwt}}`

Or in Headers:
- Key: `Authorization`
- Value: `Bearer {{jwt}}`

## Testing Workflow

### 1. Complete Test Sequence

```bash
# 1. Sign up a new user
curl -X POST http://localhost:3000/api/v1/users/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test1234","passwordConfirm":"test1234"}'

# Save the token from response

# 2. Get all tours
curl http://localhost:3000/api/v1/tours

# 3. Get filtered tours
curl "http://localhost:3000/api/v1/tours?difficulty=easy&price[lt]=500"

# 4. Login
curl -X POST http://localhost:3000/api/v1/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test1234"}'

# 5. Access protected route
curl http://localhost:3000/api/v1/users/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Testing Security Features

### 1. Test Rate Limiting

Make more than 100 requests within an hour to the same API:

```bash
for i in {1..105}; do
  curl http://localhost:3000/api/v1/tours
done
```

Expected: After 100 requests, you should get a 429 status code.

### 2. Test NoSQL Injection Protection

Try to inject malicious query:

```bash
curl -X POST http://localhost:3000/api/v1/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":{"$gt":""},"password":"anypassword"}'
```

Expected: Should fail (sanitized input prevents injection).

### 3. Test JWT Expiration

Use an expired token:

```bash
curl http://localhost:3000/api/v1/users/me \
  -H "Authorization: Bearer EXPIRED_TOKEN"
```

Expected: Should return 401 with "Your token has expired" message.

### 4. Test Role-Based Authorization

Try to create a tour with a regular user token:

```bash
curl -X POST http://localhost:3000/api/v1/tours \
  -H "Authorization: Bearer USER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Tour"}'
```

Expected: Should return 403 Forbidden.

## Web Interface Testing

### View Routes (Browser Testing)

1. **Home Page**: http://localhost:3000/
   - Should display all available tours
   - Navigation should be visible

2. **Tour Details**: http://localhost:3000/tour/TOUR_SLUG
   - Should display tour information

3. **Login Page**: http://localhost:3000/login
   - Should display login form
   - Test login functionality

4. **Signup Page**: http://localhost:3000/signup
   - Should display signup form
   - Test registration functionality

5. **User Account**: http://localhost:3000/me (requires login)
   - Should display user account information
   - Test updating user information

## Error Handling Tests

### 1. Test 404 Error

```bash
curl http://localhost:3000/api/v1/nonexistent
```

Expected: 404 error with proper message.

### 2. Test Invalid MongoDB ID

```bash
curl http://localhost:3000/api/v1/tours/invalidid
```

Expected: 400 CastError handled properly.

### 3. Test Validation Errors

```bash
curl -X POST http://localhost:3000/api/v1/users/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"invalid-email","password":"short"}'
```

Expected: 400 with validation error messages.

## Performance Testing

### Load Testing with Apache Bench

```bash
# Test with 100 requests, 10 concurrent
ab -n 100 -c 10 http://localhost:3000/api/v1/tours
```

## Important Notes

1. **Always use HTTPS in production**
2. **Never commit JWT secrets to version control**
3. **Use environment variables for sensitive data**
4. **Test all endpoints before deploying**
5. **Monitor rate limiting and adjust as needed**
6. **Keep dependencies updated for security**

## Troubleshooting

### Connection Refused
- Ensure server is running: `npm run dev`
- Check PORT in config.env

### Database Connection Error
- Ensure MongoDB is running
- Check DATABASE URL in config.env

### JWT Errors
- Check JWT_SECRET is set
- Verify token format: "Bearer YOUR_TOKEN"
- Ensure token hasn't expired

### 403 Forbidden
- Check user role
- Verify route permissions
- Ensure user is logged in

---

For more information, see the main README.md file.
