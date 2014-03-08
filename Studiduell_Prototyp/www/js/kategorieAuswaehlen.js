init();

function init() {
	loadCategoriesFromServer();
}

var tmpServerData;

function setKategorien(obj) {
	 $("#kategorie1").text(obj[0].categoryName);
	 $("#kategorie2").text(obj[1].categoryName);
	 $("#kategorie3").text(obj[2].categoryName);
	
	tmpServerData = obj;
}

function loadCategoriesFromServer() {
	$.ajax( {
		url:serverURL + "game/randomCategoriesFor/123",
		type:"POST",
		success:function(obj){setKategorien(obj);},
		error:function(obj){alert(JSON.stringify(obj));}
	});
}


function kategorieAuswaehlen(kategorie) {
	//FÜR GUI Anzeige der KATEGORIE IM NÄCHSTEN SCREEN
	localStorage.setItem("selectedCategory", $(kategorie).text());
	
	//speichere fragen für spätere anzeige
	var tmpArrayNr;
	switch($(kategorie).attr("id")) {
	case "kategorie1":
		tmpArrayNr = 0;
		break;
	case "kategorie2":
		tmpArrayNr = 1;
		break;
	case "kategorie3":
		tmpArrayNr = 2;
		break;
	}
	
	if(isEmpty(tmpServerData) ==false){
	localStorage.setItem("questions", JSON.stringify(tmpServerData[tmpArrayNr].questions));
	}

	
	//questionCounter wird auf 0 gesetzt (erste Frage der Runde wird angezeigt)
	localStorage.setItem("questionCounter", 0 );
	
	
	//öffne screen ausgewählte kategrie & und schließe aktuellen screen
	popViewPushView("html/ausgewaehlteKategorie.html");
	
}
