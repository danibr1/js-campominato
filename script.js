/**
 * 
 * 
DESCRIZIONE
- Il computer deve generare 16 numeri casuali da 1 a 100 (bombe).
- In seguito deve chiedere all’utente di inserire un numero da 1 a 100 alla volta, se il numero è presente nella lista dei numeri generati la partita termina altrimenti continua chiedendo all’utente un altro numero.
- La partita termina quando il giocatore inserisce un numero “vietato” o raggiunge il numero massimo possibile di numeri consentiti.
- Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha inserito un numero consentito.

BONUS: (da fare solo se funziona tutto il resto)
all’inizio il software richiede anche una difficoltà all’utente che cambia il range di numeri casuali:
- con difficoltà 0 => tra 1 e 100
- con difficoltà 1 => tra 1 e 80
- con difficoltà 2 => tra 1 e 50

 */


var numeroMax;                              //Numeri giocabil   
var numeroBombe = 16;                       //Numero di bombe da generare
var possibilità = numeroMax - numeroBombe;  //possibilità corrette (max - bombe)
var listaBombe = [];                        //numeri vietati (bombe)
var numeriConsentiti = [];                  //numeri corretti inseriti dall'utente
var utente = 0;           


//SCELTA LIVELLO DIFFICOLTA'
var livello = parseInt( prompt('Scegli la difficolta da 0 a 2').trim() );
//validazione
while (isNaN(livello) || livello < 0 || livello > 2){
    livello = parseInt( prompt('Scegli la difficolta da 0 a 2').trim() );
}

switch (livello){
    case 0:
        numeroMax = 100;
        break;
    case 1:
        numeroMax = 80;
        break;
    case 2:
        numeroMax = 50;
}

possibilità = numeroMax - numeroBombe;


//GENERA BOMBE: 16 numeri casuali univoci
while (listaBombe.length < numeroBombe) {
    var bomba = numeroRandom(numeroMax);

    if (! listaBombe.includes(bomba)){
        listaBombe.push(bomba);
    }
}
console.log('Lista bombe: ', listaBombe);


/**
 * GAME MAIN LOOP
 *  
 * Loop principale gioco 
 */

//Se siamo sotto il numero di possibilità. se si, la scelta non è una bomba
while( (numeriConsentiti.length < possibilità) && (! listaBombe.includes(utente)) ){
    //scelta utente
    utente = parseInt( prompt('Inserisci un numero da 1 a ' + numeroMax + '\nTentativi riusciti: ' + numeriConsentiti.length + ' di ' + possibilità) );
   
    //validazione
    while( isNaN(utente) || utente < 1 || utente > numeroMax ){
        utente = parseInt( prompt('Valore non valido, inserisci un numero da 1 a ' + numeroMax) );
    }
    
   

    //Controlla scelta
    if ( listaBombe.includes(utente) ){
        alert('Hai perso ! Hai provato con successo ' + numeriConsentiti.length + ' volte prima di trovare la bomba');
    }
    else if (numeriConsentiti.includes(utente)){
         alert('Numero già inserito, inseriscine un altro');
    }
    else if (! numeriConsentiti.includes(utente)){
         numeriConsentiti.push(utente);
    }

    //Controllare raggiungimento delle possibilità
    if ( numeriConsentiti.length === possibilità){
        alert('HAI VINTO');
    }

}


/**
 * END DISPLAY
 */
console.log('-- GAME OVER --');
console.log('Lista numeri validi inseriti: ', numeriConsentiti);
console.log('Tentativi riusciti: ', numeriConsentiti.length);



/**************************************************** 
 * FUNCTION UTILITIES
*****************************************************/
/**
 * GENERA NUMERO RANDOM
 * @param {*} max 
 * @returns 
 */

function numeroRandom(max) {
    return Math.floor(Math.random() * max) + 1;
}