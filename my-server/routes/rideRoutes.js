const express = require('express');
const { createRide, getRide } = require('../controllers/rideController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', auth, createRide);
router.get('/:id', auth, getRide);

module.exports = router;
