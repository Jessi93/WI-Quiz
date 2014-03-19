var SpielstandSpieler1 = 0;
var SpielstandSpieler2 = 0;
var gameInfo;
//Zeigt an, ob initialize bereits einmal gefeuert wurde, oder nicht! (so werden Serverdaten beim Screenstart nur 1 Mal geladen & in local Storage geschrieben!

function initialize() {
	var initializeNotYetFired = localStorage.getItem("gameOverviewInitialize");
	//alert("initialize wurde aufgerufen! gameOverviewInitialize/initializeNotYetFired: "+initializeNotYetFired);
	//Markiere im localStorage, dass initialize für die Rundenübersicht bereits aufgerufen wurde!
	localStorage.setItem("gameOverviewInitialize", false);

	setNavigationBar();
	
	var temp_gameInfo_old = JSON.parse(localStorage.getItem("gameInfo"));
	var gameid = temp_gameInfo_old.spielID;
	
	getCurrentGameInfo(gameid);
}

function continueInitialize(){
	function onAlertDismissGameGivenUp(){
	//steroids.layers.pop();
	//Tue nichts, da auch beendete Spiele angezeigt werden sollen!
	}
	
	fetchLocalStorageData();
	
	enORdisableSpielenButton();
	
	setSpieler1();
	setSpieler2();
	setSpielstand();
	setownName();
	setenemyName();
	
}


