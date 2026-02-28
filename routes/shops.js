

const express = require('express');

const {getHospitals,getHospital,createHospital,updateHospital,deleteHospital} =require('../controllers/shops');

//include other resource routers
const appointmentRouter = require('./reservations');

const router = express.Router();
const{protect,authorize} = require('../middleware/auth');

//Re-route into other resource routers
router.use('/:hospitalId/appointments/',appointmentRouter);
//const app= express();

router.route('/').get(getShops).post(protect,authorize('admin'), createShop);
router.route('/:id').get(getShop).put(protect,authorize('admin'), updateShop).delete(protect,authorize('admin'), deleteShop);

module.exports = router;