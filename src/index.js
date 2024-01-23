import { app } from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/connectdb.js";
dotenv.config({ path: "../.env" });

connectDB().then(() => {
  app.listen(process.env.port || 8000, () => {
    console.log(`server is running in port ${process.env.port}`);
  });
});
