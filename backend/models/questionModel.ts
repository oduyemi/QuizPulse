import mongoose, { Schema, Document } from "mongoose";

export interface IQuestion extends Document {
  question_id: mongoose.Types.ObjectId;
  question_text: string;
  options: string[];
  correct_answer: string;
  difficulty_level: "easy" | "medium" | "hard";
  course_id: mongoose.Types.ObjectId
  category: mongoose.Types.ObjectId;
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
    enum: ["easy", "medium", "hard"],
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categories', 
    required: true,
  },
});

const Question = mongoose.model<IQuestion>("Question", questionSchema);

export default Question;