//XXX XXXXXXXXXXXXXXXXXXXXXXX
var GameOverviewData = {
       "rounds":
       [
           {
               "rundenID": 1,
               "rundenNr": 1,
               "answers":
               [
                   {
                       "frage":
                       {
                           "fragenID": 1,
                           "kategorieName": "IT-Management",
                           "unterkategorieName": "UK 1 zu IT-Management",
                           "flagFragenTypMult": false,
                           "frage": "Welche Gase wurden behandelt?",
                           "antwortmoeglichkeit1": "Exert",
                           "antwortmoeglichkeit2": "Inert",
                           "antwortmoeglichkeit3": "Exposé",
                           "antwortmoeglichkeit4": "Imposé",
                           "wahrheitAntwortmoeglichkeit1": false,
                           "wahrheitAntwortmoeglichkeit2": true,
                           "wahrheitAntwortmoeglichkeit3": false,
                           "wahrheitAntwortmoeglichkeit4": false
                       },
                       "benutzer":
                       {
                           "benutzername": "Kevin01"
                       },
                       "antwortmoeglichkeit1Check": false,
                       "antwortmoeglichkeit2Check": true,
                       "antwortmoeglichkeit3Check": false,
                       "antwortmoeglichkeit4Check": false,
                       "flagFrageAngezeigt": true,
                       "ergebnisCheck": true
                   },
                   {
                       "frage":
                       {
                           "fragenID": 1,
                           "kategorieName": "IT-Management",
                           "unterkategorieName": "UK 1 zu IT-Management",
                           "flagFragenTypMult": false,
                           "frage": "Welche Gase wurden behandelt?",
                           "antwortmoeglichkeit1": "Exert",
                           "antwortmoeglichkeit2": "Inert",
                           "antwortmoeglichkeit3": "Exposé",
                           "antwortmoeglichkeit4": "Imposé",
                           "wahrheitAntwortmoeglichkeit1": false,
                           "wahrheitAntwortmoeglichkeit2": true,
                           "wahrheitAntwortmoeglichkeit3": false,
                           "wahrheitAntwortmoeglichkeit4": false
                       },
                       "benutzer":
                       {
                           "benutzername": "Kevin02"
                       },
                       "antwortmoeglichkeit1Check": true,
                       "antwortmoeglichkeit2Check": false,
                       "antwortmoeglichkeit3Check": false,
                       "antwortmoeglichkeit4Check": false,
                       "flagFrageAngezeigt": true,
                       "ergebnisCheck": false
                   },
                   {
                       "frage":
                       {
                           "fragenID": 2,
                           "kategorieName": "IT-Management",
                           "unterkategorieName": "UK 2 zu IT-Management",
                           "flagFragenTypMult": true,
                           "frage": "Was heißt/hieß RAID?",
                           "antwortmoeglichkeit1": "Redundant Array of Independent Devices",
                           "antwortmoeglichkeit2": "Redundant Array of Inexpensive Disks",
                           "antwortmoeglichkeit3": "Redundant Array of Independent Disks",
                           "antwortmoeglichkeit4": "Redundant Array of Inhuman Disks",
                           "wahrheitAntwortmoeglichkeit1": false,
                           "wahrheitAntwortmoeglichkeit2": true,
                           "wahrheitAntwortmoeglichkeit3": true,
                           "wahrheitAntwortmoeglichkeit4": false
                       },
                       "benutzer":
                       {
                           "benutzername": "Kevin01"
                       },
                       "antwortmoeglichkeit1Check": false,
                       "antwortmoeglichkeit2Check": true,
                       "antwortmoeglichkeit3Check": true,
                       "antwortmoeglichkeit4Check": false,
                       "flagFrageAngezeigt": true,
                       "ergebnisCheck": true
                   },
                   {
                       "frage":
                       {
                           "fragenID": 2,
                           "kategorieName": "IT-Management",
                           "unterkategorieName": "UK 2 zu IT-Management",
                           "flagFragenTypMult": true,
                           "frage": "Was heißt/hieß RAID?",
                           "antwortmoeglichkeit1": "Redundant Array of Independent Devices",
                           "antwortmoeglichkeit2": "Redundant Array of Inexpensive Disks",
                           "antwortmoeglichkeit3": "Redundant Array of Independent Disks",
                           "antwortmoeglichkeit4": "Redundant Array of Inhuman Disks",
                           "wahrheitAntwortmoeglichkeit1": false,
                           "wahrheitAntwortmoeglichkeit2": true,
                           "wahrheitAntwortmoeglichkeit3": true,
                           "wahrheitAntwortmoeglichkeit4": false
                       },
                       "benutzer":
                       {
                           "benutzername": "Kevin02"
                       },
                       "antwortmoeglichkeit1Check": false,
                       "antwortmoeglichkeit2Check": true,
                       "antwortmoeglichkeit3Check": false,
                       "antwortmoeglichkeit4Check": false,
                       "flagFrageAngezeigt": true,
                       "ergebnisCheck": false
                   },
                   {
                       "frage":
                       {
                           "fragenID": 3,
                           "kategorieName": "IT-Management",
                           "unterkategorieName": "UK 1 zu IT-Management",
                           "flagFragenTypMult": false,
                           "frage": "Wie ist Datenschutz anzuwenden?",
                           "antwortmoeglichkeit1": "Erst dann, wenn es zu spät ist.",
                           "antwortmoeglichkeit2": "Nach dem ersten Datenschutzbruch",
                           "antwortmoeglichkeit3": "Präventiv",
                           "antwortmoeglichkeit4": "Gar nicht",
                           "wahrheitAntwortmoeglichkeit1": false,
                           "wahrheitAntwortmoeglichkeit2": false,
                           "wahrheitAntwortmoeglichkeit3": true,
                           "wahrheitAntwortmoeglichkeit4": false
                       },
                       "benutzer":
                       {
                           "benutzername": "Kevin01"
                       },
                       "antwortmoeglichkeit1Check": false,
                       "antwortmoeglichkeit2Check": false,
                       "antwortmoeglichkeit3Check": true,
                       "antwortmoeglichkeit4Check": false,
                       "flagFrageAngezeigt": true,
                       "ergebnisCheck": true
                   },
                   {
                       "frage":
                       {
                           "fragenID": 3,
                           "kategorieName": "IT-Management",
                           "unterkategorieName": "UK 1 zu IT-Management",
                           "flagFragenTypMult": false,
                           "frage": "Wie ist Datenschutz anzuwenden?",
                           "antwortmoeglichkeit1": "Erst dann, wenn es zu spät ist.",
                           "antwortmoeglichkeit2": "Nach dem ersten Datenschutzbruch",
                           "antwortmoeglichkeit3": "Präventiv",
                           "antwortmoeglichkeit4": "Gar nicht",
                           "wahrheitAntwortmoeglichkeit1": false,
                           "wahrheitAntwortmoeglichkeit2": false,
                           "wahrheitAntwortmoeglichkeit3": true,
                           "wahrheitAntwortmoeglichkeit4": false
                       },
                       "benutzer":
                       {
                           "benutzername": "Kevin02"
                       },
                       "antwortmoeglichkeit1Check": true,
                       "antwortmoeglichkeit2Check": false,
                       "antwortmoeglichkeit3Check": false,
                       "antwortmoeglichkeit4Check": false,
                       "flagFrageAngezeigt": true,
                       "ergebnisCheck": false
                   }
               ]
           },
           {
               "rundenID": 2,
               "rundenNr": 2,
               "answers":
               [
                   {
                       "frage":
                       {
                           "fragenID": 4,
                           "kategorieName": "Programmierung",
                           "unterkategorieName": "UK 1 zu Programmierung",
                           "flagFragenTypMult": false,
                           "frage": "Was ist ein natives Sprachmittel in C",
                           "antwortmoeglichkeit1": "Listen",
                           "antwortmoeglichkeit2": "Queues",
                           "antwortmoeglichkeit3": "LinkedLists",
                           "antwortmoeglichkeit4": "Arrays",
                           "wahrheitAntwortmoeglichkeit1": false,
                           "wahrheitAntwortmoeglichkeit2": false,
                           "wahrheitAntwortmoeglichkeit3": false,
                           "wahrheitAntwortmoeglichkeit4": true
                       },
                       "benutzer":
                       {
                           "benutzername": "Kevin01"
                       },
                       "antwortmoeglichkeit1Check": false,
                       "antwortmoeglichkeit2Check": false,
                       "antwortmoeglichkeit3Check": false,
                       "antwortmoeglichkeit4Check": true,
                       "flagFrageAngezeigt": true,
                       "ergebnisCheck": true
                   },
                   {
                       "frage":
                       {
                           "fragenID": 4,
                           "kategorieName": "Programmierung",
                           "unterkategorieName": "UK 1 zu Programmierung",
                           "flagFragenTypMult": false,
                           "frage": "Was ist ein natives Sprachmittel in C",
                           "antwortmoeglichkeit1": "Listen",
                           "antwortmoeglichkeit2": "Queues",
                           "antwortmoeglichkeit3": "LinkedLists",
                           "antwortmoeglichkeit4": "Arrays",
                           "wahrheitAntwortmoeglichkeit1": false,
                           "wahrheitAntwortmoeglichkeit2": false,
                           "wahrheitAntwortmoeglichkeit3": false,
                           "wahrheitAntwortmoeglichkeit4": true
                       },
                       "benutzer":
                       {
                           "benutzername": "Kevin02"
                       },
                       "antwortmoeglichkeit1Check": false,
                       "antwortmoeglichkeit2Check": false,
                       "antwortmoeglichkeit3Check": false,
                       "antwortmoeglichkeit4Check": true,
                       "flagFrageAngezeigt": true,
                       "ergebnisCheck": true
                   },
                   {
                       "frage":
                       {
                           "fragenID": 5,
                           "kategorieName": "Programmierung",
                           "unterkategorieName": "UK 2 zu Programmierung",
                           "flagFragenTypMult": false,
                           "frage": "Welche Schleifen-Art gibt es in C++ nicht?",
                           "antwortmoeglichkeit1": "For",
                           "antwortmoeglichkeit2": "Do-Until",
                           "antwortmoeglichkeit3": "While",
                           "antwortmoeglichkeit4": "Do-While",
                           "wahrheitAntwortmoeglichkeit1": false,
                           "wahrheitAntwortmoeglichkeit2": true,
                           "wahrheitAntwortmoeglichkeit3": false,
                           "wahrheitAntwortmoeglichkeit4": false
                       },
                       "benutzer":
                       {
                           "benutzername": "Kevin01"
                       },
                       "antwortmoeglichkeit1Check": false,
                       "antwortmoeglichkeit2Check": true,
                       "antwortmoeglichkeit3Check": false,
                       "antwortmoeglichkeit4Check": false,
                       "flagFrageAngezeigt": true,
                       "ergebnisCheck": false
                   },
                   {
                       "frage":
                       {
                           "fragenID": 5,
                           "kategorieName": "Programmierung",
                           "unterkategorieName": "UK 2 zu Programmierung",
                           "flagFragenTypMult": false,
                           "frage": "Welche Schleifen-Art gibt es in C++ nicht?",
                           "antwortmoeglichkeit1": "For",
                           "antwortmoeglichkeit2": "Do-Until",
                           "antwortmoeglichkeit3": "While",
                           "antwortmoeglichkeit4": "Do-While",
                           "wahrheitAntwortmoeglichkeit1": false,
                           "wahrheitAntwortmoeglichkeit2": true,
                           "wahrheitAntwortmoeglichkeit3": false,
                           "wahrheitAntwortmoeglichkeit4": false
                       },
                       "benutzer":
                       {
                           "benutzername": "Kevin02"
                       },
                       "antwortmoeglichkeit1Check": true,
                       "antwortmoeglichkeit2Check": true,
                       "antwortmoeglichkeit3Check": false,
                       "antwortmoeglichkeit4Check": false,
                       "flagFrageAngezeigt": true,
                       "ergebnisCheck": false
                   },
                   {
                       "frage":
                       {
                           "fragenID": 6,
                           "kategorieName": "Programmierung",
                           "unterkategorieName": "UK 1 zu Programmierung",
                           "flagFragenTypMult": false,
                           "frage": "Welcher Assembly-Befehl kopiert register ax nach bx (Intel-Syntax)?",
                           "antwortmoeglichkeit1": "mov bx,ax",
                           "antwortmoeglichkeit2": "cpy bx,ax",
                           "antwortmoeglichkeit3": "dup bx,ax",
                           "antwortmoeglichkeit4": "copy bx,ax",
                           "wahrheitAntwortmoeglichkeit1": true,
                           "wahrheitAntwortmoeglichkeit2": false,
                           "wahrheitAntwortmoeglichkeit3": false,
                           "wahrheitAntwortmoeglichkeit4": false
                       },
                       "benutzer":
                       {
                           "benutzername": "Kevin01"
                       },
                       "antwortmoeglichkeit1Check": true,
                       "antwortmoeglichkeit2Check": false,
                       "antwortmoeglichkeit3Check": false,
                       "antwortmoeglichkeit4Check": false,
                       "flagFrageAngezeigt": true,
                       "ergebnisCheck": true
                   },
                   {
                       "frage":
                       {
                           "fragenID": 6,
                           "kategorieName": "Programmierung",
                           "unterkategorieName": "UK 1 zu Programmierung",
                           "flagFragenTypMult": false,
                           "frage": "Welcher Assembly-Befehl kopiert register ax nach bx (Intel-Syntax)?",
                           "antwortmoeglichkeit1": "mov bx,ax",
                           "antwortmoeglichkeit2": "cpy bx,ax",
                           "antwortmoeglichkeit3": "dup bx,ax",
                           "antwortmoeglichkeit4": "copy bx,ax",
                           "wahrheitAntwortmoeglichkeit1": true,
                           "wahrheitAntwortmoeglichkeit2": false,
                           "wahrheitAntwortmoeglichkeit3": false,
                           "wahrheitAntwortmoeglichkeit4": false
                       },
                       "benutzer":
                       {
                           "benutzername": "Kevin02"
                       },
                       "antwortmoeglichkeit1Check": true,
                       "antwortmoeglichkeit2Check": false,
                       "antwortmoeglichkeit3Check": false,
                       "antwortmoeglichkeit4Check": false,
                       "flagFrageAngezeigt": true,
                       "ergebnisCheck": true
                   }
               ]
           },
           {
               "rundenID": 3,
               "rundenNr": 3,
               "answers":
               [
               ]
           },
           {
               "rundenID": 4,
               "rundenNr": 4,
               "answers":
               [
               ]
           },
           {
               "rundenID": 5,
               "rundenNr": 5,
               "answers":
               [
               ]
           },
           {
               "rundenID": 6,
               "rundenNr": 6,
               "answers":
               [
               ]
           }
       ]
};

