import { MongoClient, ObjectId } from "mongodb";
import mongoose from "mongoose";
import { Collection } from "mongodb";

require("dotenv").config();

const User = require("./models/userModel");
const Admin = require("./models/adminModel");
const Quiz = require("./models/quizModel");
const Question = require("./models/questionModel");
const Courses = require("./models/courseModel");
const Submission = require("./models/submissionModel");


interface Course {
  category_id: ObjectId; 
  name: string;
  description: string;
  img: string;
  quizzes: any[];
}


const seedDatabase = async () => {
  const url:string = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
  const client = new MongoClient(url);
  try {
    await client.connect();
    const courseCategory: Collection<Course> = client.db("quizpulsedb").collection("courses");

    await courseCategory.drop();

    const categories = ["Tech", "Sales and Marketing", "Science"];

    for (const category of categories) {
      let courses: string[] = [];

      switch (category) {
        case "Tech":
          courses = ["Data Analysis", "Product Management", "Web Design"];
          break;
        case "Sales and Marketing":
          courses = ["Advertising", "Marketing Management", "Digital Marketing"];
          break;
        case "Science":
          courses = ["Earth Science", "Botany", "Chemistry"];
          break;
        default:
          break;
      }

      for (let i = 1; i <= courses.length; i++) {
        const newCourse: Course = {
          category_id: new ObjectId(),
          name: `${category} - ${courses[i - 1]}`,
          description: `Description for ${category} - ${courses[i - 1]}`,
          img: `image-${i}.jpg`,
          quizzes: [],
        };
      
        await courseCategory.insertOne(newCourse);
      }
    }

    console.log("Course categories created successfully!");
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }

};

seedDatabase();


