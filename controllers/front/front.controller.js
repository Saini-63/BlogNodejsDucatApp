const blogModel = require("../../models/blog.model")

const homePage = async (req, res) => {
    let userLoggined = req.session.user ? true : false;
    let userNotLoggined = req.session.user ? false : true;


    let blogs = await blogModel.find({status: true})

    res.render('front/index', {blogs, userLoggined, userNotLoggined})
}

const detailPage = async (req, res) => {
    let userLoggined = req.session.user ? true : false;
    let userNotLoggined = req.session.user ? false : true;


    let blog = await blogModel.findOne({_id: req.params.id})

    if(!blog) {
        return res.redirect('/');
    }

    res.render('front/detail', {blog, userLoggined, userNotLoggined})
}

module.exports = {
    homePage,
    detailPage,
}