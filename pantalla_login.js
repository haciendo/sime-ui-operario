var idOperario;
var pantalla_login = function() {
	
	$('#pantalla_login').show();
	
	$('#boton_ingresar').on('click', function(){
		//TODO: Loguear con pass
		idOperario = $('#idOperario').val();
		
		pantalla_seleccion_pieza();
		
	});

};