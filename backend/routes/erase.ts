import express, { Request, Response } from "express";
import User from "../models/userModel.js";
import Admin from "../models/adminModel.js";
import Courses from "../models/courseModel.js";
import CourseCategory from "../models/courseCategoryModel.js";
import Question from "../models/questionModel.js";
import Quiz from "../models/quizModel.js";

const router = express.Router();



router.delete("/users/user/:userId", async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ message: "Error deleting user" });
    }
});


router.delete("/admins/admin/:adminId", async (req: Request, res: Response) => {
    try {
        const adminId = req.params.adminId;
        const deletedAdmin = await Admin.findByIdAndDelete(adminId);
        if (!deletedAdmin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        return res.status(200).json({ message: "Admin deleted successfully" });
    } catch (error) {
        console.error("Error deleting admin:", error);
        return res.status(500).json({ message: "Error deleting admin" });
    }
});


router.delete("/courses/course/:courseId", async (req: Request, res: Response) => {
    try {
        const courseId = req.params.courseId;
        const deletedCourse = await Courses.findByIdAndDelete(courseId);
        if (!deletedCourse) {
            return res.status(404).json({ message: "Course not found" });
        }
        return res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
        console.error("Error deleting course:", error);
        return res.status(500).json({ message: "Error deleting course" });
    }
});


router.delete("/courses/course-categories/category/:categoryId", async (req: Request, res: Response) => {
    try {
        const categoryId = req.params.categoryId;
        const deletedCategory = await CourseCategory.findByIdAndDelete(categoryId);
        if (!deletedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        return res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        console.error("Error deleting category:", error);
        return res.status(500).json({ message: "Error deleting category" });
    }
});


router.delete("/questions/question/:questionId", async (req: Request, res: Response) => {
    try {
        const questionId = req.params.questionId;
        const deletedQuestion = await Question.findByIdAndDelete(questionId);
        if (!deletedQuestion) {
            return res.status(404).json({ message: "Question not found" });
        }
        return res.status(200).json({ message: "Question deleted successfully" });
    } catch (error) {
        console.error("Error deleting question:", error);
        return res.status(500).json({ message: "Error deleting question" });
    }
});


router.delete("/quizzes/:quizId", async (req: Request, res: Response) => {
    try {
        const quizId = req.params.quizId;
        const deletedQuiz = await Quiz.findByIdAndDelete(quizId);

        if (!deletedQuiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }

        return res.status(200).json({
            message: "Quiz deleted successfully",
            quiz: deletedQuiz,
        });
    } catch (error) {
        console.error("Error deleting quiz:", error);
        return res.status(500).json({ message: "Error deleting quiz" });
    }
});




export default router;