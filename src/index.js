import calculator from './calculator/calculator.js';
window.onload = () => {
    loadCalculator();

    document.getElementById('calculator-button').onclick = () => {
        loadCalculator();
    };
    document.getElementById('lab1-button').onclick = () => {
        loadLab1();
    };
    document.getElementById('lab2-button').onclick = () => {
        loadLab2();
    };
};

function loadCalculator() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'calculator/calculator.html', true);
    xhr.onreadystatechange = function () {
        if (this.readyState !== 4) return;
        if (this.status !== 200) return; // or whatever error handling you want
        document.getElementById('content').innerHTML = this.responseText;
        calculator.onload();
    };
    xhr.send();
}



function loadLab1() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'laboratorinis_1/laboratorinis_1.html', true);
    xhr.onreadystatechange = function () {
        if (this.readyState !== 4) return;
        if (this.status !== 200) return; // or whatever error handling you want
        document.getElementById('content').innerHTML = this.responseText;
    };
    xhr.send();
}

function loadLab2() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'laboratorinis_2/laboratorinis_2.html', true);
    xhr.onreadystatechange = function () {
        if (this.readyState !== 4) return;
        if (this.status !== 200) return; // or whatever error handling you want
        document.getElementById('content').innerHTML = this.responseText;
    };
    xhr.send();
}