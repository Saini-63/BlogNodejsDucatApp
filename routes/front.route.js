const express = require('express')
const { homePage, detailPage } = require('../controllers/front/front.controller')

const router = express.Router()

// home page
router.get('/', homePage)
router.get('/detail/:id', detailPage)

module.exports = router