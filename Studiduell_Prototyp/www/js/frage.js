var roundStart;
var questions;
var questionCounter;

function init() {
	roundStart = localStorage.getItem("gameQuestionContinue") === null;
	questions = roundStart ? JSON.parse(localStorage.getItem("questions")) : JSON.parse(localStorage.getItem("gameQuestionContinue")).questions;
	questionCounter = localStorage.getItem("questionCounter");
	
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

function weiter() {
	var correctlyAnswered = true;
	
	// Auswertung
	var question;
	var answer1 = $("#antwort1");
	var answer2 = $("#antwort2");
	var answer3 = $("#antwort3");
	var answer4 = $("#antwort4");
	//fragenid, rundenid, antwortrichtig? übergeben
	question = questions[questionCounter];
	
	if(((answer1.hasClass("buttonAusgewaehlt") && !question.wahrheitAntwortmoeglichkeit1) ||
		(!answer1.hasClass("buttonAusgewaehlt") && question.wahrheitAntwortmoeglichkeit1)) ||
		
		((answer2.hasClass("buttonAusgewaehlt") && !question.wahrheitAntwortmoeglichkeit2) ||
		(!answer2.hasClass("buttonAusgewaehlt") && question.wahrheitAntwortmoeglichkeit2)) ||
		
		((answer3.hasClass("buttonAusgewaehlt") && !question.wahrheitAntwortmoeglichkeit3) ||
		(!answer3.hasClass("buttonAusgewaehlt") && question.wahrheitAntwortmoeglichkeit3)) ||
		
		((answer4.hasClass("buttonAusgewaehlt") && !question.wahrheitAntwortmoeglichkeit4) ||
		(!answer4.hasClass("buttonAusgewaehlt") && question.wahrheitAntwortmoeglichkeit4))
		) {
		correctlyAnswered = false;
	}
	
	alert("Bewertung: " + correctlyAnswered);
}

document.addEventListener("deviceready", init, false);