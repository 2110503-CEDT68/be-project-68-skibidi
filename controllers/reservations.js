const Reservation = require('../models/Reservation');
const Shop = require('../models/Shop');
const { patch } = require('../routes/reservations');

exports.getReservations = async (req, res, next) => {
    let query;

    if (req.user.role !== 'admin') {
        query = Reservation.find({ user: req.user.id }).populate({
            path: 'shop',
            select: 'name address tel openTime closeTime'
        });

    } else { //if u are admin
        if(req.params.ShopId){
            console.log(req.params.ShopId);
            query=Reservation.find({shop : req.params.ShopId}).populate({
                path: 'shop',
            select: 'name address tel openTime closeTime'
            });
        }else{
            query = Reservation.find().populate({
                path: 'shop',
            select: 'name address tel openTime closeTime'
            });
        }
    }

   
    try {
        const reservations = await query;

        res.status(200).json({
            success: true,
            count: reservations.length,
            data: reservations
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Cannot find Reservation"
        });
    }
};


exports.getReservation = async(req,res,next)=>{
    try {
    const reservation = await Reservation.findById(req.params.id).populate({
        path: 'shop',
        select: 'name address tel openTime closeTime'
    });

    if (!reservation) {
        return res.status(404).json({
            success: false,
            message: `No reservation with the id of ${req.params.id}`
        });
    }

    res.status(200).json({
        success: true,
        data: reservation
    });

} catch (error) {
    console.log(error);
    return res.status(500).json({
        success: false,
        message: "Cannot find Reservation"
    });
}
};

exports.addReservation = async(req,res,next)=>{
    try{
        req.body.shop=req.params.ShopId;
        const shop = await Shop.findById(req.params.ShopId);

        if(!shop){
            return res.status(404).json({success:false,message : `No MassageShop with the id of ${req.params.ShopId}`});
        }
        
        //add userId to req.body
        req.body.user = req.user.id;

        //Check appointment
        const existedReservation = await Reservation.find({user:req.user.id});

        //if not admin can create only 3 appointment
        if(existedReservation.length >= 3 && req.user.role !== 'admin'){
            return res.status(400).json({success:false,message:` The user with ID ${req.user.id} has already made 3 appointments`});

        }
        const reservation = await Reservation.create(req.body);
 
        res.status(200).json({success:true,data:reservation});
        
    }catch(error){
        console.log(error);
        return res.status(500).json({success:false,message:"Cannot create Reservation"});
    }
};

exports.updateReservation = async (req, res, next) => {
    try {
        let reservation = await Reservation.findById(req.params.id);

        if (!reservation) {
            return res.status(404).json({
                success: false,
                message: `No reservation with the id of ${req.params.id}`
            });
        }

        //can edit only owner appointment
        if(reservation.user.toString()!== req.user.id && req.user.role !== 'admin'){
            return res.status(401).json({success:false,message:`User ${req.user.id} is not authorized to update this reservation`});
        }

        reservation = await Reservation.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            success: true,
            data: reservation
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Cannot update Reservation"
        });
    }
};

exports.deleteReservation = async(req,res,next)=>{
    try{
         const reservation = await Reservation.findById(req.params.id);

        if (!reservation) {
            return res.status(404).json({
                success: false,
                message: `No reservation with the id of ${req.params.id}`
            });
        }
        //only owner can delete his appointment
         if(reservation.user.toString()!== req.user.id && req.user.role !== 'admin'){
            return res.status(401).json({success:false,message:`User ${req.user.id} is not authorized to delete this reservation`});
        }
        await reservation.deleteOne();
        res.status(200).json({
            success: true,
            data: {}
        });
    }catch(error){
         console.log(error);
        return res.status(500).json({
            success: false,
            message: "Cannot delete Reservation"
        });
    }
}