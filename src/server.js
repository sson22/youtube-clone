import express from "express";
import morgan from "morgan";
import MongoStore from "connect-mongo";
import session from "express-session";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware } from "./middlewares";

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

//Initialise session middleware before routers
app.use(
  session({
    //Required configuration
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
    // cookie:{
    //   maxAge: 20000,
    // }
  })
);

//Session remembers everyone who visied website-including the ones who are not logged in
app.use(localsMiddleware);
//Use routers to organise different urls
//Express leads to routers below when such urls are requested

app.use("/", rootRouter);
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
