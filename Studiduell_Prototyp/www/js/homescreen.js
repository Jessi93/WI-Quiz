function openRundenuebersicht(spielID) {
	//TODO PHIL:
	//hole daten für rundenübersicht für Spiel ID vom Server 
	//schreibe Rundenüberischtsdaten in localstorage, damit "rundenübersicht" screen die richtigen Daten anzeigen kann
	var rundenuebersichtView = new steroids.views.WebView("html/rundenuebersicht.html");
	steroids.layers.push(rundenuebersichtView);
	
	
}

function openNeuesSpielScreen() {
	var neuesSpielView = new steroids.views.WebView("html/neuesSpiel.html");
	steroids.layers.push(neuesSpielView);
}

function sync() {
//alert("sync wurde aufgerufen");

//zu testzwecken: setze username & password im local storage (normalerweise geschieht das im login!)
//localStorage.setItem("username", "Kevin01");
//localStorage.setItem("password", "secret");

//Setze Usernamen
$("#username_div").text(localStorage.getItem("username"));

//lade Hauptmenüdaten vom Server & fügre die entsprechenden HTML Elemente hinzu
fetchServerData();
}

function fetchServerData() {
	//alert("fetchServerData aufgerufen");
	
	var v_username = localStorage.getItem("username");
	var v_password = localStorage.getItem("password");
	
	/*
	$.ajax( {
			url:serverURL + "user/sync",
			type:"POST",
			success:function(obj){handleServerData(obj);},
			error:function(obj){alert(JSON.stringify(obj));},
			username:v_username,
			passwort:v_password,
			data:"0123456789"
			}); 
	*/
	
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
	   handleServerData(tmpServerData);
}

function handleServerData(serverSyncData){
	//alert("handleServerData wurde aufgerufen"+JSON.stringify(serverSyncData));
	
	for(var i=0;i<serverSyncData.length;i++){
		//alert(JSON.stringify(serverSyncData[i]));
		//Prüfe, ob Eintrag ein Spiel darstellt, bei dem der Nutzer dran ist: (aktiv & warten auf = benutzer)
		if(	serverSyncData[i].spielstatusName.name 		== "A" && 
			serverSyncData[i].wartenAuf.benutzername	== localStorage.getItem("username")
		){
		addActionRequirendGame(serverSyncData[i]);
		}
		//Prüfe, ob Eintrag ein Spiel darstellt, bei dem auf den Gegner gewartet wird:
		else if (	serverSyncData[i].spielstatusName.name 		== "A" && 
					serverSyncData[i].wartenAuf.benutzername	!= localStorage.getItem("username")
		){
		addWaitingForGame(serverSyncData[i]);
		}
		//Prüfe, ob Eintrag eine offene Duellanfrage darstellt: (Status "pending")
		else if (	serverSyncData[i].spielstatusName.name 		== "P" && 
					serverSyncData[i].wartenAuf.benutzername	== localStorage.getItem("username")
		){
		showDuelRequest(serverSyncData[i]);
		}
	}

}


function addActionRequirendGame(gameData){
	//alert("addActionRequirendGame wurde aufgerufen"+JSON.stringify(gameData));
	var enemy_username = getEnemyUsername(gameData);
	//füge HTML ein:
	$("#ActionRequiredGames_div").append("<div class='content-padded'><button class='topcoat-button--large center full custom_icon_button_left Rand2 textklein yourTurnButton' ontouchend ='openRundenuebersicht("+gameData.spielID+")' >Du bist an der Reihe gegen "+enemy_username+" SpielID: "+gameData.spielID+"</a></div>"
	);
}

function addWaitingForGame(gameData){
	//alert("addWaitingForGame wurde aufgerufen"+JSON.stringify(gameData));
	var enemy_username = getEnemyUsername(gameData);
	//füge HTML ein:
	$("#WaitingForGames_div").append("<div class='content-padded'><button class='topcoat-button--large--quiet center full custom_icon_button_left Rand1 textklein yourTurnButton' ontouchend='openRundenuebersicht("+gameData.spielID+")' >"+enemy_username+" SpielID: "+gameData.spielID+" </a></div>");

}

function getEnemyUsername(gameData){
	if (gameData.spieler1.benutzername == localStorage.getItem("username")){
		//Spieler 1 = User --> Spieler2 = Gegner
		return gameData.spieler2.benutzername;
		} else { //Spieler 1 ist nicht der user --> Spieler 1 ist der Gegner!
		return gameData.spieler1.benutzername;
		}
}

function showDuelRequest(gameData){
//alert("showDuelRequest wurde aufgerufen"+JSON.stringify(gameData));

	navigator.notification.confirm(      
	 gameData.spieler1.benutzername+" fordert dich zu einem Duell heraus!",//+"SpielID: "+gameData.spielID, // message    
     function(buttonIndex){
	 onConfirmDuelRequest(buttonIndex, gameData);
	 },           	// callback to invoke with index of button pressed       
	 "Duellanfrage",           			// title      
	 ['Annehmen','Ablehnen']   			// buttonLabels    
	 );
	 
}

function onConfirmDuelRequest(buttonIndex, gameData){
	//alert("gameData transferred"+JSON.stringify(gameData));

	var v_username = localStorage.getItem("username");
	var v_password = localStorage.getItem("password");
	
	switch (buttonIndex) {
		case 1: //Duell wurde angenommen!
		//Zeige button für dieses Spiel im Homescreen
		addActionRequirendGame(gameData);
		// bestätige Duellannahme bei Server
		//alert("TODO: Duellannahme bei Server bestätigt");
				
		$.ajax( {
			url:serverURL + "game/answerInvite/"+gameData.spielID,
			type:"POST",
			success:function(obj){alert("Duellannahme bei Server erfolgreich bestätigt!");},
			error:function(obj){alert("Fehler bei Bestätigung der Duellannahme"+JSON.stringify(obj));},
			username:v_username,
			passwort:v_password,
			data:"true"
			}); 
			
			break;
		case 2: //Duellanfrage wurde abgelehnt!
		//bestätige Duellablehnung bei Server
		//alert("TODO: Duellablehnung bei Server bestätigt");		
		$.ajax( {
			url:serverURL + "game/answerInvite/"+gameData.spielID,
			type:"POST",
			success:function(obj){alert("Duellablehnung bei Server erfolgreich bestätigt!");},
			error:function(obj){alert("Fehler bei Bestätigung der Duellablehnung"+JSON.stringify(obj));},
			username:v_username,
			passwort:v_password,
			data:"false"
			});
			break;
	}
}
//sobald das Dokument rdy ist, sollen die Serverdaten geladen & das Dokument mit den Datenbefüllt werden
document.addEventListener("deviceready", sync, false);