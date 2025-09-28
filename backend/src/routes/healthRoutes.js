const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

// Health check endpoint
router.get('/', async (req, res) => {
  try {
    const healthCheck = {
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: process.env.npm_package_version || '1.0.0',
      services: {
        database: 'Unknown'
      }
    };

    // Check database connection
    if (mongoose.connection.readyState === 1) {
      healthCheck.services.database = 'Connected';
    } else {
      healthCheck.services.database = 'Disconnected';
      healthCheck.status = 'DEGRADED';
    }

    const statusCode = healthCheck.status === 'OK' ? 200 : 503;
    res.status(statusCode).json(healthCheck);
  } catch (error) {
    res.status(503).json({
      status: 'ERROR',
      timestamp: new Date().toISOString(),
      message: 'Health check failed',
      error: error.message
    });
  }
});

// Detailed health check
router.get('/detailed', async (req, res) => {
  try {
    const healthCheck = {
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: process.env.npm_package_version || '1.0.0',
      memory: process.memoryUsage(),
      cpu: process.cpuUsage(),
      services: {
        database: {
          status: 'Unknown',
          readyState: mongoose.connection.readyState
        }
      }
    };

    // Check database connection
    if (mongoose.connection.readyState === 1) {
      healthCheck.services.database.status = 'Connected';
      healthCheck.services.database.host = mongoose.connection.host;
      healthCheck.services.database.port = mongoose.connection.port;
      healthCheck.services.database.name = mongoose.connection.name;
    } else {
      healthCheck.services.database.status = 'Disconnected';
      healthCheck.status = 'DEGRADED';
    }

    const statusCode = healthCheck.status === 'OK' ? 200 : 503;
    res.status(statusCode).json(healthCheck);
  } catch (error) {
    res.status(503).json({
      status: 'ERROR',
      timestamp: new Date().toISOString(),
      message: 'Detailed health check failed',
      error: error.message
    });
  }
});

module.exports = router;
