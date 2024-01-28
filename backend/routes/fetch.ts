import express from 'express';
const router = express.Router();




router.get("/", (req, res) => {
res.json({ message: "Welcome to QuizPulse!" });
});

router.get("/courses", (req, res) => {
    res.json({ message: "courses here!" });
    });
    

 
export default router
