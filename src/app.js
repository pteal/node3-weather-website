const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsDirectoryPath = path.join(__dirname,'../templates/views')
const partialsDirectoryPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsDirectoryPath)
hbs.registerPartials(partialsDirectoryPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Peter Teal'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Peter Teal'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is a help message',
        name: 'Peter Teal'
    })
})

app.get('', (req, res) => {
    res.send('<h1>Weather</h1>')
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please provide an address.'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) { return res.send({ error }) }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) { return res.send({ error }) }

            console.log(forecastData)

            return res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })
})

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'Sunny',
        location: 'Albany'
    })
})

app.get('/help/*', (req, res) => {
    //res.send('Help article not found')
    res.render('404', {
        title: '404',
        message: 'Help article not found',
        name: 'Peter Teal'
    })
})

app.get('*', (req, res) => {
    //res.send('Help article not found')
    res.render('404', {
        title: '404',
        message: 'Page not found',
        name: 'Peter Teal'
    })
})

app.get('*', (req, res) => {
    res.send('404 Page')
})

app.listen(port, () => {
    console.log('Server running on port 3000')
})


