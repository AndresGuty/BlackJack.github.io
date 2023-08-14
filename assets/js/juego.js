/**
* 2C = TWo of Clubs
+ 2D = TWo of Diaminds
* 2 = TWo of Hearts
* 2S = Two of Spades
*/

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];
let puntosJugador = 0,
    puntosComputadora = 0;


const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');


const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');

const puntosHTML = document.querySelectorAll('small');



// *  Esta funcion crea un nuevo deck, "Nueva baraja de cartas" 
const crearDeck = () => {



    for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos) {
            deck.push(i + tipo);
        }
    }

    for (let tipo of tipos) {
        for (let esp of especiales) {
            deck.push(esp + tipo);
        }
    }
    // *  _.shuffle() este metodo se importa desde una libreria JS llamada Underscore
    // *  La cual nos permite tomar un arreglo y mostrar aleatoreamente su contenido
    deck = _.shuffle(deck);
    return deck;
}

crearDeck();



// *  Esta funcion me permite tomar una carta


const pedirCarta = () => {



    if (deck.length === 0) {
        throw 'No hay mas cartas en la baraja ';
    }
    const carta = deck.pop();
    return carta;
}


// pedirCarta();
// *  Esta funcion nos se importa desde una libreria JS llamada Underscore

const valorCarta = (carta) => {

    // *  Esta nos devuelve Un entero entre 0 y la longitud de la cadena.
    const valor = carta.substring(0, carta.length - 1);

    // *  Nos retorna el resultado de la condicion, la cual verifica mediante "isNaN" si el valor 
    // * es un numero o un texto y dependiendo hace la operacion
    return (isNaN(valor)) ?
        (valor === 'A') ? 11 : 10
        : valor * 1;

}

const turnoComputadora = (puntosMinimos) => {

    do {

        const carta = pedirCarta();

        puntosComputadora = puntosComputadora + valorCarta(carta);

        puntosHTML[1].innerText = puntosComputadora;

        // <!-- <img class="carta" src="assets/images/9S.png"> -->

        const imgCartaComputadora = document.createElement('img');
        imgCartaComputadora.src = `assets/images/${carta}.png`;
        imgCartaComputadora.classList.add('carta')
        divCartasComputadora.append(imgCartaComputadora);


        if (puntosMinimos > 21) {
            break;
        }


    } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

    setTimeout(() => {


        if (puntosComputadora === puntosMinimos) {

            alert('Empate, ningun jugador gana 😒');

        } else if (puntosMinimos > 21) {

            alert('Computadora gana 🤖');

        } else if (puntosComputadora > 21) {

            alert('Jugador gana 🤖');
        } else {

            alert('Computadora gana 🤖');
        }

    }, 300 );

}

// * EVENTOS



btnPedir.addEventListener('click', () => {



    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta(carta);

    puntosHTML[0].innerText = puntosJugador;

    // <!-- <img class="carta" src="assets/images/9S.png"> -->

    const imgCartaJugador = document.createElement('img');
    imgCartaJugador.src = `assets/images/${carta}.png`;
    imgCartaJugador.classList.add('carta')
    divCartasJugador.append(imgCartaJugador);

    if (puntosJugador > 21) {

        btnPedir.disabled = true
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);

    } else if (puntosJugador === 21) {

        btnPedir.disabled = true
        btnDetener.disabled = true;

        turnoComputadora(puntosJugador);
    }


});

btnDetener.addEventListener('click', () => {

    btnDetener.disabled = true;
    btnPedir.disabled = true;

    turnoComputadora();


});

btnNuevo.addEventListener('click', () => {

    window.location.reload();

});






