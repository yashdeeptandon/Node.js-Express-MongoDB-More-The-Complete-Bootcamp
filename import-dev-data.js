const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./models/tourModel');
const User = require('./models/userModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD || ''
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'));

// Sample tour data
const tours = [
  {
    name: 'The Forest Hiker',
    duration: 5,
    maxGroupSize: 25,
    difficulty: 'easy',
    ratingsAverage: 4.7,
    ratingsQuantity: 37,
    price: 397,
    summary: 'Breathtaking hike through the Canadian Banff National Park',
    description:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    imageCover: 'tour-1-cover.jpg',
    images: ['tour-1-1.jpg', 'tour-1-2.jpg', 'tour-1-3.jpg'],
    startDates: [
      new Date('2024-04-25,10:00'),
      new Date('2024-07-20,10:00'),
      new Date('2024-10-05,10:00'),
    ],
  },
  {
    name: 'The Sea Explorer',
    duration: 7,
    maxGroupSize: 15,
    difficulty: 'medium',
    ratingsAverage: 4.8,
    ratingsQuantity: 23,
    price: 497,
    summary: 'Exploring the jaw-dropping US east coast by foot and by boat',
    description:
      'Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    imageCover: 'tour-2-cover.jpg',
    images: ['tour-2-1.jpg', 'tour-2-2.jpg', 'tour-2-3.jpg'],
    startDates: [
      new Date('2024-06-19,10:00'),
      new Date('2024-07-20,10:00'),
      new Date('2024-08-18,10:00'),
    ],
  },
  {
    name: 'The Snow Adventurer',
    duration: 4,
    maxGroupSize: 10,
    difficulty: 'difficult',
    ratingsAverage: 4.5,
    ratingsQuantity: 13,
    price: 997,
    summary: 'Exciting adventure in the snow with snowboarding and skiing',
    description:
      'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum!',
    imageCover: 'tour-3-cover.jpg',
    images: ['tour-3-1.jpg', 'tour-3-2.jpg', 'tour-3-3.jpg'],
    startDates: [
      new Date('2024-01-05,10:00'),
      new Date('2024-02-12,10:00'),
      new Date('2024-01-06,10:00'),
    ],
  },
  {
    name: 'The City Wanderer',
    duration: 9,
    maxGroupSize: 20,
    difficulty: 'easy',
    ratingsAverage: 4.6,
    ratingsQuantity: 54,
    price: 1197,
    summary: 'Living the life of Wanderlust in the US most beatiful cities',
    description:
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat lorem ipsum dolor sit amet.',
    imageCover: 'tour-4-cover.jpg',
    images: ['tour-4-1.jpg', 'tour-4-2.jpg', 'tour-4-3.jpg'],
    startDates: [
      new Date('2024-03-11,10:00'),
      new Date('2024-05-02,10:00'),
      new Date('2024-06-09,10:00'),
    ],
  },
  {
    name: 'The Park Camper',
    duration: 10,
    maxGroupSize: 15,
    difficulty: 'medium',
    ratingsAverage: 4.9,
    ratingsQuantity: 19,
    price: 1497,
    summary:
      'Breathing in Nature in Americas most spectacular National Parks',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    imageCover: 'tour-5-cover.jpg',
    images: ['tour-5-1.jpg', 'tour-5-2.jpg', 'tour-5-3.jpg'],
    startDates: [
      new Date('2024-08-05,10:00'),
      new Date('2025-03-20,10:00'),
      new Date('2025-08-12,10:00'),
    ],
  },
];

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
