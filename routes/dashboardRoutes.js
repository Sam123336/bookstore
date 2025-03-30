

const express = require('express');
const router = express.Router();


const dashboardController = require('../controllers/dashboardController');


router.get('/', dashboardController.renderDashboard);


router.get('/search', dashboardController.searchBooks);

module.exports = router;
