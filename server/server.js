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
app.use(morgan('dev'));

// Routes
app.use('/api', apiRouter);

// Root greeting
app.get('/', (req, res) => {
  res.json({
    agency: 'Gujarat Organic Products Certification Agency (GOPCA)',
    portal: 'GOPCA MERN Backend API',
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

// Start Server
async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`  GOPCA MERN Backend Server running on port ${PORT}`);
    console.log(`  API Health: http://localhost:${PORT}/api/health`);
    console.log(`====================================================`);
  });
}

startServer();
