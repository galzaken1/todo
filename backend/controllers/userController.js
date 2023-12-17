import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'
export const register = async (req, res) => {
    const { username, email, password } = req.body;
    const usedEmail = await User.findOne({ email });
    const usedUsername = await User.findOne({ username });  //searching user by crictria;
    if (usedEmail || usedUsername) {
        return res.status(400).send({ message: 'User already exists' }); // 400 is client error, liked used email
    }
    const user = await User.create({
        username: username,
        email: email,
        password: password,
        isAdmin: false
    })
    res.status(201).json({ message: 'Success' }) // status 201 - creation, 200 - generall
}

export const login = async (req, res) => {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username })
    if (!existingUser) {
        res.status(401).json({ message: 'Wrong username' });
    }
    const result = await existingUser.matchPasswords(password);
    if (existingUser && result) {
        const token = jwt.sign({ payload: existingUser._id }, process.env.JWT_SECRET, {
            expiresIn: '30d'
        })
        //set jwt as http only cockie
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        })
        res.status(200).json({ username: username, userId: existingUser._id, todos: existingUser.todos });
    } else {
        return res.status(401).json({ message: 'Wrong password' });
    }

}