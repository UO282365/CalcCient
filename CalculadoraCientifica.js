class Calculadora {


    constructor() {

        this.operandoA = 0;
        this.operandoB = 0;
        this.operacion = "";
        this.memoria = 0;
        this.hayValores = false;
        this.aux = true;
        this.decimalBool = true;
        this.primeraOperacion = true;
    }

    iniciar() {
        this.pantalla = document.querySelector('input[name="pantalla"]');
        this.pantalla.value = 0;
        document.addEventListener('keydown', (event) => {
            this.pulsaTeclado(event);
        });
    }

    pulsaTeclado(evento) {
        if (evento.key >= "0" && evento.key <= "9")
            this.digito(Number(evento.key));
        if (evento.altKey && evento.key == "s")
            this.signo;

        if (evento.altKey && evento.key == "o") {
            evento.preventDefault();
            this.on();
        }
        if (evento.altKey && evento.key == "e") {
            evento.preventDefault();
            this.ce();
        }
        if (evento.altKey && evento.key == "r") {
            evento.preventDefault();
            this.raiz();
        }
        if (evento.altKey && evento.key == "p") {
            evento.preventDefault();
            this.porcentaje();
        }

        if (evento.altKey && evento.key == "m") {
            evento.preventDefault();
            this.mrc();
        }
        if (evento.ctrlKey && evento.key == "m") {
            evento.preventDefault();
            this.mmas();
        }
        if (evento.altKey && evento.key == "n") {
            evento.preventDefault();
            this.mmenos();
        }


        if (evento.key == "*")
            this.operar("*");
        if (evento.key == "/")
            this.operar("/");
        if (evento.key == "-")
            this.operar("-");
        if (evento.key == "+")
            this.operar("+");

        if (evento.key == ".")
            this.decimal();
        if (evento.key == "Enter")
            this.igual();

    }

    digito(n) {
        if (this.aux == true) {
            this.pantalla.value = "";
            this.aux = false
            this.decimalBool = true;
        }
        var str = this.pantalla.value + n;
        this.pantalla.value = str;
    }

    on() {
        document.querySelector('input[name="pantalla"]').value = "0";
        this.operacion = "";
        this.operandoA = 0;
        this.operandoB = 0;
        this.aux = true;
        this.primeraOperacion = true;
        this.decimalBool = true;
        this.memoria = 0;
    }

    igual() {
        try {
            if (this.cogerValor == true) {
                this.operandoB = document.querySelector('input[name="pantalla"]').value;
                this.operandoA = Number(eval(this.operandoA + this.operacion + this.operandoB))
                document.querySelector('input[name="pantalla"]').value = this.operandoA;
                this.cogerValor = false;
            }
            else {
                this.operandoA = Number(eval(this.operandoA + this.operacion + this.operandoB))
                document.querySelector('input[name="pantalla"]').value = this.operandoA;
            }
            this.aux = true;

        } catch (e) {
            ;
        }
    }

    decimal() {
        if (this.decimalBool == true) {
            if (this.aux) {
                var str = "0.";
                this.aux = false;
            }
            else {
                var str = this.pantalla.value + ".";
            }
            this.pantalla.value = str;
            this.decimalBool = false;
        }
    }

    porcentaje() {
        if (this.primeraOperacion == false && this.aux == false) {
            if ((this.operacion == "/" || this.operacion == "*")) {
                this.cogerValor = false;
                var str = this.pantalla.value / 100;
                this.operandoB = str;
                this.igual();
                this.cogerValor = false;
            }
            else {
                this.cogerValor = false;
                var str = this.pantalla.value / 100 * this.operandoA;
                this.operandoB = str;
                this.igual();
                this.cogerValor = false;
            }
        }
    }

    operar(signo) {
        try {
            if (this.aux == false) {


                if (this.primeraOperacion) {
                    this.operacion = signo;
                    this.operandoA = document.querySelector('input[name="pantalla"]').value;
                    this.primeraOperacion = false;
                }

                else {
                    if (this.operacion != signo) {//otra operacion a la espera
                        this.igual();
                        this.operacion = signo;
                    }
                    else {
                        this.operandoB = document.querySelector('input[name="pantalla"]').value;

                        this.igual();
                    }
                }
                this.aux = true;
                this.cogerValor = true;
            }

            else {
                this.operacion = signo;
                this.operandoB = document.querySelector('input[name="pantalla"]').value;
                this.aux = true;
                this.cogerValor = true;
            }
        } catch (e) {
            ;
        }
    }

    cambiarSigno() {
        var str = this.pantalla.value * -1;
        this.pantalla.value = str;
    }

    raiz() {
        var str = this.pantalla.value;
        if (str >= 0) {
            this.pantalla.value = Math.sqrt(str);
        }

    }

    ce() {
        this.pantalla.value = "0";
        this.aux = true;
        this.decimalBool = true;
    }

    mrc() {
        if (this.memoria == 0)
            this.aux = true;
        this.pantalla.value = this.memoria;
    }

    mmas() {
        this.memoria = Number(eval(this.pantalla.value + "+" + this.memoria));
    }
    mmenos() {
        this.memoria -= this.pantalla.value;
    }

}

