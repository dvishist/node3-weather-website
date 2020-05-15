const request = require('postman-request')

const geoCode = (address, callback) => {
  const mapObj = {
    url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoidmlzaGlzdCIsImEiOiJjazk3ZG91enYwYWxuM2xsZXFxcDQzbWMyIn0.k9KCXIiscITDIX_tWKtOzg&limit=1`,
    json: true
  }

  request(mapObj, (error, { body: { features } }) => {
    if (error) {
      callback('Unable to connect to location services', undefined)
    } else if (features.length === 0) {
      callback('Cannot find the location, please try a different query', undefined)
    } else {
      callback(undefined, {
        location: features[0].place_name,
        latitude: features[0].center[1],
        longitude: features[0].center[0]
      })
    }
  })
}

module.exports = geoCode
