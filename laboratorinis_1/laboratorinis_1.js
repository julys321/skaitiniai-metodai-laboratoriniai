window.onload = () => {
    const lentele1 = getLentele1();
    const lab1Uzd1Document = document.getElementById('lab1-uzd1');
    Plotly.react(lab1Uzd1Document, [lentele1.data], lentele1.layout);

    const lab1Uzd2Document = document.getElementById('lab1-uzd2');
    Plotly.react(lab1Uzd2Document, [getLentele2()]);

    //TODO: kolkas tik piesia taskus
    const lentele3 = getLentele3();
    const lab1Uzd3Document = document.getElementById('lab1-uzd3');
    Plotly.react(lab1Uzd3Document, [lentele3.data]);
};

function getLentele1() {
    const data = {
        x: [0, 10, -3, 4],
        y: [3, 2, 1, 0],
        mode: 'markers+text',
        marker: {
            color: 'rgba(156, 165, 196, 0.95)',
            line: {
                color: 'rgba(156, 165, 196, 1.0)',
                width: 1,
            },
            symbol: 'circle',
            size: 4
        },
        text: ['i1', 'i2', 'i3', 'i4'],
        textposition: 'bottom',
    };
    const xMinRadius = Math.min.apply(Math, data.x) - 1;
    const xMaxRadius = Math.max.apply(Math, data.x) + 1;
    const yMinRadius = Math.min.apply(Math, data.y) - 1;
    const yMaxRadius = Math.max.apply(Math, data.y) + 1;
    return {
        data,
        layout: {
            xaxis: {
                range: [xMinRadius, xMaxRadius]
            },
            yaxis: {
                range: [yMinRadius, yMaxRadius]
            }
        }
    };
}

function getLentele2() {
    const valuesLentele2 = [
        [],
        [],
        []
    ];
    duomenysRackausko.forEach((value, index) => {
        valuesLentele2[0].push('i' + index);
        valuesLentele2[1].push(value.Pajamos);
        valuesLentele2[2].push(value.Islaidos);
    });
    return {
        type: 'table',
        header: {
            values: [
                ['Duomenys Is Rackausko'],
                ['Pajamos'],
                ['Islaidos']
            ],
            align: 'center',
            line: {
                width: 1,
                color: 'black'
            },
            fill: {
                color: 'grey'
            },
            font: {
                family: 'Arial',
                size: 12,
                color: 'white'
            }
        },
        cells: {
            values: valuesLentele2,
            align: 'center',
            line: {
                color: 'black',
                width: 1
            },
            font: {
                family: 'Arial',
                size: 11,
                color: ['black']
            }
        }
    };
}

function getLentele3() {
    const data = {
        x: [],
        y: [],
        mode: 'markers+text',
        marker: {
            color: 'rgba(156, 165, 196, 0.95)',
            line: {
                color: 'rgba(156, 165, 196, 1.0)',
                width: 1,
            },
            symbol: 'circle',
            size: 4
        },
        text: [],
        textposition: 'bottom',
    };

    data.x = duomenysRackausko.map((object) => object['Pajamos']);
    data.y = duomenysRackausko.map((object) => object['Islaidos']);
    data.x.forEach((value, index) => {
        data.text.push('i' + index);
    });

    const xMinRadius = Math.min.apply(Math, data.x) - 1;
    const xMaxRadius = Math.max.apply(Math, data.x) + 1;
    const yMinRadius = Math.min.apply(Math, data.y) - 1;
    const yMaxRadius = Math.max.apply(Math, data.y) + 1;
    return {
        data,
        layout: {
            xaxis: {
                range: [xMinRadius, xMaxRadius]
            },
            yaxis: {
                range: [yMinRadius, yMaxRadius]
            }
        }
    };
}