import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import chatbotRoutes from './routes/chatbotRoutes.js';
import quotationRoutes from './routes/quotationRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/quotation', quotationRoutes);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully.'))
  .catch((error) => {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  });

app.get('/ping', (req, res) => {
  console.log('Received a ping request.');
  res.json({ status: 'success', message: 'pong' });
});

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  if (process.env.NODE_ENV === 'development') {
    res.status(error.status || 500).json({ error: { message: error.message, stack: error.stack } });
  } else {
    res.status(error.status || 500).json({ error: { message: error.message } });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));