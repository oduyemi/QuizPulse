"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.delete("/participants/{participantid}", (req, res) => {
    res.json({ message: "Delete account" });
});
router.delete("/admins/{adminid}", (req, res) => {
    res.json({ message: "Delete admin account" });
});
router.delete("/courses/course-category", (req, res) => {
    res.json({ message: "Delete course category" });
});
router.delete("/courses/course", (req, res) => {
    res.json({ message: "Delete courses" });
});
router.delete("/questions/{questionid}", (req, res) => {
    res.json({ message: "Delete question" });
});
exports.default = router;
