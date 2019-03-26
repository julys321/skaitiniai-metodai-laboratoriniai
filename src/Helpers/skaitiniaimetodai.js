import math from '../../node_modules/mathjs/index.js';
math.import(require('mathjs-simple-integral'));
export default function SkaitiniaiMetodai() {
    this.roundingPrecision = 4;
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
                result = math.multiply(result, math.round(f(data[i].x), this.roundingPrecision));
            }
        }
        return result;
    };
    this.calcApproximationsUsingNewton = function (x, data) {
        let approximationValues = [];
        for (let i = 1; i < data.length; i++) {
            approximationValues.push(math.round(this.calcApproximationUsingNewton(x, i, data), this.roundingPrecision));
        }
        return approximationValues;
    };
    this.calcApproximationUsingNewton = function (x, row, data) {
        let newtonTable = this.calcNewtonRatiosTable(data, row);
        newtonTable = newtonTable.map(e => e.map(e => e === '-' ? e : math.round(e, this.roundingPrecision)));
        let approximation = math.bignumber(0);
        if (row == 1) {
            approximation = math.add(data[0].y, math.multiply(math.subtract(x, data[0].x), newtonTable[0][row]));
        } else {
            approximation = math.multiply(this.calcCartesianProduct((xi) => math.subtract(x, xi), row - 1, data), newtonTable[row - 1][row]);
            approximation = math.add(math.round(this.calcApproximationUsingNewton(x, row - 1, data), this.roundingPrecision), approximation);
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
    this.calcRealErrors = function (approximations, realvalue) {
        return approximations.map(e => math.abs(math.subtract(math.bignumber(realvalue), e)));
    };
    this.calcBiases = function (approximationValues) {
        let errorValues = ['-'];
        for (let i = 1; i < approximationValues.length; i++) {
            errorValues.push(math.abs(math.subtract(approximationValues[i], approximationValues[i - 1])));
        }
        return errorValues;
    };
    this.calcApproximationsUsingLagrange = function (x, data) {
        let approximationValues = [];
        for (let i = 1; i < data.length; i++) {
            approximationValues.push(math.round(this.calcApproximationUsingLagrange(x, i, data), this.roundingPrecision));
        }
        return approximationValues;
    };
    this.calcDefinitiveIntegral = function (a, b, f) {
        let integral = math.integral(f, 'x');
        integral = math.parse(integral.toString());
        let aIntegral = integral.eval({
            x: a
        });
        let bIntegral = integral.eval({
            x: b
        });
        return math.round(math.subtract(bIntegral, aIntegral), this.roundingPrecision);
    };
    this.calcNumericalIntegrationUsingRectangleMidPointMethod = function (f, leftLimit, rightLimit, numberOfIntervals) {
        let xMidPoints = [];
        //h -  distance between limits divided by numberOfIntervals
        let h = math.round(math.divide(math.subtract(rightLimit, leftLimit), numberOfIntervals), this.roundingPrecision);
        for (let i = 0; i < numberOfIntervals; i++) {
            xMidPoints.push(math.round(math.add(math.multiply(i, h), math.divide(h, 2), leftLimit), this.roundingPrecision));
        }
        let yOfMidPoints = xMidPoints.map(e => math.round(math.eval(f, {
            x: e
        }), this.roundingPrecision));
        let areas = yOfMidPoints.map(e => math.round(math.multiply(h, e), this.roundingPrecision));
        let sumOfAreas = areas.reduce((acc, e) => math.add(acc, e));
        return sumOfAreas;
    };
    this.calcNumericalIntegrationUsingRectangleMidPointMethodBias = function (f, leftLimit, rightLimit, numberOfIntervals) {
        let h = math.round(math.divide(math.subtract(rightLimit, leftLimit), numberOfIntervals), this.roundingPrecision);
        let derivative = math.parse(math.derivative(math.derivative(f, 'x'), 'x').toString());
        let values = [];
        for (let x = leftLimit; x <= rightLimit; x = math.number(math.add(x, math.bignumber(0.01)))) {
            values.push(math.round(derivative.eval({
                x
            }), this.roundingPrecision));
        }
        let M = Math.max(...values);
        let result = math.multiply(math.multiply(h, h), math.subtract(rightLimit, leftLimit));
        result = math.multiply(math.divide(result, 24), M);
        return math.round(result, this.roundingPrecision);
    };
    this.calcNumericalIntegrationUsingTrapezoidMethod = function (f, leftLimit, rightLimit, numberOfIntervals) {
        let xPoints = [];
        let h = math.round(math.divide(math.subtract(rightLimit, leftLimit), numberOfIntervals), this.roundingPrecision);
        for (let i = 0; i <= numberOfIntervals; i++) {
            xPoints.push(math.round(math.add(math.multiply(i, h), leftLimit), this.roundingPrecision));
        }
        let yPoints = xPoints.map(e => math.round(math.eval(f, {
            x: e
        }), this.roundingPrecision));
        let areas = [];
        for (let i = 0; i < numberOfIntervals; i++) {
            areas.push(math.round(math.divide(math.multiply(math.add(yPoints[i], yPoints[i + 1]), h), 2), this.roundingPrecision));
        }
        yPoints.map(e => math.round(math.multiply(h, e), this.roundingPrecision));
        let sumOfAreas = areas.reduce((acc, e) => math.add(acc, e));
        return sumOfAreas;
    };
    this.calcNumericalIntegrationUsingTrapezoidMethodBias = function (f, leftLimit, rightLimit, numberOfIntervals) {
        let h = math.round(math.divide(math.subtract(rightLimit, leftLimit), numberOfIntervals), this.roundingPrecision);
        let derivative = math.parse(math.derivative(math.derivative(f, 'x'), 'x').toString());
        let values = [];
        for (let x = leftLimit; x <= rightLimit; x = math.number(math.add(x, math.bignumber(0.01)))) {
            values.push(math.round(derivative.eval({
                x
            }), this.roundingPrecision));
        }
        let M = Math.max(...values);
        let result = math.multiply(math.multiply(h, h), math.subtract(rightLimit, leftLimit));
        result = math.round(math.multiply(math.divide(result, 12), M), this.roundingPrecision);
        return result;
    };
    this.calcNumericalIntegrationUsingSimpsonMethod = function (f, leftLimit, rightLimit, numberOfIntervals) {
        let xPoints = [];
        let h = math.round(math.divide(math.subtract(rightLimit, leftLimit), numberOfIntervals), this.roundingPrecision);
        for (let i = 0; i <= numberOfIntervals; i++) {
            xPoints.push(math.round(math.add(math.multiply(i, h), leftLimit), this.roundingPrecision));
        }
        let areas = [];
        for (let i = 0; i < numberOfIntervals; i++) {
            let x = xPoints[i];
            let temp1 = math.round(math.eval(f, {
                x
            }), this.roundingPrecision);
            x = math.divide(math.add(xPoints[i], xPoints[i + 1]), 2);
            let temp2 = math.multiply(math.round(math.eval(f, {
                x
            }), this.roundingPrecision), 4);
            x = xPoints[i + 1];
            let temp3 = math.round(math.eval(f, {
                x
            }), this.roundingPrecision);
            areas.push(math.round(math.multiply(math.divide(h, 6), math.sum(temp1, temp2, temp3)), this.roundingPrecision));
        }
        let sumOfAreas = areas.reduce((acc, e) => math.add(acc, e));
        return sumOfAreas;
    };
    this.calcNumericalIntegrationUsingSimpsonMethodBias = function (f, leftLimit, rightLimit, numberOfIntervals) {
        let h = math.round(math.divide(math.subtract(rightLimit, leftLimit), numberOfIntervals), this.roundingPrecision);
        let derivative = math.parse(math.derivative(math.derivative(math.derivative(math.derivative(f, 'x'), 'x'), 'x'), 'x').toString());
        let values = [];
        for (let x = leftLimit; x <= rightLimit; x = math.number(math.add(x, math.bignumber(0.01)))) {
            values.push(math.round(derivative.eval({
                x
            }), this.roundingPrecision));
        }
        let M = Math.max(...values);
        console.log(M)
        let result = math.multiply(math.pow(h, 4), math.subtract(rightLimit, leftLimit));
        result = math.round(math.multiply(math.divide(result, 2880), M), this.roundingPrecision);
        return result;
    };
}