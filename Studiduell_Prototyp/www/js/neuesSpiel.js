function init() {
	loadFriendslistFromServer();
}

function spielerSuchenSeite() {
	var newView = new steroids.views.WebView("html/spielerSuchen.html");
		steroids.layers.push(newView);
}

function loadFriendslistFromServer() {
		alert("loadFriendslistFromServer wurde aufgerufen!");
		//Hole die Freundesliste des Users vom Server
 		$.ajax( {
		url:serverURL + "settings/friends",
		type:"GET",
		beforeSend:function(xhr){authHeader(xhr);},
		crossDomain:true,
		success:function(obj){addFriendToList(obj);},
		error:function(obj){alert(JSON.stringify(obj));}
	}); 
	
	//Test (Testdaten ohne Serveranbindung!)
	//var tmpServerData = new Array("Anita", "Bettina", "Christa", "Doris");
	//addFriendToList(tmpServerData); 
}

// Füge dem HTML Dokument für jeden user in der Freundesliste einen Eintrag "Freund" hinzu.
function addFriendToList(obj){
	alert("addFriendToList wurde aufgerufen!");
	//Freundesliste befüllen
	for(var i=0;i<obj.length;i++){
	$("#freundeslisteErweitern").append("<li class='topcoat-list__item custom_List_item' ontouchend='createNewGameFriendlist(\''+obj[i]+'\')'>"+obj[i]+"</li>");
	}
}


function createNewGameFriendlist(friendName){
$.ajax( {
		url:serverURL + "game/create/with/" + friendName,
		type:"POST",
		beforeSend:function(xhr){authHeader(xhr);},
		crossDomain:true,
		success:function(){steroids.layers.popAll();},
		error:function(obj){alert(JSON.stringify(obj));}
		});
	
		
		//Test
		//steroids.layers.popAll();
		
}

function createNewGameRandom() {
	// Schicke Anfrage an Server
	$.ajax( {
		url:serverURL + "game/create/random",
		type:"POST",
		beforeSend:function(xhr){authHeader(xhr);},
		crossDomain:true,
		success:function(){steroids.layers.popAll();},
		error:function(obj){alert(JSON.stringify(obj));}
		});
	
		
		//Test
		//steroids.layers.popAll();
}

document.addEventListener("deviceready", init, false);