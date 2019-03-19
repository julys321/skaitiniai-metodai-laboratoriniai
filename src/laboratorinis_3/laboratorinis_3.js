import SkaitiniaiMetodai from '../Helpers/skaitiniaimetodai.js';
class Laboratorinis_3 {
    constructor() {
        this.skaitiniaiMetodai = new SkaitiniaiMetodai();
    }
    onload() {
        this.drawUzd1();
    }
    drawUzd1() {
        let drawAtDocument = document.getElementById('lab3-uzd1');
        let integral = this.skaitiniaiMetodai.calcDefinitiveIntegral(1, 2, 'sqrt(x-1)').toString();
        drawAtDocument.innerHTML += integral;
    }
}
export default new Laboratorinis_3();