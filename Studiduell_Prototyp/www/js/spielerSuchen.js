function init() {
	//alert("init in SpielerSuchen wurde aufgerufen!");
}

function spielerSuchen() {
	function onAlertDismissTextinputEmpty(){
	//leer lassen!
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
			error:function(obj){alert(JSON.stringify(obj));}
			});
		
			//Test (Testdaten ohne Serveranbindung!)
		//var tmpServerData = new Array("Anna10", "Anna2", "anna0003", "Anna001", "Anna1");
		//addResultToList(tmpServerData);  
	}
 }
 

 // //Sortierung
// function sortRight(arrayToSort){
// // Richtige Sortierung: Klein-/Großbuchstaben
// function stringComparison(a, b)	{
	// a = a.toLowerCase();
	// a = a.replace(/ä/g,"a");
	// a = a.replace(/ö/g,"o");
	// a = a.replace(/ü/g,"u");
	// a = a.replace(/ß/g,"s");

	// b = b.toLowerCase();
	// b = b.replace(/ä/g,"a");
	// b = b.replace(/ö/g,"o");
	// b = b.replace(/ü/g,"u");
	// b = b.replace(/ß/g,"s");

	// return(a==b)?0:(a>b)?1:-1;
// }
// arrayToSort.sort(stringComparison);
// // Richtige Sortierung: Buchstaben mit Zahlen
// var reA = /[^a-zA-Z]/g;
// var reN = /[^0-9]/g;
// function sortAlphaNum(a,b) {
    // var aA = a.replace(reA, "");
    // var bA = b.replace(reA, "");
    // if(aA === bA) {
        // var aN = parseInt(a.replace(reN, ""), 10);
        // var bN = parseInt(b.replace(reN, ""), 10);
        // return aN === bN ? 0 : aN > bN ? 1 : -1;
    // }
// }
// arrayToSort.sort(sortAlphaNum);
// }


 function addResultToList(obj){
	//alert("addResultToList(obj) wurde aufgerufen!");
	//sortRight(obj);
	if(obj.length == 0){
	navigator.notification.alert("Es wurden keine Ergebnisse gefunden.");
	}
	else {
	// Ergebnisliste befüllen
	for(var i=0;i<obj.length;i++){
	//Button zum befreunden ergänzen
	$("#ergebnislisteErweitern").append('<div class="row"><li class="topcoat-list__item custom_List_item leftColumn" ontouchend ="createNewGame(\''+obj[i]+'\')">'+obj[i]+'</li><button id="addFriendButton" class="topcoat-icon-button rightColumn" ontouchend="addAsFriend(\''+obj[i]+'\')"></button></div>');
	}
	
	// Zeige Ergebnisliste an
	$("#ergebnislisteDiv").css("visibility","visible");
	}
}


function createNewGame(gegnerName){
$.ajax( {
		url:serverURL + "game/create/with/" + gegnerName,
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