import express from "express"
import cors from "cors"
import mongoose from "mongoose"

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

async function startServer() {
try {
    await mongoose.connect("mongodb://127.0.0.1:27017/myLoginRegisterDB", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log("DB connected");
} catch (error) {
    console.error("DB connection error:", error);
 }
}
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const User = new mongoose.model("User", userSchema)


// routes
app.post("/login", async (req, res)=> {
 const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (user) {
            if (password === user.password) {
                res.send({ message: "Login Successful", user });
            } else {
                res.send({ message: "Password didn't match" });
            }
        } else {
            res.send({ message: "User not registered" });
        }
    } catch (err) {
        res.status(500).send({ message: "Server error", error: err });
    }
});
    
    
app.post("/register", async (req, res) => {
        const { name, email, password } = req.body;
 
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.send({ message: "User already registered" });
        } else {
            const newUser = new User({ name, email, password });
            await newUser.save();
            res.send({ message: "Successfully Registered. please login now." });
        }
    } catch (err) {
        res.status(500).send({ message: "Registration failed", error: err });
    }
});



app.listen(9002,() => {
    console.log("BE started at port 9002")
})

startServer(); 