var data = [];
window.onload = () => {
    data = laboratorinis2Uzd1Data.map(e => {
        return {
            x: e.Euribor,
            y: e.Diena
        };
    });
    // data = [{
    //     x: -3,
    //     y: 469
    // }, {
    //     x: -2,
    //     y: 87
    // }, {
    //     x: -1,
    //     y: 9
    // }, {
    //     x: 0,
    //     y: 1
    // }, {
    //     x: 1,
    //     y: -3
    // }, {
    //     x: 2,
    //     y: -21
    // }];
    drawUzd1NewtonTable();
};

function drawUzd1NewtonTable() {
    const drawAtDocument = document.getElementById('uzd1-newton-table');
    let newtonTable = skaitiniaiMetodai.calcNewtonTable(data, data.length - 1);
    newtonTable = newtonTable.map(e => e.map(e => e === '-' ? e : math.round(e)));
    let table = {
        type: 'table',
        header: {
            values: ['x', 'y'].concat(newtonTable.map((e, i) => 'f' + i))
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