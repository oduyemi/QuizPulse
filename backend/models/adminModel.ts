import mongoose, { Schema, Document } from 'mongoose';

export interface IAdmin extends Document {
  admin_id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
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
  password: {
    type: String,
    required: true,
  },
});

const Admin = mongoose.model<IAdmin>('Admin', adminSchema);

export default Admin;
