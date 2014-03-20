function init() {
registerEnterButtonEventHandler();
	//alert("init in SpielerSuchen wurde aufgerufen!");
}

function registerEnterButtonEventHandler() {
	$( "#search_username_input" ).on( "keydown", function( event ) {
	if(event.which == 13){
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
			url:serverURL + "user/search/" + text_input,
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
	//Button zum befreunden ergänzen
	$("#ergebnislisteErweitern").append('<div class="row"><li class="topcoat-list__item custom_List_item leftColumn" ontouchend ="createNewGameWithOpponent(\''+obj[i]+'\')">'+obj[i]+'</li><button id="addFriendButton" class="topcoat-icon-button rightColumn" ontouchend="addAsFriend(\''+obj[i]+'\')"></button></div>');
	}
	
	// Zeige Ergebnisliste an
	$("#ergebnislisteDiv").css("visibility","visible");
	}
}

document.addEventListener("deviceready", init, false);
	