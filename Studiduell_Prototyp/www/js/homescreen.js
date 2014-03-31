var homescreenServerdata;
var phoneGapLoaded = false; //true: deviceReady wurde gefeuert, false: deviceready wurde noch nicht gefeuert
var spielIDsArray = new Array(); //WORKAROUND (mehrfache Duellanfragen!)enthält alle SpielIDs, für die Deullanfragen angezeigt wurden 
	//--> so kann verhindert werden, dass duellanfragen zweimal angezeigt werden
var initNotYetCalled = true;

//prüft, ob phoneGap geladen wurde, wenn nicht, läd es manuell nach! (zeit in ms)
var phoneGapInterval = window.setInterval(function(){loadPhoneGap();},2000);

function loadPhoneGap(){
	//prüft, ob phoneGap geladen wurde, wenn nicht, läd es manuell nach! 
	//alert("LoadPhonegap wurde aufgerufen! navigator.notification: "+navigator.notification);
	if(typeof navigator.notification == "undefined"){
		$.getScript('http://localhost/cordova.js', function() {
						//alert("PhoneGap wurde manuell nachgeladen. navigator.notification: "+navigator.notification);
						phoneGapLoaded = true; //Turn ON the flag
						onDeviceReady();
						//fireEvent("deviceready");
					});
	}else{//wenn notifcation möglich ist, dann soll aufgehört werden im intervall zu überprüfen, ob es geladen wurde:
		clearInterval(phoneGapInterval);

	}
}

function init(){
	//alert("init wurde aufgerufen!");
	//Füge eventhandler für "Tap" Events hinzu!
	$("#AbmeldenButton").removeAttr("ontouchend");
	$("#AbmeldenButton").hammer({}).on('tap',function(e){ abmelden()});
	$("#neuesSpielStartenButton").removeAttr("ontouchend");
	$("#neuesSpielStartenButton").hammer({}).on('tap',function(e){ openNeuesSpielScreen()});
	$(document).hammer({}).on('swipeleft',function(e){ openNeuesSpielScreen()	});
	//Naviagtionbar ist prinzipiell unabhängig von Phonegap/Jquery , ABER Fallunterscheidung zwischen iOS und Android notwenidig --> PhoneGap muss geladen sein! 
	setNavigationBar();
	initNotYetCalled = false;
}

function onDeviceReady() {
	phoneGapLoaded = true;
	//alert("PhoneGap geladen! navigator.notification: "+navigator.notification);

	//sobald das Jquery rdy ist, sollen die Serverdaten geladen & das Dokument mit den Datenbefüllt werden
	//$( document ).ready(function() { 
	//alert("Document ready wurde gefeuert!");
	init();

	//});
	sync();
}
	

function setNavigationBar(){
//Füge "aktualisieren Button" dem NavigationBar hinzu!
	var syncButton = new steroids.buttons.NavigationBarButton();
	var devicePlatform = device.platform; 
/* 	alert("devicePlatform: "+devicePlatform); */

	
	 if (devicePlatform === "iOS") {
		syncButton.imagePath = "/images/refresh_big@2x.png";
	}else if (devicePlatform === "Android") {
  		syncButton.title = "Aktualisieren"; 
	} 
	syncButton.onTap = function() {
		sync();
		};

	steroids.view.navigationBar.setButtons({
			right: [syncButton]
	});
}

function checkCredentials() {
	//alert("checkCredentials wurde aufgerufen!");	
	//zu testzwecken: setze localstorage username & pw auf leer! --> zeige login screen immer an!
	//localStorage.removeItem("username");
	var username = localStorage.getItem("username");
	//alert("checkCredentials wurde aufgerufen mit username: "+username);
	if(isEmpty(username)) {
	return false;
	}else{
	//im localstorage gibt es einen Username --> home screen muss geladen werden! (mit sync call!)
	return true;
	}
}

function openRundenuebersicht(spielID, positionInServerdata) {
	//alert("URL"+config.serverURL + "game/overview/" + spielID + "homescreenServerdata[positionInServerdata]:"+JSON.stringify(homescreenServerdata[positionInServerdata])+" position:"+positionInServerdata);
	
	//Schreibe Spieldaten in localstorage (für Fragescreen und enemy_username)
	localStorage.setItem("enemyUsername", getEnemyUsername(homescreenServerdata[positionInServerdata]) );
	localStorage.setItem("gameInfo", JSON.stringify(homescreenServerdata[positionInServerdata]) );
	
	//Markiere im localStorage, dass die Rundenübersichtdaten nicht neu geholt werden müssen
	localStorage.setItem("gameOverviewInitialize", true);
	
	//hole Serverdaten in localStroage & gehe in neuen Screen nur bei Erfolg! (aber wechsel in neuen Screen nicht in callback, sondern ausgelagert & durch event RundenuebersichtDataloaded initiiert, damit AJAX wiederverwendet werden kann.
	fetchRundenuebersichtData(spielID);		
}


