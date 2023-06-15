const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const { attachCookiesToResponse } = require('../utils/jwt')


const getAllUsers = async (req, res) => {
    const users = await User.find({ role: 'user' }).select('-password')
    res.status(StatusCodes.OK).json({ users })
}

const getSingleUser = async (req, res) => {
    const user = await User.findOne({ _id: req.params.id }).select('-password')
    if (!user) {
        throw new CustomError.NotFoundError(`Sem usuários com o id: ${req.params.id}`)
    }
    res.status(StatusCodes.OK).json({ user })
}

const showCurrentUser = async (req, res) => {
    res.status(StatusCodes.OK).json({ user: req.user })
}

const updateUser = async (req, res) => {
    req.send(req.body)

}
const updateUserPassword = async (req, res) => {
    const {oldPassword, newPassword} = req.body
    if(!oldPassword || !newPassword){
        throw new CustomError.BadRequestError(`Por favor forneça todos os valores`)
    }
    const user = await User.findOne({_id: req.user.id})

    const isPasswordCorrect = await user.comparePassword(oldPassword)
    if(!isPasswordCorrect){
        throw new CustomError.UnauthenticatedError(`Credenciais inválidas`)
    }
    user.password = newPassword

    await user.save()
    res.status(StatusCodes.OK).json({ msg: 'Sucess!! Senha alterada' })
}

module.exports = {
    getAllUsers,
    getSingleUser,
    updateUser,
    updateUserPassword,
    showCurrentUser
}