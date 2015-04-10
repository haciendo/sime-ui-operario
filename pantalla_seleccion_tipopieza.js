var listaPiezas = [];
var piezaSelected;

var pantalla_seleccion_tipopieza = function() {
	
	var $pantalla = $('#pantalla_seleccion_tipopieza');
	$pantalla.find('ul.lista_tipopiezas').empty();
	
	
	var agregarTipoPieza = function(tipoPieza){
		listaPiezas.push(tipoPieza);
		tipoPieza.index = listaPiezas.length-1;
		
		
		var $tipoPieza = $('#plantilla_tipopieza')
					.clone()
					.attr('id', 'idPieza_' + tipoPieza.idTipoPieza);
		
		
		$pantalla.find('.lista_tipopiezas').append($tipoPieza);
		$tipoPieza.show();
		
		
		$tipoPieza.text(tipoPieza.descripcion);
		
		
		$tipoPieza.on('click', function(){
			
			
			$('#pantalla_medicion').hide();
			
			if(tipoPieza.pantalla_medicion === undefined){
				tipoPieza.pantalla_medicion = new pantalla_medicion(tipoPieza);
				
			} else {
				tipoPieza.pantalla_medicion.show();
			}
			
			piezaSelected = tipoPieza;
			
			$pantalla.find('.tipopieza').removeClass('selected');
			$(this).addClass('selected');
		});
	
	};
	
	$pantalla.find('input.textoBusqueda').on('keypress', function(e){ 
		
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