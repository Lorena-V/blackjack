
const miModulo = (() => {  
    'use strict' // uso estricto para que el user no pueda ver ni manipular el contenido 

    let deck         = [];
    const tipos      = ['S', 'D', 'H', 'S'],
          especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugadores = [];

    // REFERENCIAS DEL HTML:
    const btnPedir = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo = document.querySelector('#btnNuevo');

    const divCartasJugadores = document.querySelectorAll('.divCartas'),
          puntosHtml = document.querySelectorAll('small');

    //  Esta funcion inicializa el juego
    const inicializarJuego = ( numJugadores = 2) => {
        deck = crearDeck();
        puntosJugadores = [];

        for ( let i = 0; i < numJugadores; i++){
            puntosJugadores.push(0);
        }
        //console.clear();
        puntosHtml.forEach( elem => elem.innerText = 0 );
        divCartasJugadores.forEach( elem => elem.innerHTML = '');

        btnDetener.disabled = false;
        btnPedir.disabled = false;
    }

    //  Esta función crea una nueva baraja (Nuevo juego)
    const crearDeck = () => {
        deck = [];
        for(let i = 2; i <= 10; i++ ){
            for( let tipo of tipos ){
                deck.push( i + tipo);
            }
        }
        for( let tipo of tipos ) {
            for(let esp of especiales ){
            deck.push( esp + tipo);  
            }
        }
        return _.shuffle( deck );;     //Funcion de underscore.org que reordena los elementos de una array
    }

    // Esta funcion permite tomar una carta
    const pedirCarta = () => {
        if (deck.length === 0) {
            throw 'No hay cartas en el deck'  // throw : muestra error en consola
        }
        return deck.pop();
    }

    // Extraer el valor de let carta
    const valorCarta = ( carta ) => {
        const valor = carta.substring(0, carta.length - 1 ); 
        return ( isNaN( valor )) ?
               ( valor === 'A') ? 11 : 10 
               : valor * 1;
    }

    //turno 0 = primer jugador; último = computadora
    const acumularPuntos = ( carta, turno ) => {
        puntosJugadores[ turno ] = puntosJugadores[ turno ] + valorCarta(carta);
        puntosHtml[turno].innerText = puntosJugadores[ turno ];
        return puntosJugadores[ turno ];
    }

    const crearCarta = ( carta, turno ) => {
        const imgCarta = document.createElement('img');
            imgCarta.src= `asseets/cartas/${ carta }.png` ;
            imgCarta.classList.add('carta');
            divCartasJugadores[turno].append( imgCarta );
    }

    const determinarGanador = () => {

        const [ puntosMinimos, puntosComputadora ] = puntosJugadores; // los valores del array se extraen de la const puntosJugadores

        setTimeout(() => { // setTimeout: para retrasar la ejecución de la alerta
            if ( puntosComputadora === puntosMinimos ) {
                alert('Nadie ganó');
            } else if ( puntosMinimos > 21 || puntosComputadora === 21 ){
                alert('Loser... la computadora te ha ganado');
            } else if ( puntosComputadora > 21 || puntosMinimos === 21){
                alert('You Win...');
            }
        }, 100);   
    }

    // TURNO DE LA COMPUTADORA
    const turnoComputadora = ( puntosMinimos ) => {
        let puntosComputadora = 0;

        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1 );
            crearCarta(carta, puntosJugadores.length - 1);

        } while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21 ));
        determinarGanador();
    };

    // EVENTOS
    btnPedir.addEventListener('click',() => { //permite añadir una escucha del evento indicado (primer parámetro), y en el caso de que ocurra, se ejecutará la función asociada indicada (segundo parámetro).
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos( carta, 0 );

        crearCarta( carta, 0);

        if ( puntosJugador > 21 ) {
            console.warn('Loser...');
            btnPedir.disabled = true; //Desactiva btn pedir carta al tener +21ptos
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
            
        } else if ( puntosJugador === 21 ){
            console.warn('You win');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        } 
    });

    // TODO : BORAR
    //  turnoComputadora( 16 );

    btnDetener.addEventListener('click', () => {
        btnDetener.disabled = true;
        btnPedir.disabled = true;
        
        turnoComputadora( puntosJugadores[0] );
    });

    btnNuevo.addEventListener( 'click', () => {  //reseteando valores
        inicializarJuego ();
    });

    return {
        nuevoJuego: inicializarJuego
    };

}) (); // Funcion anónima autoinvocada, se activa inmediatamente después de ser creada 



