import express from 'express';
import Courses, { ICourse } from "../models/courseModel.js";
import CourseCategory, { ICategory} from "../models/courseCategoryModel.js";
import Question, { IQuestion } from "../models/questionModel.js";
import User, { IUser } from "../models/userModel.js";
import Admin, { IAdmin } from "../models/adminModel.js";
import Submission, { ISubmission} from "../models/submissionModel.js";
import Categories from '../models/courseCategoryModel.js';


const router = express.Router();
const db = require("../db/index");

router.get("/", (req, res) => {
res.json({ message: "Welcome to QuizPulse!" });
});


router.get("/courses", async (req, res) => {
    try {
      const courses: ICourse[] = await Courses.find();
      if (courses.length === 0) {
        res.status(404).json({ Message: "Courses not available" });
      } else {
        res.json({ data: courses });
      }
    } catch (error) {
      console.error("Error fetching data from the database", error);
      res.status(500).json({ Message: "Internal Server Error" });
    }
});
    

router.get("/courses/:courseId", async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const course: ICourse | null = await Courses.findById(courseId);
    
        if (!course) {
        res.status(404).json({ Message: "Course not found" });
        } else {
        res.json({ data: course });
        }
    } catch (error) {
        console.error("Error fetching data from the database", error);
        res.status(500).json({ Message: "Internal Server Error" });
    }
});
 

router.get("/courses/course/course-categories", async (req, res) => {
    try {
      const categories: ICategory[] = await Categories.find();
  
      if (categories.length === 0) {
        res.status(404).json({ Message: "No course categories available" });
      } else {
        res.json({ data: categories });
      }
    } catch (error) {
      console.error("Error fetching course categories from the database", error);
      res.status(500).json({ Message: "Internal Server Error" });
    }
});
  

router.get("/courses/course-categories/:categoryId", async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
    
        const category: ICategory[] = await Categories.find({ category: categoryId });
    
        if (category.length === 0) {
        res.status(404).json({ Message: `No courses available for course category: ${categoryId}` });
        } else {
        res.json({ data: category });
        }
    } catch (error) {
        console.error("Error fetching course category from the database", error);
        res.status(500).json({ Message: "Internal Server Error" });
    }
});

 
router.get("/questions", async (req, res) => {
    try {
        const questions: ICourse[] = await Question.find();
        if (questions.length === 0) {
          res.status(404).json({ Message: "Questions not available" });
        } else {
          res.json({ data: questions });
        }
      } catch (error) {
        console.error("Error fetching data from the database", error);
        res.status(500).json({ Message: "Internal Server Error" });
    }
});
 

router.get("/questions/:questionId", async (req, res) => {
    try {
        const questionId = req.params.questionId;
        const question: IQuestion | null = await Question.findById(questionId);
    
        if (!question) {
        res.status(404).json({ Message: "Question not found" });
        } else {
        res.json({ data: question });
        }
    } catch (error) {
        console.error("Error fetching data from the database", error);
        res.status(500).json({ Message: "Internal Server Error" });
    }
});

 
router.get("/users", async (req, res) => {
    try {
        const users: IUser[] = await User.find();
        if (users.length === 0) {
          res.status(404).json({ Message: "Users not available" });
        } else {
          res.json({ data: users });
        }
      } catch (error) {
        console.error("Error fetching data from the database", error);
        res.status(500).json({ Message: "Internal Server Error" });
    }
});

 
router.get("/users/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const user: IUser | null = await User.findById(userId);
    
        if (!user) {
        res.status(404).json({ Message: "User not found" });
        } else {
        res.json({ data: user });
        }
    } catch (error) {
        console.error("Error fetching data from the database", error);
        res.status(500).json({ Message: "Internal Server Error" });
    }
});
      


     
router.get("/admins", async (req, res) => {
    try {
        const admins: IAdmin[] = await Admin.find();
        if (admins.length === 0) {
          res.status(404).json({ Message: "Administrators not available" });
        } else {
          res.json({ data: admins });
        }
      } catch (error) {
        console.error("Error fetching data from the database", error);
        res.status(500).json({ Message: "Internal Server Error" });
    }
});

 
router.get("/admins/:adminId", async (req, res) => {
    try {
        const adminId = req.params.adminId;
        const admin: IAdmin | null = await Admin.findById(adminId);
    
        if (!admin) {
        res.status(404).json({ Message: "Admin not found" });
        } else {
        res.json({ data: admin });
        }
    } catch (error) {
        console.error("Error fetching data from the database", error);
        res.status(500).json({ Message: "Internal Server Error" });
    }
});
      
router.get("/results", async (req, res) => {
    try {
        const results: ISubmission[] = await Submission.find();
        if (results.length === 0) {
            res.status(404).json({ Message: "Results not available" });
        } else {
            res.json({ data: results });
        }
        } catch (error) {

        console.error("Error fetching data from the database", error);
        res.status(500).json({ Message: "Internal Server Error" });
    }
});

    
router.get("/results/:resultId", async (req, res) => {
    try {
        const resultId = req.params.resultId;
        const result: ISubmission | null = await Submission.findById(resultId);
    
        if (!result) {
        res.status(404).json({ Message: "Result not found" });
        } else {
        res.json({ data: result });
        }
    } catch (error) {
        console.error("Error fetching data from the database", error);
        res.status(500).json({ Message: "Internal Server Error" });
    }
});


export default router;
