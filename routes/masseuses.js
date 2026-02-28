const express = require('express');
const {addMasseuse} = require('../controllers/masseuses');
const {protect,authorize} = require('../middleware/auth');

const router = express.Router({mergeParams:true});

router.route('/')
.post(protect,authorize('admin'),addMasseuse);

module.exports = router;