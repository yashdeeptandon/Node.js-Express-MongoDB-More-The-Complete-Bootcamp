# Quick Start Guide

Get up and running with the Node.js backend application in minutes!

## 🚀 Quick Setup (5 minutes)

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Start MongoDB

Make sure MongoDB is installed and running on your system.

**macOS (with Homebrew):**
```bash
brew services start mongodb-community
```

**Windows:**
```bash
mongod
```

**Linux:**
```bash
sudo systemctl start mongod
```

**Or use MongoDB Atlas (Cloud):**
Update `config.env` with your MongoDB Atlas connection string.

### Step 3: Configure Environment

The `config.env` file is already set up with default values. Update if needed:

```env
NODE_ENV=development
PORT=3000
DATABASE=mongodb://localhost:27017/natours
JWT_SECRET=my-ultra-secure-and-ultra-long-secret-key
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90
```

### Step 4: Start the Server

```bash
npm run dev
```

You should see:
```
✅ Database connection successful!
🚀 App running on port 3000...
```

### Step 5: Test the Application

Open your browser and visit:
- **Home Page**: http://localhost:3000
- **Login Page**: http://localhost:3000/login
- **Signup Page**: http://localhost:3000/signup

## 📊 Import Sample Data (Optional)

Load sample tour data for testing:

```bash
node import-dev-data.js --import
```

Delete all data:

```bash
node import-dev-data.js --delete
```

## 🎯 Quick API Tests

### 1. Get All Tours
```bash
curl http://localhost:3000/api/v1/tours
```

### 2. Register a New User
```bash
curl -X POST http://localhost:3000/api/v1/users/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "test1234",
    "passwordConfirm": "test1234"
  }'
```

### 3. Login
```bash
curl -X POST http://localhost:3000/api/v1/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test1234"
  }'
```

Save the token from the response for authenticated requests.

### 4. Get Tours with Filters
```bash
# Easy tours under $500
curl "http://localhost:3000/api/v1/tours?difficulty=easy&price[lt]=500"

# Sorted by price
curl "http://localhost:3000/api/v1/tours?sort=price"

# Paginated results
curl "http://localhost:3000/api/v1/tours?page=1&limit=5"
```

## 🎨 Web Interface

### Home Page
Visit http://localhost:3000 to see all tours displayed in a card layout.

### Create an Account
1. Go to http://localhost:3000/signup
2. Fill in your details
3. Click "Sign up"
4. You'll be redirected to the home page, logged in

### View Your Account
1. Login at http://localhost:3000/login
2. Go to http://localhost:3000/me to view your account settings

## 📝 Common Tasks

### Create an Admin User

Create a user, then manually update their role in MongoDB:

```javascript
// In MongoDB shell or Compass
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

### Create a New Tour (Admin Only)

```bash
curl -X POST http://localhost:3000/api/v1/tours \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Amazing Forest Adventure",
    "duration": 5,
    "maxGroupSize": 15,
    "difficulty": "easy",
    "price": 397,
    "summary": "Breathtaking forest hike",
    "description": "Full description...",
    "imageCover": "tour-cover.jpg",
    "startDates": ["2024-06-01", "2024-07-15"]
  }'
```

### Update Your Password

```bash
curl -X PATCH http://localhost:3000/api/v1/users/updateMyPassword \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "passwordCurrent": "currentpassword",
    "password": "newpassword123",
    "passwordConfirm": "newpassword123"
  }'
```

## 🔧 Development Commands

```bash
# Start development server with hot reload
npm run dev

# Start production server
npm start

# Production mode
npm run start:prod
```

## 📦 Project Structure Overview

```
├── server.js              # Application entry point
├── app.js                 # Express app configuration
├── models/                # Database models (User, Tour)
├── controllers/           # Route controllers (auth, tours, users)
├── routes/               # API routes
├── views/                # Pug templates
├── public/               # Static files (CSS, JS, images)
├── utils/                # Helper utilities
└── config.env            # Environment configuration
```

## 🛠️ Troubleshooting

### Server won't start
- Check if MongoDB is running
- Verify PORT is not in use: `lsof -i :3000`
- Check config.env file exists

### Database connection failed
- Ensure MongoDB is running
- Check DATABASE URL in config.env
- Try connecting with MongoDB Compass

### Cannot create tour (403 Forbidden)
- Only admin and lead-guide roles can create tours
- Update user role in database manually

### JWT errors
- Check JWT_SECRET is set in config.env
- Ensure token is passed as: `Bearer YOUR_TOKEN`

## 🎓 Next Steps

1. **Explore the API**: See `API_TESTING.md` for comprehensive API documentation
2. **Read the full README**: Check `README.md` for detailed feature list
3. **Customize the app**: Modify models, add new features
4. **Deploy**: Deploy to Heroku, Railway, or your preferred platform

## 📚 Key Features to Try

### 1. Advanced Filtering
```bash
# Tours with ratings > 4.5 and price < 1000
curl "http://localhost:3000/api/v1/tours?ratingsAverage[gte]=4.5&price[lt]=1000"
```

### 2. Field Selection
```bash
# Get only tour name and price
curl "http://localhost:3000/api/v1/tours?fields=name,price"
```

### 3. Sorting
```bash
# Sort by highest rated first, then by price
curl "http://localhost:3000/api/v1/tours?sort=-ratingsAverage,price"
```

### 4. Statistics
```bash
# Get tour statistics grouped by difficulty
curl http://localhost:3000/api/v1/tours/tour-stats
```

### 5. Aggregation
```bash
# Get monthly plan for 2024
curl http://localhost:3000/api/v1/tours/monthly-plan/2024
```

## 🔒 Security Features

The application includes:
- ✅ JWT authentication
- ✅ Password encryption with bcrypt
- ✅ Rate limiting (100 requests/hour per IP)
- ✅ NoSQL injection protection
- ✅ XSS attack prevention
- ✅ Parameter pollution prevention
- ✅ Security HTTP headers

## 💡 Tips

1. **Use Postman**: Import the API endpoints for easier testing
2. **Check Logs**: Monitor the console for request logs (Morgan)
3. **Environment Variables**: Never commit sensitive data
4. **Test First**: Use the validation script: `node validate-app.js`
5. **Documentation**: Keep API_TESTING.md updated with new endpoints

## 🆘 Need Help?

- Check the full README.md
- Review API_TESTING.md for endpoint examples
- Examine the code comments
- Run validation: `node validate-app.js`

---

Happy coding! 🚀
