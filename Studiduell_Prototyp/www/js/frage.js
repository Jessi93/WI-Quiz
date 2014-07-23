var gameInfo;
var roundStart;
var questions;
var questionCounter;
var result = null; //Ergebnis der Frage (true/false)

var opponentAnswers;

function init() {
	gameInfo = JSON.parse(localStorage.getItem("gameInfo"));
	roundStart = localStorage.getItem("gameQuestionContinue" + gameInfo.spielID) === null;
	questions = roundStart ? JSON.parse(localStorage.getItem("questions" + gameInfo.spielID)) : JSON.parse(localStorage.getItem("gameQuestionContinue" + gameInfo.spielID)).questions;
	questionCounter = parseInt(localStorage.getItem("questionCounter" + gameInfo.spielID));
	// continue-specific
	opponentAnswers = roundStart ? null : JSON.parse(localStorage.getItem("gameQuestionContinue" + gameInfo.spielID)).answers;
	
	
	setKategorie(questions[questionCounter]);
 	setFrage(questions[questionCounter]);
	setAntworten(questions[questionCounter]);
	
	setTapSwipeEventHandlers();
	
	setQuestionSeen();
	
	startTimer();
}

function setTapSwipeEventHandlers(){
	$("#antwort1").hammer({}).on('tap',function(e){ markAnswer($("#antwort1"));});
	$("#antwort2").hammer({}).on('tap',function(e){ markAnswer($("#antwort2"));});
	$("#antwort3").hammer({}).on('tap',function(e){ markAnswer($("#antwort3"));});
	$("#antwort4").hammer({}).on('tap',function(e){ markAnswer($("#antwort4"));});
	$("#nextButton").hammer({}).on('tap',function(e){ next();});
	$(document).hammer({}).on('swipeleft',function(e){ next();});
	//$(document).hammer({}).on('swiperight',function(e){ steroids.layers.pop()	});
}
/* backButtonHiden();
function backButtonHiden(){

steroids.view.navigationBar.update({

  overrideBackButton: true,
alert("BackButtonHiden Methode aufgerufen");


});
} */


