const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const app = express()
const port = process.env.PORT || 3000

//setup path for express
const public_path = path.join(__dirname, '../public')
const views_path = path.join(__dirname, '../templates/views')
const partials_path = path.join(__dirname, '../templates/partials')

//setup handlebar engine
app.set('views', views_path)
app.set('view engine', 'hbs')
hbs.registerPartials(partials_path)

//setup static directory
app.use(express.static(public_path))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'uday'
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'provide serach term'
        })
    }

    console.log(req.query)
    res.send({
        produts: []
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: 'uday'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        body: "this is some help",
        name: "uday"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "provide address"
        })
    }

    geocode.geocode(req.query.address, (error, { Latitude, Longitude, location } = {}) => {
        if (error)
            return res.send({ error })

        forecast(Latitude, Longitude, (error, forecastdata) => {
            if (error)
                return res.send({ error })
            return res.send({
                location,
                forecastdata,
                address: req.query.address
            })
        })
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        error: "Help article not found",
        name: 'uday'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        error: "404 Page not found",
        name: 'uday'
    })
})

app.listen(port, () => {
    console.log('server is up on port ', port)
})