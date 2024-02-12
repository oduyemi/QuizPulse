"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userModel_js_1 = __importDefault(require("../models/userModel.js"));
const courseModel_js_1 = __importDefault(require("../models/courseModel.js"));
const courseCategoryModel_js_1 = __importDefault(require("../models/courseCategoryModel.js"));
const questionModel_js_1 = __importDefault(require("../models/questionModel.js"));
const quizModel_js_1 = __importDefault(require("../models/quizModel.js"));
const adminModel_js_1 = __importDefault(require("../models/adminModel.js"));
const router = express_1.default.Router();
router.put("/users/user/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const { name, email, phone, password } = req.body;
        if (![name, email, phone, password].every(field => field)) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const updatedUser = yield userModel_js_1.default.findByIdAndUpdate(userId, {
            name,
            email,
            phone,
            password,
        }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({
            message: "User updated successfully",
            user: updatedUser,
        });
    }
    catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ message: "Error updating user" });
    }
}));
router.put("/admins/admin/:adminId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adminId = req.params.adminId;
        const { name, email, phone, password } = req.body;
        if (![name, email, phone, password].every(field => field)) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const updatedAdmin = yield adminModel_js_1.default.findByIdAndUpdate(adminId, {
            name,
            email,
            phone,
            password,
        }, { new: true });
        if (!updatedAdmin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        return res.status(200).json({
            message: "Admin updated successfully",
            admin: updatedAdmin,
        });
    }
    catch (error) {
        console.error("Error updating admin:", error);
        return res.status(500).json({ message: "Error updating admin" });
    }
}));
router.put("/courses/course-categories/category/:categoryId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const seed = require("SeedDatabase");
        yield seed;
        const categoryId = req.params.categoryId;
        const { name, description } = req.body;
        if (![name, description].every(field => field)) {
            return res.status(400).json({ message: "Both name and description are required" });
        }
        const updatedCategory = yield courseCategoryModel_js_1.default.findByIdAndUpdate(categoryId, {
            name,
            description,
        }, { new: true });
        if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        return res.status(200).json({
            message: "Category updated successfully",
            category: updatedCategory,
        });
    }
    catch (error) {
        console.error("Error updating category:", error);
        return res.status(500).json({ message: "Error updating category" });
    }
}));
router.put("/courses/course/:courseId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courseId = req.params.courseId;
        const { name, description, category_id, img, quizzes } = req.body;
        if (![name, description, category_id, img, quizzes].every(field => field)) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const updatedCourse = yield courseModel_js_1.default.findByIdAndUpdate(courseId, {
            name,
            description,
            category_id,
            img,
            quizzes,
        }, { new: true });
        if (!updatedCourse) {
            return res.status(404).json({ message: "Course not found" });
        }
        return res.status(200).json({
            message: "Course updated successfully",
            course: updatedCourse,
        });
    }
    catch (error) {
        console.error("Error updating course:", error);
        return res.status(500).json({ message: "Error updating course" });
    }
}));
router.put("/questions/question/:questionId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const questionId = req.params.questionId;
        const { questionText, options, correctAnswer, difficultyLevel, courseId, category } = req.body;
        if (![questionText, options, correctAnswer, difficultyLevel, courseId, category].every(field => field)) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (options.length !== 4) {
            return res.status(400).json({ message: "Four options are required" });
        }
        if (!options.includes(correctAnswer)) {
            return res.status(400).json({ message: "Correct answer must be one of the options" });
        }
        const updatedQuestion = yield questionModel_js_1.default.findByIdAndUpdate(questionId, {
            questionText,
            options,
            correctAnswer,
            difficultyLevel,
            courseId,
            category,
        }, { new: true });
        if (!updatedQuestion) {
            return res.status(404).json({ message: "Question not found" });
        }
        return res.status(200).json({
            message: "Question updated successfully",
            question: updatedQuestion,
        });
    }
    catch (error) {
        console.error("Error updating question:", error);
        return res.status(500).json({ message: "Error updating question" });
    }
}));
router.put("/quizzes/:quizId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const quizId = req.params.quizId;
        const { questions, submissions } = req.body;
        const updatedQuiz = yield quizModel_js_1.default.findByIdAndUpdate(quizId, {
            questions,
            submissions,
        }, { new: true });
        if (!updatedQuiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }
        return res.status(200).json({
            message: "Quiz updated successfully",
            quiz: updatedQuiz,
        });
    }
    catch (error) {
        console.error("Error updating quiz:", error);
        return res.status(500).json({ message: "Error updating quiz" });
    }
}));
exports.default = router;
