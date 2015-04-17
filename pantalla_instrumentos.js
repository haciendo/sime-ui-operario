var pantalla_instrumentos = function() {
	
	var me = this;
	
	me.ui = $('#pantalla_instrumentos');
	
	
	
	var agregarInstrumento = function(instrumento){
		
		var $instrumento = $('#plantilla_instrumento')
					.clone()
					.attr('id', 'idInstrumento_' + instrumento.idInstrumento);
		
		
		me.ui.find('.lista_instrumentos').append($instrumento);
		$instrumento.show();
		
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
			
			if(piezaSelected){
				piezaSelected.pantalla_lista_cotas.recibirMedicionAislada(mensaje);
			}
		});
		
	};
	
	
	me.ui.find('.lista_instrumentos').empty();
	_.each(datos.instrumentos, function(instrumento){
		agregarInstrumento(instrumento);
	});

};