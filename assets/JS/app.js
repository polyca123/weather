// apiKey = ddd1915c808bbfa3bc2af6d48efad19b
let city = []
const saved = JSON.parse(localStorage.getItem('saved')) || []

document.getElementById('search').addEventListener('click', event => {
  event.preventDefault()

  const search = document.getElementById('city').value

  axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=imperial&appid=ddd1915c808bbfa3bc2af6d48efad19b`)
    .then(res => {
      cities = res.data
      console.log(cities)
      document.getElementById('city').value = ''

      document.getElementById('cities').innerHTML = `
        <h1>${cities.name}</h1>
        <br>
        <p><strong>Temperature: </strong>${cities.main.temp}</p>
        <br>
        <p><strong>Humidity: </strong>${cities.main.humidity}</p>
        <br>
        <p><strong>Wind Speed: </strong>${cities.wind.speed}</p>
        <br>
        <p id="uvIndex"></p>
      `
      axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${cities.coord.lat}&lon=${cities.coord.lon}&exclude=daily&appid=ddd1915c808bbfa3bc2af6d48efad19b`)
        .then(res => {
          uv = res.data
          console.log(uv)

          document.getElementById('uvIndex').innerHTML = `
          <p id="uvIndex"><strong>UV Index: </strong>${uv.current.uvi}</p>
          `
        })
    })
    .catch(err => console.error(err))
})