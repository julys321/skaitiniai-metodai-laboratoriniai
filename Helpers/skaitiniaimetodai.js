/* exported skaitiniaiMetodai */
var skaitiniaiMetodai = new SkaitiniaiMetodai();

function SkaitiniaiMetodai() {
    //TODO: should be done better
    this.calcLagrange = function (row, x, data) {
        let result = math.bignumber(0);
        for (let i = 0; i <= row; i++) {
            result = math.add(result, math.multiply(this.calcLagrangeConst(i, x, data), data[i].y));
        }
        return result;
    };
    this.calcLagrangeConst = function (row, x, data) {
        let result = math.divide(this.cancerCycle(data, x, row), this.cancerCycle(data, data[row].x, row));
        //TODO: finish
        //result = math.divide(cartesianProduct((xi) => math.subtract(x,xi), (i) => i != row, data), cartesianProduct((xi) => math.subtract(data[row].x,xi), (i) => i != row), data);
        return result;
    };
    //FIXME
    this.calcCartesianProduct = function (f, data, condition = true) {
        let result = math.bignumber(1);
        for (let i = 0; i < data.length; i++) {
            if (condition(i)) {
                result = math.multiply(result, f(data.x[i]));
            }
        }
        return result;
    };
    //TODO: replace by cartesianProduct
    this.cancerCycle = function (data, x, rowToIgnore = -1) {
        let result = math.bignumber(1);
        for (let i = 0; i < data.length; i++) {
            if (i != rowToIgnore) {
                result = math.multiply(result, math.subtract(x, data[i].x));
            }
        }
        return result;
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