function init() {
	$("#ausgewaehlteKategorie").text("Kategorie: " + localStorage.getItem("selectedCategory"));
}
function starteSpiel() {
	popViewPushView("html/frage.html");
}

document.addEventListener("deviceready", init, false);