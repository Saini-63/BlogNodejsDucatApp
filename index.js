// import
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const hbs = require('hbs')
const mongoose = require('mongoose')
const session = require('express-session')

// app instance
const app = express()

// middleware
app.use(bodyParser.urlencoded({
    extended: true,
    cookie: { maxAge: 100000000 }
}))

app.use(session({
    secret: 'secret'
}))

// set view engine
app.set('view engine', 'hbs')
hbs.registerPartials(path.join(__dirname, './views/partials'));
hbs.registerHelper('sliceString', function (string) {
    return string.slice(0, 50) + "..."
});

hbs.registerHelper('filterStatusTrue', function (value) {
    if(value) {
        return "selected"
    }

    return ""
});

hbs.registerHelper('filterStatusFalse', function (value) {
    if(!value) {
        return "selected"
    }

    return ""
});



// db connect
mongoose.connect("mongodb://127.0.0.1:27017/weekend3pmblog")
    .then(function () {
        console.log("database connection established")
    }).catch(function (err) {
        console.log(err)
    })


// static files
app.use(express.static(path.join(__dirname, 'public')))

// routes
const frontRoutes = require('./routes/front.route')
const adminRoutes = require('./routes/admin.route')
const sessionRoutes = require('./routes/session.route')


app.use(frontRoutes)
app.use(sessionRoutes)
app.use("/admin", adminRoutes)

// port
const PORT = process.env.PORT || 8000

app.listen(PORT, function () {
    console.log("server listening on port 8000")
})