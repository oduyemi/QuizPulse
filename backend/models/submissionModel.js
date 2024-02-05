"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const submissionSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    quizId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Courses',
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
const Submission = mongoose_1.default.model('Submission', submissionSchema);
exports.default = Submission;
