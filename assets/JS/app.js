// apiKey = ddd1915c808bbfa3bc2af6d48efad19b
const currentDate = moment().format('l')

let city = []
const saved = JSON.parse(localStorage.getItem('saved')) || []

document.getElementById('search').addEventListener('click', event => {
  event.preventDefault()

  const search = document.getElementById('city').value

  localStorage.setItem('savedCity', JSON.stringify(search))
  saved.push(city)

  axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=imperial&appid=ddd1915c808bbfa3bc2af6d48efad19b`)
    .then(res => {
      cities = res.data
      console.log(cities)
      document.getElementById('city').value = ''

      document.getElementById('cities').innerHTML = `
        <h1>${cities.name}</h1>
        <h4 id="currentDay"></h4>
        <br>
        <p><strong>Temperature: </strong>${cities.main.temp} °F</p>
        <br>
        <p><strong>Humidity: </strong>${cities.main.humidity}%</p>
        <br>
        <p><strong>Wind Speed: </strong>${cities.wind.speed} MPH</p>
        <br>
        <p id="uvIndex"></p>
      `
      document.getElementById('currentDay').textContent = currentDate

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

  const nextDate1 = moment().add(1, 'days').format('l')
  const nextDate2 = moment().add(2, 'days').format('l')
  const nextDate3 = moment().add(3, 'days').format('l')
  const nextDate4 = moment().add(4, 'days').format('l')
  const nextDate5 = moment().add(5, 'days').format('l')

  axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${search}&units=imperial&appid=ddd1915c808bbfa3bc2af6d48efad19b`)
    .then(res => {
      forecast = res.data
      console.log(forecast)
      console.log(nextDate2)
      document.getElementById('forecasts').innerHTML = `
      <div class="card text-white bg-primary col-2">
            <h3 id="day1"></h3><br>
            <p><strong>Temp: </strong>${forecast.list[1].main.temp} °F</p><br>
            <p><strong>Humidity: </strong>${forecast.list[1].main.humidity} %</p><br>
            <p><strong>Wind: </strong>${forecast.list[1].wind.speed} MPH</p>
          </div>

      <div class="card text-white bg-primary col-2">
            <h3 id="day2"></h3><br>
            <p><strong>Temp: </strong>${forecast.list[9].main.temp} °F</p><br>
            <p><strong>Humidity: </strong>${forecast.list[9].main.humidity} %</p><br>
            <p><strong>Wind: </strong>${forecast.list[9].wind.speed} MPH</p>
          </div>

      <div class="card text-white bg-primary col-2">
            <h3 id="day3">Date</h3><br>
            <p><strong>Temp: </strong>${forecast.list[17].main.temp} °F</p><br>
            <p><strong>Humidity: </strong>${forecast.list[17].main.humidity} %</p><br>
            <p><strong>Wind: </strong>${forecast.list[17].wind.speed} MPH</p>
          </div>

      <div class="card text-white bg-primary col-2">
            <h3 id="day4">Date</h3><br>
            <p><strong>Temp: </strong>${forecast.list[25].main.temp} °F</p><br>
            <p><strong>Humidity: </strong>${forecast.list[25].main.humidity} %</p><br>
            <p><strong>Wind: </strong>${forecast.list[25].wind.speed} MPH</p>
          </div>

      <div class="card text-white bg-primary col-2">
            <h3 id="day5">Date</h3><br>
            <p><strong>Temp: </strong>${forecast.list[33].main.temp} °F</p><br>
            <p><strong>Humidity: </strong>${forecast.list[33].main.humidity} %</p><br>
            <p><strong>Wind: </strong>${forecast.list[33].wind.speed} MPH</p>
          </div>
      
      `
      document.getElementById('day1').textContent = nextDate1
      document.getElementById('day2').textContent = nextDate2
      document.getElementById('day3').textContent = nextDate3
      document.getElementById('day4').textContent = nextDate4
      document.getElementById('day5').textContent = nextDate5
    })
})