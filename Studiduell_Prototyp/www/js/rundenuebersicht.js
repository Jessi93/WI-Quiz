function init() {
	// set;
}

// XXX XXXXXXXXXX
var tmpServerData = 
       {
           "spielID": 1,
           "spieltypName":
           {
               "name": "M"
           },
           "spieler1":
           {
               "benutzername": "Kevin02"
           },
           "spieler2":
           {
               "benutzername": "Kevin01"
           },
           "sieger": null,
           "verlierer": null,
           "wartenAuf":
           {
               "benutzername": "Kevin01"
           },
           "aktuelleRunde": 1,
           "spielstatusName":
           {
               "name": "P"
           },
           "letzteAktivitaet": 1392739847000
       }
    ;
	
var randomData = [{
		"categoryName" : "Logik und Algebra",
		"questions" : [{
				"fragenID" : 1,
				"kategorie_name" : "Logik und Algebra",
				"unterkategorie_name" : "uk",
				"flag_fragenTyp_mult" : false,
				"frage" : "Frage 1",
				"antwortmoeglichkeit1" : "A",
				"antwortmoeglichkeit2" : "B",
				"antwortmoeglichkeit3" : "C",
				"antwortmoeglichkeit4" : "D",
				"wahrheitAntwortmoeglichkeit1" : false,
				"wahrheitAntwortmoeglichkeit2" : false,
				"wahrheitAntwortmoeglichkeit3" : false,
				"wahrheitAntwortmoeglichkeit4" : true,
				"flag_frageValidiert" : true
			}, {
				"fragenID" : 2,
				"kategorie_name" : "Logik und Algebra",
				"unterkategorie_name" : "uk",
				"flag_fragenTyp_mult" : false,
				"frage" : "Frage 2",
				"antwortmoeglichkeit1" : "A",
				"antwortmoeglichkeit2" : "B",
				"antwortmoeglichkeit3" : "C",
				"antwortmoeglichkeit4" : "D",
				"wahrheitAntwortmoeglichkeit1" : false,
				"wahrheitAntwortmoeglichkeit2" : false,
				"wahrheitAntwortmoeglichkeit3" : false,
				"wahrheitAntwortmoeglichkeit4" : true,
				"flag_frageValidiert" : true
			}, {
				"fragenID" : 3,
				"kategorie_name" : "Logik und Algebra",
				"unterkategorie_name" : "uk2",
				"flag_fragenTyp_mult" : false,
				"frage" : "Frage 3",
				"antwortmoeglichkeit1" : "A",
				"antwortmoeglichkeit2" : "B",
				"antwortmoeglichkeit3" : "C",
				"antwortmoeglichkeit4" : "D",
				"wahrheitAntwortmoeglichkeit1" : false,
				"wahrheitAntwortmoeglichkeit2" : false,
				"wahrheitAntwortmoeglichkeit3" : false,
				"wahrheitAntwortmoeglichkeit4" : true,
				"flag_frageValidiert" : true
			}
		]
	}, {
		"categoryName" : "Methoden der Wirtschaftsinformatik",
		"questions" : [{
				"fragenID" : 4,
				"kategorie_name" : "Methoden der Wirtschaftsinformatik",
				"unterkategorie_name" : "uk",
				"flag_fragenTyp_mult" : false,
				"frage" : "Frage 4",
				"antwortmoeglichkeit1" : "A",
				"antwortmoeglichkeit2" : "B",
				"antwortmoeglichkeit3" : "C",
				"antwortmoeglichkeit4" : "D",
				"wahrheitAntwortmoeglichkeit1" : false,
				"wahrheitAntwortmoeglichkeit2" : false,
				"wahrheitAntwortmoeglichkeit3" : false,
				"wahrheitAntwortmoeglichkeit4" : true,
				"flag_frageValidiert" : true
			}, {
				"fragenID" : 5,
				"kategorie_name" : "Methoden der Wirtschaftsinformatik",
				"unterkategorie_name" : "uk",
				"flag_fragenTyp_mult" : false,
				"frage" : "Frage 5",
				"antwortmoeglichkeit1" : "A",
				"antwortmoeglichkeit2" : "B",
				"antwortmoeglichkeit3" : "C",
				"antwortmoeglichkeit4" : "D",
				"wahrheitAntwortmoeglichkeit1" : false,
				"wahrheitAntwortmoeglichkeit2" : false,
				"wahrheitAntwortmoeglichkeit3" : false,
				"wahrheitAntwortmoeglichkeit4" : true,
				"flag_frageValidiert" : true
			}, {
				"fragenID" : 6,
				"kategorie_name" : "Methoden der Wirtschaftsinformatik",
				"unterkategorie_name" : "uk2",
				"flag_fragenTyp_mult" : false,
				"frage" : "Frage 6",
				"antwortmoeglichkeit1" : "A",
				"antwortmoeglichkeit2" : "B",
				"antwortmoeglichkeit3" : "C",
				"antwortmoeglichkeit4" : "D",
				"wahrheitAntwortmoeglichkeit1" : false,
				"wahrheitAntwortmoeglichkeit2" : false,
				"wahrheitAntwortmoeglichkeit3" : false,
				"wahrheitAntwortmoeglichkeit4" : true,
				"flag_frageValidiert" : true
			}
		]
	}, {
		"categoryName" : "Verteilte Systeme",
		"questions" : [{
				"fragenID" : 7,
				"kategorie_name" : "Verteilte Systeme",
				"unterkategorie_name" : "uk",
				"flag_fragenTyp_mult" : false,
				"frage" : "Frage 7",
				"antwortmoeglichkeit1" : "A",
				"antwortmoeglichkeit2" : "B",
				"antwortmoeglichkeit3" : "C",
				"antwortmoeglichkeit4" : "D",
				"wahrheitAntwortmoeglichkeit1" : false,
				"wahrheitAntwortmoeglichkeit2" : false,
				"wahrheitAntwortmoeglichkeit3" : false,
				"wahrheitAntwortmoeglichkeit4" : true,
				"flag_frageValidiert" : true
			}, {
				"fragenID" : 8,
				"kategorie_name" : "Verteilte Systeme",
				"unterkategorie_name" : "uk",
				"flag_fragenTyp_mult" : false,
				"frage" : "Frage 8",
				"antwortmoeglichkeit1" : "A",
				"antwortmoeglichkeit2" : "B",
				"antwortmoeglichkeit3" : "C",
				"antwortmoeglichkeit4" : "D",
				"wahrheitAntwortmoeglichkeit1" : false,
				"wahrheitAntwortmoeglichkeit2" : false,
				"wahrheitAntwortmoeglichkeit3" : false,
				"wahrheitAntwortmoeglichkeit4" : true,
				"flag_frageValidiert" : true
			}, {
				"fragenID" : 9,
				"kategorie_name" : "Verteilte Systeme",
				"unterkategorie_name" : "uk2",
				"flag_fragenTyp_mult" : false,
				"frage" : "Frage 9",
				"antwortmoeglichkeit1" : "A",
				"antwortmoeglichkeit2" : "B",
				"antwortmoeglichkeit3" : "C",
				"antwortmoeglichkeit4" : "D",
				"wahrheitAntwortmoeglichkeit1" : false,
				"wahrheitAntwortmoeglichkeit2" : false,
				"wahrheitAntwortmoeglichkeit3" : false,
				"wahrheitAntwortmoeglichkeit4" : true,
				"flag_frageValidiert" : true
			}
		]
	}
];

