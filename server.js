// Load environment variables from .env file
require('dotenv').config();

// Import required dependencies
const express = require('express'); // Web framework for Node.js
const mongoose = require('mongoose'); // MongoDB object modeling tool
const cors = require('cors'); // Cross-Origin Resource Sharing middleware
const path = require('path'); // Node.js path utilities

// Import route handlers
const taskRoutes = require('./routes/tasks');

// Initialize Express application
const app = express();

// Configure middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from public directory

// Establish MongoDB database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process if database connection fails
  });

// Register API route handlers
app.use('/api/tasks', taskRoutes); // Mount task routes under /api/tasks endpoint

// Serve the main HTML page for root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the Express server
const PORT = process.env.PORT || 3000; // Use environment variable or default to port 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