function checkGameGivenUp(){
	//alert("checkGameGivenUp wurde aufgerufen mit status: "+gameInfo.spielstatusName.name);
	if(gameInfo.spielstatusName.name == "Q"){
	return true;
	}else{
	return false;
	}
}

function getCurrentGameInfo(spielID){
	//alert("getCurrentGameInfo wurde aufgerufen mit SpielID: "+spielID);
	function writeGameInfoInLS(gameInfoNew){
	//finde den Spieldatensatz des aktuellen spiels
		for(var i=0;i<gameInfoNew.length;i++){
			if(gameInfoNew[i].spielID == spielID){
				//schreibe Spieldatensatz in LS
				localStorage.setItem("gameInfo", JSON.stringify(gameInfoNew[i]));
				//alert("gameInfo wurde erneuert im LS: "+JSON.stringify(gameInfoNew[i]));
				break;
			}
		}
		continueInitialize();
	}
//hole aktuelle GameInfo Daten und schreibe Sie in den localStorage. 
	$.ajax( {
				url:serverURL + "user/sync",
				type:"POST",
				contentType:"text/plain",
				beforeSend:function(xhr){authHeader(xhr);},
				crossDomain:true,
				success:function(obj){writeGameInfoInLS(obj);},
				error:function(obj){alert("Fehler beim holen der Hauptmenü-Spieldaten! "+JSON.stringify(obj));},
				data:"0123456789" //TODO: Push ID übertragen!
				}); 

}


