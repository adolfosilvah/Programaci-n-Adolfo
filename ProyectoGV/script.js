function generarOpciones(selectId, opciones, valorPredeterminado) {
    var selectElement = document.getElementById(selectId);

    // Limpiar opciones existentes
    selectElement.innerHTML = "";

    // Generar nuevas opciones a partir del diccionario
    for (var valor in opciones) {
        var opcion = document.createElement("option");
        opcion.value = valor;
        opcion.text = opciones[valor];
        if (valor === valorPredeterminado) {
            opcion.selected = true;
        }
        selectElement.appendChild(opcion);
    }
}

// Llamar a la función para generar las opciones al cargar la página con una opción preseleccionada
window.onload = function() {
    asignarFechaActual();
    generaropcionesHorasConduccion("3"); // Preseleccionar la opción con valor "3"
};

function asignarFechaActual() {
    var campoFecha = document.getElementById("fecha");
    var hoy = new Date();
    var dia = String(hoy.getDate()).padStart(2, '0');
    var mes = String(hoy.getMonth() + 1).padStart(2, '0'); // Enero es 0!
    var año = hoy.getFullYear();

    var fechaActual = año + '-' + mes + '-' + dia;
    campoFecha.value = fechaActual;
}

// Función para cambiar el formato de la fecha a día-mes-año
function formatoFechaParaMensaje(fecha) {
    var partes = fecha.split('-');
    var año = partes[0];
    var mes = partes[1];
    var dia = partes[2];

    return dia + '-' + mes + '-' + año;
}

function mostrarCampoPersonalizado() {
    var selectElement = document.getElementById("unidadPlaca");
    var inputElement = document.getElementById("unidadPlacaPersonalizada");

    if (selectElement.value === "personalizado") {
        inputElement.style.display = "block";
        inputElement.required = true;
        selectElement.name = "";
        inputElement.name = "unidadPlaca";
    } else {
        inputElement.style.display = "none";
        inputElement.required = false;
        selectElement.name = "unidadPlaca";
        inputElement.name = "unidadPlacaPersonalizada";
        inputElement.value = ""; // Limpiar el campo de texto al seleccionar otra opción
    }
}

// Llamar a las funciones para generar las opciones al cargar la página con opciones preseleccionadas
window.onload = function() {
    asignarFechaActual();
    generarOpciones("kilometraje", opcionesKilometraje, "5"); // Preseleccionar "Menos de 200km - 5 pts"
    generarOpciones("clima", opcionesClima, "1"); // Preseleccionar "Seco - 1 pts"
    generarOpciones("vehiculos", opcionesVehiculos, "3"); // Preseleccionar "1 Veh con 2 o más personas - 3 pts"
    generarOpciones("vias", opcionesVias, "1"); // Preseleccionar "Mixta - 2 pts"
    generarOpciones("comunicacion", opcionesComunicacion, "0"); // Preseleccionar "Teléfono celular / Equipo radial - 0 pts"
    generarOpciones("horas", opcionesHorasConduccion, "1"); // Preseleccionar "Horas trabajadas + horas de viaje <12 - 1 pts"
    generarOpciones("riesgo", opcionesRiesgo, "5"); // Preseleccionar "Alto - 5 pts"
    generarOpciones("horasViaje", opcionesHorasViaje, "1"); // Preseleccionar "Diurno entre 5:00 y 18:00 - 1 pts"
};

