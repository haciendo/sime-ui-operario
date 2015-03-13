var pantalla_seleccion_pieza = function() {
	
	$('.pantalla').hide();
	$('#pantalla_seleccion_pieza').show();
	
	//TODO: pedirle al char que mande piezas de la base (en principio hardcoded)
	// y cargarlas en el select
	
	$('#boton_seleccionar').on('click', function(){
		
		new pantalla_medicion($('#select_pieza').val());
		
	});

};
		