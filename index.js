import db from "./config/DBConnection.js"
import express from "express";
import challengesRoute from './routes/challengesR.js';






const app =express()
const port=process.env.PORT || 9090;



app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/challenge", challengesRoute);



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });