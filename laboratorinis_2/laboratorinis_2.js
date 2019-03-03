window.onload = () => {
    let data = laboratorinis2Uzd1Data.map(e => {
        return {
            x: e.Diena,
            y: e.Euribor
        };
    });
    drawUzd1NewtonRatiosTable(data);
    drawUzd1(data);
    //console.log(calcApproximationValuesLag(2, data).toString())
};

function drawUzd1NewtonRatiosTable(data) {
    const drawAtDocument = document.getElementById('uzd1-newton-table');
    let newtonTable = skaitiniaiMetodai.calcNewtonRatiosTable(data, data.length - 1);
    newtonTable = newtonTable.map(e => e.map(e => e === '-' ? e : math.round(e, 4)));
    let table = {
        type: 'table',
        header: {
            values: ['x', 'y'].concat(newtonTable.map((e, i) => 'f' + (i + 1)))
        },
        cells: {
            values: [
                [...data.map(e => e.x)],
                [...data.map(e => e.y)]
            ].concat(newtonTable.map(e => e))
        }
    };
    Plotly.react(drawAtDocument, [table]);
}

function drawUzd1(data) {
    let tableValues = [];
    let x = 2;
    tableValues.push(calcApproximationValuesNewt(x, data));
    tableValues.unshift(tableValues[0].map((e, i) => i + 1));
    tableValues.push(tableValues[1].map(e => math.abs(math.subtract(math.bignumber(0.231), e))));
    tableValues.push(calcErrorValues(tableValues[1]));
    const drawAtDocument = document.getElementById('uzd1-table');
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

function calcApproximationValuesNewt(x, data) {
    let approximationValues = [];
    for (let i = 1; i < data.length; i++) {
        approximationValues.push(math.round(skaitiniaiMetodai.calcApproximationUsingNewton(x, i, data), 4));
    }
    return approximationValues;
}

function calcApproximationValuesLag(x, data) {
    let approximationValues = [];
    for (let i = 1; i < data.length; i++) {
        approximationValues.push(math.round(skaitiniaiMetodai.calcApproximationUsingLagrange(x, i, data), 4));
    }
    return approximationValues;
}

function calcErrorValues(approximationValues) {
    let errorValues = ['-'];
    for (let i = 1; i < approximationValues.length; i++) {
        errorValues.push(math.abs(math.subtract(approximationValues[i], approximationValues[i - 1])));
    }
    return errorValues;
}