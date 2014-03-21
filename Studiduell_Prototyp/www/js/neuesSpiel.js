function init() {
	loadFriendslistFromServer();
	$("#spielerSuchenButton").on('tap',function(e,data){ spielerSuchenSeite()});
	
	//disable SpielerButton as the Backend is not ready for this requirement
	$("#beliebigerSpielerButton").attr("disabled", ""); 
	//$("#beliebigerSpielerButton").on('tap',function(e,data){ createNewGameRandom()});
}

function spielerSuchenSeite() {
	var newView = new steroids.views.WebView("html/spielerSuchen.html");
		steroids.layers.push(newView);
}

function loadFriendslistFromServer() {
	//alert("loadFriendslistFromServer wurde aufgerufen!");
	//Hole die Freundesliste des Users vom Server
	$.ajax( {
		url:serverURL + "settings/friends",
		type:"GET",
		beforeSend:function(xhr){authHeader(xhr);},
		crossDomain:true,
		success:function(obj){addFriendToList(obj);},
		error:function(obj){
		//WORKAROUND //TODO wird u.A. beim "popAll" in spielerSuchen aufgerufen! --> Fehler bei Status 0 nicht anzeigen!
			if(obj.status == 0){
			//Tue nichts (zeige Fehler nicht an!)
			}else{
			alert("Fehler beim Laden der Freundesliste: "+JSON.stringify(obj));
			}
		}
		}); 
	
	//Test (Testdaten ohne Serveranbindung!)
	//var tmpServerData = new Array("Anita", "Bettina", "Christa", "Doris");
	//addFriendToList(tmpServerData); 
}

// Füge dem HTML Dokument für jeden Freund des Users in der Freundesliste einen Eintrag hinzu.
function addFriendToList(obj){
	//alert("addFriendToList wurde aufgerufen!");
	$("#freundeslisteErweitern").empty();
	//Freundesliste befüllen
	var opponentName;
	for(var i=0;i<obj.length;i++){
	opponentName = obj[i];
	$("#freundeslisteErweitern").append('<li id="'+opponentName+'" class="topcoat-list__item custom_List_item" >'+opponentName+'</li>');
	addHandlerToListEntry(opponentName);
	}
	
	function addHandlerToListEntry(enemyName){
		$("#"+enemyName).on('tap',function(e,data){ 
		createNewGameWithOpponent(enemyName);
		});
	}
}

function createNewGameRandom() {
	// Schicke Anfrage an Server
	$.ajax( {
		url:serverURL + "game/create/random",
		type:"POST",
		beforeSend:function(xhr){authHeader(xhr);},
		crossDomain:true,
		success:function(){steroids.layers.popAll();},
		error:function(obj){
		alert("Fehler beim erstellen eines zufälliges Spieles: "+JSON.stringify(obj));}
		});
}

function onVisibilityChange() {
    //alert("document.visibilityState: " + document.visibilityState);
    //alert("document.hidden: " + document.hidden);

	var docHidden = document.hidden;
	if(docHidden == false){
	//Nur wenn auf das Dokument zurückgekehrt wird, soll es aktualisiert werden
	init();
	}else{
	//Wenn das Dokument verlassen wird, soll nichts getan werden!
	}
 
}

document.addEventListener("deviceready", init, false);

document.addEventListener("visibilitychange", onVisibilityChange, false);