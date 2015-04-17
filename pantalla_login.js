var datos = {
	idUsuario: null,
	instrumentos: []
};

var pantalla_login = function() {
	var me = this;
	
	me.ui = $('#pantalla_login');
	
	me.ui.show();
	
	me.ui.find('#boton_ingresar').on('click', function(){
		
		var clavePublica;
		clavePublica = me.ui.find('#nombre').val() + me.ui.find('#pass').val();
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
				pantalla_online();
				
				pantalla_seleccion_tipopieza();
				pantalla_instrumentos();
				
				
				barra_superior();
				
				console.log('que es estxddddo???????', me.ui.html());
				//me.ui.hide();
				
				
				
				
				$('.panel').show();
				
				
				/*** START POINT ***/
				
				$('#link_pantalla_seleccion_tipopieza').click();
			}
		});
	
	});

};