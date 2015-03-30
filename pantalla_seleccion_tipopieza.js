var listaPiezas = [];
var piezaSeleccionada;

var pantalla_seleccion_tipopieza = function() {
	
	$pantalla = $('#pantalla_seleccion_tipopieza');
	
	
	var agregarTipoPieza = function(tipoPieza){
		listaPiezas.push(tipoPieza);
		tipoPieza.index = listaPiezas.length-1;
		
		
		var $tipoPieza = $('#plantilla_tipo_pieza')
					.clone()
					.attr('id', 'idPieza_' + tipoPieza.idTipoPieza);
		
		
		$pantalla.find('.lista_tipopiezas').append($tipoPieza);
		$tipoPieza.show();
		
		
		$tipoPieza.text(tipoPieza.descripcion);
		
		
		$tipoPieza.on('click', function(){
			
			
			$('#pantalla_medicion').hide();
			
			if(tipoPieza.pantalla_medicion === undefined){
				tipoPieza.pantalla_medicion = new pantalla_medicion(tipoPieza.idTipoPieza);
			} else {
				tipoPieza.pantalla_medicion.show();
			}
			
			piezaSeleccionada = tipoPieza;
		});
	
	};
	
	$pantalla.find('#textoBusqueda').on('keypress', function(e){ 
		
		Vx.send({
			idUsuario: datos.idUsuario,
			tipoDeMensaje: 'buscarTipoPiezas',
			textoBusqueda: $(this).val()
			
		}, function(mensaje){
			$pantalla.find('ul.lista_tipopiezas').empty();
			
			_.each(mensaje.tipoPiezas, function(tipoPieza){
				agregarTipoPieza(tipoPieza);
			});
			
		});
	})
};