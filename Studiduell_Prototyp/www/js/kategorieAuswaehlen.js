var gameQuestionStart;

function init() {
	gameQuestionStart = JSON.parse(localStorage.getItem("gameQuestionStart"));
	//alert("gameQuestionStart in init von kategorie auswählen: "+JSON.stringify(gameQuestionStart));
	fillScreen();
	$("#kategorie1").on('tap',function(e,data){ kategorieAuswaehlen($("#kategorie1").text()) });
	$("#kategorie2").on('tap',function(e,data){ kategorieAuswaehlen($("#kategorie2").text()) });
	$("#kategorie3").on('tap',function(e,data){ kategorieAuswaehlen($("#kategorie3").text()) });
	
}

function fillScreen() {
	setKategorien(gameQuestionStart[0].categoryName,
					gameQuestionStart[1].categoryName,
					gameQuestionStart[2].categoryName);
}


function setKategorien(cat1, cat2, cat3) {
	 $("#kategorie1").text(cat1);
	 $("#kategorie2").text(cat2);
	 $("#kategorie3").text(cat3);
}

function kategorieAuswaehlen(kategorieName) {	
	alert("KatAUswählen wurde aufgerufen mit katName: "+kategorieName);
	var questions;
	
	//Speichere Fragen für spätere Anzeige
	for(var i = 0; i < gameQuestionStart.length; i++) {
		if(gameQuestionStart[i].categoryName == kategorieName) {
			questions = gameQuestionStart[i].questions;
		}
	}
	
	localStorage.setItem("questions", JSON.stringify(questions));
	localStorage.setItem("selectedCategory", kategorieName);
	//questionCounter wird auf 0 gesetzt (erste Frage der Runde wird angezeigt)
	localStorage.setItem("questionCounter", 0 );
	
	//öffne screen ausgewählte kategrie & und schließe aktuellen screen
	popViewPushView("html/ausgewaehlteKategorie.html");
}

$( document ).ready(function() { init(); });
