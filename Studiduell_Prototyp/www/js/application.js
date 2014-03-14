/*
In diesem File werden Funktionen beschrieben, die in mehr als nur einem einzigen Screen benötigt werden.
Screenspezifische Funktionen werden in den jeweiligen 'screenname.js' files beschrieben.
*/

/*Anzeige Titel*/

steroids.view.navigationBar.show("Studiduell");

var serverURL = "http://kevinstrobel.de:8080/Studiduell-0.0.1-SNAPSHOT/";

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

function isRoundStarter(gameInfo) {
	//alert("gameinfo: "+JSON.stringify(gameInfo));
	var me = localStorage.getItem("username");
	var mePlayerNo = (me == gameInfo.spieler1.benutzername) ? 1 : 2;
	
	// persist some info
	localStorage.setItem("gameInfo", JSON.stringify(gameInfo));
	// delete questions
	localStorage.removeItem("gameQuestionStart");
	localStorage.removeItem("gameQuestionContinue");
	
	if(gameInfo.aktuelleRunde % 2 == 0) {
		// even round
		if(mePlayerNo == 1) {
			// new
			return true;
		} else {
			// continue
			return false;
		}
	} else {
		// odd round
		if(mePlayerNo == 1) {
			// continue
			return false;
		} else {
			// new
			return true;
		}
	}
}

function authHeader(xhr) {
	//alert("username: "+localStorage.getItem("username")+" password: "+localStorage.getItem("password")+"URL: "+serverURL);
	var usernameColonPassword = localStorage.getItem("username") + ":" + localStorage.getItem("password");
	xhr.setRequestHeader('Authorization', 'Basic ' + btoa(usernameColonPassword));
}

function authHeaderManual(xhr, username, password){
	//alert("3 parameter auth Header Methode! username: "+username+" password: "+password+" URL: "+serverURL);
	var usernameColonPassword = username + ":" + password;
	xhr.setRequestHeader('Authorization', 'Basic ' + btoa(usernameColonPassword));
}

function addAsFriend(fName) {
	alert("addAsFriend wurde aufgerufen mit name: "+fName);

	function onAlertDismissAddAsFriend(){
		//leer lassen?
		}
	$.ajax( {
		url:serverURL + "settings/friends/" + fName,
		type:"PUT",
		beforeSend:function(xhr){authHeader(xhr);},
		crossDomain:true,
		success:function(){navigator.notification.alert('Sie sind jetzt mit ' + fName + ' befreundet!', onAlertDismissAddAsFriend,'Information','OK');},
		//TODO proper Fehlerbehandlung
		error:function(obj){alert("Fehler bei der Freundesanfrage!"+JSON.stringify(obj));}
		});
		
	
}


