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
    document.getElementById('content')
        .innerHTML = '<object type="text/html" data="calculator/calculator.html" style="width: 100%;  height: 100%;"></object>';
}

function loadLab1() {
    document.getElementById('content')
        .innerHTML = '<object type="text/html" data="laboratorinis_1/laboratorinis_1.html" style="width: 100%;  height: 100%;"></object>';
}

function loadLab2() {
    document.getElementById('content')
        .innerHTML = '<object type="text/html" data="laboratorinis_2/laboratorinis_2.html" style="width: 100%;  height: 100%;"></object>';
}