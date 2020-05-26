const request = require('postman-request')
const geocode = (address, callback) => {
    address = encodeURIComponent(address)
    const url = ('https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoidWRheWEwNCIsImEiOiJja2FtM2EzdHMwMnhsMnNwZnd5eGxncjl3In0.uFvUDHi0YJJ2xns-12kHiQ&limit=1')

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather app!')
        } else if (body.features.length == 0) {
            callback('Unable to find location')
        } else {
            const Latitude = body.features[0].center[1]
            const Longitude = body.features[0].center[0]
            const location = body.features[0].place_name
            const data = {
                Latitude,
                Longitude,
                location
            }
            callback('', data)
        }
    })
}


module.exports = {
    geocode: geocode
}