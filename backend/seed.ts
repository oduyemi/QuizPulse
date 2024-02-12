import { MongoClient, ObjectId } from "mongodb";
import { Collection } from "mongodb";
import CourseCategory from "./models/courseCategoryModel.js";
require("dotenv").config();

const seedDatabase = async () => {
    const url: string = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
    const client = new MongoClient(url);
    try {
        await client.connect();
        const courseCategory: Collection<any> = client.db("quizpulsedb").collection("categories");
  
        await courseCategory.drop();

        const categories = [
          { name: "Tech", description: "Technology-related courses", img: "https://res.cloudinary.com/dymd1jkbl/image/upload/v1691953768/quizpulse/categories/tech.jpg" },
          { name: "Sales and Marketing", description: "Sales and marketing courses", img: "https://res.cloudinary.com/dymd1jkbl/image/upload/v1691953768/quizpulse/categories/science.jpg" },
          { name: "Science", description: "Science courses", img: "https://res.cloudinary.com/dymd1jkbl/image/upload/v1691953768/quizpulse/categories/science.jpg" }
        ];
        for (const category of categories) {
          await courseCategory.insertOne(category);
        }
    
        console.log("Course categories created successfully!");

      } catch (e) {
        console.error(e);
      } finally {
        await client.close();
      }
};