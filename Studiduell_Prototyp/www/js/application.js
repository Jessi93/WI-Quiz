/*
In diesem File werden Funktionen beschrieben, die in mehr als nur einem einzigen Screen benötigt werden.
Screenspezifische Funktionen werden in den jeweiligen 'screenname.js' files beschrieben.
*/

/*Anzeige Titel*/

steroids.view.navigationBar.show("Studiduell");

var serverURL = "http://192.168.0.108:8090/Studiduell/";

/*
Prüft, ob ein String leer ist, oder nicht (leer = true, nicht leer = false)
*/
function isEmpty(str) {
    return (!str || 0 === str.length);
}

/*
Schließt den aktuellen Screen und startet den Neuen! 
Parameter: Pfad, des neuen screens (html) z.b. "html/neuesSpiel.html"
*/
function popViewPushView (newView_locationString){
//alert("popViewPushView wurde aufgerufen!"+steroids.layers);
/* steroids.layers.pop({}, {
	onSuccess: function() {
		alert("screen wird beendet & neuer gestartet!");
		//go to the new screen 
		var newView = new steroids.views.WebView(newView_locationString);
		steroids.layers.push(newView);
		},
	onFailure: function(error) {
   // alert("Could not remove a layer: " + error.errorDescription);
	alert("Fehler bei pop!");
		}
	}); */
	var newView = new steroids.views.WebView(newView_locationString);
		steroids.layers.pop();
		steroids.layers.push(newView);
	
}
