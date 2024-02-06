"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
require("dotenv").config();
const User = require("./models/userModel");
const Admin = require("./models/adminModel");
const Quiz = require("./models/quizModel");
const Question = require("./models/questionModel");
const Courses = require("./models/courseModel");
const Submission = require("./models/submissionModel");
const seedDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    const url = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
    const client = new mongodb_1.MongoClient(url);
    try {
        yield client.connect();
        const courseCategory = client.db("quizpulsedb").collection("courses");
        yield courseCategory.drop();
        const categories = ["Tech", "Sales and Marketing", "Science"];
        for (const category of categories) {
            let courses = [];
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
                const newCourse = {
                    category_id: new mongodb_1.ObjectId(),
                    name: `${category} - ${courses[i - 1]}`,
                    description: `Description for ${category} - ${courses[i - 1]}`,
                    img: `image-${i}.jpg`,
                    quizzes: [],
                };
                yield courseCategory.insertOne(newCourse);
            }
        }
        console.log("Course categories created successfully!");
    }
    catch (e) {
        console.error(e);
    }
    finally {
        yield client.close();
    }
});
seedDatabase();