var continueData = {
 "questions" : [{
   "fragenID" : 7,
   "kategorie_name" : "Verteilte Systeme",
   "unterkategorie_name" : "uk",
   "flag_fragenTyp_mult" : false,
   "frage" : "Frage 7",
   "antwortmoeglichkeit1" : "A",
   "antwortmoeglichkeit2" : "B",
   "antwortmoeglichkeit3" : "C",
   "antwortmoeglichkeit4" : "D",
   "wahrheitAntwortmoeglichkeit1" : false,
   "wahrheitAntwortmoeglichkeit2" : false,
   "wahrheitAntwortmoeglichkeit3" : false,
   "wahrheitAntwortmoeglichkeit4" : true,
   "flag_frageValidiert" : true
  }, {
   "fragenID" : 8,
   "kategorie_name" : "Verteilte Systeme",
   "unterkategorie_name" : "uk",
   "flag_fragenTyp_mult" : false,
   "frage" : "Frage 8",
   "antwortmoeglichkeit1" : "A",
   "antwortmoeglichkeit2" : "B",
   "antwortmoeglichkeit3" : "C",
   "antwortmoeglichkeit4" : "D",
   "wahrheitAntwortmoeglichkeit1" : false,
   "wahrheitAntwortmoeglichkeit2" : false,
   "wahrheitAntwortmoeglichkeit3" : false,
   "wahrheitAntwortmoeglichkeit4" : true,
   "flag_frageValidiert" : true
  }, {
   "fragenID" : 9,
   "kategorie_name" : "Verteilte Systeme",
   "unterkategorie_name" : "uk2",
   "flag_fragenTyp_mult" : false,
   "frage" : "Frage 9",
   "antwortmoeglichkeit1" : "A",
   "antwortmoeglichkeit2" : "B",
   "antwortmoeglichkeit3" : "C",
   "antwortmoeglichkeit4" : "D",
   "wahrheitAntwortmoeglichkeit1" : false,
   "wahrheitAntwortmoeglichkeit2" : false,
   "wahrheitAntwortmoeglichkeit3" : false,
   "wahrheitAntwortmoeglichkeit4" : true,
   "flag_frageValidiert" : true
  }
 ],
 "answers" : [{
   "fragenID" : 7,
   "rundenID" : 21,
   "benutzername" : "Kevin",
   "antwortmoeglichkeit1_check" : false,
   "antwortmoeglichkeit2_check" : false,
   "antwortmoeglichkeit3_check" : false,
   "antwortmoeglichkeit4_check" : true,
   "flagFrageAngezeigt" : true,
   "ergebnis_check" : true
  }, {
   "fragenID" : 8,
   "rundenID" : 21,
   "benutzername" : "Kevin",
   "antwortmoeglichkeit1_check" : false,
   "antwortmoeglichkeit2_check" : false,
   "antwortmoeglichkeit3_check" : false,
   "antwortmoeglichkeit4_check" : true,
   "flagFrageAngezeigt" : true,
   "ergebnis_check" : true
  }, {
   "fragenID" : 9,
   "rundenID" : 21,
   "benutzername" : "Kevin",
   "antwortmoeglichkeit1_check" : false,
   "antwortmoeglichkeit2_check" : false,
   "antwortmoeglichkeit3_check" : false,
   "antwortmoeglichkeit4_check" : true,
   "flagFrageAngezeigt" : true,
   "ergebnis_check" : true
  }
 ]
};
//XXX XXXXXXXXXXXXXXXXXXXXXXX


