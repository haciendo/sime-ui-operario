var barra_superior = function(){
	//TODO: solo analizar: Codigo de la barra ver de sacar a otro archivo
	$('#barra_superior').show();
	
	$('#link_pantalla_seleccion_tipopieza').on('click', function(){
		$('.pantalla').hide();
		$('#pantalla_seleccion_tipopieza').show();
	});
	$('#link_pantalla_instrumentos').on('click', function(){
		$('.pantalla').hide();
		$('#pantalla_instrumentos').show();
	});
	
	
	$('#link_salir').on('click', function(){
		datos = {};
		$('#barra_superior').hide();
		$('.pantalla').hide();
		$('#pantalla_login').show();
		
	});
};