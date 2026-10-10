require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Template Store API is running' });
});

// API route
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/templates', require('./routes/templateRoutes'));
app.use('/api/favorites', require('./routes/favoriteRoutes'));


// Error handler
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ message: 'Invalid JSON in request body' });
  }
  console.error(err);
  res.status(500).json({ message: 'Server error' });
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});