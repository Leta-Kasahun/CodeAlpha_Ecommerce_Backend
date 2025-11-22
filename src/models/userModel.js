import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['client', 'owner'], 
    default: 'client' 
  },
  phone: { type: String },
  address: {
    city: String,
    postalCode: String,
    country: String
  },
  isVerified: { type: Boolean, default: false },

  // Sign-up OTP (existing)
  otp: { type: String },
  otpExpires: { type: Date },

  // Password reset: minimal additions
  otpReset: { type: String },               // stores 6-digit OTP for reset
  otpResetExpires: { type: Date },          // expiry for reset OTP
  passwordResetToken: { type: String },     // hashed (sha256) one-time reset token
  passwordResetExpires: { type: Date }      // expiry for password reset token
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;