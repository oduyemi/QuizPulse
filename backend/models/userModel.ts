import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  user_id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  password: string;
}

const userSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model<IUser>("User", userSchema);


export default User;
