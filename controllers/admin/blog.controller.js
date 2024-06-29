const blogModel = require("../../models/blog.model")

const blogs = async (req, res) => {
    let userLoggined = req.session.user ? true : false;
    let userNotLoggined = req.session.user ? false : true;

    let blogs = await blogModel.find();
    res.render("admin/blog/index", {
        blogs,
        userLoggined,
        userNotLoggined
    })
}

const blogCreate = (req, res) => {

    let userLoggined = req.session.user ? true : false;
    let userNotLoggined = req.session.user ? false : true;


    res.render("admin/blog/create", {
        userLoggined,
        userNotLoggined
    })
}

const blogEdit = async (req, res) => {
    let userLoggined = req.session.user ? true : false;
    let userNotLoggined = req.session.user ? false : true;
   
    let blog = await blogModel.findOne({
        _id: req.params.id
    });

    if (blog) {
        res.render("admin/blog/edit", {
            blog,
            userLoggined,
            userNotLoggined
        })
    } else {
        res.render("admin/blog")
    }
}

const blogStore = async (req, res) => {
    await blogModel.create({
        title: req.body.title,
        description: req.body.description,
        image: req.file?.path.replace('public', ''),
        status: req.body.status
    })

    res.redirect('/admin/blog')
}

const blogDestroy = async (req, res) => {
    await blogModel.deleteOne({
        _id: req.params.id
    })

    res.redirect('/admin/blog')
}

const blogUpdate = async (req, res) => {
    if (req.file) {
        await blogModel.updateOne({
            _id: req.params.id
        }, {
            title: req.body.title,
            description: req.body.description,
            image: req.body.image,
            image: req.file?.path.replace('public', ''),

            status: req.body.status
        })
    }else {
        await blogModel.updateOne({
            _id: req.params.id
        },{
            title: req.body.title,
            description: req.body.description,
            status: req.body.status
        })
    
    }

    res.redirect('/admin/blog')
}

module.exports = {
    blogs,
    blogCreate,
    blogEdit,
    blogStore,
    blogDestroy,
    blogUpdate
}