function setSpielstand() {}
function setSpieler1() {}
function setSpieler2(){}

//Logik zum setzen/ einblenden der Quadrate

//Logik zum einblenden Verdeckt /Du bist dran  /Spielt




function openFrage() {
	//TODO disable button if not waiting for me!
	prepareQuestion();
	/*
	var newView = new steroids.views.WebView("html/kategorieAuswaehlen.html");
	steroids.layers.push(newView);
	*/
}

function prepareQuestion() {
	var me = localStorage.getItem("username");
	var mePlayerNo = (me == tmpServerData.spieler1.benutzername) ? 1 : 2;
	
	// persist some info
	localStorage.setItem("gameInfo", JSON.stringify(tmpServerData));
	// delete questions
	localStorage.removeItem("gameQuestionStart");
	localStorage.removeItem("gameQuestionContinue");
	
	if(tmpServerData.aktuelleRunde % 2 == 0) {
		// even round
		if(mePlayerNo == 1) {
			// new
			fetchQuestionsRoundStart();
		} else {
			// continue
			fetchQuestionsRoundContinue();
		}
	} else {
		// odd round
		if(mePlayerNo == 1) {
			// continue
			fetchQuestionsRoundContinue();
		} else {
			// new
			fetchQuestionsRoundStart();
		}
	}
}

function fetchQuestionsRoundStart() {
alert("start"); //XXX
	var data = randomData;
	localStorage.setItem("gameQuestionStart", JSON.stringify(data));
	
	var newView = new steroids.views.WebView("html/kategorieAuswaehlen.html");
	steroids.layers.push(newView);
}

function fetchQuestionsRoundContinue() {
alert("continue"); //XXX
	var data = continueData;
	localStorage.setItem("gameQuestionContinue", JSON.stringify(data));
	
	var newView = new steroids.views.WebView("html/frage.html");
	steroids.layers.push(newView);
}

function openQuestions() {
	//TODO
}

document.addEventListener("deviceready", init, false);