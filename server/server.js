require('dotenv').config(); // Only require dotenv.config() once
const express = require('express');
const connectDB = require('./config/db');
const contactRoutes = require('./routes/contactRoutes');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors'); // Import CORS package

// Initialize Express app
const app = express();

// CORS configuration
const corsOptions = {
    origin: 'http://localhost:3000',  // Allow requests only from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'],  // Allowed request headers
};

// Middleware
app.use(cors(corsOptions)); // Enable CORS for all origins (you can configure it later for specific origins if needed)

app.use(express.json()); // Parse JSON bodies

// Routes for contact CRUD (Ensure this comes after cors middleware)
app.use('/api/contacts', contactRoutes);

// Connect to MongoDB
connectDB();

// Error handling middleware (Ensure this comes after your routes)
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
