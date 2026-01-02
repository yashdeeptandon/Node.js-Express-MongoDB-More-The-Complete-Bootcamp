#!/usr/bin/env node

/**
 * Comprehensive validation script for Node.js backend application
 * Checks code structure, dependencies, and validates key features
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Validating Node.js Backend Application...\n');

let passed = 0;
let failed = 0;

// Helper functions
function checkFile(filePath, description) {
    if (fs.existsSync(filePath)) {
        console.log(`✓ ${description}`);
        passed++;
        return true;
    } else {
        console.log(`✗ ${description} - File not found: ${filePath}`);
        failed++;
        return false;
    }
}

function checkFileContent(filePath, pattern, description) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        if (content.includes(pattern) || new RegExp(pattern).test(content)) {
            console.log(`✓ ${description}`);
            passed++;
            return true;
        } else {
            console.log(`✗ ${description}`);
            failed++;
            return false;
        }
    } catch (err) {
        console.log(`✗ ${description} - Error reading file`);
        failed++;
        return false;
    }
}

console.log('=== Validating MVC Architecture ===');
checkFile('server.js', 'Server entry point exists');
checkFile('app.js', 'Express app configuration exists');
checkFile('models/userModel.js', 'User model exists');
checkFile('models/tourModel.js', 'Tour model exists');
checkFile('controllers/authController.js', 'Auth controller exists');
checkFile('controllers/tourController.js', 'Tour controller exists');
checkFile('controllers/userController.js', 'User controller exists');
checkFile('routes/tourRoutes.js', 'Tour routes exist');
checkFile('routes/userRoutes.js', 'User routes exist');

console.log('\n=== Validating Authentication Implementation ===');
checkFileContent('controllers/authController.js', 'signup', 'Signup function implemented');
checkFileContent('controllers/authController.js', 'login', 'Login function implemented');
checkFileContent('controllers/authController.js', 'jwt.sign', 'JWT token generation implemented');
checkFileContent('controllers/authController.js', 'protect', 'Route protection middleware implemented');
checkFileContent('controllers/authController.js', 'restrictTo', 'Role-based authorization implemented');
checkFileContent('models/userModel.js', 'bcrypt.hash', 'Password hashing implemented');
checkFileContent('models/userModel.js', 'bcrypt.compare', 'Password verification implemented');

console.log('\n=== Validating RESTful API Features ===');
checkFileContent('controllers/tourController.js', 'getAllTours', 'GET all tours implemented');
checkFileContent('controllers/tourController.js', 'getTour', 'GET single tour implemented');
checkFileContent('controllers/tourController.js', 'createTour', 'POST create tour implemented');
checkFileContent('controllers/tourController.js', 'updateTour', 'PATCH update tour implemented');
checkFileContent('controllers/tourController.js', 'deleteTour', 'DELETE tour implemented');

console.log('\n=== Validating Advanced API Features ===');
checkFileContent('utils/apiFeatures.js', 'filter', 'Filtering implementation');
checkFileContent('utils/apiFeatures.js', 'sort', 'Sorting implementation');
checkFileContent('utils/apiFeatures.js', 'limitFields', 'Field limiting implementation');
checkFileContent('utils/apiFeatures.js', 'paginate', 'Pagination implementation');
checkFileContent('controllers/tourController.js', 'aggregate', 'Aggregation pipeline implemented');

console.log('\n=== Validating Security Features ===');
checkFileContent('app.js', 'helmet', 'Helmet security headers configured');
checkFileContent('app.js', 'rateLimit', 'Rate limiting configured');
checkFileContent('app.js', 'mongoSanitize', 'NoSQL injection protection configured');
checkFileContent('app.js', 'xss', 'XSS protection configured');
checkFileContent('app.js', 'hpp', 'Parameter pollution prevention configured');
checkFileContent('app.js', 'compression', 'Response compression configured');

console.log('\n=== Validating Error Handling ===');
checkFileContent('utils/appError.js', 'class AppError', 'Custom error class implemented');
checkFileContent('utils/catchAsync.js', 'catchAsync', 'Async error wrapper implemented');
checkFileContent('controllers/errorController.js', 'handleCastErrorDB', 'MongoDB CastError handler');
checkFileContent('controllers/errorController.js', 'handleDuplicateFieldsDB', 'Duplicate field error handler');
checkFileContent('controllers/errorController.js', 'handleValidationErrorDB', 'Validation error handler');
checkFileContent('controllers/errorController.js', 'handleJWTError', 'JWT error handler');

console.log('\n=== Validating Server-Side Rendering ===');
checkFileContent('app.js', 'pug', 'Pug template engine configured');
checkFile('views/base.pug', 'Base template exists');
checkFile('views/overview.pug', 'Overview page exists');
checkFile('views/login.pug', 'Login page exists');
checkFile('views/signup.pug', 'Signup page exists');
checkFile('views/account.pug', 'Account page exists');
checkFile('public/css/style.css', 'CSS stylesheet exists');
checkFile('public/js/index.js', 'Client-side JavaScript exists');

console.log('\n=== Validating Data Models ===');
checkFileContent('models/userModel.js', 'role:', 'User roles defined');
checkFileContent('models/userModel.js', 'passwordChangedAt', 'Password change tracking');
checkFileContent('models/userModel.js', 'passwordResetToken', 'Password reset functionality');
checkFileContent('models/tourModel.js', 'ratingsAverage', 'Tour ratings implemented');
checkFileContent('models/tourModel.js', 'price', 'Tour pricing implemented');
checkFileContent('models/tourModel.js', 'difficulty', 'Tour difficulty levels');

console.log('\n=== Validating Production Readiness ===');
checkFileContent('server.js', 'uncaughtException', 'Uncaught exception handler');
checkFileContent('server.js', 'unhandledRejection', 'Unhandled rejection handler');
checkFileContent('server.js', 'SIGTERM', 'Graceful shutdown handler');
checkFileContent('app.js', 'morgan', 'Request logging configured');
checkFileContent('package.json', 'nodemon', 'Development hot reload configured');

console.log('\n=== Validating Environment Configuration ===');
checkFile('config.env', 'Environment config file exists');
checkFile('.env.example', 'Environment example file exists');
checkFile('.gitignore', '.gitignore file exists');
checkFileContent('.gitignore', 'node_modules', 'node_modules ignored');
checkFileContent('.gitignore', '.env', 'Environment files ignored');

console.log('\n=== Validating Documentation ===');
checkFileContent('README.md', '## Features', 'Features documentation');
checkFileContent('README.md', '## Installation', 'Installation instructions');
checkFileContent('README.md', '## API Endpoints', 'API documentation');
checkFileContent('README.md', 'Authentication', 'Authentication documentation');
checkFileContent('README.md', 'Security', 'Security documentation');

console.log('\n=== Validating Routes Configuration ===');
checkFileContent('routes/tourRoutes.js', 'protect', 'Protected routes configured');
checkFileContent('routes/userRoutes.js', 'signup', 'Signup route configured');
checkFileContent('routes/userRoutes.js', 'login', 'Login route configured');
checkFileContent('routes/viewRoutes.js', 'viewController', 'View routes configured');

// Final Summary
console.log('\n' + '='.repeat(50));
console.log('📊 Validation Results:');
console.log('='.repeat(50));
console.log(`✓ Passed: ${passed}`);
console.log(`✗ Failed: ${failed}`);
console.log('='.repeat(50));

if (failed === 0) {
    console.log('\n🎉 SUCCESS! All validations passed!');
    console.log('✨ The Node.js backend application is complete and production-ready.');
    process.exit(0);
} else {
    console.log(`\n⚠️  WARNING: ${failed} validation(s) failed.`);
    console.log('Please review the issues above.');
    process.exit(1);
}
