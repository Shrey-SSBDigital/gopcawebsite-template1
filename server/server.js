const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const { connectDB } = require('./db');
const apiRouter = require('./routes/api');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));

if (!process.env.VERCEL && process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Lazy/cached DB connect middleware for serverless invocations
let dbInitPromise = null;
app.use(async (req, res, next) => {
  if (!dbInitPromise) {
    dbInitPromise = connectDB().catch(err => {
      console.warn('DB initialization error (using resilient store):', err.message);
    });
  }
  await dbInitPromise;
  next();
});

// Routes
app.use('/api', apiRouter);

// Fallback in case Vercel rewrite strips the /api prefix
app.use((req, res, next) => {
  if (req.path === '/' || req.path.startsWith('/api')) {
    return next();
  }
  return apiRouter(req, res, next);
});

// Root greeting
app.get(['/', '/api'], (req, res) => {
  res.json({
    agency: 'Gujarat Organic Products Certification Agency (GOPCA)',
    portal: 'GOPCA MERN Backend API',
    status: 'online',
    endpoints: {
      health: '/api/health',
      stats: '/api/stats',
      operators: '/api/operators',
      applications: '/api/applications',
      inquiries: '/api/inquiries',
      circulars: '/api/circulars',
      inputs: '/api/inputs',
      downloads: '/api/downloads',
      staff: '/api/staff',
      farmers: '/api/farmers'
    }
  });
});

// Start Server when run directly
async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`  GOPCA MERN Backend Server running on port ${PORT}`);
    console.log(`  API Health: http://localhost:${PORT}/api/health`);
    console.log(`====================================================`);
  });
}

if (require.main === module && process.env.NODE_ENV !== 'test' && !process.env.VERCEL) {
  startServer();
}

module.exports = app;