function fetchLocalStorageData() {
//alert("fetchLocalStorageData wurde aufgerufen! gameOverview:"+localStorage.getItem("gameOverview"));
// hole Serverdaten und schreibe Sie in GameOverviewData!
GameOverviewData = JSON.parse(localStorage.getItem("gameOverview"));
gameInfo = JSON.parse(localStorage.getItem("gameInfo"));
}

function enORdisableSpielenButton() {
	var MyUsername = localStorage.getItem("username");
	 
	var waitForUsername = gameInfo.wartenAuf.benutzername;
	//alert("MyUsername: "+MyUsername+" waitForUsername: "+waitForUsername);
	if(waitForUsername === MyUsername && gameInfo.spielstatusName.name === "A"){
		//auf mich wird gewartet(ich bin dran) --> Spielen Button soll aktiv sein!
		$("#spielenButton").removeClass("topcoat-button--large");
		$("#spielenButton").addClass("topcoat-button--large--cta");
		$("#spielenButton").removeAttr("disabled");
		$("#spielenButton").text("Spielen");
	}else if(gameInfo.spielstatusName.name === "Q"){
		// spiel wurde aufgegeben
		$("#spielenButton").removeClass("topcoat-button--large--cta");
		$("#spielenButton").addClass("topcoat-button--large");
		$("#spielenButton").attr("disabled", ""); 
		$("#spielenButton").text("Aufgegeben von: "+waitForUsername);
	}else{
	//Es wird auf gegner gewartet (Spiel aktiv!)
		$("#spielenButton").removeClass("topcoat-button--large--cta");
		$("#spielenButton").addClass("topcoat-button--large");
		$("#spielenButton").attr("disabled", ""); 
		$("#spielenButton").text("Warten");
	}
}

