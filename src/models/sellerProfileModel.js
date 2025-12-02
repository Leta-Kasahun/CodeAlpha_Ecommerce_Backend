import mongoose from 'mongoose';

const sellerProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true 
  },

  shopName: { type: String, required: true, trim: true },

  demoPayoutNumber: { type: String },
  bankName: { type: String },          

  phoneForOrders: { type: String },  

  shopAddress: {                     
    city: String,
    postalCode: String,
    country: String
  },

  isApproved: { type: Boolean, default: true } // for approval flow if needed
}, { timestamps: true });

const SellerProfile = mongoose.model('SellerProfile', sellerProfileSchema);
export default SellerProfile;
