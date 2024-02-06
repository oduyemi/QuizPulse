import mongoose, { Schema, Document } from 'mongoose';

export interface ICourse extends Document {
  course_id: mongoose.Types.ObjectId;
  name: string;
  description: string;
  category_id: mongoose.Types.ObjectId;
  img: string;
  quizzes: mongoose.Types.ObjectId[];
}

const courseSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categories', 
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  quizzes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz', 
  }],
});

const Courses = mongoose.model<ICourse>('Courses', courseSchema);


export default Courses ; 