function openNeuesSpielScreen() {
	var neuesSpielView = new steroids.views.WebView("html/neuesSpiel.html");
	steroids.layers.push(neuesSpielView);
}

function sync() {
	//alert("sync wurde aufgerufen!");
	
	if(initNotYetCalled){
	//falls init noch nicht aufgerufen wurde (z.b. aktualisieren button nicht angezeigt, weil Jqueryzu langsam geladen!) --> ausführen!
	init();
	}
	
	var credentialsAvailable = checkCredentials();
	//var test_uname = localStorage.getItem("username");
	//alert("credentialsAvailable: "+credentialsAvailable+" username: "+test_uname);
	

//zu testzwecken: setze username & password im local storage (normalerweise geschieht das im login!)
	//localStorage.setItem("username", "Kevin01");	//Kevin01
	//localStorage.setItem("password", "secret"); //secret

//Sync darf nur ausgeführt werden, wenn username vorhanden ist!)
	if(credentialsAvailable){
	//Setze Usernamen 
	$("#username_div").text(localStorage.getItem("username"));

	//lade Hauptmenüdaten vom Server & füge die entsprechenden HTML Elemente hinzu
	fetchServerData();
	}else{
		//kein username vorhanden --> gehe zum login screen
		//im localstorage gibt es keinen Username --> gehe zum Login Screen 
		var newView = new steroids.views.WebView("html/login.html");
		steroids.layers.push(newView);
	}
}

function fetchServerData() {
	//alert("fetchServerData aufgerufen");
	$.ajax( {
			url:config.serverURL + "user/sync",
			type:"POST",
			contentType:"text/plain",
			beforeSend:function(xhr){authHeader(xhr);},
			crossDomain:true,
			success:function(obj){handleServerData(obj);},
			error:function(obj){alert("Fehler beim holen der Hauptmenü-Spieldaten! "+JSON.stringify(obj));},
			data:"0123456789"
			}); 
	
	
	//zu testzwecken (Testdaten ohne Serveranbindung!)
var tmpServerData = 
		[
		//Pending Spiel 1, welches von Kevin02 als Duellanfrage vorliegt
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
       }, //Pending Spiel 2 , welches von Kevin02 als Duellanfrage vorliegt
	   {
           "spielID": 2,
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
       },
	   //Aktives Spiel, bei dem Kevin02 bereits die erste & zweite Runde gespielt hat 
	   {
           "spielID": 3,
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
           "aktuelleRunde": 2,
           "spielstatusName":
           {
               "name": "A"
           },
           "letzteAktivitaet": 1392739847000
       },
	    //Aktives Spiel gegen kevin02, bei dem Kevin01 die erste Runde bereits gespielt hat.
	   {
           "spielID": 4,
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
               "benutzername": "Kevin02"
           },
           "aktuelleRunde": 1,
           "spielstatusName":
           {
               "name": "A"
           },
           "letzteAktivitaet": 1392739847000
       }];
	  // handleServerData(tmpServerData);
}

