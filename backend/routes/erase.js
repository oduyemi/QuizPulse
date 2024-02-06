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
const adminModel_js_1 = __importDefault(require("../models/adminModel.js"));
const courseModel_js_1 = __importDefault(require("../models/courseModel.js"));
const courseCategoryModel_js_1 = __importDefault(require("../models/courseCategoryModel.js"));
const questionModel_js_1 = __importDefault(require("../models/questionModel.js"));
const quizModel_js_1 = __importDefault(require("../models/quizModel.js"));
const router = express_1.default.Router();
router.delete("/users/user/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const deletedUser = yield userModel_js_1.default.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ message: "Error deleting user" });
    }
}));
router.delete("/admins/admin/:adminId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adminId = req.params.adminId;
        const deletedAdmin = yield adminModel_js_1.default.findByIdAndDelete(adminId);
        if (!deletedAdmin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        return res.status(200).json({ message: "Admin deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting admin:", error);
        return res.status(500).json({ message: "Error deleting admin" });
    }
}));
router.delete("/courses/course/:courseId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courseId = req.params.courseId;
        const deletedCourse = yield courseModel_js_1.default.findByIdAndDelete(courseId);
        if (!deletedCourse) {
            return res.status(404).json({ message: "Course not found" });
        }
        return res.status(200).json({ message: "Course deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting course:", error);
        return res.status(500).json({ message: "Error deleting course" });
    }
}));
router.delete("/courses/course-categories/category/:categoryId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryId = req.params.categoryId;
        const deletedCategory = yield courseCategoryModel_js_1.default.findByIdAndDelete(categoryId);
        if (!deletedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        return res.status(200).json({ message: "Category deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting category:", error);
        return res.status(500).json({ message: "Error deleting category" });
    }
}));
router.delete("/questions/question/:questionId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const questionId = req.params.questionId;
        const deletedQuestion = yield questionModel_js_1.default.findByIdAndDelete(questionId);
        if (!deletedQuestion) {
            return res.status(404).json({ message: "Question not found" });
        }
        return res.status(200).json({ message: "Question deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting question:", error);
        return res.status(500).json({ message: "Error deleting question" });
    }
}));
router.delete("/quizzes/:quizId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const quizId = req.params.quizId;
        const deletedQuiz = yield quizModel_js_1.default.findByIdAndDelete(quizId);
        if (!deletedQuiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }
        return res.status(200).json({
            message: "Quiz deleted successfully",
            quiz: deletedQuiz,
        });
    }
    catch (error) {
        console.error("Error deleting quiz:", error);
        return res.status(500).json({ message: "Error deleting quiz" });
    }
}));
exports.default = router;