function setKategorie(question) {
	$("#kategorieDiv").text(question.kategorieName.name);

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

function startTimer() {
	$("#timelineDiv").animate( {
		"width": "0%",
		"background-color": "red"
	}, config.questionTimeout, function() {
		/* Alternaitve 1: Wenn Zeit abgelaufen, automatisch falsch! (nichts ausgewählt!)
		$("#antwort1").removeClass("buttonAusgewaehlt");
		$("#antwort2").removeClass("buttonAusgewaehlt");
		$("#antwort3").removeClass("buttonAusgewaehlt");
		$("#antwort4").removeClass("buttonAusgewaehlt");
		*/
		//Alternative 2: Wenn Zeit abgelaufen, wird aktuelle Auswahl als angewählt angenommen.
		//Zeige Auflösung der Frage
		result = nextShowResult();
		//Schreibe Ergebnis in LocalStorage
		saveQuestionResult(result);
	});
}

function markAnswer(button) {
	//markieren der Antworten darf nur möglich sein, wenn noch kein Ergebnis vorliegt!
	if (result === null){
		var btn = $(button);
		if (!btn.hasClass("buttonAusgewaehlt")) {
			/* --> nicht mehr notwendig, da next durch swiperight ersetzt wurde!*/
			// Weiter-Button aktivieren, falls bisher keine Antworten ausgewählt wurden.
			if(getSelectedButtonCount() == 0) {
				$("#nextButton").removeAttr("disabled");
			}
			
		
			// Der Button wird ausgewählt
			btn.addClass("buttonAusgewaehlt");
			btn.addClass("buttonRand");
			
			
		}else {
			// Weiter-Button deaktivieren, wenn keine Antwortmöglichkeit ausgewählt ist
			if(getSelectedButtonCount() == 1) {
				$("#nextButton").attr("disabled", "");
			}
			
			// Button wird abgewählt
			btn.removeClass("buttonAusgewaehlt");
			btn.removeClass("buttonRand");
		}
	}
}

function getSelectedButtonCount() {
	var count = 0;
	if($("#antwort1").hasClass("buttonAusgewaehlt")) {
		count++;
	}
	if($("#antwort2").hasClass("buttonAusgewaehlt")) {
		count++;
	}
	if($("#antwort3").hasClass("buttonAusgewaehlt")) {
		count++;
	}
	if($("#antwort4").hasClass("buttonAusgewaehlt")) {
		count++;
	}
	
	return count;
}


function next() {
	if(result === null) {
		if(getSelectedButtonCount() > 0 ){ //es wurde mind 1 Antwort ausgewählt --> Gehe weiter! (Auflösung oder nächste Frage)
		
			// stop timeout
			var timelineDiv = $("#timelineDiv");
			timelineDiv.stop();
			//lasse Zeitleise angezeigt! --> hide auskommentiert!
			//timelineDiv.hide();
			
			// Color buttons (Auflösung der Frage)
			result = nextShowResult();
			//schreibe Ergebnis in localStorage
			saveQuestionResult(result);
		} else {
			// Alert, dass mind 1 Antwort angewählt werden muss:
			navigator.notification.alert('Du musst mindestens eine Antwort anwählen!', null,'Information','OK');
		}
	}else{
		// Move to next screen
		nextQuestion();
	}
}

function setQuestionSeen() {
	var question = questions[questionCounter];
	var answers;
	
	if(questionCounter == 0) {
		// create new answer array
		answers = new Array();
	} else {
		answers = JSON.parse(localStorage.getItem("answers" + gameInfo.spielID));
	}
	var submitData = {
		"runde" : gameInfo.aktuelleRunde,
		"fragenID" : question.fragenID,
		"antwortmoeglichkeit1Check" : false,
		"antwortmoeglichkeit2Check" : false,
		"antwortmoeglichkeit3Check" : false,
		"antwortmoeglichkeit4Check" : false,
		"ergebnisCheck" : false
	};
	answers.push(submitData);
	
	// Diese Frage darf beim Abbrechen der Runde nicht nochmal angezeigt werden. Sobald Frage gesehen, Counter erhöhen.
	localStorage.setItem("questionCounter" + gameInfo.spielID, questionCounter + 1);
	localStorage.setItem("answers" + gameInfo.spielID, JSON.stringify(answers));
}

/**
Schreibt Ergebnis der Fragenbeantwortung in LocalStorage
*/
function saveQuestionResult(correctlyAnswered){
	var question = questions[questionCounter];
	var answers;
	
	answers = JSON.parse(localStorage.getItem("answers" + gameInfo.spielID));
	
	var submitData = {
		"runde" : gameInfo.aktuelleRunde,
		"fragenID" : question.fragenID,
		"antwortmoeglichkeit1Check" : $("#antwort1").hasClass("buttonAusgewaehlt"),
		"antwortmoeglichkeit2Check" : $("#antwort2").hasClass("buttonAusgewaehlt"),
		"antwortmoeglichkeit3Check" : $("#antwort3").hasClass("buttonAusgewaehlt"),
		"antwortmoeglichkeit4Check" : $("#antwort4").hasClass("buttonAusgewaehlt"),
		"ergebnisCheck" : correctlyAnswered
	};
	// Überschreibt die falsche Antwort mit der des Users
	answers[questionCounter] = submitData;
	
	localStorage.setItem("answers" + gameInfo.spielID, JSON.stringify(answers));
}

/**
  * @return whether the user has answered the question correctly.
  * 		(true/false)
  */
function nextShowResult() {
	var correctlyAnswered = true;
	
	// Auswertung
	var question;
	var answer1 = $("#antwort1");
	var answer2 = $("#antwort2");
	var answer3 = $("#antwort3");
	var answer4 = $("#antwort4");
	
	question = questions[questionCounter];
	
	// Evaluate whether the question was answered correctly
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
		
	// Color the buttons
	if(question.wahrheitAntwortmoeglichkeit1) {
		answer1.addClass("buttonRichtig");
	} else {
		if(answer1.hasClass("buttonAusgewaehlt")) {
			answer1.addClass("buttonFalsch");
		}
	}
	if(question.wahrheitAntwortmoeglichkeit2) {
		answer2.addClass("buttonRichtig");
	} else {
		if(answer2.hasClass("buttonAusgewaehlt")) {
			answer2.addClass("buttonFalsch");
		}
	}
	if(question.wahrheitAntwortmoeglichkeit3) {
		answer3.addClass("buttonRichtig");
	} else {
		if(answer3.hasClass("buttonAusgewaehlt")) {
			answer3.addClass("buttonFalsch");
		}
	}
	if(question.wahrheitAntwortmoeglichkeit4) {
		answer4.addClass("buttonRichtig");
	} else {
		if(answer4.hasClass("buttonAusgewaehlt")) {
			answer4.addClass("buttonFalsch");
		}
	}
	
	// show opponent's answer if user finishes the current round
	if(!roundStart) {
		animateOpponentsAnswers();
	}
	
	return correctlyAnswered;
}

function nextQuestion() {
	var answers = JSON.parse(localStorage.getItem("answers" + gameInfo.spielID));
	
	if(questionCounter != 2) { // 3 - 1 as the questionCounter is incremented in its variable on reload
		localStorage.setItem("answers" + gameInfo.spielID, JSON.stringify(answers));
		popViewPushView("html/frage.html");
	} else {
		// submitting data to server handles rundenuebersicht
		steroids.layers.pop();
	}
}

function animateOpponentsAnswers() {
	var opponentName = opponentAnswers[0].benutzer.benutzername;
	
	// apply opponent's name on those popup divs that represent the opponent's answer
	if(opponentAnswers[questionCounter].antwortmoeglichkeit1Check) {
		$("#antwort1Popup").text(opponentName);
	}
	if(opponentAnswers[questionCounter].antwortmoeglichkeit2Check) {
		$("#antwort2Popup").text(opponentName);
	}
	if(opponentAnswers[questionCounter].antwortmoeglichkeit3Check) {
		$("#antwort3Popup").text(opponentName);
	}
	if(opponentAnswers[questionCounter].antwortmoeglichkeit4Check) {
		$("#antwort4Popup").text(opponentName);
	}
	
	// align popup divs
	var posA = $("#antwort1").position();
	var posB = $("#antwort2").position();
	var posC = $("#antwort3").position();
	var posD = $("#antwort4").position();
	
	var calcATop = ($("#antwort1").height() / 2) + posA.top - ($("#antwort1Popup").height() / 2);
	var calcALeft = ($("#antwort1").width() / 2) + posA.left - ($("#antwort1Popup").width() / 2);
	var calcBTop = ($("#antwort2").height() / 2) + posB.top - ($("#antwort2Popup").height() / 2);
	var calcBLeft = ($("#antwort2").width() / 2) + posB.left - ($("#antwort2Popup").width() / 2);
	var calcCTop = ($("#antwort3").height() / 2) + posC.top - ($("#antwort3Popup").height() / 2);
	var calcCLeft = ($("#antwort3").width() / 2) + posC.left - ($("#antwort3Popup").width() / 2);
	var calcDTop = ($("#antwort4").height() / 2) + posD.top - ($("#antwort4Popup").height() / 2);
	var calcDLeft = ($("#antwort4").width() / 2) + posD.left - ($("#antwort4Popup").width() / 2);
	
	$("#antwort1Popup").css({"top" : calcATop, "left" : calcALeft});
	$("#antwort2Popup").css({"top" : calcBTop, "left" : calcBLeft});
	$("#antwort3Popup").css({"top" : calcCTop, "left" : calcCLeft});
	$("#antwort4Popup").css({"top" : calcDTop, "left" : calcDLeft});
	
	// animate all popup divs
	$(".popupDiv").animate( {
		"font-size" : "60px",
		"opacity" : 0
	}, 1200, function() {
		// on completion
		$(this).remove();
	});
}

document.addEventListener("deviceready", init, false);