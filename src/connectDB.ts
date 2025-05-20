import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();
export const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log("Connected to database successfully");
    } catch (err) {
        throw new Error("database failed make sure setting validate");
    }
};
// mongoose.set("toJSON", {
//   virtuals: true,
//   transform: (doc, converted) => {
//     delete converted._id;
//   },
// });
