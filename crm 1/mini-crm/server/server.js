const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const sequelize = require('./config/database');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database synchronization (creates tables if they don't exist)
const createDefaultAdmin = require('./create-default-admin');

sequelize.sync({ alter: false })
  .then(async () => {
    console.log('Database tables synced successfully');
    await createDefaultAdmin();
  })
  .catch(err => {
    console.error('Unable to sync database:', err);
  });

// Routes
const authRoutes = require('./routes/authRoutes');
const leadRoutes = require('./routes/leadRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;