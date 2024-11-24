import { User } from "../models/User.js";

export async function registerUser(req, res) {
    console.log("Received Data:", req.body);
    try {
        const {username, email, password} = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ msg: 'Inputs are neccessary!' })
          }
        const userExist = await User.findOne({email});
        if (userExist) return res.status(400).json({msg:"User already exists!"})

        const newUser = new User({username,email,password});
        await newUser.save();
        res.status(201).json({msg:"Register successfull!"})
    } catch (error) {
        if (error.name === "ValidationError") {
            // Validation errors(messages) put into an array and send back
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ msg: "Validation Error", errors });
        }
        console.error(error);
        res.status(500).json({ msg: "Server Error" });
    }
}

export async function loginUser(req, res) {
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"Server Fehler!"}) 
    }
}