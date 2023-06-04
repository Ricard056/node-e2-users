const { getAll, create, getOne, remove, update } = require('../controllers/user.controllers');
const express = require('express');

const todoRouter = express.Router();

todoRouter.route("/")
  .get(getAll)
  .post(create)

todoRouter.route("/:id")
  .get(getOne)
  .delete(remove)
  .put(update)

module.exports = todoRouter;