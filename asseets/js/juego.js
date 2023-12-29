/*
*2C = Two of Clubs (Treboles)
*2D = Two of Diamonds
*2H = Two of Hearts
*2S = Two of Spades
*/

(() => {  
    'use strict' // uso estricto para que el user no pueda ver ni manipular el contenido 

    let deck         = [];
    const tipos      = ['S', 'D', 'H', 'S'];
    const especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugador = 0,
        puntosComputadora = 0;

    // REFERENCIAS DEL HTML:
    const btnPedir = document.querySelector('#btnPedir');
    const btnDetener = document.querySelector('#btnDetener');
    const btnNuevo = document.querySelector('#btnNuevo');

    const divCartasJugador = document.querySelector('#jugador-cartas');
    const divCartasComputadora = document.querySelector('#computadora-cartas');

    const puntosHtml = document.querySelectorAll('small');

    //  Esta función crea una nueva baraja (Nuevo juego)
    const crearDeck = () => {
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
        //console.log(deck);
        deck = _.shuffle(deck); //Funcion de underscore.org que reordena los elementos de una array
        // console.log(deck);   Fue creado para ver el array de cartas, se borra por seguridad
        return deck;
    }

    crearDeck();

    // Esta funcion permite tomar una carta
    const pedirCarta = () => {
        if (deck.length === 0) {
            throw 'No hay cartas en el deck'  // throw : muestra error en consola
        }
        const carta = deck.pop();
        // console.log(deck);
        // console.log(carta);
        return carta;
    }
    /*
    Este for fue hecho para comprobar que la función pedirCarta y el throw está funcionando
    for (let i = 0; i <= 100; i++) {
        pedirCarta();
    }
    */

    // Extraer el valor de let carta
    const valorCartaP = ( carta ) => {
        //const valor = carta[0];         // Todo srting puede ser trabajado como array (este metodo no sirve por el num 10)
        const valor = carta.substring(0, carta.length - 1 );    // método substring(): El método extrae caracteres, entre dos índices (posiciones), de una cadena de texto, y devuelve la subcadena.
        let puntos = 0;
        // 2 = 2, 10 = 10, 3 = 3
        if( isNaN( valor )) { // metodo que retorna true si el valor no es un numero
                            // El método isNaN() convierte el valor a un número antes de probarlo.
            puntos = ( valor === 'A') ? 11 : 10;    // op. ternario
            //console.log('No es un número');
        } else {
            //console.log('Es un número');
            puntos = valor * 1;     // forma sencilla de pasar un string a num, multiplicar el valor x 1
        }
        console.log(puntos);
    }
    valorCartaP ('AD');
    console.log('-----------------------');

    // Extraer el valor de let carta
    const valorCarta = ( carta ) => {

        const valor = carta.substring(0, carta.length - 1 );  
        return ( isNaN( valor )) ? ( valor === 'A') ? 11 : 10 : valor * 1;
    }
    // const valor = valorCarta ( pedirCarta());
    // console.log({valor});

    // TURNO DE LA COMPUTADORA
    const turnoComputadora = ( puntosMinimos ) => {
        do {
            const carta = pedirCarta();
            puntosComputadora = puntosComputadora + valorCarta(carta);
            puntosHtml[1].innerText = puntosComputadora;
            const imgCarta = document.createElement('img');
            imgCarta.src= `asseets/cartas/${ carta }.png` ;
            imgCarta.classList.add('carta'); 
            divCartasComputadora.append( imgCarta );

            if ( puntosMinimos > 21){
                break;
            }

        } while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21 ));

        setTimeout(() => { // setTimeout: para retrasar la ejecución de la alerta
            if ( puntosComputadora === puntosMinimos ) {
                alert('Nadie ganó');
            } else if ( puntosMinimos > 21 || puntosComputadora === 21 ){
                alert('Loser... la computadora te ha ganado');
            } else if ( puntosComputadora > 21 || puntosMinimos === 21){
                alert('You Win...');
            }
        }, 25);         // Cantidad de milisegundos de retraso del setTimeout
    };

    // EVENTOS
    btnPedir.addEventListener('click',() => { //permite añadir una escucha del evento indicado (primer parámetro), y en el caso de que ocurra, se ejecutará la función asociada indicada (segundo parámetro).
        const carta = pedirCarta();
        puntosJugador = puntosJugador + valorCarta(carta);
        // document.querySelector('#jugador').textContent = `Mano del jugador: ${puntaje}`;
        // document.querySelector('small').innerText = puntosJugador ; Mi solución
        puntosHtml[0].innerText = puntosJugador; //pos 0 porque es el primer small

        const imgCarta = document.createElement('img'); // crea el elemento img
        imgCarta.src= `asseets/cartas/${ carta }.png` ; // al element img le coloca un elemento con el nombre de "carta"
        imgCarta.classList.add('carta');    
        divCartasJugador.append( imgCarta );

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
        
        turnoComputadora( puntosJugador );
    });

    btnNuevo.addEventListener( 'click', () => {  //reseteando valores
        console.clear();
        deck = [];
        deck = crearDeck();

        puntosJugador       = 0;
        puntosComputadora   = 0;

        puntosHtml[0].innerText = 0;
        puntosHtml[1].innerText = 0;

        divCartasComputadora.innerHTML = '';
        divCartasJugador.innerHTML = '';


        btnDetener.disabled = false;
        btnPedir.disabled = false;
    });

}) (); // Funcion anónima autoinvocada, se activa inmediatamente después de ser creada 



