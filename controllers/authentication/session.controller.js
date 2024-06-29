const bcrypt = require('bcrypt');
const userModel = require('../../models/user.model');

const loginPage = async (req, res) => {
    let userLoggined = req.session.user ? true : false;
    let userNotLoggined = req.session.user ? false : true;


    res.render('front/login', {userLoggined, userNotLoggined});
}

const registerPage = async (req, res) => {
    let userLoggined = req.session.user ? true : false;
    let userNotLoggined = req.session.user ? false : true;


    res.render('front/register', {userLoggined, userNotLoggined})
}

const addUser = async (req, res) => {

    let hashPassword = await bcrypt.hash(req.body.password, 10)
    
    await userModel.create({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
    })

    res.redirect('/login')
}

const authentication = async (req, res) => {
    let user = await userModel.findOne({email: req.body.email})

    if(user) {
        let verifyPassword = await bcrypt.compare(req.body.password, user.password)

        if(verifyPassword) {
            req.session.user = user;
            console.log(req.session.user);

            return res.redirect('/admin/dashboard');
        }else {
           return res.redirect('/login')
        }
    }

    return res.redirect('/login')
}

module.exports = {
    loginPage,
    registerPage,
    addUser,
    authentication
}