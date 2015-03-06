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
    
	vx.start({verbose:true});
    
	vx.conectarPorWebSockets({
		url: "https://router-vortex.herokuapp.com"
	});
	
	
	
	vx.when({
		tipoDeMensaje:"prueba.mensaje.pregunta"
		
	},function(mensaje){
		
		vx.send({
			tipoDeMensaje:"prueba.mensaje.respuesta",
			respuesta: "pregunta: " + mensaje.pregunta + " - respuesta: ésta!"
		});
		
		
	});
	
	alert('enviar mensaje de pregunta?');
	
	vx.send({
		tipoDeMensaje:"prueba.mensaje.pregunta",
		pregunta: "que puedo comer?"
	});
	
	
	if(window.plugin){
		window.plugin.backgroundMode.enable();
	}
};




