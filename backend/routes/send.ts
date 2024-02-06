import express, { Request, Response } from "express";
import twilio from "twilio";
import { hash, compare } from "bcrypt";
import { promisify } from "util";
import User from "../models/userModel.js";
import Courses, { ICourse } from "../models/courseModel.js";
import Question, { IQuestion } from "../models/questionModel.js";
import Admin from "../models/adminModel.js";
import Submission, { ISubmission} from "../models/submissionModel.js";


const router = express.Router();
const { accountSid, authToken } = process.env;
const client = twilio(accountSid, authToken);
const db = require("../db/index");

require("dotenv").config();


const seed = require("SeedDatabase")

interface UserSession {
    userID: number; 
    name: string;
    email: string;
    phone: string;
  }
  
  interface RegistrationPinSession {
    pin: string;
    expiryTime: number;
  }

  interface AdminSession {
    adminID: number;
    name: string;
    email: string;
    phone: string;
  }

  declare module 'express-session' {
    interface SessionData {
      user?: UserSession; 
      admin?: AdminSession;
      registrationPin?: RegistrationPinSession;
    }
  }
  
const PIN_EXPIRY_TIME = 10 * 60 * 1000;

const hashPassword = async (password: string) => {
    const hashedPassword = await hash(password, 10); // Using bcrypt for hashing
    return hashedPassword;
};


async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  try {
      const isMatch = await compare(password, hashedPassword);
      return isMatch;
  } catch (error) {
      throw new Error("Error verifying password");
  }
}

  
const sendSMSVerification = async (pin: string, phoneNumber: string) => {
    try {
      await client.messages.create({
        body: `Your registration PIN is: ${pin}`,
        to: phoneNumber,
        from: '+12052361255',
      });
      return true;
    } catch (error) {
      console.error('Error sending SMS verification:', error);
      return false;
    }
};
  
router.post("/sms-status", (req, res) => {
    const { MessageStatus, MessageSid } = req.body;
    console.log(`Message SID: ${MessageSid}, Status: ${MessageStatus}`);
    res.sendStatus(200);
});

 
router.post("/register", async (req: Request, res: Response) => {
  try {
    const { name, email, phone, password, confirmPassword } = req.body;
    if (![name, email, phone, password, confirmPassword].every((field) => field)) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Both passwords must match!" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await hash(password, 10); // Using bcrypt for hashing

    const newUser = new User({ name, email, phone, password: hashedPassword });
    await newUser.save();

    // Generate PIN 
    const pin = Math.floor(1000 + Math.random() * 9000).toString();
    const phoneNumber = phone;
    // SMS verification
    const smsSent = await sendSMSVerification(pin, phoneNumber);

    if (!smsSent) {
      return res.status(500).json({ message: "Error sending registration PIN" });
    }

    req.session.registrationPin = {
      pin,
      expiryTime: Date.now() + PIN_EXPIRY_TIME,
    };

    req.session.user = {
      userID: newUser._id,
      name,
      email,
      phone,
    };

    return res.status(201).json({
      message: "User registered successfully. PIN sent via SMS.",
      nextStep: "/next-login-page",
    });
  } catch (error) {
    console.error("Error during user registration:", error);
    return res.status(500).json({ message: "Error registering user" });
  }
});
 

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (![email, password].every((field) => field)) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(401)
          .json({ message: "Email not registered. Please register first." });
      }

      const isPasswordMatch = await compare(password, user.password);

      if (!isPasswordMatch) {
        return res.status(401).json({ message: "Incorrect email or password" });
      }

      const pin = Math.floor(1000 + Math.random() * 9000).toString();
      const phoneNumber = user.email;
      req.session.registrationPin = {
        pin,
        expiryTime: Date.now() + PIN_EXPIRY_TIME,
      };

      const smsSent = await sendSMSVerification(pin, phoneNumber);
      if (!smsSent) {
        return res.status(500).json({ message: "Error sending registration PIN" });
      }

      const userSession = {
        userID: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      };

      req.session.user = userSession;

      return res.status(201).json({
        message: "User login successful. PIN sent via SMS.",
        pin,
        nextStep: "/next-user-dashboard",
      });
    } catch (error) {
      console.error("Error during user login:", error);
      return res.status(500).json({ message: "Error logging in user" });
    }
  } catch (error) {
    console.error("Error during user login:", error);
    return res.status(500).json({ message: "Error logging in user" });
  }
});



