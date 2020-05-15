const request = require('postman-request')

const forecast = (latitude, longitude, location, callback) => {
	const weatherObj = {
		url: `http://api.weatherstack.com/current?access_key=ab446511396b72b3a5a3f5e40de4ea9d&query=${latitude},${longitude}`,
		json: true
	}

	request(weatherObj, (error, { body }) => {
		if (error) {
			callback('Unable to connect to weather services', undefined)
		} else if (body.error) {
			callback('Cannot find location of the coordinates', undefined)
		} else {
			callback(undefined, {
				location,
				time: body.location.localtime,
				weather: body.current.weather_descriptions[0],
				temperature: body.current.temperature,
				precip: body.current.precip,
				icon: body.current.weather_icons[0]
			})
		}
	})
}

module.exports = forecast
