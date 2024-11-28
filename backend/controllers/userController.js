import { generateToken } from "../middleware/generateToken.js";
import { User } from "../models/User.js";

export async function registerUser(req, res) {
  console.log("Received Data:", req.body);
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ msg: "Inputs are neccessary!" });
    }
    const userExist = await User.findOne({ email });
    if (userExist) return res.status(400).json({ msg: "User already exists!" });

    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json({ msg: "Register successfull!" });
  } catch (error) {
    if (error.name === "ValidationError") {
      // Validation errors(messages) put into an array and send back
      // const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ msg: "Validation Error" });
    }
    console.error(error);
    res.status(500).json({ msg: "Server Error" });
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: "Please fill in all fields!" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found!" });
    }
    const isPasswordValid = await user.pwValidation(password);
    if (!isPasswordValid) {
      return res.status(401).json({ msg: "Invalid login credentials!" });
    }
    const token = generateToken({ userId: user._id, username: user.username });

    res.cookie("jwt", token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
    res
      .status(200)
      .json({ msg: "Login successful!", username: user.username });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error!" });
  }
}
