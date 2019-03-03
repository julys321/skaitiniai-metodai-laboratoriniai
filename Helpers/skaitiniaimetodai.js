/* exported skaitiniaiMetodai */
var skaitiniaiMetodai = new SkaitiniaiMetodai();

function SkaitiniaiMetodai() {
    this.calcApproximationUsingLagrange = function (x, n, data) {
        let result = math.bignumber(0);
        for (let i = 0; i <= n; i++) {
            result = math.add(result, math.multiply(this.calcLagrangeConst(x, i, n, data), data[i].y));
        }
        return result;
    };
    this.calcLagrangeConst = function (x, k, n, data) {
        let result = this.calcCartesianProduct((xi) => math.subtract(x, xi), n, data, (i) => i != k);
        result = math.divide(result, this.calcCartesianProduct((xi) => math.subtract(data[k].x, xi), n, data, (i) => i != k));
        return result;
    };
    this.calcCartesianProduct = function (f, n, data, condition = () => true) {
        let result = math.bignumber(1);
        for (let i = 0; i <= n; i++) {
            if (condition(i)) {
                result = math.multiply(result, f(data[i].x));
            }
        }
        return result;
    };
    this.calcApproximationUsingNewton = function (x, row, data) {
        let newtonTable = this.calcNewtonRatiosTable(data, row);
        newtonTable = newtonTable.map(e => e.map(e => e === '-' ? e : math.round(e, 15)));
        let approximation = math.bignumber(0);
        if (row == 1) {
            approximation = math.add(data[0].y, math.multiply(math.subtract(x, data[0].x), newtonTable[0][row]));
        } else {
            approximation = math.multiply(this.calcCartesianProduct((xi) => math.subtract(x, xi), row - 1, data), newtonTable[row - 1][row]);
            approximation = math.add(math.round(this.calcApproximationUsingNewton(x, row - 1, data), 15), approximation);
        }
        return approximation;
    };
    this.calcNewtonRatiosTable = function (data, numberOfRows) {
        let newtonTable = [];
        for (let k = 0; k < numberOfRows; k++) {
            newtonTable.push([]);
            for (let i = 0; i < data.length; i++) {
                if (i <= k) {
                    newtonTable[k].push('-');
                } else if (k == 0) {
                    newtonTable[k].push(math.divide(math.subtract(data[i - 1].y, data[i].y), math.subtract(data[i - 1].x, data[i].x)));
                } else {
                    newtonTable[k].push(math.divide(math.subtract(newtonTable[k - 1][i - 1], newtonTable[k - 1][i]), math.subtract(data[i - 1 - k].x, data[i].x)));
                }
            }
        }
        return newtonTable;
    };
}