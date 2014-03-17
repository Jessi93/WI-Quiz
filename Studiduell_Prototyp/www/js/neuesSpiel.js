function init() {
	loadFriendslistFromServer();
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
		error:function(obj){alert(JSON.stringify(obj));}
		}); 
	
	//Test (Testdaten ohne Serveranbindung!)
	//var tmpServerData = new Array("Anita", "Bettina", "Christa", "Doris");
	//addFriendToList(tmpServerData); 
}

// Füge dem HTML Dokument für jeden Freund des Users in der Freundesliste einen Eintrag hinzu.
function addFriendToList(obj){
	//alert("addFriendToList wurde aufgerufen!");
	//Freundesliste befüllen
	for(var i=0;i<obj.length;i++){
	$("#freundeslisteErweitern").append('<li class="topcoat-list__item custom_List_item" ontouchend="createNewGameFriendlist(\''+obj[i]+'\')">'+obj[i]+'</li>');
	}
}


function createNewGameFriendlist(friendName){
	function onAlertDismissCreateNewGameFriendlist(){
	}
	$.ajax( {
		url:serverURL + "game/create/with/" + friendName,
		type:"POST",
		beforeSend:function(xhr){authHeader(xhr);},
		crossDomain:true,
		success:function(){steroids.layers.popAll();},
		error:function(obj){
			if(obj.status == 409){
				//409 = "Conflict" = Freundesanfrage fehlgeschlagen, weil Freundschaft bereits herrscht!
				navigator.notification.alert("Du spielst bereits gegen "+friendName+"!", onAlertDismissCreateNewGameFriendlist,'Information','OK');
				}else{
				navigator.notification.alert("Fehler beim Absenden der Duellanfrage!"+JSON.stringify(obj), onAlertDismissCreateNewGameFriendlist,'Information','OK');
				}
			}
		});
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
}

document.addEventListener("deviceready", init, false);