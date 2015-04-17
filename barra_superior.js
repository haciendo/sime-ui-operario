var barra_superior = function(){
	
	console.log('andan pasando cosas raras');
	
	
	var barra_superior = this;
	
	barra_superior.ui = $('#barra_superior');
	barra_superior.ui.show();
	
	barra_superior.ui.find('#link_pantalla_seleccion_tipopieza').on('click', function(){
		barra_superior.ui.parent().find('.pantalla').hide();
		$('#pantalla_seleccion_tipopieza').show();
		
		barra_superior.ui.find('.link_pantalla').removeClass('selected');
		$(this).addClass('selected');
		
	});
	
	barra_superior.ui.find('#link_pantalla_instrumentos').on('click', function(){
		barra_superior.ui.parent().find('.pantalla').hide();
		$('#pantalla_instrumentos').show();
		
		barra_superior.ui.find('.link_pantalla').removeClass('selected');
		$(this).addClass('selected');
	});
	
	
	barra_superior.ui.find('#link_salir').on('click', function(){
		datos = {};
		barra_superior.ui.hide();
		barra_superior.ui.parent().find('.pantalla').hide();
		$('#pantalla_login').show();
		
		barra_superior.ui.find('.link_pantalla').removeClass('selected');
		$(this).addClass('selected');
		
	});
};