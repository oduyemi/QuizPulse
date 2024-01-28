import { MongoClient, ObjectId } from "mongodb";
import { Collection } from "mongodb";
require('dotenv').config();

interface Course {
  _id: ObjectId;
  name: string;
  description: string;
  category: string;
  img: string;
  quizzes: any[];
}

async function main() {
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
          _id: new ObjectId(),
          name: `${category} - ${courses[i - 1]}`,
          description: `Description for ${category} - ${courses[i - 1]}`,
          category: category,
          img: `image-${i}.jpg`,
          quizzes: [],
        };

        await courseCategory.insertOne(newCourse);
      }
    }

    console.log("Data inserted successfully!");
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main();
