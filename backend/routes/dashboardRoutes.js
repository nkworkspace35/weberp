const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../controllers/dashboardController');

// GET request: API route for stats
router.get('/stats', getDashboardStats);

module.exports = router;