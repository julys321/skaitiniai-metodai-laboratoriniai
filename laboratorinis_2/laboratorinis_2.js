window.onload = () => {
    let data = laboratorinis2Uzd1Data.map(e => {
        return {
            x: e.Diena,
            y: e.Euribor
        };
    });
    drawUzd1NewtonRatiosTable(data);
    drawUzd1(data, 'newton');
    drawUzd1(data, 'lagrange');
    data = laboratorinis2Uzd2Data.Laikotarpis.map((e, i) => {
        return {
            x: laboratorinis2Uzd2Data.Laikotarpis[i],
            y: laboratorinis2Uzd2Data.DuomenuSrautasMB[i]
        };
    });
    drawUzd2(data);
    data = laboratorinis2Uzd3Data.Gylis.map((e, i) => {
        return {
            x: laboratorinis2Uzd3Data.Gylis[i],
            y: laboratorinis2Uzd3Data.Trukme[i]
        };
    });
    drawUzd3(data);
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
    let x = 17;
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

function drawUzd3(data) {
    let x = 17;
    let n = 4;
    //TODO: remove
    //pasitikrinimui
    let pasitikrinimui = calcUzd2ApproximationValuesLag(x, data).map(e=>e.toString());
    console.log('uzd3 all aproximations',pasitikrinimui);
    let bestData = pickBestData(x, data, n);
    let drawAtDocument = document.getElementById('uzd3-table-lagr');
    let tableValues = [
        []
    ];
    tableValues[0].push(bestData.reduce((acc, cur) => {
        return (data.indexOf(cur) + 1) + acc;
    }, '').split('').sort().join(''));
    tableValues.push(calcUzd3ApproximationValuesLag(x, bestData));
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

function calcUzd3ApproximationValuesLag(x, data) {
    let approximationValues = [];
    approximationValues.push(math.round(skaitiniaiMetodai.calcApproximationUsingLagrange(x, 3, data), 4));
    return approximationValues;
}

function pickBestData(x, data, n) {
    let bestData = [];
    let xDistArr = data.map(e => math.subtract(x, e.x));
    let xLeftNeighbor = data[xDistArr.indexOf(Math.min(...xDistArr.filter(e => e > 0)))];
    let xRightNeighbor = data[xDistArr.indexOf(Math.max(...xDistArr.filter(e => e < 0)))];
    let middlePoint = math.divide(math.abs(math.subtract(xLeftNeighbor.y, xRightNeighbor.y)), 2);
    middlePoint = math.add(middlePoint, Math.min(xLeftNeighbor.y, xRightNeighbor.y));
    let dataWithDist = data.map(e => {
        return {
            data: e,
            dist: {
                y: math.abs(math.subtract(middlePoint, e.y))
            }
        };
    });
    dataWithDist = dataWithDist.sort((a, b) => a.dist.y - b.dist.y);
    for (let i = 0; i < n + 1; i++) {
        bestData.push(dataWithDist[i].data);
    }
    return bestData;
}