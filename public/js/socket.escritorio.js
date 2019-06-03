var socket = io(); // Se usa var y no let por compatibilidad de navegadores

var searchParams = new URLSearchParams(window.location.search);

var labelSmall = $('small');

if (!searchParams) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');

//console.log(escritorio);

$('h1').text('Escritorio' + escritorio);

$('button').on('click', function() {
    socket.emit('atenderTicket', {
        escritorio: escritorio
    }, function(resp) {
        console.log(resp);

        if (resp.ok === false) {
            labelSmall.text(resp.message);
            alert(resp.message);
            return;
        }

        var audio = new Audio('../audio/new-ticket.mp3');
        audio.play();
        labelSmall.text(resp.numero);
    });
});