const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { use } = require('../routes/authRoutes');

require("dotenv").config();
exports.signup = async(req, res) => {
    try {
        const { firstname, lastname, email, password, role } = req.body;

        const userExist = await User.findOne({ email });
        if (userExist) return res.status(400).json({ message: 'User already exists in DB' });

        //hashing password
        const hashedPassword = await bcrypt.hash(password, 10);


        const newUser = new User({
            firstname,
            lastname,
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


exports.login = async(req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            console.log("error in password matching");
            return res.status(400).json({
                success: false,
                message: `Please Fill up All the Required Fields`,
            })
        }
        const user = await User.findOne({ email });
        if (!user) {
            console.log("user not found")
            return res.status(400).json({ success: false, message: "No user found enter a valid Email or signup first" })

        }



        const passwordValidation = await bcrypt.compare(password, user.password);
        if (!passwordValidation) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }


        const token = jwt.sign({ userId: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET, { expiresIn: '30d' }
        );

        res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                role: user.role,
            }
        });


    } catch (error) {
        res.status(500).json({ message: 'Login error by server', error });

    }
}