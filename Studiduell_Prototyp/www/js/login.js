checkCredentials();

var gv_username;
var gv_password;

function sendLoginDataToServer() {
	//Prüfe, dass notification steroids plugin geladen wurde!
	if(navigator.notification==="undefined"){
	alert("Script navigator.notification wurde nicht geladen!");
	}
	
	
	//alert("sendLoginDataToServer wurde aufgerufen!");
	//prüfe, ob username/password kombination OK ist!
	
	var v_username = $("#username_input").val();
	var v_password = $("#password_input").val();
	

	
	//Prüfe, ob mind username oder passwort nicht befüllt wurden
	if (isEmpty(v_username) || isEmpty(v_password) ){
	gv_username = v_username;
	gv_password = v_password;
		//Roten Rand entfernen, wenn Feld befüllt!
		if(isEmpty(v_username)==false){ $("#username_input").removeClass("invalidCustom");
		}
		if(isEmpty(v_password)==false){ $("#password_input").removeClass("invalidCustom");
		}
	
	navigator.notification.alert('Bitte gib deinen Usernamen und dein Passwort an, damit du dich anmelden kannst!', // message  
		alertDismissed, 		//v_username, v_password sollten hier übergeben werden, aber nicht möglich --> nutzung globaler variablen: gv_username & gv_password
		'Fehlende Eingabe!',    // title   
		'Ok'                  	// buttonName
		);
	
	}else{
	//Username und passwort sind beide gesetzt worden --> Serveranfrage starten!
	alert("Login-AJAX-Call gestartet!");
	$.ajax( {
			url:serverURL + "user/login",
			type:"POST",
			success:function(obj){openHomeScreen();},
			error:function(obj){handleErrorLogin(obj);}, 
			username:v_username,
			passwort:v_password
			}); 
	}
			
}

function alertDismissed() {
	alert("alertDismissed aufgerufen! gv_username= "+gv_username+"gv_password= "+gv_password);
	//Zeige an, welche Eingabe fehlt! (roter Rand)
	  if (isEmpty(gv_username)) {
	  alert("username wird rot! gv_username= "+gv_username+"gv_password= "+gv_password);
	    
	  $("#username_input").addClass("invalidCustom");
	  }
	  if (isEmpty(gv_password)) {
	  $("#password_input").addClass("invalidCustom");
	  }
}


function handleErrorLogin(returnedObject) {
	//alert("handleErrorLogin wurde aufgerufen!"+returnedObject);
	if(returnedObject==="false"){
	alert("Die Kombination aus Username und Passwort ist nicht korrekt, bitte versuche es erneut.");
	}else{
	alert(unescape("%22Fehler bei %DCberpr%FCfung der Login Daten %28Keine Verbindung zum Server%3F%29 %22"));//DEBUG +returnedObject);
	}
}

function openRegisterScreen() {
	//alert("openRegisterScreen wurde aufgerufen!");
	var newView = new steroids.views.WebView("html/register.html");
	steroids.layers.push(newView);
}

function openHomeScreen() {
	//alert("openHomeScreen wurde aufgerufen!");
	
	steroids.layers.pop({}, {
	onSuccess: function() {
		//go to the home screen 
		var newView = new steroids.views.WebView("html/home.html");
		steroids.layers.push(newView);
		},
	onFailure: function(error) {
    alert("Could not remove a layer: " + error.errorDescription);
		}
	});
}


function checkCredentials() {
	//alert("checkCredentials wurde aufgerufen!");
	//zu testzwecken: setze localstorage username & pw auf leer! --> zeige login screen immer an!
	localStorage.removeItem("username");
	//zu testzwecken: setze username --> gehe direkt in den home screen!
	//localStorage.setItem("username", "Kevin01");
	//localStorage.setItem("password", "secret");
	
	if(localStorage.getItem("username")) {
	//im localstorage gibt es einen Username --> gehe zum homescreen
	var newView = new steroids.views.WebView("html/home.html");
	steroids.layers.push(newView);
	
	}else{
	//im localstorage gibt es keinen Username --> login screen muss geladen werden!
	}
}