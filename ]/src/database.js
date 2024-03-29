const mongoose = require('mongoose');

async function connectToDatabase() {
  // Asegúrate de que MONGO_URI está definido en tu archivo .env
  const dbUri = process.env.MONGO_URI;
  try {
    // Conectar a MongoDB
    await mongoose.connect(dbUri);
    console.log('Connected to the database successfully');
  } catch (error) {
    console.error('Could not connect to the database:', error.message, error.stack);
  }
}

module.exports = connectToDatabase;
