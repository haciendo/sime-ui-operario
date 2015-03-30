var pantalla_instrumentos = function() {
	
	var $pantalla = $('#pantalla_instrumentos');
	
	
	
	var agregarInstrumento = function(instrumento){
		
		var $instrumento = $('#plantilla_instrumento')
					.clone()
					.attr('id', 'idInstrumento_' + instrumento.idInstrumento);
		
		
		$pantalla.find('.lista_instrumentos').append($instrumento);
		$instrumento.show();
		
		console.log('$instrumento');
		console.log($instrumento.html());
		
		$instrumento.text(instrumento.descripcion);
		
		
		/* DEFINICION
		Medicion Aislada
		{
			tipoDeMensaje: ‘medicionAislada’,
			idInstrumento: 111,
			valorMedicion: 2,5
		}
		*/
		
		Vx.when({
			tipoDeMensaje:"medicionAislada",
			idInstrumento: instrumento.idInstrumento
		},function(mensaje){
			if(piezaSeleccionada){
				piezaSeleccionada.pantalla_medicion.recibirMedicionAislada(mensaje);
			}
		});
		
	};
	
	
	$pantalla.find('.lista_instrumentos').empty();
	_.each(datos.instrumentos, function(instrumento){
		agregarInstrumento(instrumento);
	});

};