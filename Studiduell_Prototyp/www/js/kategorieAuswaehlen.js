var data;

function init() {
	data = JSON.parse(localStorage.getItem("gameQuestionStart"));
	//alert("data in init von kategorie auswählen: "+JSON.stringify(data));
	fillScreen();
}

function fillScreen() {
	setKategorien(data[0].categoryName,
					data[1].categoryName,
					data[2].categoryName);
}

//Nicht mehr benutzt!
// function loadCategoriesFromServer(gameID) {
	// $.ajax( {
		// url:serverURL +"game/randomCategoriesFor/"+gameID,
		// type:"POST",
		// beforeSend:function(xhr){authHeader(xhr);},
		// crossDomain:true,
		// success:function(obj){alert("Kategorien Laden Ajax erfolgreich!"+JSON.stringify(obj));
			// setKategorien(obj);
			// },
		// error:function(obj){alert("Fehler beim Laden der Kategorien!"+JSON.stringify(obj));}
	// });
// }

function setKategorien(cat1, cat2, cat3) {
	 $("#kategorie1").text(cat1);
	 $("#kategorie2").text(cat2);
	 $("#kategorie3").text(cat3);
}

function kategorieAuswaehlen(kategorie) {
	var category = $(kategorie).text();
	
	var questions;
	
	//Speichere Fragen für spätere Anzeige
	for(var i = 0; i < data.length; i++) {
		if(data[i].categoryName == category) {
			questions = data[i].questions;
		}
	}
	
	localStorage.setItem("questions", JSON.stringify(questions));
	localStorage.setItem("selectedCategory", category);
	//questionCounter wird auf 0 gesetzt (erste Frage der Runde wird angezeigt)
	localStorage.setItem("questionCounter", 0 );
	
	//öffne screen ausgewählte kategrie & und schließe aktuellen screen
	popViewPushView("html/ausgewaehlteKategorie.html");
}

document.addEventListener("deviceready", init, false);
