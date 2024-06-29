const dashboard = (req, res) => {
    let userLoggined = req.session.user ? true : false;
    let userNotLoggined = req.session.user ? false : true;


    res.render("admin/dashboard/index", {userLoggined, userNotLoggined});
}

module.exports = {
    dashboard
}