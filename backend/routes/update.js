"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.put("/participants/{participantid}", (req, res) => {
    res.json({ message: "Edit profile" });
});
router.put("/admins/{adminid}", (req, res) => {
    res.json({ message: "Edit admin profile" });
});
router.put("/courses/course-category", (req, res) => {
    res.json({ message: "Edit course category" });
});
router.put("/courses/{courseid}", (req, res) => {
    res.json({ message: "Edit a course" });
});
router.post("/questions/{questionid}", (req, res) => {
    res.json({ message: "register here!" });
});
exports.default = router;
