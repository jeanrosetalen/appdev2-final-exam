const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { faker }= require('@faker-js/faker');
require('dotenv').config();

const User = require('./models/User'); // Adjust path if needed
const Event = require('./models/Event'); // Adjust path if needed

const MONGO_URI = process.env.MONGO_URI ;
const DEFAULT_PASSWORD = 'secret123';
const SALT_ROUNDS = 10;

// Database seeding function
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Event.deleteMany({});
    console.log('🗑️ Cleared all users and events');

    // Seed Users
    const users = [];
    for (let i = 0; i < 5; i++) {
      const hashedPassword = await bcrypt.hash(DEFAULT_PASSWORD, SALT_ROUNDS);
      const user = new User({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: hashedPassword
      });
      users.push(await user.save());
    }
    console.log('👥 Seeded 5 users');

    // Seed Events
    const events = [];
    for (let i = 0; i < 10; i++) {
      const event = new Event({
        title: faker.lorem.words(3),
        date: faker.date.future(),
        location: faker.address.city(),
        organizer: users[Math.floor(Math.random() * users.length)]._id // Random user
      });
      events.push(await event.save());
    }
    console.log('📅 Seeded 10 events');

    // Close connection
    mongoose.connection.close();
    console.log('🎉 Database seeding complete!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    mongoose.connection.close();
  }
};


seedDatabase();
