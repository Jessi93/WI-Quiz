checkCredentials();
//openRundenuebersicht();

var homescreenServerdata;

function checkCredentials() {
	//alert("checkCredentials wurde aufgerufen!");
	//zu testzwecken: setze localstorage username & pw auf leer! --> zeige login screen immer an!
	localStorage.removeItem("username");
	//zu testzwecken: setze username --> gehe direkt in den home screen!
	//localStorage.setItem("username", "Kevin01");
	//localStorage.setItem("password", "secret");
	
	if(isEmpty(localStorage.getItem("username"))) {
	//im localstorage gibt es keinen Username --> gehe zum Login Screen 
	var newView = new steroids.views.WebView("html/login.html");
	steroids.layers.push(newView);
	
	}else{
	//im localstorage gibt es einen Username --> home screen muss geladen werden! (mit sync call!)
	}
}

function openRundenuebersicht(spielID, positionInServerdata) {
	//alert("URL"+serverURL + "game/overview/" + spielID + "homescreenServerdata[positionInServerdata]:"+JSON.stringify(homescreenServerdata[positionInServerdata])+" position:"+positionInServerdata);
	
	//Schreibe Spieldaten in localstorage (für Fragescreen und enemy_username)
	localStorage.setItem("enemyUsername", getEnemyUsername(homescreenServerdata[positionInServerdata]) );
	localStorage.setItem("gameInfo", homescreenServerdata[positionInServerdata] );
	//hole Serverdaten für die Rundenübersicht und schreibe sie in den LocalStorage -> wird dann in der Rundenübersicht in variable geschrieben
	$.ajax( {
		url:serverURL + "game/overview/" + spielID,
		type:"GET",
		beforeSend:function(xhr){authHeader(xhr);},
		crossDomain:true,
		success:function(obj){localStorage.setItem("gameOverview", JSON.stringify(obj));
		alert("Rundenübersichtsdaten wurden in localstorage geschrieben:"+localStorage.getItem("gameOverview"));
		var rundenuebersichtView = new steroids.views.WebView("html/rundenuebersicht.html");
		steroids.layers.push(rundenuebersichtView);
		},
		error:function(obj){alert("Fehler beim holen der Rundenübersichtsdaten! Evtl SpielID nicht vorhanden!"+JSON.stringify(obj));}
		});
		
}

function openNeuesSpielScreen() {
	var neuesSpielView = new steroids.views.WebView("html/neuesSpiel.html");
	steroids.layers.push(neuesSpielView);
}

function sync() {

	var credentialsAvailable;
	if(isEmpty(localStorage.getItem("username"))) {
	//im localstorage gibt es keinen Username 
	credentialsAvailable = false;
	}else{
	//im localstorage gibt es einen Username 
	credentialsAvailable = true;
	}
	

//zu testzwecken: setze username & password im local storage (normalerweise geschieht das im login!)
	localStorage.setItem("username", "Kevin01");
	localStorage.setItem("password", "secret");

//Sync darf nur ausgeführt wrden, wenn nicht direkt zum Login screen weitergeleitet wird (username vorhanden ist!)
	if(credentialsAvailable){
	//Setze Usernamen
	$("#username_div").text(localStorage.getItem("username"));

	//lade Hauptmenüdaten vom Server & füge die entsprechenden HTML Elemente hinzu
	fetchServerData();
	}
}

function fetchServerData() {
	//alert("fetchServerData aufgerufen");
	$.ajax( {
			url:serverURL + "user/sync",
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
	//alert("handleServerData wurde aufgerufen"+JSON.stringify(serverSyncData));
	//schreibe sync Daten in localstorage
	homescreenServerdata = serverSyncData;
	
	//entferne aktuelle Buttons vom Screen (alle werden anhand der neuen Serverdaten neu hinzugefügt!)
	$("#ActionRequiredGames_div").empty();
	$("#WaitingForGames_div").empty();
	
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
		//Prüfe, ob Eintrag eine offene Duellanfrage darstellt: (Status "pending")
		else if (	serverSyncData[i].spielstatusName.name 		== "P" && 
					serverSyncData[i].wartenAuf.benutzername	== localStorage.getItem("username")
		){
		showDuelRequest(serverSyncData[i],i);
		}
	}

}

function addActionRequiredGame(gameData, positionInServerData){
	//alert("addActionRequiredGame wurde aufgerufen"+JSON.stringify(gameData));
	var enemy_username = getEnemyUsername(gameData);
	//füge HTML ein:
	$("#ActionRequiredGames_div").append("<div class='content-padded'><button class='topcoat-button--large center full custom_icon_button_left Rand2 textklein yourTurnButton' ontouchend ='openRundenuebersicht("+gameData.spielID+","+positionInServerData+")' >Du bist an der Reihe gegen "+enemy_username+" SpielID: "+gameData.spielID+" </a></div>" 
	);
}

function addWaitingForGame(gameData, positionInServerData){
	//alert("addWaitingForGame wurde aufgerufen"+JSON.stringify(gameData));
	var enemy_username = getEnemyUsername(gameData);
	//füge HTML ein:
	$("#WaitingForGames_div").append("<div class='content-padded'><button class='topcoat-button--large--quiet center full custom_icon_button_left Rand1 textklein yourTurnButton' ontouchend='openRundenuebersicht("+gameData.spielID+")' >"+enemy_username+" SpielID: "+gameData.spielID+" </a></div>");

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
		//Zeige button für dieses Spiel im Homescreen
		addActionRequiredGame(gameData, positionInServerData);
		// bestätige Duellannahme bei Server
		//alert("TODO: Duellannahme bei Server bestätigt");
				
		$.ajax( {
			url:serverURL + "game/answerInvite/"+gameData.spielID,
			type:"POST",
			contentType:"text/plain",
			beforeSend:function(xhr){authHeader(xhr);},
			crossDomain:true,
			success:function(obj){alert("Duellannahme bei Server erfolgreich bestätigt!");},
			error:function(obj){alert("Fehler bei Bestätigung der Duellannahme"+JSON.stringify(obj));},
			data:"true"
			}); 
			
			break;
		case 2: //Duellanfrage wurde abgelehnt!
		//bestätige Duellablehnung bei Server
		//alert("TODO: Duellablehnung bei Server bestätigt");		
		$.ajax( {
			url:serverURL + "game/answerInvite/"+gameData.spielID,
			type:"POST",
			contentType:"text/plain",
			beforeSend:function(xhr){authHeader(xhr);},
			crossDomain:true,
			success:function(obj){alert("Duellablehnung bei Server erfolgreich bestätigt!");},
			error:function(obj){alert("Fehler bei Bestätigung der Duellablehnung"+JSON.stringify(obj));},
			data:"false"
			});
			break;
	}
}

function abmelden(){
//lösche credentials in localstorage
localStorage.removeItem("username");
localStorage.removeItem("password");
//zeige login screen (neuladen der seite --> username nicht gesetzt --> Login öffnet sich!
window.location.reload();

}


//sobald das Dokument rdy ist, sollen die Serverdaten geladen & das Dokument mit den Datenbefüllt werden
document.addEventListener("deviceready", sync, false);