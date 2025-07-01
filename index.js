import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect to MongoDB
async function startServer() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/myLoginRegisterDB", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB connected");
  } catch (error) {
    console.error("DB connection error:", error);
  }
}

// User schema and model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
const User = mongoose.model("User", userSchema);

// Register Route
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.send({ message: "User already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.send({ message: "Successfully Registered. Please login now." });
  } catch (err) {
    console.error("Register error:", err.message);
    res.status(500).send({ message: "Registration failed", error: err.message });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.send({ message: "User not registered" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.send({ message: "Password didn't match" });
    }

    console.log("JWT_SECRET value:", process.env.JWT_SECRET); // Debug check

   const token = jwt.sign(
  { id: user._id, email: user.email },
  "supersecret123", 
  { expiresIn: "2h" }
);


   res.send({
  message: "Login Successful",
  user: { _id: user._id, name: user.name, email: user.email },
  token,
});


  } catch (err) {
    console.error("Login route error:", err.message);
    console.error("Stack trace:", err.stack);
    res.status(500).send({ message: "Server error", error: err.message });
  }
});

// Start the server
app.listen(9002, () => {
  console.log("BE started at port 9002");
});

startServer();

