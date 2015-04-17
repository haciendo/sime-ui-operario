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
			
			
			$('#pantalla_lista_cotas').hide();
			
			if(tipoPieza.pantalla_lista_cotas === undefined){
				tipoPieza.pantalla_lista_cotas = new pantalla_lista_cotas(tipoPieza);
				
			} else {
				tipoPieza.pantalla_lista_cotas.show();
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