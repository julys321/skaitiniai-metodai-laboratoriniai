window.onload = () => {
    autoFill();
    document.getElementById('calculate-button').onclick = () => {
        prepData();
        drawTable();
    };
};

function autoFill() {
    document.getElementById('x-table-values').value = "1,1.2,1.3,1.4,1.5,1.6,1.7,1.8,1.9,2,2.1,2.2,2.3,2.4,2.5,2.6,2.7,2.8,2.9,3"
    document.getElementById('y-table-values').value = "1.23 0.85 0.82 0.8 0.7 0.5 0.39 0.32 0.27 0.22 0.19 0.13 0.11 0.09 0.08 0.07 0.06 0.06 0.05 0.04";
    //document.getElementById('X-value').value = 
    //document.getElementById('Y-value').value =
}

function drawTable() {
    document.getElementById('body')
        .innerHTML += '<div id="table"><div>';
}

function prepData() {
    let x = document.getElementById('x-table-values').value.split(',');
    let y = document.getElementById('y-table-values').value.split(',');
    let X = document.getElementById('X-value').value;
    let Y = document.getElementById('Y-value').value;
    return x.map((e, i) => {
        return {
            x: x[i],
            y: y[i]
        };
    });
    console.log(x,y,X,Y)
}

function drawUzd1(data) {
    let drawAtDocument = null;
    let tableValues = [];
    let x = 2;
    drawAtDocument = document.getElementById('uzd1-table-newt');
    tableValues.push(calcApproximationValuesNewt(x, data));

    tableValues.unshift(tableValues[0].map((e, i) => i + 1));
    tableValues.push(tableValues[1].map(e => math.abs(math.subtract(math.bignumber(0.231), e))));
    tableValues.push(calcErrorValues(tableValues[1]));

    let table = {
        type: 'table',
        header: {
            values: ['Eile', 'Artinys', 'Reali paklaida', 'Paklaidos ivertis']
        },
        cells: {
            values: tableValues
        }
    };
    Plotly.react(drawAtDocument, [table]);
}