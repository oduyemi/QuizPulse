import express from 'express';
const router = express.Router();




router.put("/participants/{participantid}", (req, res) => {
    res.json({ message: "Edit profile" });
    });

 
router.put("/admins/{adminid}", (req, res) => {
    res.json({ message: "Edit admin profile"});
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
  





export default router
