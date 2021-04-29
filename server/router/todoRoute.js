const express = require('express')
const { get, post, getOne, update, deleteOne } = require('../controllers/todoController')
const router = express.Router()


router.get('/task', get)
router.get('/task/:id', getOne)
router.put('/task/:id', update)
router.post('/task',  post)
router.delete('/task/:id', deleteOne)

module.exports = router