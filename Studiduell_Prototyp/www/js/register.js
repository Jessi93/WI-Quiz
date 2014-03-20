var gv_username;
var gv_password;

function init() {
registerEnterButtonLoginEventHandler();
	
}

function registerEnterButtonLoginEventHandler() {
	$( "#username_input" ).on( "keydown", function( event ) {
	if(event.which == 13){
	sendRegistration();}
	});
	$( "#password_input" ).on( "keydown", function( event ) {
	if(event.which == 13){
	sendRegistration();}
	});
}

function sendRegistration(){
	//alert("sendRegistration wurde aufgerufen!");
	//Fehlerbehandlungsfunktionen:
	function handleErrorRegister(returnedObject) {
		//alert("handleErrorRegister wurde aufgerufen!");
		//TODO: Hier Zwischen Verbindungsfehler und bereitsvergebenem Username unterscheiden!){
		if(returnedObject.status == 409){
		navigator.notification.alert("Dein Username ist leider bereits vergeben...", onAlertDismissHandleErrorRegister,'Information','OK');
		}else{
		alert(unescape("%22Fehler bei %DCberpr%FCfung der Registrierungsdaten. %28Keine Verbindung zum Server%3F%29 %22")+JSON.stringify(returnedObject));
		}
	}

	function onAlertDismissHandleErrorRegister (){ //Tue nichts
	}
	function alertDismissedInputEmpty() {
		//alert("alertDismissed aufgerufen! gv_username= "+gv_username+"gv_password= "+gv_password);
		//Zeige an, welche Eingabe fehlt! (roter Rand)
		if (isEmpty(gv_username)) {
		$("#username_input").addClass("invalidCustom");
		}
		if (isEmpty(gv_password)) {
		$("#password_input").addClass("invalidCustom");
		}
	}

	function alertDismissedUsernameTooLong(){
		$("#username_input").addClass("invalidCustom");
	}
		
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
		alertDismissedInputEmpty, 		//v_username, v_password sollten hier übergeben werden, aber nicht möglich --> nutzung globaler variablen: gv_username & gv_password
		'Fehlende Eingabe!',    // title   
		'Ok'                  	// buttonName
		);
	
	}else{
	// Prüfung auf Maximalzeichenzahl im anzulegenden Username! (siehe application.js)
		if(v_username.length > maxZeichenUsername){
			navigator.notification.alert(
			'Dein gewünschter Username ist leider zu lang - die maximale Zeichenzahl ist: '+maxZeichenUsername, // message  
			alertDismissedUsernameTooLong, 		//v_username, v_password sollten hier übergeben werden, aber nicht möglich --> nutzung globaler variablen: gv_username & gv_password
			'Username zu lang!',    // title   
			'Ok'                  	// buttonName
			);
		
		}else{
			//Username und passwort sind beide gesetzt worden & Username ist nicht zu lang!--> Serveranfrage starten!
			//alert("Register-AJAX-gestartet!");
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
}

function handleRegistrationOK(username, password) {
	//alert("Die Registrierung war erfolgreich!"); 
	//setze Usercredentials in Localstorage:
	localStorage.setItem("username", username);
	localStorage.setItem("password", password);
	
	openHomeScreen();	
}

function openHomeScreen() {
	//alert("openHomeScreen wurde aufgerufen!");
	steroids.layers.popAll();
}

document.addEventListener("deviceready", init, false);