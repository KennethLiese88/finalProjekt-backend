import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1h",
  });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error("Token ist ungültig oder abgelaufen.");
  }
};

export const authCheck = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ msg: "Nicht autorisiert! Kein Token vorhanden." });
    }

    const decoded = verifyToken(token);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ msg: "Benutzer nicht gefunden!" });
    }

    req.user = {
      userId: user._id,
      username: user.username,
    };
    next();
  } catch (error) {
    console.error("Authentifizierungsfehler:", error.message);
    return res.status(403).json({ msg: "Authentifizierung fehlgeschlagen!" });
  }
};
