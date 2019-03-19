import SkaitiniaiMetodai from '../Helpers/skaitiniaimetodai.js';
import math from 'mathjs';
class Calculator {
    constructor() {
        this.skaitiniaiMetodai = new SkaitiniaiMetodai();
        this.skaitiniaiMetodai.roundingPrecision = 6;
    }
    onload() {
        document.getElementById('rectangle-mid-point-rule-button').addEventListener('click', this.calculateUsingRectangleMidPointRule.bind(this));
    }
    calculateUsingRectangleMidPointRule() {
        let numericalIntegration = this.skaitiniaiMetodai.calcNumericalIntegrationUsingRectMidPointRule(
            document.getElementById('rectangle-mid-point-rule-function-input').value,
            math.round(document.getElementById('rectangle-mid-point-rule-left-limit-input').value, this.skaitiniaiMetodai.roundingPrecision),
            math.round(document.getElementById('rectangle-mid-point-rule-right-limit-input').value, this.skaitiniaiMetodai.roundingPrecision),
            math.round(document.getElementById('rectangle-mid-point-rule-number-of-intervals-input').value, this.skaitiniaiMetodai.roundingPrecision)
        );
        document.getElementById('rectangle-mid-point-rule').insertAdjacentHTML('beforeend','<div id="rectangle-mid-point-rule-result">Result: ' + numericalIntegration + '<div>');
    }
}
export default new Calculator();