const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const { attachCookiesToResponse, createTokenUser} = require('../utils/index')

const register = async (req, res) => {
    const { email, name, password } = req.body

    const emailAlreadyExists = await User.findOne({ email })
    if (emailAlreadyExists) {
        throw new CustomError.BadRequestError('Email já existe')
    }

    // firsr registere user is admin
    const isFirstAccount = await User.countDocuments({}) === 0
    const role = isFirstAccount ? 'admin' : 'user'

    const user = await User.create({ email, name, password, role })
    const tokenUser = createTokenUser(user)
    attachCookiesToResponse({ res, user: tokenUser })
    res.status(StatusCodes.CREATED).json({ user: tokenUser })
}

const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        throw new CustomError.BadRequestError('Por favor provicdecie email e senha')
    }
    const user = await User.findOneAndDelete({ email })

    if (!user) {
        throw new CustomError.UnauthenticatedError('Credenciais inválidas')
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new CustomError.UnauthenticatedError('Credenciais inválidas')
    }

    const tokenUser = createTokenUser(user)
    attachCookiesToResponse({ res, user: tokenUser })
    res.status(StatusCodes.CREATED).json({ user: tokenUser })

}

const logout = async (req, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now() + 5 * 1000)
    })
    res.status(StatusCodes.OK).json({ msg: 'User logout' })
}

module.exports = {

    register,
    login,
    logout
}