class CalculadoraCientifica extends Calculadora {

    constructor() {
        super()
    }



    iniciar() {

     //   this.pantalla = document.querySelector('input[name="pantalla"]');
   //     this.pantalla.value = "0";
        super.iniciar();
        this.arc = false;
        this.h = false;
        this.unidadTrigonometria = 0;//para la unidad trigonometrica
        
    }

    pulsaTeclado(evento){
        super.pulsaTeclado(evento);
        if(evento.key ==="Delete"){//usa el suprimir
            this.del();
        }
        if(evento.key === "u" && evento.altKey){
            evento.preventDefault();
            this.unidad();
        }
        if(evento.key === "h" && evento.altKey){
            evento.preventDefault();
            this.cambiarHiper();
        }
        if(evento.key==="f" && evento.altKey){
            evento.preventDefault();
            this.fe();
        }
        if(evento.key==="C" && evento.shiftKey){
            this.mc();
        }
        if(evento.key==="R" && evento.shiftKey){
            this.mr();
        }
        if(evento.key==="S" && evento.shiftKey){
            this.ms();
        }
        if(evento.key==="U" && evento.shiftKey){
            this.cuadrado();
        }
        if(evento.key==="Y" && evento.shiftKey){
            this.elevado();
        }
        if(evento.key==="s" && evento.altKey){
            this.senoBoton();
        }
        if(evento.key==="t" && evento.altKey){
            this.tanBoton();
        }
        if(evento.key==="c" && evento.altKey){
            this.tanBoton();
        }
        if(evento.key==="d" && evento.altKey){
            this.potenciaDiez();
        }
        if(evento.key==="l" && evento.altKey){
            this.log();
        }
        if(evento.key==="x" && evento.altKey){
            this.exp();
        }
        if(evento.key==="-" && evento.altKey){
            this.cambiarArc();
        }
        if(evento.key==="a" && evento.altKey){
            this.pi();
        }
        if(evento.key==="!" ){
            this.factorial();
        }
        if(evento.key==="(" ){
            this.abrirParentesis();
        }
        if(evento.key===")" ){
            this.cerrarParentesis();
        }

    }

    del() {
        this.pantalla.value = this.pantalla.value.slice(0, -1);
        if (this.pantalla.value.length == 0) {
            this.pantalla.value = "0"
        }
    }

    

    operar(signo) {
        this.aux = false;
        this.pantalla.value += " " + signo + " ";
        this.decimalBool = true;
    }

    abrirParentesis() {
        this.digito(" ( ")
    }
    cerrarParentesis() {
        this.digito(" ) ")

    }
    igual() {
        try {
            this.str = Number(eval(this.pantalla.value));
            this.pantalla.value = this.str;
            if (this.str == 0)
                this.aux = true;
        } catch (e) {
            this.pantalla.value = "Syntax error";
            this.aux = true;
        }

    }

    factorial() {
        var a = this.pantalla.value.split(" ");
        var b = "";
        var c = 1;
        if (a !== null && !isNaN(parseInt(a[a.length - 1])) && parseFloat(a[a.length - 1]) >= 0) {

            b = parseFloat(a[a.length - 1])
            for (var i = 1; i <= b; i++) {
                c = c * i;
            }

            a[a.length - 1] = c;
            this.pantalla.value = a.join(" ");
        }
    }

