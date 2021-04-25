const segundero = document.querySelector('.second-hand');
const minutero = document.querySelector('.min-hand');
const manitoHoras = document.querySelector('.hour-hand');
const manillas = document.getElementsByClassName('hand');
const digital = document.querySelector('.clock-digital');
const minutos = document.querySelector('.minutes-digital');
const second = document.querySelector('.seconds-digital');
const milTime = document.querySelector('.milHour');
const hideDigit = document.querySelector('.hideDigital');

milTime.addEventListener('click', diaCompleto);
hideDigit.addEventListener('click', esconderDigitos);

let relojMilitar = 1;
let amPm = 1;
let digitos = 1;

function setDate() {
    const now = new Date();
    const segundos = now.getSeconds();
    const segundosGrados = ((segundos / 60) * 360) + 90;
    if (segundosGrados == 90 ) {
        Array.prototype.forEach.call(manillas, (item) => item.setAttribute('style', 'transition: none;'));
        segundero.style.transform = `rotate(${segundosGrados}deg)`;
        Array.prototype.forEach.call(manillas, (item) => item.setAttribute('style', 'transition: all 0.05s cubic-bezier(0.1, 2.7, 0.58, 1)'));
        //el tick me sigue quedando raro a los 60seg. Encontrar solucion
    } else {
        segundero.style.transform = `rotate(${segundosGrados}deg)`;
    }
    const minutos = now.getMinutes();
    const minutosGrados = ((minutos / 60) * 360) + 90;
    minutero.style.transform = `rotate(${minutosGrados}deg)`;

    let horas = now.getHours();
    if (horas > 12 && relojMilitar == 0) {
        horas = horas - 12;
        amPm = 1;
    }
    const horasGrados = ((horas / 12) * 360) + 90;
    manitoHoras.style.transform = `rotate(${horasGrados}deg)`;

    relojDigital(horas, minutos, segundos);
}

function relojDigital (horas, minutos, segundos) {
    let m = checkTime(minutos);
    let s = checkTime(segundos);
    if (relojMilitar == 1) {
        digital.innerHTML = horas + ":" + m + ":" + s;
    } else if (amPm == 0) {
        digital.innerHTML = horas + ":" + m + ":" + s + " AM";
    } else {
        digital.innerHTML = horas + ":" + m + ":" + s + " PM";
    }
}

function diaCompleto() {
    relojMilitar =! relojMilitar;
    if (relojMilitar == 0) {
        milTime.innerHTML = "24 Horas";
    } else {
        milTime.innerHTML = "12 Horas";
    }
}

function esconderDigitos() {
    digitos =! digitos;
    if (digitos == 0) {
        hideDigit.innerHTML = "Mostrar Reloj Digital";
        digital.style.display = "none";
        milTime.style.display = "none";
    } else {
        hideDigit.innerHTML = "Esconder Reloj Digital";
        digital.style.display = "block";
        milTime.style.display = "block";
    }
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  
    return i;
}

setInterval(setDate, 1000);