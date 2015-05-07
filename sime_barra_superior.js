var barra_superior = function(){
	
	var self = {};
	
	self.ui = $('#barra_superior');
	self.ui.show();
	
	self.ui.find('#link_pantalla_seleccion_tipoDePieza').on('click', function(){
		self.ui.parent().find('.pantalla').hide();
		$('#pantalla_seleccion_tipoDePieza').show();
		
		self.ui.find('.link_pantalla').removeClass('selected');
		$(this).addClass('selected');
		
	});
	
	self.ui.find('#link_pantalla_instrumentos').on('click', function(){
		self.ui.parent().find('.pantalla').hide();
		$('#pantalla_instrumentos').show();
		
		self.ui.find('.link_pantalla').removeClass('selected');
		$(this).addClass('selected');
	});
	
	
	self.ui.find('#link_salir').on('click', function(){
		datos = {};
		self.ui.hide();
		self.ui.parent().find('.pantalla').hide();
		$('#pantalla_login').show();
		
		self.ui.find('.link_pantalla').removeClass('selected');
		$(this).addClass('selected');
		
	});
};