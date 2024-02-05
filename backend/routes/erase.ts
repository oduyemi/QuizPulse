import express from 'express';
const router = express.Router();




router.delete("/participants/{participantid}", (req, res) => {
    res.json({ message: "Delete account" });
    });

 
router.delete("/admins/{adminid}", (req, res) => {
    res.json({ message: "Delete admin account"});
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




export default router