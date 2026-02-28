const Masseuse = require('../models/Masseuse');
const Shop = require('../models/Shop');

exports.addMasseuse = async (req,res)=>{
    try{
        req.body.shop = req.params.shopId;

        const shop = await Shop.findById(req.params.shopId);
        if(!shop){
            return res.status(404).json({success:false,message:'No shop'});
        }

        const masseuse = await Masseuse.create(req.body);

        res.status(200).json({
            success:true,
            data:masseuse
        });

    }catch(err){
        console.log(err);
        res.status(500).json({success:false});
    }
};

exports.getMasseuses = async(req,res)=>{
   const data = await Masseuse.find({shop:req.params.shopId}).populate({
        path:'shop',
        select:'name address telephone'
   });
   res.json({success:true,data});
};

exports.getAllMasseuses = async (req,res)=>{
    try{
        const masseuses = await Masseuse.find().populate({
            path:'shop',
            select:'name address telephone'
        });

        res.status(200).json({
            success:true,
            count: masseuses.length,
            data: masseuses
        });

    }catch(err){
        console.log(err);
        res.status(500).json({success:false});
    }
};