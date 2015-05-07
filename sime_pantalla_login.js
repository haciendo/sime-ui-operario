
var pantalla_login = function() {
	
	var ui = $('#pantalla_login');
	
	ui.show();
	
	ui.find('#boton_ingresar').on('click', function(){
		
		var clavePublica;
		clavePublica = ui.find('#nombre').val() + ui.find('#pass').val();
		clavePublica = "aaa";
		//TODO: generar clavePublica con cryptico
		
		Vx.send({
			tipoDeMensaje: 'usuarioLogin',
			clavePublica: clavePublica
		}, function(mensaje){
			
			if(mensaje.usuarioValido){
				
				datos.idUsuario = mensaje.idUsuario;
				datos.instrumentos = mensaje.instrumentos;
				
				
				/****** CREO LOS OBJETOS ********/
				pantalla_online();
				
				pantalla_seleccion_tipoDePieza();
				pantalla_instrumentos();
				
				barra_superior();
				
				ui.hide();
				$('.panel').show();
				
				
				/*** START POINT ***/
				$('#link_pantalla_seleccion_tipoDePieza').click();
				
			}
		});
	
	});

};