import mongoose, { Schema, Document } from 'mongoose';

export interface IAdmin extends Document {
  admin_id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phone: string
  password: string;
  salt: string;
}

const adminSchema: Schema = new mongoose.Schema({
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
  salt: {
    type: String,
    required: true,
  },
});

const Admin = mongoose.model<IAdmin>('Admin', adminSchema);


export default Admin;
