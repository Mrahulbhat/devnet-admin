import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs"

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required!" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be atleast 6 characters" });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Email already exists!" });
        }

        //hash the password using bcrypt.js
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName: fullName,
            email: email,
            password: hashedPassword
        });

        if (newUser) {
            //generate jwt token here
            await newUser.save();
            generateToken(newUser._id, res);

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic
            })
        }
        else {
            res.status(400).json({ message: "Internal Error" });
        }
    }
    catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials!" });
        }

        //if email exists

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Wrong password, Please try again!" });
        }

        generateToken(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic
        })
    }
    catch (error) {
        console.log("Error in login controller", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 }); //1st param : jwt , 2nd: clear the cookie, 3rd: expire immediately
        res.status(200).json({ message: "Logged out successfully!" });
    }
    catch (error) {
        console.log("Error in logout controller", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user._id; //in protectroute at the end i have added req.user=user, so here i can directly fetch user data
        if (!profilePic) {
            return res.status(400).json({ message: "Profile pic is required!" });
        }
        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdandUpdate(userId, { profilePic: uploadResponse.secure_url }, { new: true });
        //by default findOneandUpdate() returns the doc as it is before update was applied. 
        //But if you set new:true , findOneAndUpdate() returns you the object after update was applied
        //Now in updateUser we have recieved updated user object (updated user data)
        res.status(200).json(updatedUser);
    }
    catch (error) {
        console.log("Error in updateProfile controller", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const checkAuth = async(req,res) => {
    try{
        res.status(200).json(req.user);
    }
    catch(error){
        console.log("Error in checkAuth controller",error.message);
        res.status(500).json({message:"Internal server error"});
    }
}