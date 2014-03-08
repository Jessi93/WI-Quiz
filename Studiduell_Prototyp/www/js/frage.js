function init() {
	var questions = JSON.parse(localStorage.getItem("questions"));
	var questionCounter = localStorage.getItem("questionCounter");
	
	setKategorie(questions[questionCounter]);
 	setFrage(questions[questionCounter]);
	setAntworten(questions[questionCounter]);
	//alert(JSON.stringify(questions[questionCounter]));
	
}


function setKategorie(question) {
	$("#kategorieDiv").text(question.kategorie_name);

}

function setFrage(question) {
	$("#frageDiv").text(question.frage);
}

function setAntworten(question) {
	$("#antwort1").text(question.antwortmoeglichkeit1);
	$("#antwort2").text(question.antwortmoeglichkeit2);
	$("#antwort3").text(question.antwortmoeglichkeit3);
	$("#antwort4").text(question.antwortmoeglichkeit4);
}

function markiereAntwort(button) {
	var btn = $(button);
	if (!btn.hasClass("buttonAusgewaehlt")) {
	// Der Button wird ausgewählt
		btn.addClass("buttonAusgewaehlt");
		btn.addClass("buttonRand");
 	}else {
	// Button wird abgewählt
		btn.removeClass("buttonAusgewaehlt");
		btn.removeClass("buttonRand");
	}
}

//Ermittelt den Wahrheitsgehalt einer Antwort 
/* /* function getWahrheitsgehalt(antwort) {
//TODO 
/*if (antwort.getWahrheit){
return true;
}
else{
return false;
}
*/
//test
	/* switch (antwort) {
	  case "antwort1":
		return true;
	  case "antwort2":
		return true;
	  case "antwort3":
		return false;
	  case "antwort4":
		return true;
	}
} */
//Antworten werden auf Richtigkeit ueberprueft und die Buttons werden dem entsprechend markiert
/* function vergleicheAntworten(btn) {
	if (getWahrheitsgehalt(btn)){
	btn.addClass("buttonRichtig");
	}
	else if (btn.hasClass("buttonAusgewaehlt") &&  !getWahrheitsgehalt(btn)) {
	btn.addClass("buttonFalsch");
	}
	//TODO Logik: hat gegner bereits geantwortet?
	btn.addClass("antwortGegner");
}
 */
//var buttonWeiterZaehler;

//var fragenZaehler;
  
//Weiterleitung
/*
function weiter() {
	if (buttonWeiterZaehler = 1){
	vergleicheAntworten($("#antwort1"));
	vergleicheAntworten($("#antwort2"));
	vergleicheAntworten($("#antwort3"));
	vergleicheAntworten($("#antwort4"));
	buttonWeiterZaehler = 2;
	}
	else if ((buttonWeiterZaehler = 2) && (fragenZaehler <= 3){
	var newView = new steroids.views.WebView("html/Frage.html");
	steroids.layers.push(newView);

	buttonWeiterZaehler = 1;
	fragenZaehler = fragenZaehler + 1;
	}
	else {
	var newView = new steroids.views.WebView("html/Rundenuebersicht.html");
	steroids.layers.push(newView);
	fragenZaehler = 1;
	}
}*/

/* function weiter() {
  switch (buttonWeiterZaehler) {
  case "1":
    // vergleicheAntworten 4x
	buttonWeiterZaehler = 2;
    break;
  case "2":
	if (fragenZaehler <= 3){
    var newView = new steroids.views.WebView("html/Frage.html");
	steroids.layers.push(newView);
	buttonWeiterZaehler = 1;
	fragenZaehler = fragenZaehler + 1;
	}
	else{
	var newView = new steroids.views.WebView("html/Rundenuebersicht.html");
	steroids.layers.push(newView);
	fragenZaehler = 1;
	}
    break;
	}
  } */
  
  document.addEventListener("deviceready", init, false);