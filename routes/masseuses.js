const express = require('express');
const router = express.Router({ mergeParams: true });

const { getMasseuses, addMasseuse ,getAllMasseuses, deleteMasseuse ,updateMasseuse} = require('../controllers/masseuses');
const { protect, authorize } = require('../middleware/auth');

// GET masseuses of shop
router.route('/')
.get(protect, getMasseuses)
.post(protect, authorize('admin'), addMasseuse);

router.delete('/:id', protect, authorize('admin'), deleteMasseuse);
router.put('/:id', protect, authorize('admin'), updateMasseuse);
router.get('/all', getAllMasseuses);

module.exports = router;