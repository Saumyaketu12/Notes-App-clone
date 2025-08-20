import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true, index: true },
  passwordHash: { type: String, required: true },
  name: { type: String },
  createdAt: { type: Date, default: Date.now }
});

UserSchema.methods.toPublic = function () {
  return {
    _id: this._id,
    email: this.email,
    name: this.name,
    createdAt: this.createdAt
  };
};

export default mongoose.model('User', UserSchema);
