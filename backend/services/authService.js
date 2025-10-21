import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET;

export const registerUser = async (name, email, password) => {
    try {
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return {
                success: false,
                message: 'User already exists with this email'
            };
        }

    
        const user = new User({ name, email, password });
        await user.save();

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });

        return {
            success: true,
            token,
            user: { id: user._id, name: user.name, email: user.email }
        };
    } catch (error) {
        console.error('Registration service error:', error);
        return {
            success: false,
            message: 'Server error during registration'
        };
    }
};

export const loginUser = async (email, password) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return {
                success: false,
                message: 'Invalid credentials'
            };
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return {
                success: false,
                message: 'Invalid credentials'
            };
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });

        return {
            success: true,
            token,
            user: { id: user._id, name: user.name, email: user.email }
        };
    } catch (error) {
        console.error('Login service error:', error);
        return {
            success: false,
            message: 'Server error during login'
        };
    }
};

export default {
    registerUser,
    loginUser
};
