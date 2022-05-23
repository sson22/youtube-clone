import mongoose from "mongoose";
//Create a new database on mongodb
mongoose.connect("mongodb://127.0.0.1:27017/youtube");
//Access to the mongodb connection using mongoose
const db = mongoose.connection;
db.on("error", (error) => console.log("DB Error", error));
//When connection happens call the function only once
db.once("open", () => console.log("Connected to DB"));
