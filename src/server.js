import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const app = express();
//Assign Pug Template as a view engine
app.set("view engine", "pug");
//Set directory of views folder
app.set("views", process.cwd() + "/src/views");

//Create morgan logger middleware to log HTTP requests and errors
const logger = morgan("dev");
app.use(logger);
//Middleware that translates html forms into Javascript object
//It enables express to read form body
app.use(express.urlencoded({ extended: true }));
//Use routers to organise different urls
//Express leads to routers below when such urls are requested
app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

//Middleware: Good to use when users try to access the private route
//Should be on top
const myLogger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

const home = (req, res) => {
  return res.send("Hello");
};
const login = (req, res) => {
  return res.send("login");
};
//Response to "/" request
app.get("/", myLogger, home);
////Response to "/login" request
app.get("/login", login);

export default app;
