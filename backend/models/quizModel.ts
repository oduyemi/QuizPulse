import mongoose, { Schema, Document } from 'mongoose';

export interface IQuiz extends Document {
  questions: mongoose.Types.ObjectId[];
  submissions: mongoose.Types.ObjectId[];
}

const quizSchema: Schema = new mongoose.Schema({
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question', 
  }],
  submissions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Submission', 
  }],
});

const Quiz = mongoose.model<IQuiz>('Quiz', quizSchema);

export default Quiz;
