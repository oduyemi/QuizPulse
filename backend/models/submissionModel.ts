import mongoose, { Schema, Document } from 'mongoose';

export interface ISubmission extends Document {
  userId: mongoose.Types.ObjectId;
  quizId: mongoose.Types.ObjectId;
  answers: string[];
  score: number;
}

const submissionSchema: Schema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz', 
    required: true,
  },
  answers: {
    type: [String],
    required: true,
  },
  score: {
    type: Number,
    default: 0,
  },
});

const Submission = mongoose.model<ISubmission>('Submission', submissionSchema);

export default Submission;
