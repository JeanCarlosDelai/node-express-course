
const CustomError = require('../errors')
const { isTokenValid } = require('../utils/jwt')

const authenticateUser = async (req, res, next) => {
    const token = req.signedCookies.token

    if (!token) {
        throw new CustomError.UnauthenticatedError('Autenticação Inválda')
    }
    try {
        const { name, userId, role } = isTokenValid({ token })
        req.user = { name, userId, role }
        next()
    } catch (error) {
        throw new CustomError.UnauthenticatedError('Autenticação Inválda')
    }
}

const authorizePermissions = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new CustomError.UnauthorizedError('Usuário não autenticado para esta rota')
        }
        next()
    }
}


module.exports = {
    authenticateUser,
    authorizePermissions
}
