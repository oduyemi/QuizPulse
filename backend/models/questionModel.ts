import mongoose, { Schema, Document } from 'mongoose';

export interface IQuestion extends Document {
  questionText: string;
  options: string[];
  correctAnswer: string;
  difficultyLevel: 'easy' | 'medium' | 'hard';
  category: string;
}

const questionSchema: Schema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  correctAnswer: {
    type: String,
    required: true,
  },
  difficultyLevel: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const Question = mongoose.model<IQuestion>('Question', questionSchema);

export default Question;
