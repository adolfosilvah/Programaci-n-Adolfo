function generarInforme() {
    // Recoger valores del formulario
    var fecha = document.getElementById("fecha").value;
    var fechaFormatoMensaje = formatoFechaParaMensaje(fecha);
    var departamento = document.getElementById("departamento").value;
    var motivo = document.getElementById("motivo").value;
    var lugarSalida = document.getElementById("lugarSalida").value;
    var lugarDestino = document.getElementById("lugarDestino").value;
    var horaSalida = document.getElementById("horaSalida").value;
    var horaLlegada = document.getElementById("horaLlegada").value;
    var unidadPlaca = document.getElementById("unidadPlaca").value;
    var conductores = document.getElementById("conductores").value;
    var acompanantes = document.getElementById("acompanantes").value;
    var ruta = document.getElementById("ruta").value;
    var paradas = document.getElementById("paradas").value;
    var kilometraje = parseInt(document.getElementById("kilometraje").value);
    var clima = parseInt(document.getElementById("clima").value);
    var vehiculos = parseInt(document.getElementById("vehiculos").value);
    var vias = parseInt(document.getElementById("vias").value);
    var comunicacion = parseInt(document.getElementById("comunicacion").value);
    var horas = parseInt(document.getElementById("horas").value);
    var riesgo = parseInt(document.getElementById("riesgo").value);
    var horasViaje = parseInt(document.getElementById("horasViaje").value);

    // Calcular la suma total de puntos
    var totalPuntos = kilometraje + clima + vehiculos + vias + comunicacion + horas + riesgo + horasViaje;

    // Generar el mensaje
    var mensaje = `Señores,
Se presenta el siguiente GV para su revisión y aprobación.
> @Jhosele Sarabia 
> @Javier Hinojosa 
> @Esteban Martin

GERENCIAMIENTO DE VIAJE

_Fecha:_ *${fechaFormatoMensaje}*
_Departamento:_ *${departamento}*
_Motivo del viaje:_ *${motivo}*
_Lugar de salida:_ *${lugarSalida}*
_Lugar Destino:_ *${lugarDestino}*
_Hora de salida:_ *${horaSalida}*
_Hora de llegada:_ *${horaLlegada}*

_Unidad / Placa:_
*${unidadPlaca}*

_Conductor/es:_
*${conductores}*

Acompañantes:
*${acompanantes}*

_RUTA:_
*${ruta}*

_PARADAS PROGRAMADAS:_
*${paradas}*

EVALUACIÓN DE RIESGO
_Kilometraje recorrido:_ *${kilometraje} pts*
> Menor a 50km  = 1 pts
> Menor a 100km = 2 pts
> Menor a 200km = 5 pts
> Mayor a 200km = 8 pts
_Condiciones Climáticas:_ *${clima} pts*
> Seco    = 1 pts
> Viento  = 2 pts
> Lluvia  = 4 pts
> Neblina = 8 pts
_Vehículos más pasajeros:_ *${vehiculos} pts*
> 2 o más Veh con 2 o más pasajeros = 1 pts
> 2 o más Veh con 1 pasajero por Veh = 2 pts
> 1 Veh con 2 o más personas = 3 pts
> 1 Veh con 1 persona = 6 pts
_Condiciones de las vías:_ *${vias} pts*
> Pavimentada = 1 pts
> Mixta = 2 pts
> No pavimentada = 4 pts
_Comunicación disponible:_ *${comunicacion} pts*
> Teléfono celular/Equipo radial = 0 pts
> Sin comunicación en Convoy  = 2 pts
> Sin comunicación sin Convoy = 4 pts
_Horas trabajadas + tiempo de viaje:_ *${horas} pts*
> Menor a 12 = 1 pts
> Menor a 14 = 3 pts
> Menor a 16 = 6 pts
> Mayor a 16 h. No permitido.
_Riesgo seguridad física del viaje:_ *${riesgo} pts*
> Alto  = 5 pts
> Medio = 2 pts
> Bajo  = 1 pts
_Horas del viaje (Diurna o Nocturna):_ *${horasViaje} pts*
> Diurno (5:00 y 18:00)   = 1 pts
> Nocturno (18:00 y 5:00) = 8 pts

_PUNTOS:_ *${totalPuntos} pts*

_NIVEL DE APROBACIÓN:_

Entre 1 y 14 puntos: 
> Coordinador / Gerente de Línea / Gerente de Guardia
Entre 15 y 21 puntos:
> Gerente de Línea / Gerente General
Entre 22 y 27 puntos: 
> Gerente General
Mayor a 28 puntos:
> No permitido
`;

    // Mostrar el mensaje en el área de resultado
    document.getElementById("resultado").textContent = mensaje;
}

function seleccionarTodo() {
    var resultado = document.getElementById("resultado");
    var range = document.createRange();
    range.selectNodeContents(resultado);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);

    try {
        var successful = document.execCommand('copy');
        if (successful) {
            console.log('Texto copiado al portapapeles');
            alert('Texto copiado al portapapeles'); // Confirmación visual
        } else {
            console.log('No se pudo copiar el texto');
            alert('No se pudo copiar el texto');
        }
    } catch (err) {
        console.error('Oops, no se pudo copiar', err);
        alert('Oops, no se pudo copiar');
    }
}