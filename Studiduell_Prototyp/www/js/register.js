var gv_username;
var gv_password;

function sendRegistration(){
	//alter("sendRegistration wurde aufgerufen!");

	//prüfe, ob username/password kombination OK ist!
	
	var v_username = $("#username_input").val();
	var v_password = $("#password_input").val();
	
	//Prüfe, ob username & passwort befüllt wurden
	if (isEmpty(v_username) || isEmpty(v_password) ){
	
	gv_username = v_username;
	gv_password = v_password;
	
	//Roten Rand entfernen, wenn Feld befüllt!
		if(isEmpty(v_username)==false){ $("#username_input").removeClass("invalidCustom");
		}
		if(isEmpty(v_password)==false){ $("#password_input").removeClass("invalidCustom");
		}
	
	navigator.notification.alert(
		'Bitte gib deinen Usernamen und dein Passwort an, damit du dich registrieren kannst!', // message  
		alertDismissed, 		//v_username, v_password sollten hier übergeben werden, aber nicht möglich --> nutzung globaler variablen: gv_username & gv_password
		'Fehlende Eingabe!',    // title   
		'Ok'                  	// buttonName
		);
	
	}else{
	//Username und passwort sind beide gesetzt worden --> Serveranfrage starten!
	alert("Register-AJAX-gestartet!");
	$.ajax( {
			url:serverURL + "user/register/"+v_username,
			type:"PUT",
			contentType:"text/plain",
			success:function(obj){handleRegistrationOK(v_username, v_password);},
			error:function(obj){handleErrorRegister(obj);}, 
			data:v_password
			}); 
	}

}

function alertDismissed() {
	//alert("alertDismissed aufgerufen! gv_username= "+gv_username+"gv_password= "+gv_password);
	//Zeige an, welche Eingabe fehlt! (roter Rand)
	if (isEmpty(gv_username)) {
	$("#username_input").addClass("invalidCustom");
	}
	if (isEmpty(gv_password)) {
	$("#password_input").addClass("invalidCustom");
	}
}

function handleErrorRegister(returnedObject) {
	alert("handleErrorRegister wurde aufgerufen!");
	
	// if( TODO: Hier Zwischen Verbindungsfehler und bereitsvergebenem Username unterscheiden!){
	// alert("Fehler bei der Registrierung"); 
	// }else{
	// alert("Fehler bei Überprüfung der Login Daten (Keine Verbindung zum Server?) "+obj);
	// }
}

function handleRegistrationOK(username, password) {
	alert("handleRegistrationOK wurde aufgerufen!");
	//setze Usercredentials in Localstorage:
	localStorage.setItem("username", username);
	localStorage.setItem("password", password);
	
	openHomeScreen();	
}

function openHomeScreen() {
	//alert("openHomeScreen wurde aufgerufen!");
	steroids.layers.popAll();
}