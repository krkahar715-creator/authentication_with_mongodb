import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import uploadImage from "../config/cloudinary.js";

const getJwtSecret = () => {
    const secret = process.env.JWT_SECRET;
    if (!secret || secret.length < 32) {
        throw new Error("JWT_SECRET must be configured with at least 32 characters.");
    }
    return secret;
};

const setAuthCookie = (res, userId) => {
    const token = jwt.sign({ sub: userId }, getJwtSecret(), { expiresIn: "7d" });
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
};

export const getCurrentUser = async (req, res) => {
    const tokenCookie = req.headers.cookie
        ?.split(";")
        .map((cookie) => cookie.trim())
        .find((cookie) => cookie.startsWith("token="));
    if (!tokenCookie) {
        return res.status(401).json({ message: "Authentication required." });
    }

    let token;
    try {
        token = decodeURIComponent(tokenCookie.slice("token=".length));
    } catch {
        return res.status(401).json({ message: "Invalid authentication token." });
    }

    try {
        const payload = jwt.verify(token, getJwtSecret());
        if (typeof payload === "string" || typeof payload.sub !== "string") {
            return res.status(401).json({ message: "Invalid authentication token." });
        }

        const user = await User.findById(payload.sub);
        if (!user) {
            return res.status(401).json({ message: "User account was not found." });
        }

        return res.status(200).json({
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                userName: user.userName,
                profileImage: user.profileImage,
            },
        });
    } catch (error) {
        if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Invalid or expired authentication token." });
        }
        if (error.message.startsWith("JWT_SECRET")) {
            console.error(error.message);
            return res.status(500).json({ message: "Authentication is not configured." });
        }

        console.error("Failed to restore user session:", error);
        return res.status(500).json({ message: "Unable to restore user session." });
    }
};

export const signup = async (req, res) => {
    const { firstName, lastName, age = 0, email, password, userName } = req.body ?? {};
    const fields = { firstName, lastName, email, password, userName };

    if (Object.values(fields).some((value) => typeof value !== "string" || !value.trim())) {
        return res.status(400).json({ message: "All fields are required." });
    }

    // const parsedAge = Number(age);
    // if (!Number.isInteger(parsedAge) || parsedAge < 0) {
    //     return res.status(400).json({ message: "Age must be a non-negative whole number." });
    // }


    if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long." });
    }

    try {
        getJwtSecret();
        const normalizedEmail = email.trim().toLowerCase();
        const normalizedUserName = userName.trim();
        const existingUser = await User.findOne({
            $or: [{ email: normalizedEmail }, { userName: normalizedUserName }],
        });
        if (existingUser) {
            return res.status(409).json({ message: "Email or username is already in use." });
        }

        let profileImage = "";
        if (req.file) {
            try {
                profileImage = await uploadImage(req.file.buffer);
            } catch (error) {
                console.error("Failed to upload profile image:", error);
                const isConfigurationError = error instanceof Error
                    && error.message.startsWith("Cloudinary credentials");
                return res.status(isConfigurationError ? 500 : 502).json({
                    message: isConfigurationError
                        ? "Image upload is not configured."
                        : "Unable to upload profile image.",
                });
            }
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            // age: parsedAge,
            email: normalizedEmail,
            password: hashedPassword,
            userName: normalizedUserName,
            profileImage,
        });
        setAuthCookie(res, newUser.id);

        return res.status(201).json({
            message: "User created successfully.",
            user: {
                id: newUser.id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                // age: newUser.age,
                email: newUser.email,
                userName: newUser.userName,
                profileImage: newUser.profileImage,
            },
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ message: "Email or username is already in use." });
        }
        if (error.name === "ValidationError") {
            return res.status(400).json({ message: "Invalid user data." });
        }
        if (error.message.startsWith("JWT_SECRET")) {
            console.error(error.message);
            return res.status(500).json({ message: "Authentication is not configured." });
        }
        console.error("Failed to create user:", error);
        return res.status(500).json({ message: "Unable to create user." });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body ?? {};
    if (typeof email !== "string" || !email.trim() || typeof password !== "string" || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    try {
        getJwtSecret();
        const user = await User.findOne({ email: email.trim().toLowerCase() });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        setAuthCookie(res, user.id);
        return res.status(200).json({
            message: "Login successful.",
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                // age: user.age,
                email: user.email,
                userName: user.userName,
                profileImage: user.profileImage,
            },
        });
    } catch (error) {
        if (error.message.startsWith("JWT_SECRET")) {
            console.error(error.message);
            return res.status(500).json({ message: "Authentication is not configured." });
        }
        console.error("Failed to login user:", error);
        return res.status(500).json({ message: "Unable to login user." });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
        });

        return res.status(200).json({ message: "Logout successful." });
    } catch (error) {
        console.error("Failed to logout user:", error);
        return res.status(500).json({ message: "Unable to logout user." });
    }
};
