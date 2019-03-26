import SkaitiniaiMetodai from '../Helpers/skaitiniaimetodai.js';
import math from 'mathjs';
class Calculator {
    constructor() {
        this.skaitiniaiMetodai = new SkaitiniaiMetodai();
        this.skaitiniaiMetodai.roundingPrecision = 6;
    }
    onload() {
        document.getElementById('rectangle-mid-point-method-button').addEventListener('click', this.calculateUsingRectangleMidPointMethod.bind(this));
        document.getElementById('rectangle-mid-point-method-bias-button').addEventListener('click', this.calculateUsingRectangleMidPointMethodBias.bind(this));
        document.getElementById('trapezoid-method-button').addEventListener('click', this.calculateUsingTrapezoidMethod.bind(this));
        document.getElementById('trapezoid-method-bias-button').addEventListener('click', this.calculateUsingTrapezoidMethodBias.bind(this));
        document.getElementById('simpson-method-button').addEventListener('click', this.calculateUsingSimpsonMethod.bind(this));
        document.getElementById('simpson-method-bias-button').addEventListener('click', this.calculateUsingSimpsonMethodBias.bind(this));
    }
    calculateUsingRectangleMidPointMethod() {
        let numericalIntegration = this.skaitiniaiMetodai.calcNumericalIntegrationUsingRectangleMidPointMethod(
            document.getElementById('rectangle-mid-point-method-function-input').value,
            math.round(document.getElementById('rectangle-mid-point-method-left-limit-input').value, this.skaitiniaiMetodai.roundingPrecision),
            math.round(document.getElementById('rectangle-mid-point-method-right-limit-input').value, this.skaitiniaiMetodai.roundingPrecision),
            math.round(document.getElementById('rectangle-mid-point-method-number-of-intervals-input').value, this.skaitiniaiMetodai.roundingPrecision)
        );
        document.getElementById('rectangle-mid-point-method').insertAdjacentHTML('beforeend','<div id="rectangle-mid-point-method-result" style="font-weight: bold;">Result: ' + numericalIntegration + '<div>');
    }
    calculateUsingTrapezoidMethod(){
        let numericalIntegration = this.skaitiniaiMetodai.calcNumericalIntegrationUsingTrapezoidMethod(
            document.getElementById('trapezoid-method-function-input').value,
            math.round(document.getElementById('trapezoid-method-left-limit-input').value, this.skaitiniaiMetodai.roundingPrecision),
            math.round(document.getElementById('trapezoid-method-right-limit-input').value, this.skaitiniaiMetodai.roundingPrecision),
            math.round(document.getElementById('trapezoid-method-number-of-intervals-input').value, this.skaitiniaiMetodai.roundingPrecision)
        );
        document.getElementById('trapezoid-method').insertAdjacentHTML('beforeend','<div id="trapezoid-method-result" style="font-weight: bold;">Result: ' + numericalIntegration + '<div>');
    }
    calculateUsingSimpsonMethod(){
        let numericalIntegration = this.skaitiniaiMetodai.calcNumericalIntegrationUsingSimpsonMethod(
            document.getElementById('simpson-method-function-input').value,
            math.round(document.getElementById('simpson-method-left-limit-input').value, this.skaitiniaiMetodai.roundingPrecision),
            math.round(document.getElementById('simpson-method-right-limit-input').value, this.skaitiniaiMetodai.roundingPrecision),
            math.round(document.getElementById('simpson-method-number-of-intervals-input').value, this.skaitiniaiMetodai.roundingPrecision)
        );
        document.getElementById('simpson-method').insertAdjacentHTML('beforeend','<div id="simpson-method-result" style="font-weight: bold;">Result: ' + numericalIntegration + '<div>');
    }
    calculateUsingRectangleMidPointMethodBias() {
        let numericalIntegration = this.skaitiniaiMetodai.calcNumericalIntegrationUsingRectangleMidPointMethodBias(
            document.getElementById('rectangle-mid-point-method-function-input').value,
            math.round(document.getElementById('rectangle-mid-point-method-left-limit-input').value, this.skaitiniaiMetodai.roundingPrecision),
            math.round(document.getElementById('rectangle-mid-point-method-right-limit-input').value, this.skaitiniaiMetodai.roundingPrecision),
            math.round(document.getElementById('rectangle-mid-point-method-number-of-intervals-input').value, this.skaitiniaiMetodai.roundingPrecision)
        );
        document.getElementById('rectangle-mid-point-method').insertAdjacentHTML('beforeend','<div id="rectangle-mid-point-method-bias" style="font-weight: bold;">Bias: ' + numericalIntegration + '<div>');
    }
    calculateUsingTrapezoidMethodBias(){
        let numericalIntegration = this.skaitiniaiMetodai.calcNumericalIntegrationUsingTrapezoidMethodBias(
            document.getElementById('trapezoid-method-function-input').value,
            math.round(document.getElementById('trapezoid-method-left-limit-input').value, this.skaitiniaiMetodai.roundingPrecision),
            math.round(document.getElementById('trapezoid-method-right-limit-input').value, this.skaitiniaiMetodai.roundingPrecision),
            math.round(document.getElementById('trapezoid-method-number-of-intervals-input').value, this.skaitiniaiMetodai.roundingPrecision)
        );
        document.getElementById('trapezoid-method').insertAdjacentHTML('beforeend','<div id="trapezoid-method-bias" style="font-weight: bold;">Bias: ' + numericalIntegration + '<div>');
    }
    calculateUsingSimpsonMethodBias(){
        let numericalIntegration = this.skaitiniaiMetodai.calcNumericalIntegrationUsingSimpsonMethodBias(
            document.getElementById('simpson-method-function-input').value,
            math.round(document.getElementById('simpson-method-left-limit-input').value, this.skaitiniaiMetodai.roundingPrecision),
            math.round(document.getElementById('simpson-method-right-limit-input').value, this.skaitiniaiMetodai.roundingPrecision),
            math.round(document.getElementById('simpson-method-number-of-intervals-input').value, this.skaitiniaiMetodai.roundingPrecision)
        );
        document.getElementById('simpson-method').insertAdjacentHTML('beforeend','<div id="simpson-method-bias" style="font-weight: bold;">Bias: ' + numericalIntegration + '<div>');
    }
}
export default new Calculator();