import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  category_id: mongoose.Types.ObjectId;
  name: string;
  description: string;
  img: mongoose.Types.ObjectId;
}

const courseCategorySchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
});

const Categories = mongoose.model<ICategory>('Categories', courseCategorySchema);


export default Categories ; 



