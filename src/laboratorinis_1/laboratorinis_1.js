import math from '../../node_modules/mathjs/index.js';
import Plotly from '../../lib/plotly.js';
import duomenysRackausko from './DuomenysRackausko.js';
class Laboratorinis_1 {
    constructor() {}
    onload() {
        this.drawUzd1();
        this.drawUzd2();
        this.drawUzd3();
        this.drawUzd4();
        this.drawUzd5();
        this.drawUzd6();
        this.drawUzd7();
        this.drawUzd8();
    }

    drawUzd1() {
        const table = new Table1;
        const lab1Uzd1Document = document.getElementById('lab1-uzd1');
        Plotly.react(lab1Uzd1Document, [table.data], table.layout);
    }

    drawUzd2() {
        const lab1Uzd2Document = document.getElementById('lab1-uzd2');
        Plotly.react(lab1Uzd2Document, [new Table2]);
    }

    drawUzd3() {
        const table = new Table3;
        const lab1Uzd3Document = document.getElementById('lab1-uzd3');
        Plotly.react(lab1Uzd3Document, [table.scatter, table.trace], table.layout);
    }

    drawUzd4() {
        const table = new Table4;
        const lab1Uzd4Document = document.getElementById('lab1-uzd4');
        Plotly.react(lab1Uzd4Document, [table.getTrace(1), table.getTrace(2), table.getTrace(3)], table.layout);
    }

    drawUzd5() {
        const lab1Uzd5Document = document.getElementById('lab1-uzd5');
        Plotly.react(lab1Uzd5Document, [new Table2]);
    }
    //TODO: fix, why i was using tensors?
    drawUzd6() {
        const lab1Uzd6Document = document.getElementById('lab1-uzd6');
        const X = new Set([0, 1, -1, 100, 20]);
        const Y = new Set([1, 0, -1, 20, 100]);
        //TODO: refactoring needed
        function eqSet(as, bs) {
            if (as.size !== bs.size) return false;
            for (var a of as) if (!bs.has(a)) return false;
            return true;
        }
        eqSet(X,Y) ? lab1Uzd6Document.innerHTML = '<p>&ensp;&ensp;sutampa</p>' : lab1Uzd6Document.innerHTML = '<p>&ensp;&ensp;nesutampa</p>';
    }

    drawUzd7() {
        const lab1Uzd7Document = document.getElementById('lab1-uzd7');
        lab1Uzd7Document.innerHTML += '<b>&ensp;&ensp;Numeriai gretimu pajamu, kurios sutapo</b>';
        for (let i = 0; i < duomenysRackausko.length - 1; i++) {
            if (duomenysRackausko[i].Pajamos == duomenysRackausko[i + 1].Pajamos) {
                lab1Uzd7Document.innerHTML += '<p>&ensp;&ensp;&ensp;' + i + ' ir ' + (i + 1) + '</p>';
            }
        }
    }

    drawUzd8() {
        const lab1Uzd8Document = document.getElementById('lab1-uzd8');
        let d = 2;
        while (d >= 0.001) {
            d /= 2;
            lab1Uzd8Document.innerHTML += '<p>&ensp;&ensp;&ensp;' + d + '</p>';
        }
    }
}
class Table1 {
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
export default new Laboratorinis_1();
class Table2 {
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

class Table3 {
    constructor() {
        this.scatter = {
            x: [],
            y: [],
            mode: 'markers',
            marker: {
                color: 'rgba(0, 255, 0, 0.95)',
                symbol: 'square',
                size: 4
            },
            text: []
        };
        this.scatter.x = duomenysRackausko.map((object) => object['Pajamos']);
        this.scatter.y = duomenysRackausko.map((object) => object['Islaidos']);
        this.scatter.x.forEach((value, index) => {
            this.scatter.text.push('i' + index);
        });
        this.trace = {
            x: [],
            y: [],
            type: 'scatter'
        };
        for (let i = 0; i < 40; i++) {
            const x = duomenysRackausko[i].Pajamos;
            this.trace.x.push(x);
            this.trace.y.push((0.13 * x + 41));
        }
    }
    get layout() {
        return {
            title: {
                text: 'Maziausiu kvadratu metodas'
            },
            xaxis: {
                title: {
                    text: 'x',
                    font: {
                        family: 'Courier New, monospace',
                        size: 18,
                        color: '#7f7f7f'
                    }
                }
            },
            yaxis: {
                title: {
                    text: 'y',
                    font: {
                        family: 'Courier New, monospace',
                        size: 18,
                        color: '#7f7f7f'
                    }
                }
            }
        };
    }
}

class Table4 {
    constructor() {}
    getTrace(k) {
        const expr = math.compile(k + 'x+3');
        const xValues = math.range(-10, 10, 0.5).toArray();
        const yValues = xValues.map(function (x) {
            return expr.eval({
                x: x
            });
        });
        return {
            name: 'y=' + k + 'x+3',
            x: xValues,
            y: yValues,
            type: 'scatter'
        };
    }
    get layout() {
        return {};
    }
}