const weatherForm = document.querySelector('form')
const searchQuery = document.querySelector('input')
const messageTitle = document.querySelector('#message-title')
const locationTime = document.querySelector('#location-time')
const messageBody = document.querySelector('#message-body')
const weatherImg = document.querySelector('#weather-image')
const resultDiv = document.querySelector('.result')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchQuery.value
    resultDiv.hidden = false;
    messageBody.textContent = "Loading..."
    weatherImg.src = ''
    locationTime.textContent = ''
    messageTitle.textContent = ''
    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageTitle.textContent = ''
                messageBody.textContent = data.error
            } else {
                weatherImg.src = data.forecast.icon
                messageTitle.textContent = data.location
                locationTime.textContent = 'Local Time: ' + data.forecast.time
                messageBody.textContent = `${data.forecast.weather}, The temperature is ${data.forecast.temperature} degrees and humidity is ${data.forecast.humidity} with a ${data.forecast.precip}mm forecasted rainfall.`
            }
        })
    })
})
