import db from "./config/DBConnection.js"
import express from "express";
import challengesRoute from "../EcoPlay_backend/routes/challenges.js"


const app =express()
const port=process.env.PORT || 9090;


app.get("/", (req, res) => {
  res.send("hello");
});
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));


app.use('/api', challengesRoute); 



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });