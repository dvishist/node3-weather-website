const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

//express config
const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')

const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location and partials
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Live Weather App',
        name: 'Vishist Dura'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Vishist Dura'
    })
})

app.get('/help', (req, res) => {
    res.render('Help', {
        text: `You don't get any help`,
        title: 'Help',
        name: 'Vishist Dura'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide a search term'
        })
    }

    let address = req.query.address
    geoCode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, location, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                location,
                forecast: forecastData
            })
        })
    })
})



// app.get('/help/*', (req, res) => {
//     res.render('404Page', {
//         errorMessage: 'Help article does not exist',
//         title: '404 Page',
//         name: 'Vishist Dura'
//     })
// })

app.get('*', (req, res) => {
    res.render('404page', {
        title: 'Error 404',
        name: 'Vishist Dura',
        errorMessage: 'Error 404: Page does not exist'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})