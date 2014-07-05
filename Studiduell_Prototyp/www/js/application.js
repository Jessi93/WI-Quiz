/*
In diesem File werden Funktionen beschrieben, die in mehr als nur einem einzigen Screen benötigt werden.
Screenspezifische Funktionen werden in den jeweiligen 'screenname.js' files beschrieben.
*/

/*
 * GLOBALE KONFIGURATION.
 */
var config = {
	serverURL : "http://kevinstrobel.de:8080/Studiduell-0.0.1-SNAPSHOT/",
	
	/*
	 * The period to wait for a server answer in ms before the request times out.
	 */
	ajaxTimeout : 10000,
	
	maxZeichenUsername : 20,
	
	/*
	 * Der Keycode für die Enter-/Return-Taste.
	 */
	keyEnter : 13,
	
	/*
	 * Der Timeout pro Frage in ms.
	 * Sollte der Spieler seine Antworten ab dem Anzeigen der Frage nicht innerhalb
	 * dieser Periode submitten, wird die Frage als falsch gewertet.
	 */
	questionTimeout : 30000,
	
	/*
	 * Der Regex für zulässige Benutzernamen.
	 * (Nur alphanumerische Zeichen)
	 */
	usernameRegex : /^[a-z0-9]+$/i
};

/*
 *
 * GLOBALER CODE, DER AUF JEDER WEBSEITE AUSGEFÜHRT WERDEN SOLL.
 *
 */

// Ajax-Konfiguration
var timeoutFunc;
// Ajax-Timeout
$.ajaxSetup({
	timeout: config.ajaxTimeout
});
// Ajax-Animation
$(document).ajaxStart(function() {
	$(document.body).append('<div class="loading" style="display:none;"></div>');
	$(".loading").fadeIn();
	// if no ajax stop event is triggered, automatically timeout after some time
	timeoutFunc = setTimeout(function() { _ajaxStop(); }, config.ajaxTimeout);
});
$(document).ajaxStop(function() {
	_ajaxStop();
});
$(document).ajaxError(function() {
	_ajaxStop();
	alert("Verbindung zu Server fehlgeschlagen.");
});

function _ajaxStop() {
	// clear the timeout, as the ajax request has been stopped
	clearTimeout(timeoutFunc);
	
	var loading = $(".loading");
	loading.fadeOut(function() {
		loading.remove();
	});
}

// Anzeige Titel
steroids.view.navigationBar.show("Studiduell");
steroids.view.navigationBar.show({
titleImagePath: "/images/navbar_title@2x.png"
});

/*
 *
 * FUNKTIONSDEKLARATIONEN
 *
 */

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
function popViewPushView (newView_locationString) {
	var newView = new steroids.views.WebView(newView_locationString);
	
	steroids.layers.pop();
	steroids.layers.push(newView);
	
	
	/* window.setTimeout(function(){
		//alert("setTimeout wurde aufgerufen!");
		
		var newView = new steroids.views.WebView(newView_locationString);
						steroids.layers.push(newView);
						steroids.layers.pop();
						}
						,2000); 
						*/
}

function fireEvent(event_name){
	var event; // The custom event that will be created
	  if (document.createEvent) {
		event = document.createEvent("HTMLEvents");
		event.initEvent(event_name, true, true);
	  } else {
		event = document.createEventObject();
		event.eventType = event_name;
	  }
	event.eventName = event_name;
	//feuern des Events
	if (document.createEvent) {
		//alert(event_name+" event wurde gefeuert!");
		document.dispatchEvent(event);
	  } else {
		document.fireEvent("on" + event.eventType, event);
	  }
}

function isRoundStarter(gameInfo) {
	//alert("gameinfo: "+JSON.stringify(gameInfo));
	var me = localStorage.getItem("username");
	var mePlayerNo = (me == gameInfo.spieler1.benutzername) ? 1 : 2;
	
	// persist some info
	localStorage.setItem("gameInfo", JSON.stringify(gameInfo));
	// delete questions
	localStorage.removeItem("gameQuestionStart" + gameInfo.spielID);
	localStorage.removeItem("gameQuestionContinue" + gameInfo.spielID);
	
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
	//alert("username: "+localStorage.getItem("username")+" password: "+localStorage.getItem("password")+"URL: "+config.serverURL);
	var usernameColonPassword = localStorage.getItem("username") + ":" + localStorage.getItem("password");
	xhr.setRequestHeader('Authorization', 'Basic ' + btoa(usernameColonPassword));
}

