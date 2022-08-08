import jwt from 'jsonwebtoken'
import jwt_decode from 'jwt-decode'

const secret = 'test'

const authMiddleware = async (req, res, next) => {
    try {
        // const token = req.headers.Authorization.split(' ')[1]
        const token = req.headers.authorization?.split(" ")[1]
        const isCustomAuth = token?.length < 500
        // console.log('check token', token, isCustomAuth)
        if (!token) return res.status(401).json({ message: "No token provided" });

        let decodeData;

        if (token && isCustomAuth) {
            decodeData = jwt.verify(token, 'test')
            // decodeData = jwt_decode(token)
            // console.log('check decodeData', decodeData)
            req.userId = decodeData?.id
            // console.log('check req.userID', req.userId)
        } else {
            decodeData = jwt.decode(token)
            console.log('check token', decodeData)

            req.userId = decodeData?.sub

        }

        // req.token = token
        next()
    } catch (error) {
        console.log(error)
    }
}

export default authMiddleware