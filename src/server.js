const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

// Middleware
app.use(express.json());
app.use(limiter);

// Swagger documentation
const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Routes
// app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/todos', require('./routes/todoRoutes'));

// Connect to MongoDB
// MongoDB connection with error handling
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log('Successfully connected to MongoDB.');
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
  process.exit(1); // Exit process with failure
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});