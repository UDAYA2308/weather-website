const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const address = document.querySelector('#location')
const forecast = document.querySelector('#forecast')

weatherForm.addEventListener('submit', (eve) => {

    eve.preventDefault()
    address.textContent = 'loading...'


    const location = search.value

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                address.textContent = data.error
            } else {

                address.textContent = data.location
                forecast.textContent = data.forecastdata
            }
        })
    })
})