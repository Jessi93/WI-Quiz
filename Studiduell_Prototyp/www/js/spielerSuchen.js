function init() {
registerEnterButtonEventHandler();
	//alert("init in SpielerSuchen wurde aufgerufen!");
$("#addImage").hammer({}).on('tap',function(e){ spielerSuchen()});
$(document).hammer({}).on('swiperight',function(e){ steroids.layers.pop()	});
}

function registerEnterButtonEventHandler() {
	$( "#search_username_input" ).on( "keydown", function( event ) {
	if(event.which == config.keyEnter){
	spielerSuchen();}
	});
}
function spielerSuchen() {
	function onAlertDismissTextinputEmpty(){
	//leer lassen!
	}
	function onAlertDismissSearch(){
	}
	 var text_input = $("#search_username_input").val();
	 
	 //Prüfe, ob Textinput leer ist --> Aufforderung zur eingabe von Suchebegriff
	 if(isEmpty(text_input)){
	 navigator.notification.alert('Bitte gib einen Suchbegriff ein.' , onAlertDismissTextinputEmpty,'Information','OK');
	 }else{
		//Alle Listeelemente löschen
		$("#ergebnislisteErweitern").empty();
		
		//Daten vom Server holen
		$.ajax( {
			url:config.serverURL + "user/search/" + text_input,
			type:"GET",
			beforeSend:function(xhr){authHeader(xhr);},
			crossDomain:true,
			success:function(obj){addResultToList(obj);},
			error:function(obj){navigator.notification.alert("Fehler beim Suchen!"+JSON.stringify(obj), onAlertDismissSearch,'Information','OK');}
			});
		
			//Test (Testdaten ohne Serveranbindung!)
		//var tmpServerData = new Array("Anna10", "Anna2", "anna0003", "Anna001", "Anna1");
		//addResultToList(tmpServerData);  
	}
 }
 
 function addResultToList(obj){
	//alert("addResultToList(obj) wurde aufgerufen!");
	if(obj.length == 0){
	$("#ergebnislisteDiv").css("visibility","visible");
	navigator.notification.alert("Es wurden keine Ergebnisse gefunden.");
	}
	else {
	// Ergebnisliste befüllen
	for(var i=0;i<obj.length;i++){
	$("#ergebnislisteErweitern").append('<div class="row"><li id='+obj[i]+' class="topcoat-list__item custom_List_item leftColumn" >'+obj[i]+'</li><button id="addFriendButton'+obj[i]+'" class="topcoat-icon-button--large--quiet rightColumn picture"></button></div>');
	addHandlersToListEntry(obj[i]);
	}
	
	function addHandlersToListEntry(enemyName){
		//alert("addHandlersToListEntry aufgerufen mit name:"+enemyName);
		//Neues Spiel Handler
		$("#"+enemyName).hammer({}).on('tap',function(e){ 
		createNewGameWithOpponent(enemyName);
		});
		//Als Freund hinzufügen handler
		$("#addFriendButton"+enemyName).hammer({}).on('tap',function(e){ 
		addAsFriend(enemyName);
		});
	}
	
	// Zeige Ergebnisliste an
	$("#ergebnislisteDiv").css("visibility","visible");
	}
}

document.addEventListener("deviceready", init, false);
	