import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import doctorRoutes from './routes/doctorRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import queueRoutes from './routes/queueRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';

const app = express();

// Middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL ? [process.env.CLIENT_URL, 'http://localhost:5173'] : true,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

let isDatabaseSeededOrChecked = false;

// Auto-connect to MongoDB for serverless / Vercel execution
app.use(async (req, res, next) => {
  try {
    await connectDB();

    if (!isDatabaseSeededOrChecked) {
      isDatabaseSeededOrChecked = true;
      const User = (await import('./models/User.js')).default;
      const count = await User.countDocuments();
      if (count === 0) {
        console.log('[Auto-Seed] Database is empty. Seeding initial doctors, demo users, and clinic queues...');
        const seedData = (await import('./seeds/seed.js')).default;
        await seedData();
      }
    }

    next();
  } catch (err) {
    console.error('[DB Middleware Error]:', err.message);
    res.status(500).json({
      success: false,
      message: 'Database connection failed. Please ensure MONGO_URI is set in environment variables.',
    });
  }
});

// URL normalizer: ensures requests hit routes whether or not /api was stripped by serverless proxy
app.use((req, res, next) => {
  if (!req.url.startsWith('/api')) {
    req.url = '/api' + (req.url.startsWith('/') ? req.url : '/' + req.url);
  }
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'MediSlot Backend API',
    uptime: process.uptime(),
  });
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/queue', queueRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/admin', adminRoutes);

// 404 Route Handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint '${req.originalUrl}' not found.`,
  });
});

// Centralized Error Handling Middleware
app.use(errorHandler);

export default app;
