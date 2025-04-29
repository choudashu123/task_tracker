const User = require('../models/User');
const generateToken = require('../utils/generateToken')

exports.signup = async (req, res) => {
    const { name, email, password, country } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const user = await User.create({ name, email, password, country });
        const token = generateToken(user._id);
        
        res.status(201).json( {token, user: { id:user._id, name: user.name, email: user.email}});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = generateToken(user._id);
        res.json({ token, user: { id:user._id, name: user.name, email: user.email}});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};
