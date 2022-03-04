const express = require('express');
const https = require('https')
const bodyParser = require('body-parser')
require('dotenv').config()

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {

    res.sendFile(__dirname + '/index.html')

    
})


app.post('/', (req, res) => {

    console.log(req.body.cityName)


    const query = req.body.cityName
    const apiKey = process.env.API_KEY
    const units = 'imperial'

    const url =`https://api.openweathermap.org/data/2.5/find?q=${query}&appid=${apiKey}&units=${units}`
    https.get(url, (response) => {
        console.log(response.statusCode)

        response.on('data', (data) => {

             const weatherData = JSON.parse(data)
             const temp = weatherData.list[0].main.temp
             const weatherDescription = weatherData.list[0].weather[0].description
             const icon = weatherData.list[0].weather[0].icon     
             const imgUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`

            res.write('<body>')
            res.write(`<img src="${imgUrl}" alt="${weatherDescription}"/>`)
            res.write(`<h2>The temp in ${query} is ${temp} degrees Farenheit, it is currently ${weatherDescription}</h2>`)
            res.write('</body>')
            res.end()

        })
    })
    
})



//     const query = 'London'
//     const apiKey = '4ee6f90f9f5230d959c80267e0dbc21f'
//     const units = 'imperial'

//     const url =`https://api.openweathermap.org/data/2.5/find?q=${query}&appid=${apiKey}&units=${units}`
//     https.get(url, (response) => {
//         console.log(response.statusCode)

//         response.on('data', (data) => {

//              const weatherData = JSON.parse(data)
//              const temp = weatherData.list[0].main.temp
//              const weatherDescription = weatherData.list[0].weather[0].description
//              const icon = weatherData.list[0].weather[0].icon     
//              const imgUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`

//             res.write('<body>')
//             res.write(`<img src="${imgUrl}" alt="${weatherDescription}"/>`)
//             res.write(`<h2>The temp in London is ${temp} degrees Farenheit, it is currently ${weatherDescription}</h2>`)
//             res.write('</body>')
//             res.end()

//         })
//     })




app.listen(3001, () => {
    console.log('listening on port 3001')
})