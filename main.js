$(document).ready(function() {  
    //toda esta garcha es para detectar si la aplicacion esta corriendo en un celular o en una pc.
    //En el celular para arrancar la app hay que esperar al evento deviceReady, en la pc solo al documentReady
    //window.isphone = false;
	window.isphone = (document.URL.indexOf("com.") > 0);

    if(window.isphone) {
        document.addEventListener("deviceready", onDeviceReady, false);
    } else {
        onDeviceReady();
    }
});


var onDeviceReady = function() {
    
	
	Vx.conectarCon(new NodoConectorSocket('https://sime-backend.herokuapp.com'));
	
	pantalla_login();
	
	//DEBUG
	$('body').on('click', function(){
		
	});
	
	
	
	if(window.plugin){
		window.plugin.backgroundMode.enable();
	}
};




