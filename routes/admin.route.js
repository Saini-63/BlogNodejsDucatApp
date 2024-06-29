const express = require('express')
const { blogs, blogCreate, blogEdit, blogStore, blogDestroy, blogUpdate } = require('../controllers/admin/blog.controller')
const { dashboard } = require('../controllers/admin/dashboard.controller')
const { users, userCreate, userEdit, userStore, userUpdate, userDestroy } = require('../controllers/admin/users.controller')
const { upload } = require('../middleware/fileUpload')

const router = express.Router()

router.use((req, res, next) => {
    if(req.session.user) {
        next()
    }else {
        res.redirect("/login")
    }
})

// dashboard page
router.get('/dashboard', dashboard)

// blog page
router.get('/blog', blogs)
router.get('/blog/create', blogCreate)
router.get('/blog/edit/:id', blogEdit)
router.post('/blog/store', upload.single('image'), blogStore)
router.post('/blog/update/:id',upload.single('image'), blogUpdate)
router.post('/blog/destroy/:id', blogDestroy)

// user page
router.get('/user', users)
router.get('/user/create', userCreate)
router.get('/user/edit/:id', userEdit)
router.post('/user/store', upload.single('image'), userStore)
router.post('/user/update/:id',upload.single('image'), userUpdate)
router.post('/user/destroy/:id', userDestroy)

router.post('/logout', (req, res) =>{
    delete req.session.user
    res.redirect("/login")
})

module.exports = router