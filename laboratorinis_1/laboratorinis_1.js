window.onload = () => {
    const lentele1 = new Lentele1;
    const lab1Uzd1Document = document.getElementById('lab1-uzd1');
    Plotly.react(lab1Uzd1Document, [lentele1.data], lentele1.layout);

    const lab1Uzd2Document = document.getElementById('lab1-uzd2');
    Plotly.react(lab1Uzd2Document, [new Lentele2]);

    //TODO: kolkas tik piesia taskus
    const lentele3 = new Lentele3;
    const lab1Uzd3Document = document.getElementById('lab1-uzd3');
    Plotly.react(lab1Uzd3Document, [lentele3.data], lentele3.layout);
};
class Lentele1 {
    constructor() {
        this.data = {
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
    }
    get layout() {
        const xMinRadius = Math.min.apply(Math, this.data.x) - 1;
        const xMaxRadius = Math.max.apply(Math, this.data.x) + 1;
        const yMinRadius = Math.min.apply(Math, this.data.y) - 1;
        const yMaxRadius = Math.max.apply(Math, this.data.y) + 1;
        return {
            xaxis: {
                range: [xMinRadius, xMaxRadius]
            },
            yaxis: {
                range: [yMinRadius, yMaxRadius]
            }
        };
    }
}

class Lentele2 {
    constructor() {
        const values = [
            [],
            [],
            []
        ];
        duomenysRackausko.forEach((value, index) => {
            values[0].push('i' + index);
            values[1].push(value.Pajamos);
            values[2].push(value.Islaidos);
        });
        this.type = 'table';
        this.header = {
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
        };
        this.cells = {
            values: values,
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
        };
    }
}

class Lentele3 {
    constructor() {
        this.data = {
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

        this.data.x = duomenysRackausko.map((object) => object['Pajamos']);
        this.data.y = duomenysRackausko.map((object) => object['Islaidos']);
        this.data.x.forEach((value, index) => {
            this.data.text.push('i' + index);
        });
    }
    get layout() {
        const xMinRadius = Math.min.apply(Math, this.data.x) - 1;
        const xMaxRadius = Math.max.apply(Math, this.data.x) + 1;
        const yMinRadius = Math.min.apply(Math, this.data.y) - 1;
        const yMaxRadius = Math.max.apply(Math, this.data.y) + 1;
        return {
            xaxis: {
                range: [xMinRadius, xMaxRadius]
            },
            yaxis: {
                range: [yMinRadius, yMaxRadius]
            }

        };
    }
}