const mongoose = require('mongoose');
//const Hospital = require('../../a-7-Pattarapol2550/models/Hospital');

const ShopSchema = new mongoose.Schema({
    name: {
    type: String,
    required: [true, 'Please add a name'],
    unique: true,
    trim: true,
    maxLength: [50, 'Name can not be more than 50 characters']
},
address: {
    type: String,
    required: [true, 'Please add an address']
},
tel: {
    type: String
},
openTime: {
    type : String
},
closeTime :{
    type : String
}

},{
    toJSON:{virtuals:true },
    toObject:{virtuals:true}
});

//Reverse populate with virsual
ShopSchema.virtual('appointments',{
  ref:'Appointment',
  localField:'_id',
  foreignField:'shop',  
  justOne:false
});

module.exports = mongoose.model('MassageShop', ShopSchema);