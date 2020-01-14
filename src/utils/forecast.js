request = require('request')

// const url = 'https://api.darksky.net/forecast/349637619b9c7671895db0f5e0da7a8d/37.8267,-122.4233?units=us&lang=en'

// request({url: url, json: true}, (error, response) => {
//     console.log(response.body.daily.data[0])
// })

const forecast = (lat, lon, callback) => {
    const url = 'https://api.darksky.net/forecast/349637619b9c7671895db0f5e0da7a8d/'+ encodeURIComponent(lat) +','+ encodeURIComponent(lon) +'?units=us&lang=en'
    
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to forecast service!', undefined)
        }else if(body.error){
            callback('Unable to find location!', undefined)
        }else{
            callback(undefined, body.daily.summary + '  Max temp: ' + body.daily.data[1].temperatureMax + ' degrees.')
        }
    })
}

module.exports = forecast