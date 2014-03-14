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


function loadCategoriesFromServer() {
	$.ajax( {
		url:"http://192.168.0.108:8090/Studiduell/game/randomCategoriesFor/123",
		type:"POST",
		success:function(obj){setKategorien(obj);},
		error:function(obj){alert(JSON.stringify(obj));}
	});
}

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
