const catchError = require('../utils/catchError');
const User = require('../models/User');

//! TRAE A TODOS los usuarios
const getAll = catchError(async (req, res) => {
  const users = await User.findAll()
  return res.json(users)
});

//! CREA un usuario
const create = catchError(async (req, res) => {
  try {
    const user = req.body;
    const createUser = await User.create(user);
    return res.status(201).json(createUser);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Email already in use.' });
    }
    throw error;
  }
});

//! TRAER UN usuario de acuerdo a su id
const getOne = catchError(async (req, res) => {
  const { id } = req.params
  const getOneUser = await User.findByPk(id)
  if (!getOneUser) return res.status(404).json({ message: "user not found" })
  return res.json(getOneUser)
})

//! ELIMINAR un usuario de acuerdo a su id
const remove = catchError(async (req, res) => {
  const { id } = req.params
  const removeUser = await User.destroy({ where: { id: id } })
  if (!removeUser) return res.status(404).json({ message: "user not found" })
  return res.sendStatus(204)
})

//! ACTUALIZAR un usuario de acuerdo a su id
const update = catchError(async (req, res) => {
  try {
    const { id } = req.params
    const userBody = req.body
    const userUpdate = await User.update(userBody, { where: { id: id }, returning: true })
    if (userUpdate[0] === 0) return res.status(404).json({ message: "user not found" })
    return res.json(userUpdate[1][0])
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Email already in use.' });
    }
    throw error;
  }
})

//! Exportando las funciones
module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update
}