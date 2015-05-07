var pantalla_lista_cotas = function(tipoPieza) {
	
	var self = this;
	
	self.idTipoPieza = tipoPieza.idTipoPieza;
	
	
	var $pantalla = $('#plantilla_pantalla_lista_cotas')
		.clone()
		.attr('id', 'pantalla_lista_cotas_' + self.idTipoPieza)
		.appendTo('#panel_dos');
	
	self.ui = $pantalla;
	self.ui.find('.desc_pieza').text("Nuevo " + tipoPieza.descripcion);
	
	
	self.show();
	
	self.listaCotas=[];
	self.cotaSiguiente;
	
	
	self.ui.find('.flecha_der').on('click', function(){
		self.enviarPieza();
	});
	
	
	Vx.send({
		tipoDeMensaje: 'buscarCotas',
		idTipoPieza: self.idTipoPieza
	}, function(mensaje){
		
		self.ui.find('.lista_cotas').empty();
		
		
		_.each(mensaje.cotas, function(cota){
			self.agregarCota(cota);
		});
		
		self.setCotaSiguiente(self.listaCotas[0]);
		
	});
	
};

pantalla_lista_cotas.prototype.show = function(){
	var self = this;
	
	self.ui.parent().find('.pantalla').hide();
	self.ui.show();
};

pantalla_lista_cotas.prototype.agregarCota = function(cota){
	var self = this;
	
	self.listaCotas.push(cota);
	cota.index = self.listaCotas.length-1;
	cota.completa = false;
	
	var $cota = $('#plantilla_cota_item')
				.clone()
				.attr('id', 'idCota_' + cota.idCota);
	
	self.ui.find('.lista_cotas').append($cota);
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
	var self = this;
	var i;
	var nextCota = self.cotaSiguiente;
	var flagTodasCompletas = false;
	
	
	i=0;
	while(i<self.listaCotas.length){
		
		if(nextCota.index + 1 === self.listaCotas.length){
			nextCota = self.listaCotas[0];
		}else{
			nextCota = self.listaCotas[nextCota.index + 1];
		}
		
		if(!nextCota.completa){
			break;
		}
		i++;
	}
	
	if(i===self.listaCotas.length){
		//INFO: todas las cotas estarían completas
		self.enviarPieza();
	}else{
		self.setCotaSiguiente(nextCota);
	}
};


pantalla_lista_cotas.prototype.setCotaSiguiente = function(cota){
	var self = this;
	self.cotaSiguiente = cota;
	self.ui.find('.cota').removeClass('siguiente');
	self.cotaSiguiente.ui.addClass('siguiente');		
	
};


pantalla_lista_cotas.prototype.enviarPieza = function(){
	var self = this;
	//INFO: Acá compongo el mensaje de piezaCompleta
	
	/*
	//TODO:
		- validar que todas las cotas estén completas, advertir con warning
	*/
	
	var cotasEnvio = _.map(self.listaCotas, function(item){
		return {
			idCota: item.idCota,
			valorMedicion: item.valorMedicion
		};
	});
	
	Vx.send({
		tipoDeMensaje: 'piezaCompleta',
		idUsuario: datos.idUsuario,
		idTipoPieza: self.idTipoPieza,
		cotas: cotasEnvio
	}, function(mensaje){
		console.log('respuesta de pieza, no se si se requiere, puede ser que esté al pedo');
		console.log(mensaje);
	});
	
	
	// RESETEO LA PIEZA
	_.each(self.listaCotas, function(cota){
		cota.valorMedicion = null;
		cota.completa = false;
		cota.ui.find('.valorMedicion').text('');
	});
	
	self.ui.find('.cota').removeClass('anterior');
	self.ui.find('.cota').removeClass('siguiente');
	self.ui.find('.cota').removeClass('completa');
	self.ui.find('.cota').removeClass('no_paso');
	self.ui.find('.cota').removeClass('paso');
	
	
	self.setCotaSiguiente(self.listaCotas[0]);
	
};

pantalla_lista_cotas.prototype.recibirMedicionAislada = function(mensaje){
	var self = this;
	
	
	
	self.cotaSiguiente.valorMedicion = mensaje.valorMedicion;
	self.cotaSiguiente.ui.find('.valorMedicion').text(mensaje.valorMedicion);
	
	self.cotaSiguiente.ui.addClass('completa');
	self.cotaSiguiente.completa = true;
	
	
	if(	mensaje.valorMedicion < (self.cotaSiguiente.base - self.cotaSiguiente.tolMin)
	 || mensaje.valorMedicion > (self.cotaSiguiente.base + self.cotaSiguiente.tolMax)){
		
		self.cotaSiguiente.ui.addClass('no_paso');
	}else{
		self.cotaSiguiente.ui.addClass('paso');
	}
	
	self.ui.find('.cota').removeClass('anterior');
	self.cotaSiguiente.ui.addClass('anterior');
	
	
	self.moveNextCota();
	
};