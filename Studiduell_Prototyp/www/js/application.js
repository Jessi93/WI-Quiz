/*
In diesem File werden Funktionen beschrieben, die in mehr als nur einem einzigen Screen benötigt werden.
Screenspezifische Funktionen werden in den jeweiligen 'screenname.js' files beschrieben.
*/

/*Anzeige Titel*/

steroids.view.navigationBar.show("Studiduell");
steroids.view.navigationBar.show({
titleImagePath: "/images/navbar_title@2x.png"
});


var serverURL = "http://kevinstrobel.de:8080/Studiduell-0.0.1-SNAPSHOT/";
var maxZeichenUsername = 20;

/*
 * Der Keycode für die Enter-/Return-Taste.
 */
var keyEnter = 13;
/*
 * Der Timeout pro Frage in ms.
 * Sollte der Spieler seine Antworten ab dem Anzeigen der Frage nicht innerhalb
 * dieser Periode submitten, wird die Frage als falsch gewertet.
 */
var questionTimeout = 30000;

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
	alert("popViewPushView wurde aufgerufen!"+steroids.layers);
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
	//alert("addAsFriend wurde aufgerufen mit name: "+fName);

	function onAlertDismissAddAsFriend(){
		//leer lassen?
	}
	$.ajax( {
		url:serverURL + "settings/friends/" + fName,
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
		url:serverURL + "game/create/with/" + opponentName,
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

function fetchRundenuebersichtData (spielID){
	//hole Serverdaten für die Rundenübersicht und schreibe sie in den LocalStorage --> feuere Event, dass Daten bereit stehen
	$.ajax( {
		url:serverURL + "game/overview/" + spielID,
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

