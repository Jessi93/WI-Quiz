/*
In diesem File werden Funktionen beschrieben, die in mehr als nur einem einzigen Screen ben�tigt werden.
Screenspezifische Funktionen werden in den jeweiligen 'screenname.js' files beschrieben.
*/

/*Anzeige Titel*/

steroids.view.navigationBar.show("Studiduell");

var serverURL = "http://192.168.0.108:8090/Studiduell/";

/*
Pr�ft, ob ein String leer ist, oder nicht (leer = true, nicht leer = false)
*/
function isEmpty(str) {
    return (!str || 0 === str.length);
}
