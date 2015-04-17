var pantalla_lista_cotas = function(tipoPieza) {
	
	var me = this;
	
	me.idTipoPieza = tipoPieza.idTipoPieza;
	
	
	var $pantalla = $('#plantilla_pantalla_lista_cotas')
		.clone()
		.attr('id', 'pantalla_lista_cotas_' + me.idTipoPieza)
		.appendTo('#panel_dos');
	
	me.ui = $pantalla;
	me.ui.find('.desc_pieza').text("Nuevo " + tipoPieza.descripcion);
	
	
	me.show();
	
	me.listaCotas=[];
	me.cotaSiguiente;
	
	
	me.ui.find('.flecha_der').on('click', function(){
		me.enviarPieza();
	});
	
	
	Vx.send({
		tipoDeMensaje: 'buscarCotas',
		idTipoPieza: me.idTipoPieza
	}, function(mensaje){
		
		me.ui.find('.lista_cotas').empty();
		
		
		_.each(mensaje.cotas, function(cota){
			me.agregarCota(cota);
		});
		
		me.setCotaSiguiente(me.listaCotas[0]);
		
	});
	
};

pantalla_lista_cotas.prototype.show = function(){
	var me = this;
	
	me.ui.parent().find('.pantalla').hide();
	me.ui.show();
};

pantalla_lista_cotas.prototype.agregarCota = function(cota){
	var me = this;
	
	me.listaCotas.push(cota);
	cota.index = me.listaCotas.length-1;
	cota.completa = false;
	
	var $cota = $('#plantilla_cota_item')
				.clone()
				.attr('id', 'idCota_' + cota.idCota);
	
	me.ui.find('.lista_cotas').append($cota);
	$cota.show();
	
	
	$cota.find('.desc_cota').text(cota.descripcion);
	$cota.find('.unidad').text(cota.descripcion);
	$cota.find('.unidad').text(cota.unidad);
	$cota.find('.base').text(cota.base);
	$cota.find('.tolMax').text(cota.tolMax);
	$cota.find('.tolMin').text(cota.tolMin);
	$cota.find('.precision').text(cota.precision);
	
	
	var svgRegla = Snap('#' + $cota.attr('id') + ' svg.regla');
	//TODO: voy a probar sin la regla primero todo el circuito
	
	cota.ui = $cota;
	
};




pantalla_lista_cotas.prototype.moveNextCota = function(){
	var me = this;
	var i;
	var nextCota = me.cotaSiguiente;
	var flagTodasCompletas = false;
	
	
	i=0;
	while(i<me.listaCotas.length){
		
		if(nextCota.index + 1 === me.listaCotas.length){
			nextCota = me.listaCotas[0];
		}else{
			nextCota = me.listaCotas[nextCota.index + 1];
		}
		
		if(!nextCota.completa){
			break;
		}
		i++;
	}
	
	if(i===me.listaCotas.length){
		//INFO: todas las cotas estarían completas
		me.enviarPieza();
	}else{
		me.setCotaSiguiente(nextCota);
	}
};


pantalla_lista_cotas.prototype.setCotaSiguiente = function(cota){
	var me = this;
	me.cotaSiguiente = cota;
	me.ui.find('.cota').removeClass('siguiente');
	me.cotaSiguiente.ui.addClass('siguiente');		
	
};


pantalla_lista_cotas.prototype.enviarPieza = function(){
	var me = this;
	//INFO: Acá compongo el mensaje de piezaCompleta
	
	/*
	//TODO:
		- validar que todas las cotas estén completas, advertir con warning
	*/
	
	var cotasEnvio = _.map(me.listaCotas, function(item){
		return {
			idCota: item.idCota,
			valorMedicion: item.valorMedicion
		};
	});
	
	Vx.send({
		tipoDeMensaje: 'piezaCompleta',
		idUsuario: datos.idUsuario,
		idTipoPieza: me.idTipoPieza,
		cotas: cotasEnvio
	}, function(mensaje){
		console.log('respuesta de pieza, no se si se requiere, puede ser que esté al pedo');
		console.log(mensaje);
	});
	
	
	// RESETEO LA PIEZA
	_.each(me.listaCotas, function(cota){
		cota.valorMedicion = null;
		cota.completa = false;
		cota.ui.find('.valorMedicion').text('');
	});
	
	me.ui.find('.cota').removeClass('anterior');
	me.ui.find('.cota').removeClass('siguiente');
	me.ui.find('.cota').removeClass('completa');
	me.ui.find('.cota').removeClass('no_paso');
	me.ui.find('.cota').removeClass('paso');
	
	
	me.setCotaSiguiente(me.listaCotas[0]);
	
};

pantalla_lista_cotas.prototype.recibirMedicionAislada = function(mensaje){
	var me = this;
	
	
	
	me.cotaSiguiente.valorMedicion = mensaje.valorMedicion;
	me.cotaSiguiente.ui.find('.valorMedicion').text(mensaje.valorMedicion);
	
	me.cotaSiguiente.ui.addClass('completa');
	me.cotaSiguiente.completa = true;
	
	
	if(	mensaje.valorMedicion < (me.cotaSiguiente.base - me.cotaSiguiente.tolMin)
	 || mensaje.valorMedicion > (me.cotaSiguiente.base + me.cotaSiguiente.tolMax)){
		
		me.cotaSiguiente.ui.addClass('no_paso');
	}else{
		me.cotaSiguiente.ui.addClass('paso');
	}
	
	me.ui.find('.cota').removeClass('anterior');
	me.cotaSiguiente.ui.addClass('anterior');
	
	
	me.moveNextCota();
	
};