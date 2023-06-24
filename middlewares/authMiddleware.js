import JWT from 'jsonwebtoken'

export const requireSignIn = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(200).json({ message: 'Please login to Continue', success: false })
    }
    const { id } = JWT.verify(req.headers.authorization, process.env.JWT_SECRET)
    if (id) {
        req.userId = id
        next()
    } else {
        return res.status(403).json({ message: 'invalid access.', success: false })
    }
}
