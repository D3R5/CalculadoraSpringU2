const display = document.getElementById("display");

function appendToDisplay(input) {
    display.value += input;
}

function clearDisplay() {
    display.value = "";
}

function calculateResult() {
    //borramos lo valores de los extremos con trim
    const expression = display.value.trim();

    // Validamos la expresión
    // Expresión regular para validar que solo contenga números, operadores (+, -, *, /) y espacios
    // /[^0-9+\-*/.]/.test(expression) devuelve true si la expresión contiene caracteres que no son números, operadores o espacios
    // alert("Error: Expresión inválida") muestra un mensaje de alerta en caso de que la expresión sea inválida y limpia el display

    if (/[^0-9+\-*/.]/.test(expression)) {
        alert("Error: Expresión inválida");
        display.value = "ERROR";
        return;
    }

    let result;

    try {
        // Evaluamos de forma manual la expresión
        // eval() ejecuta una expresión JavaScript como código evalúado en el entorno global
        // evalExpression() es una función que evalúa la expresión en una manera más segura y eficiente
        // Esta función divide la expresión en tokens (números y operadores) y luego itera sobre ellos para aplicar los operadores correctamente
        // Si encuentra un error durante la evaluación, lanza una excepción y muestra un mensaje de alerta en caso de que la expresión sea inválida y limpia el display
        // eval() puede ser una vulnerabilidad si no se controla el código que se evalúa, por lo que es mejor usar evalExpression() cuando se trabaja con expresiones más complejas y seguras
        result = evalExpression(expression);
        display.value = result;
    } catch (error) {
        alert("Error: Expresión inválida");
        display.value = "ERROR";
    }
}

function evalExpression(expression) {
    // Dividir la expresión en números y operadores
    // match() devuelve un array con los matches de la expresión regular en la cadena
    // /[+\-*/.]|\d+/g busca coincidencias de cualquier operador (+, -, *, /) o número seguido de cualquier número de dígitos
    // Los grupos en los corchetes (|) separan las alternativas, por lo que match() seleccionará el primer grupo que coincida con el patrón
    // El g flag indica que la expresión regular debe coincidir con todas las coincidencias en la cadena, no solo la primera
    // El método match() devuelve un array con los matches, pero si no hay matches, devuelve null
    // Así que en lugar de usar un if para verificar si match() devuelve un array, podemos usar match() directamente para obtener los tokens de la expresión
    const tokens = expression.match(/[+\-*/.]|\d+(\.\d+)?/g);

    // Inicia el resultado con el primer número
    // parseFloat() convierte una cadena en un número decimal, incluso si la cadena contiene caracteres que no son números
    // Así que no hay necesidad de usar un if para verificar si la cadena puede convertirse en un número
    let result = parseFloat(tokens[0]);

    // Iterar sobre los tokens para evaluar la expresión
    for (let i = 1; i < tokens.length; i += 2) {
        const operator = tokens[i];
        const number = parseFloat(tokens[i + 1]);

        // Aplicar el operador al resultado
        switch (operator) {
            case "+":
                result += number;
                break;
            case "-":
                result -= number;
                break;
            case "*":
                result *= number;
                break;
            case "/":
                if (number === 0) throw new Error("División por cero");
                result /= number;
                break;
            default:
                throw new Error("Operador no válido");
        }
    }

    return result;
}