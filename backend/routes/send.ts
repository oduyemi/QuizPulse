require("dotenv").config();
import express from 'express';
const cors = require("cors");
const router = express.Router();



 
router.post("/register", (req, res) => {
    res.json({ message: "register here!" });
    });

 
router.post("/login", (req, res) => {
    res.json({ message: "login here!" });
    });


router.post("/admin/register", (req, res) => {
    res.json({ message: "register here!" });
    });

    
router.post("/admin/login", (req, res) => {
    res.json({ message: "login here!" });
    });
    
     
router.post("/logout", (req, res) => {
    res.json({ message: "logout here!" });
    });


router.post("/admin/logout", (req, res) => {
    res.json({ message: "register here!" });
    });

 
router.post("/course-categories/{categoryid}", (req, res) => {
    res.json({ message: "Add a new course category" });
    });

  
router.post("/courses/{courseid}", (req, res) => {
    res.json({ message: "Add a new courses here!" });
    });


router.post("/questions", (req, res) => {
    res.json({ message: "Add a question" });
    });

export default router