router.post("/admin/register", async (req: Request, res: Response) => {
  try {
    const { name, email, phone, password, confirmPassword } = req.body;
    if (![name, email, phone, password, confirmPassword].every((field) => field)) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Both passwords must match!" });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await hash(password, 10);

    const newAdmin = new Admin({ name, email, phone, password: hashedPassword });
    await newAdmin.save();

    // Generate PIN 
    const pin = Math.floor(1000 + Math.random() * 9000).toString();
    const phoneNumber = phone;
    // SMS verification
    const smsSent = await sendSMSVerification(pin, phoneNumber);

    if (!smsSent) {
      return res.status(500).json({ message: "Error sending registration PIN" });
    }

    req.session.registrationPin = {
      pin,
      expiryTime: Date.now() + PIN_EXPIRY_TIME,
    };

    req.session.admin = {
      adminID: newAdmin._id,
      name,
      email,
      phone,
    };

    return res.status(201).json({
      message: "Administrator registered successfully. PIN sent via SMS.",
      nextStep: "/next-login-page",
    });
  } catch (error) {
    console.error("Error during administrator registration:", error);
    return res.status(500).json({ message: "Error registering administrator" });
  }
});


router.post("/admin/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (![email, password].every((field) => field)) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      const admin = await Admin.findOne({ email });
      if (!admin) {
        return res
          .status(401)
          .json({ message: "Email not registered. Please register first." });
      }

      const isPasswordMatch = await compare(password, admin.password);

      if (!isPasswordMatch) {
        return res.status(401).json({ message: "Incorrect email or password" });
      }

      const pin = Math.floor(1000 + Math.random() * 9000).toString();
      const phoneNumber = admin.email;
      req.session.registrationPin = {
        pin,
        expiryTime: Date.now() + PIN_EXPIRY_TIME,
      };

      const smsSent = await sendSMSVerification(pin, phoneNumber);
      if (!smsSent) {
        return res.status(500).json({ message: "Error sending registration PIN" });
      }

      const adminSession = {
        userID: admin._id,
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
      };

      req.session.admin = adminSession;

      return res.status(201).json({
        message: "Administrator login successful. PIN sent via SMS.",
        pin,
        nextStep: "/next-admin-dashboard",
      });
    } catch (error) {
      console.error("Error during administrator login:", error);
      return res.status(500).json({ message: "Error logging in administrator" });
    }
  } catch (error) {
    console.error("Error during administrator login:", error);
    return res.status(500).json({ message: "Error logging in administrator" });
  }
});
    
     
router.post("/logout", (req, res) => {
    res.json({ message: "logout here!" });
    });


router.post("/admin/logout", (req, res) => {
    res.json({ message: "register here!" });
    });

 
router.post("/courses/course-categories/category", (req, res) => {
    res.json({ message: "Add a new course category" });
    });

  
router.post("/courses/course", async (req: Request, res: Response) => {
  try{
    const { name, description, category_id, img, quizzes } = req.body;
    if (![name, description, category_id, img, quizzes].every(field => field)) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // New course instance
    const newCourse: ICourse = new Courses({
        name,
        description,
        category_id,
        img,
        quizzes
    });

    await newCourse.save();

    return res.status(201).json({
        message: "Course created successfully",
        course: newCourse
    });
  } catch (error) {
      console.error("Error creating course:", error);
      return res.status(500).json({ message: "Error creating course" });
  }
});


router.post("/courses/course-category", async (req: Request, res: Response) => {
  try {
      await seed;

      return res.status(201).json({ message: "Course categories created successfully!" });
  } catch (error) {
      console.error("Error seeding course categories:", error);
      return res.status(500).json({ message: "Error seeding course categories" });
  }
});


router.post("/questions/question", async (req: Request, res: Response) => {
  try {
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

    // New instance of Question model
    const newQuestion: IQuestion = new Question({
      questionText,
      options,
      correctAnswer,
      difficultyLevel,
      courseId,
      category,
    });

    await newQuestion.save();

    return res.status(201).json({
      message: "Question created successfully",
      question: newQuestion,
    });
  } catch (error) {
    console.error("Error creating question:", error);
    return res.status(500).json({ message: "Error creating question" });
  }
});


router.post("/submission", async (req: Request, res: Response) => {
  try {
    const { userId, courseId, answers } = req.body;

    if (![userId, courseId, answers].every(field => field)) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // New  Submission instance 
    const newSubmission: ISubmission = new Submission({
      userId,
      courseId,
      answers,
      score: 0,
    });

    await newSubmission.save();

    return res.status(201).json({
      message: "Submission created successfully",
      submission: newSubmission,
    });
  } catch (error) {
    console.error("Error creating submission:", error);
    return res.status(500).json({ message: "Error creating submission" });
  }
});



export default router
