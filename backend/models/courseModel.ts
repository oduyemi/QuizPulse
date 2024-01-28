import mongoose, { Schema, Document } from 'mongoose';

export interface ICourse extends Document {
  name: string;
  description: string;
  category: string;
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
  category: {
    type: String,
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

export default Courses;



