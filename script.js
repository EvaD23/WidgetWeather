function timeUpdate() {
    const date = new Date();
    const wTime = document.querySelector('.time');
    wTime.innerText = date.toLocaleTimeString();
    setTimeout(timeUpdate, 1000);

}

timeUpdate();


fetch('https://api.openweathermap.org/data/2.5/weather?lat=59.9386&lon=30.3141&appid=b88bba09365ef63b8a7e7c563932d180&units=metric')
    .then(response => response.json())
    .then(json => {
        let weather = document.querySelector('.weather');
        let temp = Math.round(json.main.temp);
        if (temp > 0) {
            temp = '+' + temp;
        }
        temp += '&deg;C'
        weather.innerHTML = temp;

    });

