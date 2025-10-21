import authService from '../services/authService.js';

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

       
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters' });
        }

        const result = await authService.registerUser(name, email, password);

        if (result.success) {
            res.status(201).json({
                message: 'User created successfully',
                token: result.token,
                user: result.user
            });
        } else {
            res.status(400).json({ message: result.message });
        }
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error during registration' });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

      
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const result = await authService.loginUser(email, password);

        if (result.success) {
            res.json({
                message: 'Login successful',
                token: result.token,
                user: result.user
            });
        } else {
            res.status(400).json({ message: result.message });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
};
