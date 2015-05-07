var pantalla_seleccion_tipoDePieza = function() {
	
	var ui = $('#pantalla_seleccion_tipoDePieza');
	ui.find('ul.lista_tiposDePieza').empty();
	
	
	var agregarTipoDePieza = function(tipoDePieza){
		
		datos.tiposDePieza[tipoDePieza.idTipoDePieza] = tipoDePieza;
		
		
		var $tipoDePieza = $('#plantilla_tipoDePieza')
							.clone()
							.attr('id', 'idTipoDePieza_' + tipoDePieza.idTipoDePieza);
		
		
		ui.find('.lista_tiposDePieza').append($tipoDePieza);
		$tipoDePieza.show();
		
		
		$tipoDePieza.text(tipoDePieza.descripcion);
		
		
		$tipoDePieza.on('click', function(){
			
			console.log('que vergara pasasaaaaaaaaaaaaaaaaaaaa');
			
			var pieza = {
				idTipoDePieza: tipoDePieza.idTipoDePieza,
				mediciones: []
			};
			
			
			Vx.send({
				tipoDeMensaje: 'newPieza',
				idUsuario: datos.idUsuario,
				pieza: pieza
			}, function(mensaje){
				
				console.log('felipe leggoooooo ?????? ', mensaje);
				
				pieza = $.extend(true, pieza, mensaje.pieza);
				
				
				datos.piezas[pieza.idPieza] = pieza;
				
				gestor_medicion.setMedicionSiguiente(pieza, tipoDePieza.cotas[0]);
			
			});
			
			
			
			/*
			$('#pantalla_lista_cotas').hide();
			
			if(tipoDePieza.pantalla_lista_cotas === undefined){
				tipoDePieza.pantalla_lista_cotas = new pantalla_lista_cotas(tipoDePieza);
				
			} else {
				tipoDePieza.pantalla_lista_cotas.show();
			}
			
			ui.find('.tipoDePieza').removeClass('selected');
			$(this).addClass('selected');
			*/
			
			
			
			
		});
	
	};
	
	ui.find('input.textoBusqueda').on('keypress', function(e){ 
		
		
		
		Vx.send({
			tipoDeMensaje	: 'buscarTiposDePieza',
			textoBusqueda	: ui.find('.textoBusqueda').text()
		}, function(mensaje){
			
			ui.find('ul.lista_tiposDePieza').empty();
			
			
			_.each(mensaje.tiposDePieza, function(tipoDePieza){
				agregarTipoDePieza(tipoDePieza);
			});
			
		});
		

	})
};