import dotenv from "dotenv";

import connectDB from "./db/db.js";
import app from "./app.js";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 8000;

app.get("/", async (req, res) => {
  res.send("Quiz Server Running...");
});


connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGODB db connection failed !!", err);
  });

