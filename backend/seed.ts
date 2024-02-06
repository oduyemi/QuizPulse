import { MongoClient, ObjectId } from "mongodb";
import { Collection } from "mongodb";
import Categories from "./models/courseCategoryModel.js";
import Courses from "./models/courseModel.js";

require("dotenv").config();

const seedDatabase = async () => {
  const url: string = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
  const client = new MongoClient(url);
  try {
    await client.connect();
    const courseCategories: Collection<any> = client.db("quizpulsedb").collection("categories");
    const courses: Collection<any> = client.db("quizpulsedb").collection("courses");

    await courseCategories.deleteMany({});
    await courses.deleteMany({});

    const categories = [
      { name: "Tech", description: "Technology-related courses", img: "tech.jpg" },
      { name: "Sales and Marketing", description: "Sales and marketing courses", img: "sales.jpg" },
      { name: "Science", description: "Science courses", img: "science.jpg" }
    ];

    for (const category of categories) {
      const newCategory = await Categories.create(category);

      let courseNames: string[] = [];

      switch (category.name) {
        case "Tech":
          courseNames = ["Data Analysis", "Product Management", "Web Design"];
          break;
        case "Sales and Marketing":
          courseNames = ["Advertising", "Marketing Management", "Digital Marketing"];
          break;
        case "Science":
          courseNames = ["Earth Science", "Botany", "Chemistry"];
          break;
        default:
          break;
      }

      for (const courseName of courseNames) {
        const newCourse = {
          name: courseName,
          description: `Description for ${courseName}`,
          category_id: newCategory._id,
          img: `${category.name.toLowerCase().replace(" ", "-")}.jpg`,
          quizzes: []
        };

        await Courses.create(newCourse);
      }
    }

    console.log("Course categories and courses created successfully!");
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
};

seedDatabase();
