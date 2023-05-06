//import all libray
import express, { Application } from "express";
import router from "./routes/routes";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import * as dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import errorHandler from "./controllers/response";
import { connect } from "./connectDB";

//activate process.env
dotenv.config();

//definition settings
const app: Application = express();
const allRouters = router;
const port: number = parseInt(process.env.PORT as string) || 3000;

//use all midlaware
app.use(compression()); // compression
// parse various different custom JSON types as JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors()); //cors
app.disable("x-powered-by");
app.use(helmet()); //helmet
//limiter
const limiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 2 minutes
  max: 50, // Limit each IP to 50 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  message: "Too many request from this IP, please try again after an in 2 minutes",
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter);
app.use("/api", allRouters); //all routes
app.use(errorHandler); //error handler

//running

app.listen(port, async () => {
  await connect(); // database connection
  console.log("SERVER IS UP ON PORT:", port);
});

export const server = app; //export for testing purposes
