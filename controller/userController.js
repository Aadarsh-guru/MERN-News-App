import User from '../modals/userModel.js'
import bcrypt from 'bcrypt'
import { gridFs, gridFsBucket } from '../helpers/gridFsStrorageConfig.js'
import News from '../modals/newsModel.js'

export const userProfileController = async (req, res) => {
    try {
        const file = await gridFs.files.findOne({ filename: req.params.filename })
        if (!file) {
            return res.status(200).json({ message: 'Profile Does Not Exist.', success: false })
        }
        const readStream = gridFsBucket.openDownloadStream(file._id);
        res.set("Content-type", file.contentType)
        readStream.pipe(res);
    } catch (error) {
        return res.status(500).json({ message: 'Error while getting user profile.', error, success: false })
    }
}

export const userUpdateController = async (req, res) => {
    try {
        const { firstName, lastName, email, password, newPassword } = req.body;
        if (!email || !password) {
            return res.status(200).json({ message: 'Email, Password are required', success: false })
        }
        const user = await User.findOne({ email: email })
        const match = await bcrypt.compare(password, user?.password)
        if (!match) {
            return res.status(200).json({ message: 'Invalid Password.', success: false })
        }
        if (req.file && user?.profile) {
            const profile = await gridFs.files.findOne({ filename: user?.profile })
            await gridFsBucket.delete(profile?._id)
        }
        if (newPassword) {
            const hashedPassword = await bcrypt.hash(newPassword, 10)
            await User.findByIdAndUpdate(user?._id, { firstName, lastName, email, password: hashedPassword, profile: req.file?.filename })
            return res.status(201).json({ message: 'User Updated Successfully.', success: true })
        }
        await User.findByIdAndUpdate(user?._id, { firstName, lastName, email, profile: req.file?.filename })
        return res.status(201).json({ message: 'User Updated Successfully.', success: true })
    } catch (error) {
        return res.status(500).json({ message: 'Error while updating the user.', error, success: false })
    }
}

export const deleteUserController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(200).json({ message: 'Email, Password are required', success: false })
        }
        const user = await User.findOne({ email: email })
        const match = await bcrypt.compare(password, user?.password)
        if (!match) {
            return res.status(200).json({ message: 'invalid password.', success: false })
        }
        if (user?.profile) {
            const profile = await gridFs.files.findOne({ filename: user?.profile })
            await gridFsBucket.delete(profile?._id)
        }
        const NewsFiles = await News.find({ userId: user?._id })
        await NewsFiles?.forEach(async (news) => {
            const gridFsFile = await gridFs.files.findOne({ filename: news?.image })
            await gridFsBucket.delete(gridFsFile?._id)
        })
        await News.deleteMany({ userId: user?._id })
        await User.findByIdAndDelete(user?._id)
        return res.status(202).json({ message: 'User Deleted Successfully.', success: true, user })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error while Deleting the user.', error, success: false })
    }
}


