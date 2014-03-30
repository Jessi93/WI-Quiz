var gv_username;
var gv_password;

function init() {
//alert("init wurde in login aufgerufen!")

registerEnterButtonLoginEventHandler();
	
}

function registerEnterButtonLoginEventHandler() {
	$( "#username_input" ).on( "keydown", function( event ) {
	if(event.which == 13){
	sendLoginDataToServer();}
	});
	$( "#password_input" ).on( "keydown", function( event ) {
	if(event.which == 13){
	sendLoginDataToServer();}
	});
}

function sendLoginDataToServer() {
	//Prüfe, dass notification steroids plugin geladen wurde!
	//if(navigator.notification==="undefined"){
	//alert("Script navigator.notification wurde nicht geladen!");
	//}
	
	//alert("sendLoginDataToServer wurde aufgerufen!");
	
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
	
	//Username und passwort sind beide gesetzt worden -->	//prüfe, ob username/password kombination OK ist!
		//Serveranfrage starten!
	//alert("Login-AJAX-Call gestartet!");
	
		$.ajax( {
			url:serverURL + "user/checkCredentials/"+v_username,
			type:"POST",
			contentType:"text/plain",
			crossDomain:true,
			success:function(obj){
				//alert("Login Ajax erfolgreich!");
				openHomeScreen(v_username, v_password);
			},
			error:function(obj){handleErrorLogin(obj);},
			data:v_password
			});
		 
	}
			
}

function alertDismissed() {
	//alert("alertDismissed aufgerufen! gv_username= "+gv_username+"gv_password= "+gv_password);
	//Zeige an, welche Eingabe fehlt! (roter Rand)
	  if (isEmpty(gv_username)) {
	  //alert("username wird rot! gv_username= "+gv_username+"gv_password= "+gv_password);
	    
	  $("#username_input").addClass("invalidCustom");
	  }
	  if (isEmpty(gv_password)) {
	  $("#password_input").addClass("invalidCustom");
	  }
}


function handleErrorLogin(returnedObject) {
	//alert("handleErrorLogin wurde aufgerufen!"+returnedObject);
	if(returnedObject.status == 401){
	alert("Die Kombination aus Username und Passwort ist nicht korrekt, bitte versuche es erneut.");
	}else{
	alert(unescape("%22Fehler bei %DCberpr%FCfung der Login Daten %28Keine Verbindung zum Server%3F%29 %22")+JSON.stringify(returnedObject));//DEBUG +returnedObject);
	}
}

function openRegisterScreen() {
	//alert("openRegisterScreen wurde aufgerufen!");
	var newView = new steroids.views.WebView("html/register.html");
	steroids.layers.push(newView);
}

function openHomeScreen(username, password) {
	//alert("openHomeScreen wurde aufgerufen!");
	//Setze username & passwort im localStorage
	localStorage.setItem("username", username);
	localStorage.setItem("password", password);
	//alert("Username wurde gesetzt" + localStorage.getItem("username", username)+ "Passwort wurde gesetzt:" + localStorage.getItem("password", password));
	//gehe zum Homescreen (gesetzte credentials im localstorage verhindern, dass login angezeigt wird!
	 steroids.layers.popAll(); //pop schließt login screen, sodass home sichtbar wird!
}

$( document ).ready(function() { init(); });
