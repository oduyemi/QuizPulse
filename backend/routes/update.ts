import express, { Request, Response } from "express";
import User from "../models/userModel.js";
import Courses from "../models/courseModel.js";
import CourseCategory from "../models/courseCategoryModel.js";
import Question from "../models/questionModel.js";
import Quiz from "../models/quizModel.js";
import Admin from "../models/adminModel.js";

const router = express.Router();

router.put("/users/user/:userId", async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId;
      const { name, email, phone, password } = req.body;
  
      if (![name, email, phone, password].every(field => field)) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const updatedUser = await User.findByIdAndUpdate(userId, {
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
    } catch (error) {
      console.error("Error updating user:", error);
      return res.status(500).json({ message: "Error updating user" });
    }
});
  

router.put("/admins/admin/:adminId", async (req: Request, res: Response) => {
    try {
        const adminId = req.params.adminId;
        const { name, email, phone, password } = req.body;
  
        if (![name, email, phone, password].every(field => field)) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const updatedAdmin = await Admin.findByIdAndUpdate(adminId, {
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
    } catch (error) {
      console.error("Error updating admin:", error);
      return res.status(500).json({ message: "Error updating admin" });
    }
});
  

router.put("/courses/course-categories/category/:categoryId", async (req: Request, res: Response) => {
    try {
        const seed = require("SeedDatabase")
        await seed
        const categoryId = req.params.categoryId;
        const { name, description } = req.body;
  
        if (![name, description].every(field => field)) {
        return res.status(400).json({ message: "Both name and description are required" });
        }
  
        const updatedCategory = await CourseCategory.findByIdAndUpdate(categoryId, {
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
    } catch (error) {
      console.error("Error updating category:", error);
      return res.status(500).json({ message: "Error updating category" });
    }
  });  

  
router.put("/courses/course/:courseId", async (req: Request, res: Response) => {
    try {
        const courseId = req.params.courseId;
        const { name, description, category_id, img, quizzes } = req.body;
    
        if (![name, description, category_id, img, quizzes].every(field => field)) {
        return res.status(400).json({ message: "All fields are required" });
        }
    
        const updatedCourse = await Courses.findByIdAndUpdate(courseId, {
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
    } catch (error) {
        console.error("Error updating course:", error);
        return res.status(500).json({ message: "Error updating course" });
    }
});
      
    
router.put("/questions/question/:questionId", async (req: Request, res: Response) => {
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
    
        const updatedQuestion = await Question.findByIdAndUpdate(questionId, {
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
    } catch (error) {
        console.error("Error updating question:", error);
        return res.status(500).json({ message: "Error updating question" });
    }
});


router.put("/quizzes/:quizId", async (req: Request, res: Response) => {
    try {
        const quizId = req.params.quizId;
        const { questions, submissions } = req.body;

        const updatedQuiz = await Quiz.findByIdAndUpdate(quizId, {
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
    } catch (error) {
        console.error("Error updating quiz:", error);
        return res.status(500).json({ message: "Error updating quiz" });
    }
});



export default router;
