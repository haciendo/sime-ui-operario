var barra_superior = function(){
	
	var $barra = $('#barra_superior');
	$barra.show();
	
	$barra.find('#link_pantalla_seleccion_tipopieza').on('click', function(){
		$('.pantalla').hide();
		$('#pantalla_seleccion_tipopieza').show();
		
		$barra.find('.link_pantalla').removeClass('selected');
		$(this).addClass('selected');
		
	});
	
	$barra.find('#link_pantalla_instrumentos').on('click', function(){
		$('.pantalla').hide();
		$('#pantalla_instrumentos').show();
		
		$barra.find('.link_pantalla').removeClass('selected');
		$(this).addClass('selected');
	});
	
	
	$barra.find('#link_salir').on('click', function(){
		datos = {};
		$('#barra_superior').hide();
		$('.pantalla').hide();
		$('#pantalla_login').show();
		
		$barra.find('.link_pantalla').removeClass('selected');
		$(this).addClass('selected');
		
	});
};