function handleServerData(serverSyncData){
	//alert("handleServerData mit neues ServerDaten: "+JSON.stringify(serverSyncData));
	//WORKAROUND
	function checkIfDuelRequestShow(spielID){
		//alert("checkDuellRequestShow wurde aufgerufen mit: array:"+JSON.stringify(spielIDsArray));
		if($.inArray(spielID, spielIDsArray) != -1){
		//spielID in Array --> nicht anzeigen!
		return false;
		}else{
		return true;
		}
	}

	//alert("handleServerData wurde aufgerufen. Neue Serverdaten:"+JSON.stringify(serverSyncData));
	//schreibe sync Daten in localstorage
	homescreenServerdata = serverSyncData;
	
	//entferne aktuelle Buttons vom Screen (alle werden anhand der neuen Serverdaten neu hinzugefügt!)
	$("#ActionRequiredGames_div").empty();
	$("#WaitingForGames_div").empty();
	$("#OpenDuelRequests_list_container").empty();
	$("#HistoryGames_div").empty();
	
	for(var i=0;i<serverSyncData.length;i++){
		//alert(JSON.stringify(serverSyncData[i]));
		//Prüfe, ob Eintrag ein Spiel darstellt, bei dem der Nutzer dran ist: (aktiv & warten auf = benutzer)
		if(	serverSyncData[i].spielstatusName.name 		== "A" && 
			serverSyncData[i].wartenAuf.benutzername	== localStorage.getItem("username")
		){
		addActionRequiredGame(serverSyncData[i], i);
		}
		//Prüfe, ob Eintrag ein Spiel darstellt, bei dem auf den Gegner gewartet wird:
		else if (	serverSyncData[i].spielstatusName.name 		== "A" && 
					serverSyncData[i].wartenAuf.benutzername	!= localStorage.getItem("username")
		){
		addWaitingForGame(serverSyncData[i], i);
		}
		//Prüfe, ob Eintrag eine eigene offene Duellanfrage darstellt: (Status "pending")
		else if (	serverSyncData[i].spielstatusName.name 		== "P" && 
					serverSyncData[i].wartenAuf.benutzername	== localStorage.getItem("username")
		){
		//alert("Duellanfrage erkannt! SpielID: "+serverSyncData[i].spielID);
		//Prüfe, ob die Duellanfrage bereits angezeigt wurde! //WORKAROUND
			if(checkIfDuelRequestShow(serverSyncData[i].spielID)){
			
			//zeige Duellanfrage!
			showDuelRequest(serverSyncData[i],i);}
		}
		else if (	serverSyncData[i].spielstatusName.name 		== "P" && 
					serverSyncData[i].wartenAuf.benutzername	== getEnemyUsername(serverSyncData[i])
		//prüfe, ob der Eintrag eine Duellanfrage darstellt, die noch von einem Gegner beantwortet werden muss! 
		){
		addOpenDuelRequest(serverSyncData[i]);
		}else if( 	serverSyncData[i].spielstatusName.name 		== "Q" || 
					serverSyncData[i].spielstatusName.name 		== "C" 
			//Prüfe, ob Eintrag ein aufgegebenes (Q) oder beendetes Spiel (C) ist (aufgeber = waitingFor)
		){
		addHistoryGame(serverSyncData[i],i);
		}
	}
}

function addHistoryGame(gameData, positionInServerData){
	//alert("addHistoryGame aufgerufen mit status: "+gameData.spielstatusName.name+"positionInServerData (i): "+positionInServerData);
	var enemy_username = getEnemyUsername(gameData);
	//füge HTML ein:
	$("#HistoryGames_div").append("<button id='"+gameData.spielID+"' class='topcoat-button center full custom_icon_button_left textklein historyButton'>Vergangenes Spiel gegen "+enemy_username+"</button>"//+" - SpielID: "+gameData.spielID+" </a>" 
	);
	$("#"+gameData.spielID).hammer({}).on('tap',function(e){ 
	openRundenuebersicht(gameData.spielID, positionInServerData);
	});
}

function addOpenDuelRequest(gameData) {
var enemy_username = getEnemyUsername(gameData);
$("#OpenDuelRequests_list_container").append('<li class="topcoat-list__item custom_list_item">'+enemy_username+'</li>');
}

function addActionRequiredGame(gameData, positionInServerData){
	//alert("addActionRequiredGame wurde aufgerufen"+JSON.stringify(gameData));
	var enemy_username = getEnemyUsername(gameData);
	//füge HTML ein:
	$("#ActionRequiredGames_div").append("<button id='"+gameData.spielID+"' class='topcoat-button center full custom_icon_button_left textklein yourTurnButton' >Du bist an der Reihe gegen "+enemy_username+"</button>"//+" SpielID: "+gameData.spielID+" </a>" 
	);
	$("#"+gameData.spielID).hammer({}).on('tap',function(e){ 
	openRundenuebersicht(gameData.spielID, positionInServerData);
	});
}

function addWaitingForGame(gameData, positionInServerData){
	//alert("addWaitingForGame wurde aufgerufen"+JSON.stringify(gameData));
	var enemy_username = getEnemyUsername(gameData);
	$("#WaitingForGames_div").append("<button id='"+gameData.spielID+"' class='topcoat-button center full custom_icon_button_left textklein waitingForButton' >"+enemy_username+"</button>"//+" SpielID: "+gameData.spielID+" </a>"
	);
	$("#"+gameData.spielID).hammer({}).on('tap',function(e){ 
	openRundenuebersicht(gameData.spielID, positionInServerData);
	});
}

