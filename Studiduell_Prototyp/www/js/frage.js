var gameInfo;
var roundStart;
var questions;
var questionCounter;

var opponentAnswers;

function init() {
	gameInfo = JSON.parse(localStorage.getItem("gameInfo"));
	roundStart = localStorage.getItem("gameQuestionContinue") === null;
	questions = roundStart ? JSON.parse(localStorage.getItem("questions")) : JSON.parse(localStorage.getItem("gameQuestionContinue")).questions;
	questionCounter = localStorage.getItem("questionCounter");
	// continue-specific
	opponentAnswers = roundStart ? null : JSON.parse(localStorage.getItem("gameQuestionContinue")).answers;
	
	setKategorie(questions[questionCounter]);
 	setFrage(questions[questionCounter]);
	setAntworten(questions[questionCounter]);
}


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

function markAnswer(button) {
	var btn = $(button);
	if (!btn.hasClass("buttonAusgewaehlt")) {
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

var result = null;
function next() {
	if(result === null) {
		// Color buttons
		result = nextShowResult();
	} else {
		// Move to next screen
		nextNextQuestion(result);
	}
}

/**
  * @return whether the user has answered the question correctly.
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
	
	// remove actions of answer buttons
	answer1.attr("ontouchend", "");
	answer2.attr("ontouchend", "");
	answer3.attr("ontouchend", "");
	answer4.attr("ontouchend", "");
	
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

function nextNextQuestion(correctlyAnswered) {
	var question = questions[questionCounter];
	var answers;
	
	if(questionCounter == 0) {
		// create new answer array
		answers = new Array();
	} else {
		answers = JSON.parse(localStorage.getItem("answers"));
	}
	
	var submitData = {
		"runde" : gameInfo.aktuelleRunde,
		"fragenID" : question.fragenID,
		"antwortmoeglichkeit1Check" : $("#antwort1").hasClass("buttonAusgewaehlt"),
		"antwortmoeglichkeit2Check" : $("#antwort2").hasClass("buttonAusgewaehlt"),
		"antwortmoeglichkeit3Check" : $("#antwort3").hasClass("buttonAusgewaehlt"),
		"antwortmoeglichkeit4Check" : $("#antwort4").hasClass("buttonAusgewaehlt"),
		"ergebnisCheck" : correctlyAnswered
	};
	answers.push(submitData);
	
	localStorage.setItem("questionCounter", ++questionCounter);
	
	if(questionCounter != 3) {
		localStorage.setItem("answers", JSON.stringify(answers));
		popViewPushView("html/frage.html");
	} else {
		$.ajax( {
			url : serverURL + "game/submitRoundResult/" + gameInfo.spielID,
			type : "POST",
			data : JSON.stringify(answers),
			contentType : "application/json",
			beforeSend : function(xhr) {authHeader(xhr);},
			statusCode : {
				200 : function() {
					// delete saved random categories
					localStorage.removeItem("randomCategoriesGameID" + gameInfo.spielID);
					// if this round is finished, increase it to avoid syncing first
					//FIXME
					
					$.ajax( {
						url: serverURL + "user/sync",
						type: "POST",
						contentType: "text/plain",
						beforeSend: function(xhr){authHeader(xhr);},
						crossDomain: true,
						success: function(obj) {
							for(var i = 0; i < obj.length; i++) {
								if(obj[i].spielID == gameInfo.spielID) {
									localStorage.setItem("gameInfo", JSON.stringify(obj[i]));
									break;
								}
							}
							localStorage.removeItem("answers");
							popViewPushView("html/rundenuebersicht.html");
						},
						error:function(obj) {alert("Fehler beim Sync! "+JSON.stringify(obj));},
						data:"0123456789"
					});
				},
				403 : function() {alert("Interner Fehler (403).");},
				404 : function() {alert("Interner Fehler (404).");},
				406 : function() {alert("Interner Fehler (406).");},
				417 : function() {alert("Interner Fehler (417).");}
			},
		});
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
	}, 600, function() {
		// on completion
		$(this).remove();
	});
}

document.addEventListener("deviceready", init, false);