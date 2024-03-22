const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

mongoose
  .connect("mongodb+srv://ronaksaini783:E5HRj9QmIK1JsoYu@node-assignment-1.3t30enw.mongodb.net/?retryWrites=true&w=majority&appName=node-assignment-1")
  .then(() => console.log("Connected successfully to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));


const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  mobileNo: String,
  email: String,

  street: String,
  city: String,
  state: String,
  country: String,

  loginId: String,
  password: String,
  creationTime: { type: Date, default: Date.now },
  updationTime: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);


app.use(bodyParser.json());

app.use(express.static("public"));

app.get("/data", async (req, res) => {
  try {
    const allUsers = await User.find();
    res.json(allUsers);
  } catch (err) {
    console.error("Error occurred while fetching data from MongoDB", err);
    res.status(500).send("Error occurred while fetching data from MongoDB");
  }
});


app.post("/submit", async (req, res) => {
  try {
    const userData = req.body;

    const newUser = new User(userData);

    await newUser.save();
    console.log("Data inserted successfully");
    res.json(newUser);
  } catch (err) {
    console.error("Error occurred while inserting data into MongoDB", err);
    res.status(500).send("Error occurred while inserting data into MongoDB");
  }
});

app.listen(port, () =>
  console.log(`Server listening at http://localhost:${port}`)
);
