function timeUpdate() {
    const date = new Date();
    const wTime = document.querySelector('.time');
    wTime.innerText = date.toLocaleTimeString();
    setTimeout(timeUpdate, 1000);

}

timeUpdate();

function weatherUpdate() {
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
}

function weatherRefresh() {
    weatherUpdate();
    setTimeout(weatherRefresh, 3600000);
}
weatherRefresh();

const btn = document.querySelector('button');
btn.addEventListener('click', weatherUpdate);

let container = document.querySelector('.container');

container.onmousedown = function (event) {

    let shiftX = event.clientX - container.getBoundingClientRect().left;
    let shiftY = event.clientY - container.getBoundingClientRect().top;

    container.style.position = 'absolute';
    container.style.zIndex = 1000;
    document.body.append(container)
    moveAt(event.pageX, event.pageY);

    // переносит контеинер на координаты (pageX, pageY),
    // дополнительно учитывая изначальный сдвиг относительно указателя мыши
    function moveAt(pageX, pageY) {
        container.style.left = pageX - shiftX + 'px';
        container.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    // передвигаем контеинер при событии mousemove
    document.addEventListener('mousemove', onMouseMove);

    // отпустить контеинер, удалить ненужные обработчики
    container.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove);
        container.onmouseup = null;
    };

};

container.ondragstart = function () {
    return false;
};


