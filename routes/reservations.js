const express = require('express');
const {getAppointments,getAppointment,addAppointment, updateAppointment,deleteAppointment}= require('../controllers/reservations');

const router = express.Router({mergeParams:true});
const {protect,authorize} =require('../middleware/auth');
//router.route('/').get(getAppointments);

router.route('/').get(protect,getReservations)
.post(protect,authorize('admin','user'),addReservations);

router.route('/:id').get(protect,getReservation)
.put(protect,authorize('admin','user'),updateReservation)
.delete(protect,authorize('admin','user'),deleteReservation);
module.exports = router;