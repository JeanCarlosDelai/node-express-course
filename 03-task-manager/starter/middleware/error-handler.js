const { CustomAPIError } = require('../errors/custom-error')

const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof CustomAPIError) {
        return res.status(err.statuscode).json({ msg: err.message })
    }
    return res.status(500).json({ msg: `Algo está errado, Por favor tente novamente` })
}

module.exports = errorHandlerMiddleware