function setSpielstand() {
var Spielstand = (SpielstandSpieler1+":"+SpielstandSpieler2);
//alert("Spielstand: "+Spielstand);
 $('#scoreDiv').text(Spielstand);
}
function setSpieler1()
{
//alert("setSpieler1 wurde aufgerufen, username ist:"+localStorage.getItem("username"));
//Setze Spielstand zurück, damit bei aktualisieren von 0 gezählt wird.
SpielstandSpieler1 = 0;

var username = localStorage.getItem("username");
// encolourSquare(viereck_id, rundenNummer, nrFrageInRunde, username, zugehoerigerSpieler)
//Erste Runde
encolourSquare("runde1frage1spieler1", 1, 1, username, 1);	
encolourSquare("runde1frage2spieler1", 1, 2, username, 1);	
encolourSquare("runde1frage3spieler1", 1, 3, username, 1);	
//Zweite Runde
encolourSquare("runde2frage1spieler1", 2, 1, username, 1);	
encolourSquare("runde2frage2spieler1", 2, 2, username, 1);	
encolourSquare("runde2frage3spieler1", 2, 3, username, 1);	
//Dritte Runde
encolourSquare("runde3frage1spieler1", 3, 1, username, 1);	
encolourSquare("runde3frage2spieler1", 3, 2, username, 1);	
encolourSquare("runde3frage3spieler1", 3, 3, username, 1);	
//Vierte Runde
encolourSquare("runde4frage1spieler1", 4, 1, username, 1);	
encolourSquare("runde4frage2spieler1", 4, 2, username, 1);	
encolourSquare("runde4frage3spieler1", 4, 3, username, 1);	
//Fünfte Runde
encolourSquare("runde5frage1spieler1", 5, 1, username, 1);	
encolourSquare("runde5frage2spieler1", 5, 2, username, 1);	
encolourSquare("runde5frage3spieler1", 5, 3, username, 1);	
//Sechste Runde
encolourSquare("runde6frage1spieler1", 6, 1, username, 1);	
encolourSquare("runde6frage2spieler1", 6, 2, username, 1);	
encolourSquare("runde6frage3spieler1", 6, 3, username, 1);	

	 						
}	

