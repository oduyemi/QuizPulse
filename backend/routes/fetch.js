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
const courseModel_js_1 = __importDefault(require("../models/courseModel.js"));
const courseCategoryModel_js_1 = __importDefault(require("../models/courseCategoryModel.js"));
const questionModel_js_1 = __importDefault(require("../models/questionModel.js"));
const userModel_js_1 = __importDefault(require("../models/userModel.js"));
const adminModel_js_1 = __importDefault(require("../models/adminModel.js"));
const submissionModel_js_1 = __importDefault(require("../models/submissionModel.js"));
const courseCategoryModel_js_2 = __importDefault(require("../models/courseCategoryModel.js"));
const router = express_1.default.Router();
const db = require("../db/index");
router.get("/", (req, res) => {
    res.json({ message: "Welcome to QuizPulse!" });
});
router.get("/courses", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield courseModel_js_1.default.find();
        if (courses.length === 0) {
            res.status(404).json({ Message: "Courses not available" });
        }
        else {
            res.json({ data: courses });
        }
    }
    catch (error) {
        console.error("Error fetching data from the database", error);
        res.status(500).json({ Message: "Internal Server Error" });
    }
}));
router.get("/courses/:courseId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courseId = req.params.courseId;
        const course = yield courseModel_js_1.default.findById(courseId);
        if (!course) {
            res.status(404).json({ Message: "Course not found" });
        }
        else {
            res.json({ data: course });
        }
    }
    catch (error) {
        console.error("Error fetching data from the database", error);
        res.status(500).json({ Message: "Internal Server Error" });
    }
}));
router.get("/courses/course/course-categories", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield courseCategoryModel_js_2.default.find();
        if (categories.length === 0) {
            res.status(404).json({ Message: "No course categories available" });
        }
        else {
            res.json({ data: categories });
        }
    }
    catch (error) {
        console.error("Error fetching course categories from the database", error);
        res.status(500).json({ Message: "Internal Server Error" });
    }
}));
router.get("/courses/course-categories/:categoryId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryId = req.params.categoryId;
        const category = yield courseCategoryModel_js_1.default.find({ category: categoryId });
        if (category.length === 0) {
            res.status(404).json({ Message: `No courses available for course category: ${categoryId}` });
        }
        else {
            res.json({ data: category });
        }
    }
    catch (error) {
        console.error("Error fetching course category from the database", error);
        res.status(500).json({ Message: "Internal Server Error" });
    }
}));
router.get("/questions", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const questions = yield questionModel_js_1.default.find();
        if (questions.length === 0) {
            res.status(404).json({ Message: "Questions not available" });
        }
        else {
            res.json({ data: questions });
        }
    }
    catch (error) {
        console.error("Error fetching data from the database", error);
        res.status(500).json({ Message: "Internal Server Error" });
    }
}));
router.get("/questions/:questionId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const questionId = req.params.questionId;
        const question = yield questionModel_js_1.default.findById(questionId);
        if (!question) {
            res.status(404).json({ Message: "Question not found" });
        }
        else {
            res.json({ data: question });
        }
    }
    catch (error) {
        console.error("Error fetching data from the database", error);
        res.status(500).json({ Message: "Internal Server Error" });
    }
}));
router.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_js_1.default.find();
        if (users.length === 0) {
            res.status(404).json({ Message: "Users not available" });
        }
        else {
            res.json({ data: users });
        }
    }
    catch (error) {
        console.error("Error fetching data from the database", error);
        res.status(500).json({ Message: "Internal Server Error" });
    }
}));
router.get("/users/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const user = yield userModel_js_1.default.findById(userId);
        if (!user) {
            res.status(404).json({ Message: "User not found" });
        }
        else {
            res.json({ data: user });
        }
    }
    catch (error) {
        console.error("Error fetching data from the database", error);
        res.status(500).json({ Message: "Internal Server Error" });
    }
}));
router.get("/admins", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admins = yield adminModel_js_1.default.find();
        if (admins.length === 0) {
            res.status(404).json({ Message: "Administrators not available" });
        }
        else {
            res.json({ data: admins });
        }
    }
    catch (error) {
        console.error("Error fetching data from the database", error);
        res.status(500).json({ Message: "Internal Server Error" });
    }
}));
router.get("/admins/:adminId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adminId = req.params.adminId;
        const admin = yield adminModel_js_1.default.findById(adminId);
        if (!admin) {
            res.status(404).json({ Message: "Admin not found" });
        }
        else {
            res.json({ data: admin });
        }
    }
    catch (error) {
        console.error("Error fetching data from the database", error);
        res.status(500).json({ Message: "Internal Server Error" });
    }
}));
router.get("/results", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield submissionModel_js_1.default.find();
        if (results.length === 0) {
            res.status(404).json({ Message: "Results not available" });
        }
        else {
            res.json({ data: results });
        }
    }
    catch (error) {
        console.error("Error fetching data from the database", error);
        res.status(500).json({ Message: "Internal Server Error" });
    }
}));
router.get("/results/:resultId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultId = req.params.resultId;
        const result = yield submissionModel_js_1.default.findById(resultId);
        if (!result) {
            res.status(404).json({ Message: "Result not found" });
        }
        else {
            res.json({ data: result });
        }
    }
    catch (error) {
        console.error("Error fetching data from the database", error);
        res.status(500).json({ Message: "Internal Server Error" });
    }
}));
exports.default = router;
