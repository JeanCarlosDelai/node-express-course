const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')
const { craateCustomError } = require('../errors/custom-error')

const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({})
    res.status(200).json({ tasks })
})

const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body)
    console.log('Adicionado uma task');
    res.status(201).json({ task })
})


const getTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params
    const task = await Task.findOne({ id: taskID })
    if (!task) {
        return next(craateCustomError(`Não tem atividades com o ID: ${taskID}`, 404))
    }
    res.status(200).json({ task })
})

const updateTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
        new: true,
        runValidators: true
    })
    if (!task) {
        return next(craateCustomError(`Não tem atividades com o ID: ${taskID}`, 404))
    }
    res.status(200).json({ task })
})

const deleteTask = asyncWrapper(async (req, res) => {

    const { id: taskID } = req.params
    const task = await Task.findOneAndDelete({ _id: taskID }).exec()
    if (!task) {
        return next(craateCustomError(`Não tem atividades com o ID: ${taskID}`, 404))
    }
    res.status(200).json({ task: null, status: 'sucesso' })
}
)

module.exports = { getAllTasks, createTask, getTask, deleteTask, updateTask }