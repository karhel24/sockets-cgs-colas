const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    // Escuchar el cliente
    client.on('siguienteTicket', (data, callback) => {

        let siguienteTicket = ticketControl.siguienteTicket();

        console.log(siguienteTicket);
        callback(siguienteTicket);

    });

    client.emit('estadoActual', {

        actual: ticketControl.getEstadoActual(),
        ultimos4tickets: ticketControl.getUltimos4Tickets()

    });

    client.on('atenderTicket', (data, callback) => {

        if (!data.escritorio) {
            return callback({
                ok: false,
                err: {
                    message: 'El escritorio es necesario'
                }
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);

        // TODO: Emitir / Notificar cambios en  la pantalla con los ultimos 4

        client.broadcast.emit('ultimos4', ticketControl.getUltimos4Tickets());

    });



});