function getEnemyUsername(gameData){
	//alert("gameData in getEnemyUsername:"+JSON.stringify(gameData));
	if (gameData.spieler1.benutzername == localStorage.getItem("username")){
		//Spieler 1 = User --> Spieler2 = Gegner
		return gameData.spieler2.benutzername;
		} else { //Spieler 1 ist nicht der user --> Spieler 1 ist der Gegner!
		return gameData.spieler1.benutzername;
		}
}

function showDuelRequest(gameData, positionInServerData){
//alert("showDuelRequest wurde aufgerufen"+JSON.stringify(gameData));
//Füge SpielID der Duellanfrage in Array hinzu!
	spielIDsArray.push(gameData.spielID);
	//alert("navigator.notification geladen?"+navigator.notification);
	navigator.notification.confirm(      
	 gameData.spieler1.benutzername+" fordert dich zu einem Duell heraus!",//+"SpielID: "+gameData.spielID, // message    
     function(buttonIndex){
	 onConfirmDuelRequest(buttonIndex, gameData, positionInServerData);
	 },           	// callback to invoke with index of button pressed       
	 "Duellanfrage",           			// title      
	 ['Annehmen','Ablehnen']   			// buttonLabels    
	 );
	 
}

function onConfirmDuelRequest(buttonIndex, gameData, positionInServerData){
	//alert("gameData transferred"+JSON.stringify(gameData));

	switch (buttonIndex) {
		case 1: //Duell wurde angenommen!
		
		// bestätige Duellannahme bei Server		
		$.ajax( {
			url:config.serverURL + "game/answerInvite/"+gameData.spielID,
			type:"POST",
			contentType:"text/plain",
			beforeSend:function(xhr){authHeader(xhr);},
			crossDomain:true,
			success:function(obj){
			//alert("Duellannahme bei Server erfolgreich bestätigt!");
			//Zeige button für dieses Spiel im Homescreen
			addActionRequiredGame(gameData, positionInServerData);
			},
			error:function(obj){
			alert("Fehler bei Bestätigung der Duellannahme"+JSON.stringify(obj));
			},
			data:"true"
			}); 
			
			break;
		case 2: //Duellanfrage wurde abgelehnt!
		//bestätige Duellablehnung bei Server
		//alert("TODO: Duellablehnung bei Server bestätigt");		
		$.ajax( {
			url:config.serverURL + "game/answerInvite/"+gameData.spielID,
			type:"POST",
			contentType:"text/plain",
			beforeSend:function(xhr){authHeader(xhr);},
			crossDomain:true,
			success:function(obj){
			//alert("Duellablehnung bei Server erfolgreich bestätigt!");
			},
			error:function(obj){alert("Fehler bei Bestätigung der Duellablehnung"+JSON.stringify(obj));},
			data:"false"
			});
			break;
	}
}

function abmelden(){
// Alles zur Domain gehörige im localStorage löschen
// (also auch credentials)
localStorage.clear();

//zeige login screen (neuladen der seite --> username nicht gesetzt --> Login öffnet sich!
//window.location.reload();
	var newView = new steroids.views.WebView("html/login.html");
	steroids.layers.push(newView);

}

function openRundenuebersichtScreen(){
	var rundenuebersichtView = new steroids.views.WebView("html/rundenuebersicht.html");
		steroids.layers.push(rundenuebersichtView);
}

function onVisibilityChange() {
    //alert("document.visibilityState: " + document.visibilityState);
    //alert("onVisibilityChange aufgerufen mit document.hidden: " + document.hidden+" phoneGapLoaded: "+phoneGapLoaded);

	var docHidden = document.hidden;
	if(docHidden == false && phoneGapLoaded){
	//Wenn auf das Dokument zurückgekehrt wird, soll es aktualisiert werden
	//alert("onVisibilityChange wurde aufgerufen & sync wird aufgerufen!");
	sync();
	}else{
	//Wenn das Dokument verlassen wird, soll nichts getan werden!
	//alert("onVisibilityChange wurde aufgerufen, aber nichts wird getan!");
	}
 
}




//sobald die Rundenübersichtsdaten geladen sind, soll in den RundenuebersichtScreen navigiert werden!
document.addEventListener("RundenuebersichtDataloaded", openRundenuebersichtScreen, false);

//Eventhandler für das aktualisieren beim "zurückkehren" auf den homescreen durch pop/popAll 
document.addEventListener("visibilitychange", onVisibilityChange, false);

//sobald phonegap geladen ist, soll sync aufgerufen werden!
document.addEventListener("deviceready", onDeviceReady, false);










