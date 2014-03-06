function init() {
	$("#ausgewaehlteKategorie").text("Kategorie: " + localStorage.getItem("selectedCategory"));
}
function starteSpiel() {
	var newView = new steroids.views.WebView("html/frage.html");
	steroids.layers.push(newView);
}

document.addEventListener("deviceready", init, false);