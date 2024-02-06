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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const courseCategoryModel_js_1 = __importDefault(require("./models/courseCategoryModel.js"));
const courseModel_js_1 = __importDefault(require("./models/courseModel.js"));
require("dotenv").config();
const seedDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    const url = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
    const client = new mongodb_1.MongoClient(url);
    try {
        yield client.connect();
        const courseCategories = client.db("quizpulsedb").collection("categories");
        const courses = client.db("quizpulsedb").collection("courses");
        yield courseCategories.deleteMany({});
        yield courses.deleteMany({});
        const categories = [
            { name: "Tech", description: "Technology-related courses", img: "tech.jpg" },
            { name: "Sales and Marketing", description: "Sales and marketing courses", img: "sales.jpg" },
            { name: "Science", description: "Science courses", img: "science.jpg" }
        ];
        for (const category of categories) {
            const newCategory = yield courseCategoryModel_js_1.default.create(category);
            let courseNames = [];
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
                yield courseModel_js_1.default.create(newCourse);
            }
        }
        console.log("Course categories and courses created successfully!");
    }
    catch (e) {
        console.error(e);
    }
    finally {
        yield client.close();
    }
});
seedDatabase();
