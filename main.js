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




var datos = {
	idUsuario: null,
	instrumentos: [],
	tiposDePieza: {
		/*
		"unIdTipoDePieza": {
			"descripcion": "pirulo a contratuerca",
			"cotas":[{
				"idCota":1,
				"descripcion": "Largo",
				"base": "15.5",
				"tolMax": "0.5",
				"tolMin": "0.5",
				"unidad": "cm",
				"precision": "0.01"
				}, ...
			]
			}

		*/
	},
	piezas:{
		/*
		"unIdPieza": {
			{
				"idTipoDePieza": "---",
				"mediciones": [{
					"fecha": "12/03/2015 13:41",
					"idCota":1,
					"idInstrumento": "---",
					"valorMedicion": "234.5",
					"idUsuarioMedidor": "---"
				}, ..]
			}
		}
		*/
	},
	medicionSiguiente: {
		pieza: {},
		cota: {}
	},
	medicionAnterior: {
		pieza: {},
		cota: {},
		medicion: {}
	}
};




var onDeviceReady = function() {
    
	
	Vx.conectarCon(new NodoConectorSocket('https://sime-backend.herokuapp.com'));
	//Vx.conectarCon(new NodoConectorSocket('http://localhost:3000'));
	
	Vx.when({tipoDeMensaje:"vortex.debug.error"}, function(m){console.log(m);})
	
	pantalla_login();
	
	
	if(window.plugin){
		window.plugin.backgroundMode.enable();
	}
};




