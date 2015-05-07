var pantalla_instrumentos = function() {
	
	var ui = $('#pantalla_instrumentos');
	
	
	
	var agregarInstrumento = function(instrumento){
		
		var $instrumento = $('#plantilla_instrumento')
					.clone()
					.attr('id', 'idInstrumento_' + instrumento.idInstrumento);
		
		
		ui.find('.lista_instrumentos').append($instrumento);
		$instrumento.show();
		
		$instrumento.text(instrumento.descripcion);
		
		gestor_medicion.agregarInstrumento(instrumento);
	};
	
	
	ui.find('.lista_instrumentos').empty();
	_.each(datos.instrumentos, function(instrumento){
		agregarInstrumento(instrumento);
	});
	
};