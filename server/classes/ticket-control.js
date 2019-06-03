const fs = require('fs');

class Ticket {

    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {

    constructor() {

        this.ultimo = 0; // último ticket que se ha dado. Al final del día se deberá inicializar.
        this.hoy = new Date().getDate();
        this.tickets = []; // Todos los tickets sin atender
        this.ultimos4Tickets = [];

        let data = require('../data/data.json');

        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4Tickets = data.ultimos4Tickets;

        } else {
            this.reiniciarConteo();
        }

        //console.log(data);

    }

    reiniciarConteo() {

        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4Tickets = [];
        console.log('Se ha inicalizado el sistema de conteo');
        this.grabarArchivo();

    }

    siguienteTicket() {
        this.ultimo += 1;

        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        this.grabarArchivo();

        return `Ticket ${this.ultimo}`;
    }

    getEstadoActual() {
        return `Ticket ${this.ultimo}`;
    }

    getUltimos4Tickets() {
        return this.ultimos4Tickets;
    }

    atenderTicket(escritorio) {
        if (this.tickets.length === 0) {
            return {
                ok: false,
                message: 'No hay tickets para atender'
            }
        }

        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift(); // Elimina el PRIMER elemento del array

        let atenderTicket = new Ticket(numeroTicket, escritorio);
        this.ultimos4Tickets.unshift(atenderTicket); // Unshift pone el emento al INICIO del array

        if (this.ultimos4Tickets.length > 4) {
            this.ultimos4Tickets.splice(-1, 1); // Borra el ULTIMO elemento del array
        }

        console.log('Ultimos 4', this.ultimos4Tickets);

        this.grabarArchivo();

        return atenderTicket;

    }

    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4Tickets: this.ultimos4Tickets
        };

        let jsonDataString = JSON.stringify(jsonData);

        // Grabamos en el archivo data.json
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }

}


module.exports = {
    TicketControl
}