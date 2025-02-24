const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.signup = async(req, res) => {
    try {
        const { username, email, password, role } = req.body;

        const userExist = await User.findOne({ email });
        if (userExist) return res.status(400).json({ message: 'User already exists in DB' });

        //hashing password
        const hashedPassword = await bcrypt.hash(password, 10);


        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role
        });

        await newUser.save();
        res.status(201).json({ message: 'Signup done ' });
    } catch (error) {
        res.status(500).json({ message: 'Signup error by server', error });
    }

};