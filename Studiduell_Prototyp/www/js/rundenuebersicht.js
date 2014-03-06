function init() {
	// set;
	
}






function setSpielstand() {}
function setSpieler1() {}
function setSpieler2(){}

//Logik zum setzen/ einblenden der Quadrate

//Logik zum einblenden Verdeckt /Du bist dran  /Spielt




function openFrage() {
	var newView = new steroids.views.WebView("html/kategorieAuswaehlen.html");
	steroids.layers.push(newView);
}

document.addEventListener("deviceready", init, false);