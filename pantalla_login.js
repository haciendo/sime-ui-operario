var datos = {
	idUsuario: null,
	instrumentos: []
};

var pantalla_login = function() {
	
	var $pantalla = $('#pantalla_login');
	$pantalla.show();
	$pantalla.find('#boton_ingresar').on('click', function(){
		
		var clavePublica;
		clavePublica = $pantalla.find('#nombre').val() + $pantalla.find('#pass').val();
		clavePublica = "aaa";
		//TODO: generar clavePublica con cryptico
		
		Vx.send({
			tipoDeMensaje: 'usuarioLogin',
			clavePublica: clavePublica
		}, function(mensaje){
			
			if(mensaje.usuarioValido){
				
				datos.idUsuario = mensaje.idUsuario;
				datos.instrumentos = mensaje.instrumentos;
				
				
				/****** CREO LAS PANTALLAS ********/
				pantalla_seleccion_tipopieza();
				pantalla_instrumentos();
				
				barra_superior();
				
				
				
				/*** START POINT ***/
				
				$('#link_pantalla_seleccion_tipopieza').click();
			}
		});
	
	});

};