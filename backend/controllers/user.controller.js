import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // check required fields
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required", success: false });
    }

    // check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists", success: false });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user
    const newUser = new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role,
    });

    await newUser.save();

    return res.status(201).json({
      message: "User created successfully",
      success: true,
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check required fields
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required", success: false });
    }

    // normalize email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password", success: false });
    }

    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password", success: false });
    }

    // generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,         
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
      // secure: true, // uncomment when using https
      // sameSite: "strict",
    });

    // remove password before sending user
    const { password: _, ...userData } = user.toObject();

    return res.status(200).json({
      message: "Login successful",
      success: true,
      user: userData,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};


export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,        // Must be HTTPS in production
      sameSite: "None",    // Needed for cross-origin cookies
    });

    return res.json({ message: "Logout successful", success: true });
  } catch (error) {
    logger.error("Logout error:", error);
    return res.status(500).json({ message: "Something went wrong", success: false });
  }
};

  
export const isAuth = async (req, res) => {
  try {
    const { id } = req.user; // comes from isAuthenticated middleware

    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("isAuth error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};









