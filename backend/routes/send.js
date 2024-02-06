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
const twilio_1 = __importDefault(require("twilio"));
const bcrypt_1 = require("bcrypt");
const userModel_js_1 = __importDefault(require("../models/userModel.js"));
const courseModel_js_1 = __importDefault(require("../models/courseModel.js"));
const adminModel_js_1 = __importDefault(require("../models/adminModel.js"));
const router = express_1.default.Router();
const { accountSid, authToken } = process.env;
const client = (0, twilio_1.default)(accountSid, authToken);
const db = require("../db/index");
require("dotenv").config();
const PIN_EXPIRY_TIME = 10 * 60 * 1000;
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield (0, bcrypt_1.hash)(password, 10); // Using bcrypt for hashing
    return hashedPassword;
});
function verifyPassword(password, hashedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const isMatch = yield (0, bcrypt_1.compare)(password, hashedPassword);
            return isMatch;
        }
        catch (error) {
            throw new Error("Error verifying password");
        }
    });
}
const sendSMSVerification = (pin, phoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.messages.create({
            body: `Your registration PIN is: ${pin}`,
            to: phoneNumber,
            from: '+12052361255',
        });
        return true;
    }
    catch (error) {
        console.error('Error sending SMS verification:', error);
        return false;
    }
});
router.post("/sms-status", (req, res) => {
    const { MessageStatus, MessageSid } = req.body;
    console.log(`Message SID: ${MessageSid}, Status: ${MessageStatus}`);
    res.sendStatus(200);
});
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, phone, password, confirmPassword } = req.body;
        if (![name, email, phone, password, confirmPassword].every(field => field)) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Both passwords must match!" });
        }
        const existingUser = yield userModel_js_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }
        const hashedPassword = yield hashPassword(password);
        const newUser = new userModel_js_1.default({ name, email, phone, password: hashedPassword });
        yield newUser.save();
        // Generate PIN for verification
        const pin = Math.floor(1000 + Math.random() * 9000).toString();
        const phoneNumber = phone;
        // Send SMS verification
        const smsSent = yield sendSMSVerification(pin, phoneNumber);
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
    }
    catch (error) {
        console.error("Error during user registration:", error);
        return res.status(500).json({ message: "Error registering user" });
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (![email, password].every(field => field)) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const checkMailQuery = "SELECT * FROM User WHERE email = ?";
        try {
            const results = yield db.query(checkMailQuery, [email]);
            if (results.length === 0) {
                return res.status(401).json({ message: "Email not registered. Please register first." });
            }
            const user = results[0];
            const isPasswordMatch = yield verifyPassword(password, user.Password);
            if (!isPasswordMatch) {
                return res.status(401).json({ message: "Incorrect email or password" });
            }
            const pin = Math.floor(1000 + Math.random() * 9000).toString();
            const phoneNumber = email;
            req.session.registrationPin = {
                pin,
                expiryTime: Date.now() + PIN_EXPIRY_TIME,
            };
            const smsSent = yield sendSMSVerification(pin, phoneNumber);
            if (!smsSent) {
                return res.status(500).json({ message: "Error sending registration PIN" });
            }
            const UserSession = {
                userID: user.user_id,
                name: user.name,
                email: user.email,
                phone: user.phone,
            };
            req.session.user = UserSession;
            return res.status(201).json({
                message: "User login successful. PIN sent via SMS.",
                pin,
                nextStep: "/next-user-dashboard",
            });
        }
        catch (error) {
            console.error("Error during user login:", error);
            return res.status(500).json({ message: "Error logging in user" });
        }
    }
    catch (error) {
        console.error("Error during user login:", error);
        return res.status(500).json({ message: "Error logging in user" });
    }
}));
router.post("/admin/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, phone, password, confirmPassword } = req.body;
        if (![name, email, phone, password, confirmPassword].every(field => field)) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Both passwords must match!" });
        }
        const existingAdmin = yield adminModel_js_1.default.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: "Email already registered" });
        }
        const hashedPassword = yield hashPassword(password);
        const newAdmin = new adminModel_js_1.default({ name, email, phone, password: hashedPassword });
        yield newAdmin.save();
        // Generate PIN for verification
        const pin = Math.floor(1000 + Math.random() * 9000).toString();
        const phoneNumber = phone;
        // Send SMS verification
        const smsSent = yield sendSMSVerification(pin, phoneNumber);
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
    }
    catch (error) {
        console.error("Error during administrator registration:", error);
        return res.status(500).json({ message: "Error registering administrator" });
    }
}));
router.post("/admin/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (![email, password].every(field => field)) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const checkMailQuery = "SELECT * FROM Admin WHERE email = ?";
        try {
            const results = yield db.query(checkMailQuery, [email]);
            if (results.length === 0) {
                return res.status(401).json({ message: "Email not registered. Please register first." });
            }
            const admin = results[0];
            const isPasswordMatch = yield verifyPassword(password, admin.Password);
            if (!isPasswordMatch) {
                return res.status(401).json({ message: "Incorrect email or password" });
            }
            const pin = Math.floor(1000 + Math.random() * 9000).toString();
            const phoneNumber = email;
            req.session.registrationPin = {
                pin,
                expiryTime: Date.now() + PIN_EXPIRY_TIME,
            };
            const AdminSession = {
                adminID: admin.admin_id,
                name: admin.name,
                email: admin.email,
                phone: admin.phone
            };
            req.session.admin = AdminSession;
            return res.status(201).json({
                message: "Admin login successful. PIN sent via SMS.",
                pin,
                nextStep: "/next-admin-dashboard",
            });
        }
        catch (error) {
            console.error("Error during admin login:", error);
            return res.status(500).json({ message: "Error logging in admin" });
        }
    }
    catch (error) {
        console.error("Error during admin login:", error);
        return res.status(500).json({ message: "Error logging in admin" });
    }
}));
router.post("/logout", (req, res) => {
    res.json({ message: "logout here!" });
});
router.post("/admin/logout", (req, res) => {
    res.json({ message: "register here!" });
});
router.post("/courses/course-categories/category", (req, res) => {
    res.json({ message: "Add a new course category" });
});
router.post("/courses/course", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, category_id, img, quizzes } = req.body;
        if (![name, description, category_id, img, quizzes].every(field => field)) {
            return res.status(400).json({ message: "All fields are required" });
        }
        // New course instance
        const newCourse = new courseModel_js_1.default({
            name,
            description,
            category_id,
            img,
            quizzes
        });
        yield newCourse.save();
        return res.status(201).json({
            message: "Course created successfully",
            course: newCourse
        });
    }
    catch (error) {
        console.error("Error creating course:", error);
        return res.status(500).json({ message: "Error creating course" });
    }
}));
router.post("/courses/course-category", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield seedDatabase();
        return res.status(201).json({ message: "Course categories created successfully!" });
    }
    catch (error) {
        console.error("Error seeding course categories:", error);
        return res.status(500).json({ message: "Error seeding course categories" });
    }
}));
router.post("/questions/question", (req, res) => {
    res.json({ message: "Add a question" });
});
exports.default = router;
