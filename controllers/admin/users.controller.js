const userModel = require("../../models/user.model")
const bcrypt = require('bcrypt');

const users = async (req, res) => {
    let userLoggined = req.session.user ? true : false;
    let userNotLoggined = req.session.user ? false : true;

    const users = await userModel.find()
    res.render("admin/user/index", {
        users,
        userLoggined,
        userNotLoggined,
    })
}

const userCreate = (req, res) => {
    let userLoggined = req.session.user ? true : false;
    let userNotLoggined = req.session.user ? false : true;


    res.render("admin/user/create", {userLoggined, userNotLoggined})
}

const userEdit = async (req, res) => {
    let userLoggined = req.session.user ? true : false;
    let userNotLoggined = req.session.user ? false : true;

    const user = await userModel.findById(req.params.id)

    if (!user) {
        return res.redirect("/admin/user")
    }

    res.render("admin/user/edit", {
        user,
        userLoggined,
        userNotLoggined
    })
}


const userStore = async (req, res) => {
    let hashPassword = await bcrypt.hash(req.body.password, 10)
    await userModel.create({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
        contact: req.body.contact,
        image: req.file?.path.replace('public', ''),
        status: req.body.status
    })

    res.redirect('/admin/user')
}

const userDestroy = async (req, res) => {
    await userModel.deleteOne({
        _id: req.params.id
    })

    res.redirect('/admin/user')
}

const userUpdate = async (req, res) => {
    if (req.file) {
        await userModel.updateOne({
            _id: req.params.id
        }, {
            name: req.body.name,
            email: req.body.email,
            contact: req.body.contact,
            image: req.file?.path.replace('public', ''),
            status: req.body.status
        })
    } else {
        await userModel.updateOne({
            _id: req.params.id
        }, {
            name: req.body.name,
            email: req.body.email,
            contact: req.body.contact,
            status: req.body.status
        })

    }

    res.redirect('/admin/user')
}

module.exports = {
    users,
    userCreate,
    userEdit,
    userDestroy,
    userStore,
    userUpdate
}