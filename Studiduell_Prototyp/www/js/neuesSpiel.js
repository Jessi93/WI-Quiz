init();

function init() {
	loadFriendslistFromServer();
}

function spielerSuchenSeite() {
	var SpielerSuchenView = new steroids.views.WebView("html/spielerSuchen.html");
	steroids.layers.push(SpielerSuchenView);
}

function loadFriendslistFromServer() {
/* 	1. hole die Freundesliste des Users vom Server
		2. füge dem html Dokument für jeden user in der Freundesliste einen Eintrag "Freund" hinzu.
	*/
/* 		$.ajax( {
		url:serverURL + "Studiduell/settings/friends",
		type:"GET",
		success:function(obj){addFriendToScreen(obj);},
		error:function(obj){alert(JSON.stringify(obj));}
	}); */
	
	//Test (Testdaten ohne Serveranbindung!)
	var tmpServerData = new Array("Anita", "Bettina", "Christa", "Doris");
	addFriendToList(tmpServerData); 
}

function addFriendToList(obj){
	//Freundesliste befüllen
	for(var i=0;i<obj.length;i++){
	$("#freundeslisteErweitern").append("<li class='topcoat-list__item custom_List_item' onclick='createNewGameFriendlist(this)'>"+obj[i]+"</li>");
	}
}


function createNewGameFriendlist(friendName){
/*$.ajax( {
		url:serverURL + "game/create/with/" + friendName,
		type:"POST",
		success:function(){openHomeView();},
		error:function(obj){alert(JSON.stringify(obj));}
		});
		
		//Test
		*/openHomeView();
		
}

function createNewGameRandom() {
/* Server überprüft, ob ein passendes Spiel bereits offen ist 
--> füge Spieler hinzu 
--> beim laden des homescreens wird das Spiel angezeigt! 

Wenn kein passendes Spiel vorhanden ist, starte ein neues Spiel gegen "Unbekannt"
--> beim laden des homescreens wird das Spiel angezeigt!*/

	// Schicke Anfrage an Server
/*	$.ajax( {
		url:serverURL + "Studiduell/game/create/random",
		type:"POST",
		success:function(){openHomeView();},
		error:function(obj){alert(JSON.stringify(obj));}
		});
		
		//Test
		*/openHomeView();
}


function openHomeView(){
var homeScreenView = new steroids.views.WebView("html/home.html");
	steroids.layers.push(homeScreenView);
}

//document.addEventListener("deviceready", init, false);