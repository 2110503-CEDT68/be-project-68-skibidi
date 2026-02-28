const express = require('express');
const router = express.Router({ mergeParams: true });

const { getMasseuses, addMasseuse } = require('../controllers/masseuses');
const { protect, authorize } = require('../middleware/auth');

// GET masseuses of shop
router.route('/')
.get(protect, getMasseuses)
.post(protect, authorize('admin'), addMasseuse);

module.exports = router;