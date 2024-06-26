require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI || '';

const dbConnection = async () => {
  try {
    await mongoose.connect(uri, { dbName: 'mongo-proj' });

    console.log('Database is online');
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  dbConnection,
};