    cambiarSigno() {
        var a = this.pantalla.value.split(" ");
        var b = "";

        if (a !== null && !isNaN(parseInt(a[a.length - 1]))) {

            b = parseFloat(a[a.length - 1])
            b *= -1;
            a[a.length - 1] = b;
            this.pantalla.value = a.join(" ");
        }
    }

    raiz() {
        var a = this.pantalla.value.split(" ");
        var b = "";
        if (a !== null && !isNaN(parseInt(a[a.length - 1])) && parseFloat(a[a.length - 1]) >= 0) {

            b = parseFloat(a[a.length - 1])
            b = Math.sqrt(b)

            a[a.length - 1] = b;
            this.pantalla.value = a.join(" ");
        }
        else {
            this.pantalla.value = "Entrada no válida";
            this.aux = true;
        }
    }

    potenciaDiez() {
        var a = this.pantalla.value.split(" ");
        var b = "";
        if (a !== null && !isNaN(parseInt(a[a.length - 1]))) {

            b = parseFloat(a[a.length - 1])
            b = Number(eval(10 ** b))

            a[a.length - 1] = b;
            this.pantalla.value = a.join(" ");
        }
    }

    fe(){
        var a = this.pantalla.value.split(" ");
        var b = "";
        if (a !== null && !isNaN(parseInt(a[a.length - 1]))) {

            b = parseFloat(a[a.length - 1])
            b = Number(b).toExponential();

            a[a.length - 1] = b;
            this.pantalla.value = a.join(" ");
        }
    }

    cuadrado(){
        var a = this.pantalla.value.split(" ");
        var b = "";
        if (a !== null && !isNaN(parseInt(a[a.length - 1]))) {

            b = parseFloat(a[a.length - 1])
            b = Number(eval(b**2));

            a[a.length - 1] = b;
            this.pantalla.value = a.join(" ");
        }
    }

    elevado(){
        this.aux = false;
        this.pantalla.value += " ** ";
    }

    exp() {
        this.aux = false;
        this.pantalla.value += " * 10 ** ";
    }

    log() {
        var a = this.pantalla.value.split(" ");
        var b = "";
        if (a !== null && !isNaN(parseInt(a[a.length - 1])) && parseFloat(a[a.length - 1]) > 0) {

            b = parseFloat(a[a.length - 1])
            b = Number(eval(Math.log(b)))

            a[a.length - 1] = b;
            this.pantalla.value = a.join(" ");
        }
        else {
            this.pantalla.value = "Entrada no válida";
            this.aux = true;
        }
    }

    mmas() {
        var a = this.pantalla.value.split(" ");
        var b = "";
        if (a !== null && !isNaN(parseInt(a[a.length - 1]))) {

            b = parseFloat(a[a.length - 1])
            this.memoria = Number(eval(b + this.memoria))
        }
    }

    mr() {
        var a = this.pantalla.value.split(" ");
        a[a.length - 1] = this.memoria;
        this.pantalla.value = a.join(" ");
    }

    ms() {
        var a = this.pantalla.value.split(" ");
        var b = "";
        if (a !== null && !isNaN(parseInt(a[a.length - 1]))) {

            b = parseFloat(a[a.length - 1]);
            this.memoria = Number(b);
        }
    }
    mmenos() {
        var a = this.pantalla.value.split(" ");
        var b = "";
        if (a !== null && !isNaN(parseInt(a[a.length - 1]))) {

            b = parseFloat(a[a.length - 1])
            this.memoria = Number(eval(this.memoria - b))
        }
    }
    mc() {
        this.memoria = Number(0);
    }

    cambiarArc() {
        if (!this.arc) {//el boton estaba activado
            document.querySelector('input[name="seno"]').value = "arcsen";
            document.querySelector('input[name="coseno"]').value = "arccos";
            document.querySelector('input[name="tangente"]').value = "arctan";
            this.arc = true;
        }
        else {
            if (this.h) {
                document.querySelector('input[name="seno"]').value = "senh";
                document.querySelector('input[name="coseno"]').value = "cosh";
                document.querySelector('input[name="tangente"]').value = "tanh";
            }
            else {
                document.querySelector('input[name="seno"]').value = "sen";
                document.querySelector('input[name="coseno"]').value = "cos";
                document.querySelector('input[name="tangente"]').value = "tan";
            }
            this.arc = false;
        }
    }

