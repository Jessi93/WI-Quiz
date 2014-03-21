function init() {
	var tmpGameInfo = JSON.parse(localStorage.getItem("gameInfo"));
	var round = tmpGameInfo.aktuelleRunde;
	var opponent = (tmpGameInfo.spieler1.benutzername == tmpGameInfo.wartenAuf.benutzername) ? tmpGameInfo.spieler2.benutzername : tmpGameInfo.spieler1.benutzername; // in this screen, it is my turn!
	var category = localStorage.getItem("selectedCategory");
	$("#spielBeschreibung").text("Runde " + round + " gegen " + opponent);
	$("#ausgewaehlteKategorie").text("Kategorie: " + category);
	$("#startRoundButton").on('tap',function(e,data){ starteSpiel() });
	
}
function starteSpiel() {
	popViewPushView("html/frage.html");
}

document.addEventListener("deviceready", init, false);