function setSpieler2(){
//alert("setSpieler2 wurde aufgerufen"));

//Setze Spielstand zurück, damit bei aktualisieren von 0 gezählt wird.
SpielstandSpieler2 = 0;

var enemy_username = localStorage.getItem("enemyUsername"); //TESTDATEN: "Kevin02"
// encolourSquare(viereck_id, rundenNummer, nrFrageInRunde, username, zugehoerigerSpieler)
//Erste Runde
encolourSquare("runde1frage1spieler2", 1, 1, enemy_username, 2);	
encolourSquare("runde1frage2spieler2", 1, 2, enemy_username, 2);	
encolourSquare("runde1frage3spieler2", 1, 3, enemy_username, 2);	
//Zweite Runde
encolourSquare("runde2frage1spieler2", 2, 1, enemy_username, 2);	
encolourSquare("runde2frage2spieler2", 2, 2, enemy_username, 2);	
encolourSquare("runde2frage3spieler2", 2, 3, enemy_username, 2);	
//Dritte Runde
encolourSquare("runde3frage1spieler2", 3, 1, enemy_username, 2);	
encolourSquare("runde3frage2spieler2", 3, 2, enemy_username, 2);	
encolourSquare("runde3frage3spieler2", 3, 3, enemy_username, 2);	
//Vierte Runde
encolourSquare("runde4frage1spieler2", 4, 1, enemy_username, 2);	
encolourSquare("runde4frage2spieler2", 4, 2, enemy_username, 2);	
encolourSquare("runde4frage3spieler2", 4, 3, enemy_username, 2);	
//Fünfte Runde
encolourSquare("runde5frage1spieler2", 5, 1, enemy_username, 2);	
encolourSquare("runde5frage2spieler2", 5, 2, enemy_username, 2);	
encolourSquare("runde5frage3spieler2", 5, 3, enemy_username, 2);	
//Sechste Runde
encolourSquare("runde6frage1spieler2", 6, 1, enemy_username, 2);	
encolourSquare("runde6frage2spieler2", 6, 2, enemy_username, 2);	
encolourSquare("runde6frage3spieler2", 6, 3, enemy_username, 2);	

	 				
}

//Logik zum setzen/ einblenden eines Quadrats
function encolourSquare(viereck_id, rundenNummer, nrFrageInRunde, username, zugehoerigerSpieler) {
	//alert("encolourSquare wurde aufgerufen für viereck: "+viereck_id);
//prüfe rundenNummer === rundenNr
var fragenergebnis;
var myUsername  = localStorage.getItem("username");
var enemyUsername = localStorage.getItem("enemyUsername");


for (var i=0;i<GameOverviewData.rounds.length;i++){
	//alert("Position in for schleife:"+i);
	if (GameOverviewData.rounds[i].rundenNr == rundenNummer)
		{
		//prüfe: gibt es 6 antworten für diese Runde?
		if(GameOverviewData.rounds[i].answers.length == 6){
			//prüfe benutzername === username an erster möglicher stelle
			if (GameOverviewData.rounds[i].answers[(nrFrageInRunde * 2)-2].benutzer.benutzername === username){
				//lese aus: ergebnisCheck 
				fragenergebnis = GameOverviewData.rounds[i].answers[(nrFrageInRunde * 2)-2].ergebnisCheck;
				break;
			}
			//prüfe benutzername === username an zweiter möglicher stelle
			else if (GameOverviewData.rounds[i].answers[(nrFrageInRunde * 2)-1].benutzer.benutzername === username){
				//lese aus: ergebnisCheck 
				fragenergebnis = GameOverviewData.rounds[i].answers[(nrFrageInRunde * 2)-1].ergebnisCheck;
				break;
			}
		} else if(GameOverviewData.rounds[i].answers.length == 3){ 
				//alert("Gameoverview hat Länge drei!" + JSON.stringify(GameOverviewData));
				//alert("if von Viereck: "+viereck_id+" prüft: user in frage:"+GameOverviewData.rounds[i].answers[nrFrageInRunde-1].benutzer.benutzername+" username in LS: "+usernameOfSquare );
				//Logik für drei Antworten pro Runde in Serverdaten!
				if(zugehoerigerSpieler == 1){
					//es sollen nur Vierecke angezeigt, wenn man selbst gespielt hat!
					if(GameOverviewData.rounds[i].answers[nrFrageInRunde-1].benutzer.benutzername === myUsername){
					fragenergebnis = GameOverviewData.rounds[i].answers[nrFrageInRunde-1].ergebnisCheck;
					break;		
					}
				}else if(zugehoerigerSpieler == 2){
				//Gegnerische Antworten, von Runden, die man selbst noch nicht gespielt hat, sollen grau sein!
					if(GameOverviewData.rounds[i].answers[nrFrageInRunde-1].benutzer.benutzername === enemyUsername){
						fragenergebnis = "grey";
						break;
					}
				}		
			}
		}
	} 
//Wenn Frage Richtig beantwortet (ergebnisCheck = true)
if (fragenergebnis == true){
	//alert(viereck_id+" wurde auf grün gesetzt!");
	$("#"+viereck_id).addClass("greenBackground");
	
	//Logik zum Berechnen des Spielstandes
	//Prüfen, ob Frage zu Spieler 1 oder 2 gehört
		if (zugehoerigerSpieler == 1)
			{
			//alert("Spielstand von Spieler1 um 1 erhöht: Spielstand jetzt"+SpielstandSpieler1+":"+SpielstandSpieler2);
			SpielstandSpieler1 = SpielstandSpieler1+1;
			}
		else 
			{
			//alert("Spielstand von Spieler2 um 1 erhöht: Spielstand jetzt"+SpielstandSpieler1+":"+SpielstandSpieler2);
			SpielstandSpieler2=SpielstandSpieler2+1;
			}
	
	}else if(fragenergebnis == false){
	//Wenn Frage Falsche beantwortet (ergebnisCheck = false)
	$("#"+viereck_id).addClass('redBackground');
	}else if(fragenergebnis === "grey"){
	//Färbe Viereck grau!
	$("#"+viereck_id).addClass('greyBackground');
	}
}

