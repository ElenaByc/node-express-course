const Task = require('../models/Task')

const getAllTasks = (req, res) => {
  res.status(200).json({ msg: 'Get all tasks' })
}

const createTask = async(req, res) => {
  const task = await Task.create(req.body)
  res.status(201).json({msg: 'Create task', task})
}

const getTask = (req, res) => {
  res.status(200).json({msg: 'Get task by id', id: req.params.id});
}

const updateTask = (req, res) => {
  res.status(200).json({msg: `Update task with id: ${req.params.id}`, data: req.body})
}

const deleteTask = (req, res) => {
  res.status(200).send({msg: `Delete task with id: ${req.params.id}`})
}

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
}
