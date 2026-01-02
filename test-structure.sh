#!/bin/bash

# Test script to verify Node.js backend application structure and components

echo "🔍 Testing Node.js Backend Application Structure..."
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Counter for passed/failed tests
PASSED=0
FAILED=0

# Function to check if file exists
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} File exists: $1"
        ((PASSED++))
    else
        echo -e "${RED}✗${NC} File missing: $1"
        ((FAILED++))
    fi
}

# Function to check if directory exists
check_dir() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✓${NC} Directory exists: $1"
        ((PASSED++))
    else
        echo -e "${RED}✗${NC} Directory missing: $1"
        ((FAILED++))
    fi
}

# Function to check if string exists in file
check_content() {
    if grep -q "$2" "$1"; then
        echo -e "${GREEN}✓${NC} Found '$2' in $1"
        ((PASSED++))
    else
        echo -e "${RED}✗${NC} Missing '$2' in $1"
        ((FAILED++))
    fi
}

echo "📁 Checking Project Structure..."
echo "================================"

# Check main entry files
check_file "server.js"
check_file "app.js"
check_file "package.json"
check_file ".gitignore"
check_file "config.env"
check_file "README.md"

echo ""
echo "📂 Checking MVC Structure..."
echo "================================"

# Check directories
check_dir "models"
check_dir "views"
check_dir "controllers"
check_dir "routes"
check_dir "utils"
check_dir "public"

echo ""
echo "📋 Checking Models..."
echo "================================"
check_file "models/userModel.js"
check_file "models/tourModel.js"

echo ""
echo "🎮 Checking Controllers..."
echo "================================"
check_file "controllers/authController.js"
check_file "controllers/errorController.js"
check_file "controllers/tourController.js"
check_file "controllers/userController.js"
check_file "controllers/viewController.js"

echo ""
echo "🛣️  Checking Routes..."
echo "================================"
check_file "routes/tourRoutes.js"
check_file "routes/userRoutes.js"
check_file "routes/viewRoutes.js"

echo ""
echo "🛠️  Checking Utilities..."
echo "================================"
check_file "utils/apiFeatures.js"
check_file "utils/appError.js"
check_file "utils/catchAsync.js"

echo ""
echo "🎨 Checking Views (Pug Templates)..."
echo "================================"
check_file "views/base.pug"
check_file "views/overview.pug"
check_file "views/tour.pug"
check_file "views/login.pug"
check_file "views/signup.pug"
check_file "views/account.pug"
check_file "views/error.pug"

echo ""
echo "🌐 Checking Public Assets..."
echo "================================"
check_file "public/css/style.css"
check_file "public/js/index.js"
check_dir "public/img"

echo ""
echo "🔐 Checking Authentication Features..."
echo "================================"
check_content "controllers/authController.js" "signup"
check_content "controllers/authController.js" "login"
check_content "controllers/authController.js" "protect"
check_content "controllers/authController.js" "restrictTo"
check_content "controllers/authController.js" "forgotPassword"
check_content "controllers/authController.js" "resetPassword"

echo ""
echo "🔒 Checking Security Middleware..."
echo "================================"
check_content "app.js" "helmet"
check_content "app.js" "rateLimit"
check_content "app.js" "mongoSanitize"
check_content "app.js" "xss"
check_content "app.js" "hpp"

echo ""
echo "📊 Checking API Features..."
echo "================================"
check_content "utils/apiFeatures.js" "filter"
check_content "utils/apiFeatures.js" "sort"
check_content "utils/apiFeatures.js" "limitFields"
check_content "utils/apiFeatures.js" "paginate"

echo ""
echo "🔴 Checking Error Handling..."
echo "================================"
check_content "controllers/errorController.js" "handleCastErrorDB"
check_content "controllers/errorController.js" "handleDuplicateFieldsDB"
check_content "controllers/errorController.js" "handleValidationErrorDB"
check_content "controllers/errorController.js" "handleJWTError"

echo ""
echo "🗄️  Checking Database Models..."
echo "================================"
check_content "models/userModel.js" "bcrypt"
check_content "models/userModel.js" "correctPassword"
check_content "models/userModel.js" "changedPasswordAfter"
check_content "models/tourModel.js" "mongoose.Schema"

echo ""
echo "🚀 Checking CRUD Operations..."
echo "================================"
check_content "controllers/tourController.js" "getAllTours"
check_content "controllers/tourController.js" "getTour"
check_content "controllers/tourController.js" "createTour"
check_content "controllers/tourController.js" "updateTour"
check_content "controllers/tourController.js" "deleteTour"

echo ""
echo "📦 Checking Package Dependencies..."
echo "================================"
check_content "package.json" "express"
check_content "package.json" "mongoose"
check_content "package.json" "bcryptjs"
check_content "package.json" "jsonwebtoken"
check_content "package.json" "helmet"
check_content "package.json" "express-rate-limit"
check_content "package.json" "pug"
check_content "package.json" "validator"
check_content "package.json" "compression"
check_content "package.json" "morgan"

echo ""
echo "📜 Checking NPM Scripts..."
echo "================================"
check_content "package.json" '"start"'
check_content "package.json" '"dev"'

echo ""
echo "================================"
echo "📊 Test Results Summary"
echo "================================"
echo -e "${GREEN}✓ Passed: $PASSED${NC}"
echo -e "${RED}✗ Failed: $FAILED${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}🎉 All tests passed! Application structure is complete.${NC}"
    exit 0
else
    echo -e "${RED}⚠️  Some tests failed. Please review the structure.${NC}"
    exit 1
fi
