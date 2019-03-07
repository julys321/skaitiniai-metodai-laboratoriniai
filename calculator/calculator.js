var skaitiniaiMetodai = new SkaitiniaiMetodai();
skaitiniaiMetodai.roundingPrecision = 6;
window.onload = () => {
    autoFillNewt();
    document.getElementById('newton-approximations-errors-biases-calculate-button').onclick = () => {
        let data = prepDataNewt();
        let newtonAproximations = skaitiniaiMetodai.calcApproximationsUsingNewton(data.X, data.xyArr);
        let realErrors = skaitiniaiMetodai.calcRealErrors(newtonAproximations, data.Y);
        let biases = skaitiniaiMetodai.calcBiases(newtonAproximations, data.Y);
        let drawAtDocument = document.getElementById('newton-approximations-errors-biases');
        drawTable(drawAtDocument, newtonAproximations, realErrors, biases);
    };
    autoFillLagr();
    document.getElementById('lagrange-approximations-errors-biases-calculate-button').onclick = () => {
        let data = prepDataLagr();
        let newtonAproximations = skaitiniaiMetodai.calcApproximationsUsingLagrange(data.X, data.xyArr);
        let realErrors = skaitiniaiMetodai.calcRealErrors(newtonAproximations, data.Y);
        let biases = skaitiniaiMetodai.calcBiases(newtonAproximations, data.Y);
        let drawAtDocument = document.getElementById('lagrange-approximations-errors-biases');
        drawTable(drawAtDocument, newtonAproximations, realErrors, biases);
    };
};

function autoFillNewt() {
    document.getElementById('newton-approximations-errors-biases-x-table-values').value = '1 3 4 5 7 8 9 10'; //'1,1.2,1.3,1.4,1.5,1.6,1.7,1.8,1.9,2,2.1,2.2,2.3,2.4,2.5,2.6,2.7,2.8,2.9,3';
    document.getElementById('newton-approximations-errors-biases-y-table-values').value = '0.230 0.228 0.226 0.222 0.223 0.218 0.206 0.202'; //'1.23,0.85,0.82,0.8,0.7,0.5,0.39,0.32,0.27,0.22,0.19,0.13,0.11,0.09,0.08,0.07,0.06,0.06,0.05,0.04';
    document.getElementById('newton-approximations-errors-biases-X-value').value = '2'; //'1.05';
    document.getElementById('newton-approximations-errors-biases-Y-value').value = '0.231'; //'1';
}

function autoFillLagr() {
    document.getElementById('lagrange-approximations-errors-biases-x-table-values').value = '1 3 4 5 7 8 9 10'; //'1,1.2,1.3,1.4,1.5,1.6,1.7,1.8,1.9,2,2.1,2.2,2.3,2.4,2.5,2.6,2.7,2.8,2.9,3';
    document.getElementById('lagrange-approximations-errors-biases-y-table-values').value = '0.230 0.228 0.226 0.222 0.223 0.218 0.206 0.202'; //'1.23,0.85,0.82,0.8,0.7,0.5,0.39,0.32,0.27,0.22,0.19,0.13,0.11,0.09,0.08,0.07,0.06,0.06,0.05,0.04';
    document.getElementById('lagrange-approximations-errors-biases-X-value').value = '2'; //'1.05';
    document.getElementById('lagrange-approximations-errors-biases-Y-value').value = '0.231'; //'1';
}

function prepDataNewt() {
    let x = document.getElementById('newton-approximations-errors-biases-x-table-values').value.split(/[,\s]/);
    let y = document.getElementById('newton-approximations-errors-biases-y-table-values').value.split(/[,\s]/);
    let X = math.round(document.getElementById('newton-approximations-errors-biases-X-value').value, 15);
    let Y = math.round(document.getElementById('newton-approximations-errors-biases-Y-value').value, 15);
    let xyArr = x.map((e, i) => {
        return {
            x: math.round(x[i], 15),
            y: math.round(y[i], 15)
        };
    });
    return {
        X,
        Y,
        xyArr
    };

}

function prepDataLagr() {
    let x = document.getElementById('lagrange-approximations-errors-biases-x-table-values').value.split(/[,\s]/);
    let y = document.getElementById('lagrange-approximations-errors-biases-y-table-values').value.split(/[,\s]/);
    let X = math.round(document.getElementById('lagrange-approximations-errors-biases-X-value').value, 15);
    let Y = math.round(document.getElementById('lagrange-approximations-errors-biases-Y-value').value, 15);
    let xyArr = x.map((e, i) => {
        return {
            x: math.round(x[i], 15),
            y: math.round(y[i], 15)
        };
    });
    return {
        X,
        Y,
        xyArr
    };

}

function drawTable(HTMLelement, approximations = [], realErrors = [], biases = []) {
    HTMLelement.innerHTML += '<div id="result-table"><div>';
    let drawAtDocument = document.getElementById('result-table');
    let tableValues = [];
    tableValues.push(approximations);
    tableValues.unshift(tableValues[0].map((e, i) => i + 1));
    tableValues.push(realErrors);
    tableValues.push(biases);

    let table = {
        type: 'table',
        header: {
            values: ['Row', 'Approximation', 'Real error', 'Error bias']
        },
        cells: {
            values: tableValues
        }
    };
    Plotly.react(drawAtDocument, [table]);
}