function setownName(){
var ownName;
ownName = localStorage.getItem("username");
 $('#spielerADiv').text(ownName);
}

function setenemyName(){
var enemyUsername;
var enemyUsername = localStorage.getItem("enemyUsername");
$('#spielerBDiv').text(enemyUsername);
}

function openFrage() {
	localStorage.setItem("questionCounter", 0);
	//TODO disable button if not waiting for me!
	prepareQuestion();
	
	//var newView = new steroids.views.WebView("html/kategorieAuswaehlen.html");
	//steroids.layers.push(newView);
	
}

function prepareQuestion() {
	if(isRoundStarter(gameInfo)) {
		var randomCategoriesGameID = JSON.parse(localStorage.getItem("randomCategoriesGameID" + gameInfo.spielID));
		if(randomCategoriesGameID === null) {
			$.ajax( {
			url : serverURL + "game/randomCategoriesFor/" + gameInfo.spielID,
			type : "POST",
			beforeSend : function(xhr) {authHeader(xhr);},
			success : function(cAndQ) {
				/*
				 * Save cats temporarily for this game to avoid the user to go back
				 * and forth in order to get different categories.
				 */
				localStorage.setItem("randomCategoriesGameID" + gameInfo.spielID, JSON.stringify(cAndQ));
				
				fetchQuestionsRoundStart(cAndQ);
			},
			error : function(obj) {alert("Die Spieldaten konnten nicht übertragen werden.");}
		});
		} else {
			// user has selected categories before, show the prefetched data
			fetchQuestionsRoundStart(randomCategoriesGameID);
		}
	} else {
		$.ajax( {
			url : serverURL + "game/continueRound/" + gameInfo.spielID,
			type : "GET",
			beforeSend : function(xhr) {authHeader(xhr);},
			success : function(qAndA) {fetchQuestionsRoundContinue(qAndA);},
			error : function(obj) {alert("Die Spieldaten konnten nicht übertragen werden.");}
		});
	}
}

function fetchQuestionsRoundStart(categoriesAndQuestions) {
alert("fetchQuestionsRoundStart wurde aufgerufen"); //XXX
	localStorage.setItem("gameQuestionStart", JSON.stringify(categoriesAndQuestions));
	
	var newView = new steroids.views.WebView("html/kategorieAuswaehlen.html");
	steroids.layers.push(newView);
}

function fetchQuestionsRoundContinue(questionsAndAnswersOpponent) {
alert("fetchQuestionsRoundContinue wurde aufgerufen!"); //XXX
	localStorage.setItem("gameQuestionContinue", JSON.stringify(questionsAndAnswersOpponent));
	
	var newView = new steroids.views.WebView("html/frage.html");
	steroids.layers.push(newView);
}

function openQuestions() {
	//TODO
}

//Füge gegner als Freund hinzu
function addAsFriendWrapper(){
var enemyUsername = localStorage.getItem("enemyUsername");
//alert("addAsFriendWrapper wurde aufgerufen! enemyUsername: "+enemyUsername);
addAsFriend(enemyUsername);

}

function giveUp(){
//alert("give up wurde aufgerufen!");
function onConfirmGiveUp(buttonIndex, gameID){
		switch (buttonIndex) {
			case 1: //Aufgeben wurde bestätigt!
			//TODO: Duell bei Server aufgeben!"
			 $.ajax( {
			 url:serverURL + "game/abandon/" + gameID,
			 type:"POST",
			 beforeSend : function(xhr) {authHeader(xhr);},
			success:function(obj){
			//alert("Aufgeben wurde von Server bestätigt!"+JSON.stringify(obj));
			//gehe zum home screen zurück!
			steroids.layers.popAll();
			},
			 error:function(obj){
			 
			 alert("Fehler beim Aufgeben des Duells!"+JSON.stringify(obj));}
			 }); 
				
				break;
			case 2: //Duellanfrage wurde abgelehnt!
			//--> Tue nichts!
			//alert("Duell wurde nicht aufgegeben!")
				break;
		}
	}

	var gameID = gameInfo.spielID;
		
	navigator.notification.confirm(      
		 'Möchtest du das Duell wirklich aufgeben?', 						// message    
		 function(buttonIndex){onConfirmGiveUp(buttonIndex, gameID);},           	// callback to invoke with index of button pressed       
		 "Bist du sicher?",           			// title      
		 ['Ja','Nein']   			// buttonLabels    
		 );
	 
}

