import SkaitiniaiMetodai from '../Helpers/skaitiniaimetodai.js';
class Calculator {
    constructor() {
        this.skaitiniaiMetodai = new SkaitiniaiMetodai();
        this.skaitiniaiMetodai.roundingPrecision = 6;
    }
    onload() {
    }
}
export default new Calculator();