let display = document.getElementById("display");

// Display par number/operator show karna
function appendValue(value) {
    display.value = display.value + value;
}

// Pura display clear karna
function clearDisplay() {
    display.value = "";
}

// Last character delete karna
function deleteLast() {
    display.value = display.value.slice(0, -1);
}

// Calculation
function calculate() {

    try {

        if (display.value === "") {
            return;
        }

        let result = eval(display.value);

        display.value = result;

    } catch (error) {

        display.value = "Error";

        setTimeout(function () {
            display.value = "";
        }, 1000);
    }
}