    cambiarHiper() {
        if (!this.h) {//el boton estaba activado
            document.querySelector('input[name="seno"]').value = "senh";
            document.querySelector('input[name="coseno"]').value = "cosh";
            document.querySelector('input[name="tangente"]').value = "tanh";
            this.h = true;
        }
        else {
            if (this.arc) {
                document.querySelector('input[name="seno"]').value = "arcsen";
                document.querySelector('input[name="coseno"]').value = "arccos";
                document.querySelector('input[name="tangente"]').value = "arctan";
            }
            else {
                document.querySelector('input[name="seno"]').value = "sen";
                document.querySelector('input[name="coseno"]').value = "cos";
                document.querySelector('input[name="tangente"]').value = "tan";
            }
            this.h = false;
        }
    }

    unidad() {
        switch (this.unidadTrigonometria) {
            case (0):
                document.querySelector('input[name="unidad"]').value = "GRAD";
                this.unidadTrigonometria = 1;
                break;
            case (1):
                document.querySelector('input[name="unidad"]').value = "DEG";
                this.unidadTrigonometria = 2;
                break;
            case (2):
                document.querySelector('input[name="unidad"]').value = "RAD";
                this.unidadTrigonometria = 0;
                break;


        }
    }

    convertirUnidad(value){
        switch(this.unidadTrigonometria){
            case(0)://rad
                break;
            case(1)://deg
                value = Number(eval(value/63.662))
                break;
            case(2):
                value = Number(eval(value*(Math.PI/180)))
                break;
        }
        return value;
    }

    senoBoton() {
        var a = this.pantalla.value.split(" ");
        var b = "";
        var c = document.querySelector('input[name="seno"]').value
        
        if (a !== null && !isNaN(parseInt(a[a.length - 1]))) {

            b = parseFloat(a[a.length - 1]);
            b = this.convertirUnidad(b);
            switch (c) {
                case ("sen"):
                    b = Number(eval(Math.sin(b)));
                    break;
                case ("arcsen"):
                    b = Number(eval(Math.asin(b)));
                    break;
                case ("senh"):
                    b = Number(eval(Math.sinh(b)));
                    break;
            }
            
            a[a.length - 1] = b;
            this.pantalla.value = a.join(" ");
        }
    }

    cosenoBoton() {
        var a = this.pantalla.value.split(" ");
        var b = "";
        var c = document.querySelector('input[name="coseno"]').value
        
        if (a !== null && !isNaN(parseInt(a[a.length - 1]))) {

            b = parseFloat(a[a.length - 1]);
            b = this.convertirUnidad(b);
            switch (c) {
                case ("cos"):
                    b = Number(eval(Math.cos(b)));
                    break;
                case ("arccos"):
                    b = Number(eval(Math.acos(b)));
                    break;
                case ("cosh"):
                    b = Number(eval(Math.cosh(b)));
                    break;
            }
            
            a[a.length - 1] = b;
            this.pantalla.value = a.join(" ");
        }
    }

    tanBoton() {
        var a = this.pantalla.value.split(" ");
        var b = "";
        var c = document.querySelector('input[name="tangente"]').value
        
        if (a !== null && !isNaN(parseInt(a[a.length - 1]))) {

            b = parseFloat(a[a.length - 1]);
            b = this.convertirUnidad(b);
            switch (c) {
                case ("tan"):
                    b = Number(eval(Math.tan(b)));
                    break;
                case ("arctan"):
                    b = Number(eval(Math.atan(b)));
                    break;
                case ("tanh"):
                    b = Number(eval(Math.tanh(b)));
                    break;
            }
            
            a[a.length - 1] = b;
            this.pantalla.value = a.join(" ");
        }
    }
    pi(){
        this.digito(Number(Math.PI));
    }

}

var calculadora = new CalculadoraCientifica();