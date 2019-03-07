window.onload = () => {
    loadLab2();

    document.getElementById('lab1-button').onclick = () => {
        loadLab1();
    };
    document.getElementById('lab2-button').onclick = () => {
        loadLab2();
    };
};

function loadLab1() {
    document.getElementById('content')
        .innerHTML = '<object type="text/html" data="laboratorinis_1/laboratorinis_1.html" ></object>';
}

function loadLab2() {
    document.getElementById('content')
        .innerHTML = '<object type="text/html" data="laboratorinis_2/laboratorinis_2.html" ></object>';
}