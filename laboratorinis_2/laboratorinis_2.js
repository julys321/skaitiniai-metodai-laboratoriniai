window.onload = () => {
    let data = laboratorinis2Uzd1Data.map(e => {
        return {
            x: e.Diena,
            y: e.Euribor
        };
    });
    drawUzd1NewtonRatiosTable(data);
    drawUzd1(data,'newton');
    drawUzd1(data,'lagrange');
    data = laboratorinis2Uzd2Data.Laikotarpis.map((e, i) => {
        return {
            x: laboratorinis2Uzd2Data.Laikotarpis[i],
            y: laboratorinis2Uzd2Data.DuomenuSrautasMB[i]
        };
    });
    drawUzd2(data);
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

function drawUzd1(data, methodToUse) {
    let drawAtDocument = null;
    let tableValues = [];
    let x = 2;
    if (methodToUse == 'newton') {
        drawAtDocument = document.getElementById('uzd1-table-newt');
        tableValues.push(calcApproximationValuesNewt(x, data));
    } else {
        drawAtDocument = document.getElementById('uzd1-table-lagr');
        tableValues.push(calcApproximationValuesLag(x, data));
    }

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

function drawUzd2(data) {
    let drawAtDocument = document.getElementById('uzd2-table-lagr');
    let tableValues = [
        []
    ];
    for (let i = 0; i < data.length; i++) {
        let dataSet = '';
        for (let j = 0; j < 4; j++) {
            if (i + j >= data.length) {
                dataSet += i + j - data.length + 1;
            } else {
                dataSet += i + j + 1;
            }
        }
        tableValues[0].push(dataSet);
    }
    let x = 3;
    tableValues.push(calcUzd2ApproximationValuesLag(x, data));
    let table = {
        type: 'table',
        header: {
            values: ['Duomenu rinkinys', 'Artinys']
        },
        cells: {
            values: tableValues
        }
    };
    Plotly.react(drawAtDocument, [table]);
}

function calcUzd2ApproximationValuesLag(x, data) {
    let approximationValues = [];
    let points = [];
    for (let i = 0; i < data.length; i++) {
        points = [];
        for (let j = 0; j < 4; j++) {
            if (i + j >= data.length) {
                points.push(data[i + j - data.length]);
            } else {
                points.push(data[i + j]);
            }
        }
        approximationValues.push(math.round(skaitiniaiMetodai.calcApproximationUsingLagrange(x, 3, points), 4));
    }
    return approximationValues;
}