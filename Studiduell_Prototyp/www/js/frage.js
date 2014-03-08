function init() {
	var roundStart = localStorage.getItem("gameQuestionContinue") === null;
	
	var questions = roundStart ? JSON.parse(localStorage.getItem("questions")) : JSON.parse(localStorage.getItem("gameQuestionContinue")).questions;
	var questionCounter = localStorage.getItem("questionCounter");
	
	setKategorie(questions[questionCounter]);
 	setFrage(questions[questionCounter]);
	setAntworten(questions[questionCounter]);
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

document.addEventListener("deviceready", init, false);