function authHeaderManual(xhr, username, password){
	//alert("3 parameter auth Header Methode! username: "+username+" password: "+password+" URL: "+config.serverURL);
	var usernameColonPassword = username + ":" + password;
	xhr.setRequestHeader('Authorization', 'Basic ' + btoa(usernameColonPassword));
}

function addAsFriend(fName) {
	//alert("addAsFriend wurde aufgerufen mit name: "+fName);

	function onAlertDismissAddAsFriend(){
		//leer lassen?
	}
	$.ajax( {
		url:config.serverURL + "settings/friends/" + fName,
		type:"PUT",
		beforeSend:function(xhr){authHeader(xhr);},
		crossDomain:true,
		success:function(){navigator.notification.alert('Du bist jetzt mit ' + fName + ' befreundet!', onAlertDismissAddAsFriend,'Information','OK');},
		//TODO proper Fehlerbehandlung
		error:function(obj){
			if(obj.status == 409){
			//409 = "Conflict" = Freundesanfrage fehlgeschlagen, weil Freundschaft bereits herrscht!
			navigator.notification.alert('Du bist bereits mit '+fName+' befreundet!', onAlertDismissAddAsFriend,'Information','OK');
			}else{
			navigator.notification.alert("Fehler bei der Freundesanfrage!"+JSON.stringify(obj), onAlertDismissAddAsFriend,'Information','OK');
			}
		}
		});
		
	
}

function createNewGameWithOpponent(opponentName){
	function onAlertDismissCreateNewGameWithOpponent(){
	}
	$.ajax( {
		url:config.serverURL + "game/create/with/" + opponentName,
		type:"POST",
		beforeSend:function(xhr){authHeader(xhr);},
		crossDomain:true,
		success:function(){
		//alert("spiel wurde erstellt auf dem Server, nun wird popAll aufgerufen!");
		steroids.layers.popAll();},
		error:function(obj){
			if(obj.status == 409){
				//409 = "Conflict" = Freundesanfrage fehlgeschlagen, weil Freundschaft bereits herrscht!
				navigator.notification.alert("Du spielst bereits gegen "+opponentName+"!", onAlertDismissCreateNewGameWithOpponent,'Information','OK');
				}else{
				navigator.notification.alert("Fehler beim Absenden der Duellanfrage!"+JSON.stringify(obj), onAlertDismissCreateNewGameWithOpponent,'Information','OK');
				}
			}
		});
}

/**
  * Submits a bunch of answers to the server.
  */
function submitData(answers, successCallback) {
$.ajax( {
		url : config.serverURL + "game/submitRoundResult/" + gameInfo.spielID,
		type : "POST",
		data : JSON.stringify(answers),
		contentType : "application/json",
		beforeSend : function(xhr) {authHeader(xhr);},
		statusCode : {
			200 : function() {
				successCallback();
			},
			403 : function() {alert("Interner Fehler (403).");},
			404 : function() {alert("Interner Fehler (404).");},
			406 : function() {alert("Interner Fehler (406).");},
			417 : function() {alert("Interner Fehler (417).");}
		}
	});
}

function fetchRundenuebersichtData (spielID){
	//hole Serverdaten für die Rundenübersicht und schreibe sie in den LocalStorage --> feuere Event, dass Daten bereit stehen
	$.ajax( {
		url:config.serverURL + "game/overview/" + spielID,
		type:"GET",
		beforeSend:function(xhr){authHeader(xhr);},
		crossDomain:true,
		success:function(obj){
			localStorage.setItem("gameOverview", JSON.stringify(obj));
			//alert("Rundenübersichtsdaten wurden in localstorage geschrieben:"+localStorage.getItem("gameOverview"));
			//Event wird erstellt!
			fireEvent("RundenuebersichtDataloaded");
		},
		error:function(obj){alert("Fehler beim holen der Rundenübersichtsdaten! Evtl SpielID nicht vorhanden!"+JSON.stringify(obj));}
		});
}

/**
  * Removes the game-specific info from the localStorage.
  */
function cleanUp(gameInfo) {
	// clean up
	localStorage.removeItem("randomCategoriesGameID" + gameInfo.spielID);
	localStorage.removeItem("answers" + gameInfo.spielID);
	localStorage.removeItem("selectedCategory" + gameInfo.spielID);
	localStorage.removeItem("questions" + gameInfo.spielID);
	localStorage.removeItem("questionCounter" + gameInfo.spielID);
	localStorage.removeItem("gameQuestionStart" + gameInfo.spielID);
	localStorage.removeItem("gameQuestionContinue" + gameInfo.spielID);
	localStorage.removeItem("answers" + gameInfo.spielID);
}