function setNavigationBar(){
/*
	alert("setNavigationBar wurde aufgerufen! Step1")
	//erstelle Button
	var syncButton = new steroids.buttons.NavigationBarButton();
	syncButton.title = "Sync";
	alert("setNavigationBar wurde aufgerufen! Step2")
	//Funktionalität des Sync Buttons
	syncButton.onTap = function() {
    alert("TODO sync!");
	};
	alert("setNavigationBar wurde aufgerufen! Step3")
	//Zeige Button im Navigation Bar an
	steroids.view.navigationBar.update({
		buttons: {right: [syncButton]},
		onSuccess: function() {    alert("Button set!"); },
		onFailure: function() {    alert("Failed to set button.");   }
	});
	alert("setNavigationBar wurde aufgerufen! Step4")
	
	
	//STEROIDS BEISPIEL! http://docs.appgyver.com/en/edge/steroids_Steroids%20Native%20UI_Steroids.view.navigationBar_navigationBar.update.md.html
	var leftButton = new steroids.buttons.NavigationBarButton();
	var rightButton = new steroids.buttons.NavigationBarButton();
	var imageButton = new steroids.buttons.NavigationBarButton();

	leftButton.title = "Left";
	leftButton.onTap = function() { alert("Left button tapped"); };

	rightButton.title = "Right";
	rightButton.onTap = function() { alert("Right button tapped"); };

	imageButton.imagePath = "../images/Lupe.png";
	imageButton.onTap = function() { alert("Image button tapped"); };

	steroids.view.navigationBar.update({
	  titleImagePath: "/icons/telescope@2x.png",
	  overrideBackButton: false,
	  buttons: {
		left: [leftButton],
		right: [rightButton, imageButton]
	  }
	}, {
	  onSuccess: function() {
		alert("Navigation bar updated!");
	  },
	  onFailure: function() {
		alert("Failed to update the navigation bar.");
	  }
	});
*/
	
}

function sync(){
	var initializeNotYetFired = localStorage.getItem("gameOverviewInitialize");
	//true: die rundenübersicht wird für dieses Spiel neu aufgerufen (aus hauptmenü heraus)
	//false: die rundenübersicht wird lediglich aktualisiert! (init wurde bereits mind 1 mal aufgerufen!)
	//alert("sync wurde aufgerufen! initializeNotYetFired= "+initializeNotYetFired);
	//alert("gameInfo: "+localStorage.getItem("gameInfo"));
	var gameInfo = JSON.parse(localStorage.getItem("gameInfo"));
	if(initializeNotYetFired === "true"){ 
	//wenn initialize noch nicht aufgerufen wurde, rufe nur initialize auf (Aufruf aus Hauptmenü)
	initialize();
	}else{
	//rundenübersicht wird aktualisiert! --> neue Daten holen & screen aktualisieren!
	 //alert("im else von sync! initializeNotYetFired= "+initializeNotYetFired);
	var gameID = gameInfo.spielID;
	 //hole neue Serverdaten 
	fetchRundenuebersichtData (gameID); //bei erfolg wird RundenuebersichtDataloaded gefeuert (als event!)
	
	}
}

function onVisibilityChange() {
    //alert("document.visibilityState: " + document.visibilityState);
    //alert("document.hidden: " + document.hidden);

	var docHidden = document.hidden;
	if(docHidden == false){
	//Nur wenn auf das Dokument zurückgekehrt wird, soll es aktualisiert werden
	sync();
	}else{
	//Wenn das Dokument verlassen wird, soll nichts getan werden!
	}
 
}

//document.addEventListener("deviceready", initialize, false);
//sobald das Dokument zum ersten Mal geöffnet wird, soll es mit Inhalt befüllt werden!
document.addEventListener("DOMContentLoaded", sync, false);

//wenn auf die Rundenübersicht zurückgekehrt wird, soll sie aktualisiert werden! (auch bei Rückkehr aus bildschirm-standby!)
document.addEventListener("visibilitychange", onVisibilityChange, false);

//sobald neue Serverdaten bereit stehen, soll der screen mit initialize aktualisiert werden!
document.addEventListener("RundenuebersichtDataloaded", initialize, false);