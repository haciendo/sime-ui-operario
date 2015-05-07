var pantalla_online = function() {
	
	var ui = $('#pantalla_online');
		
	gestor_medicion.onSetMedicionAnterior(function(){
		
		
		var panAnt = ui.find('.panel_cota_anterior');
		panAnt.removeClass('panel_cota_si_paso panel_cota_no_paso');
		
		if(	datos.medicionAnterior.medicion.valorMedido < (datos.medicionAnterior.cota.base - datos.medicionAnterior.cota.tolMin)
		 || datos.medicionAnterior.medicion.valorMedido > (datos.medicionAnterior.cota.base + datos.medicionAnterior.cota.tolMax)){
			
			panAnt.addClass('panel_cota_no_paso');
		}else{
			panAnt.addClass('panel_cota_si_paso');
		}
		
		panAnt.find('.desc_cota').text(datos.medicionAnterior.cota.descripcion);
		panAnt.find('.desc_tipoDePieza').text(datos.tiposDePieza[datos.medicionAnterior.pieza.idTipoDePieza].descripcion);
		panAnt.find('.unidad').text(datos.medicionAnterior.cota.unidad);
		panAnt.find('.valorMedicion').text(datos.medicionAnterior.medicion.valorMedido);
		
	});
		
	
	
	gestor_medicion.onSetMedicionSiguiente(function(){
		
		var panSig = ui.find('.panel_cota_siguiente');
		
		panSig.find('.desc_cota').text(datos.medicionSiguiente.cota.descripcion);
		panSig.find('.desc_tipoDePieza').text(datos.tiposDePieza[datos.medicionSiguiente.pieza.idTipoDePieza].descripcion);
		panSig.find('.unidad').text(datos.medicionSiguiente.cota.unidad);
		panSig.find('.base').text(datos.medicionSiguiente.cota.base);
		panSig.find('.tolMax').text(datos.medicionSiguiente.cota.tolMax);
		panSig.find('.tolMin').text(datos.medicionSiguiente.cota.tolMin);
		panSig.find('.precision').text(datos.medicionSiguiente.cota.precision);
		
		
	});
	
}