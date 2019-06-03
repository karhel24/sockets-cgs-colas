var socket = io(); // Se usa var y no let por compatibilidad de navegadores

var label = $('#lblNuevoTicket');

// Escuchar conexion
socket.on('connect', function() {
    console.log('Conectado al servidor');
});

// Escuchar desconexion
socket.on('disconnect', function() {
    console.log('Se perdió la conexión con el servidor');
});

socket.on('estadoActual', function(resp) {
    label.text(resp.actual);
});

// Se usa JQuery para indicar que todo boton, al ser pulsado llamara a esta funcion. Es un listener
$('button').on('click', function() {
    //console.log('Click pulsado');

    // Enviar información al servidor de manera privada
    socket.emit('siguienteTicket', null, function(resp) {

        console.log('Respuesta Server:', resp);

        label.text(resp);

    });
});