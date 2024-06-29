const express = require('express')
const {
    loginPage,
    registerPage,
    addUser,
    authentication
} = require('../controllers/authentication/session.controller')

const router = express.Router()

router.get('/login', loginPage)
router.get('/register', registerPage)

router.post('/add-user', addUser)
router.post('/authenticate', authentication)


module.exports = router