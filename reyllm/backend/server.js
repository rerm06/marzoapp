require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001; // Avoid using port 5000 as it's reserved

// Passport config
require('./config/passportConfig')(passport);

// DB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(cors());

// Express session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/documents', require('./routes/documentRoutes'));
app.use('/api/workspaces', require('./routes/workspaceRoutes'));

app.get('/', (req, res) => {
  res.send('reyllm backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
}).on('error', (err) => {
  console.error('Failed to start server:', err);
});