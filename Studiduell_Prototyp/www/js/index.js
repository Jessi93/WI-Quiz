function openHomeScreen() {
	var homeScreenView = new steroids.views.WebView("html/home.html");
	steroids.layers.push(homeScreenView);
	//steroids.layers.pop(); //nicht verwenden, da nicht zuverlässig
}