var socket = io(); // Se usa var y no let por compatibilidad de navegadores

var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblEscritorio1 = $('#lblEscritorio1');
var lblEscritorio2 = $('#lblEscritorio2');
var lblEscritorio3 = $('#lblEscritorio3');
var lblEscritorio4 = $('#lblEscritorio4');

var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblEscritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];

// Escuchar conexion
socket.on('connect', function() {
    console.log('Conectado al servidor');
});

// Escuchar desconexion
socket.on('disconnect', function() {
    console.log('Se perdió la conexión con el servidor');


});

socket.on('estadoActual', function(resp) {
    //console.log(resp);

    actualizaHTML(resp.ultimos4tickets);
});


socket.on('ultimos4', function(ultimos4Tickets) {
    //console.log('ultimos4', resp);




    actualizaHTML(ultimos4Tickets);
});



function actualizaHTML(ultimos4tickets) {

    for (var i = 0; i < ultimos4tickets.length; i++) {
        lblTickets[i].text('Ticket ' + ultimos4tickets[i].numero);
        lblEscritorios[i].text('Escritorio ' + ultimos4tickets[i].escritorio);
    }

}