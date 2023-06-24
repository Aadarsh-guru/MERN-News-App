import User from '../modals/userModel.js'
import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken'

export const userRegisterController = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        if (!email || !password || !firstName || !lastName) {
            return res.status(200).json({ message: 'Email, Password, FirstNam, LastName are required', success: false })
        }
        const existingUser = await User.findOne({ email: email })
        if (existingUser) {
            return res.status(200).json({ message: 'User Already Exists Please Login', success: false })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        await User.create({ firstName, lastName, email, password: hashedPassword, profile: req.file?.filename })
        return res.status(201).json({ message: 'User Registered Successfully.', success: true })
    } catch (error) {
        return res.status(500).json({ message: 'Error while Register the user.', error: error.message, success: false })
    }
}


export const userLoginController = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(200).json({ message: 'Email, Password are required', success: false })
        }
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(200).json({ message: 'invalid login credentials.', success: false })
        }
        const match = await bcrypt.compare(password, user?.password)
        if (!match) {
            return res.status(200).json({ message: 'invalid login credentials.', success: false })
        }
        const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET)
        return res.status(200).json({ message: 'User Logged In Successfully.', success: true, token, user })
    } catch (error) {
        return res.status(500).json({ message: 'Error while login the user.', error, success: false })
    }
}


