"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const courseSchema = new mongoose_1.default.Schema({
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
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Quiz',
        }],
});
const Courses = mongoose_1.default.model('Courses', courseSchema);
exports.default = Courses;
