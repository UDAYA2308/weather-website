const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=dac82d5b47b0a993572c994661db2c66&query=' + latitude + ',' + longitude + '&units=m'
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback("Unable to connect to weather service!", undefined)
        } else if (body.error) {
            callback.log("Unable to find location", undefined)
        } else {
            const current_degree = body.current.temperature
            const feel_like = body.current.feelslike
            const data = body.current.weather_descriptions[0] + ". It is currently  " + current_degree + 'degree out. It feels like ' + feel_like +
                " degree out. The humidity is " + body.current.humidity + "%"
            callback(undefined, data)
        }
    })

}

module.exports = forecast