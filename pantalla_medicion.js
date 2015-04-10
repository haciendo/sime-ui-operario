var pantalla_medicion = function(tipoPieza) {
	
	var self = this;
	
	self.idTipoPieza = tipoPieza.idTipoPieza;
	
	
	var $pantalla = $('#plantilla_pantalla_medicion')
		.clone()
		.attr('id', 'pantalla_medicion_' + self.idTipoPieza)
		.appendTo('body');
	
	self.ui = $pantalla;
	self.ui.find('.desc_pieza').text("Nuevo " + tipoPieza.descripcion);
	
	
	self.show();
	
	self.listaCotas=[];
	self.cotaActual;
	
	
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
		
		self.setCotaActual(self.listaCotas[0]);
		
	});
	
};

pantalla_medicion.prototype.show = function(){
	var self = this;
	$('.pantalla').hide();
	self.ui.show();
};

pantalla_medicion.prototype.agregarCota = function(cota){
	var self = this;
	
	self.listaCotas.push(cota);
	cota.index = self.listaCotas.length-1;
	cota.completa = false;
	
	var $cota = $('#plantilla_cota')
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




pantalla_medicion.prototype.moveNextCota = function(){
	var self = this;
	var i;
	var nextCota = self.cotaActual;
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
		self.setCotaActual(nextCota);
	}
};


pantalla_medicion.prototype.setCotaActual = function(cota){
	var self = this;
	self.cotaActual = cota;
	self.ui.find('.cota').removeClass('actual');
	self.cotaActual.ui.addClass('actual');		
	
};


pantalla_medicion.prototype.enviarPieza = function(){
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
	self.ui.find('.cota').removeClass('actual');
	self.ui.find('.cota').removeClass('completa');
	self.ui.find('.cota').removeClass('no_paso');
	self.ui.find('.cota').removeClass('paso');
	
	
	self.setCotaActual(self.listaCotas[0]);
	
};

pantalla_medicion.prototype.recibirMedicionAislada = function(mensaje){
	var self = this;
	
	
	
	self.cotaActual.valorMedicion = mensaje.valorMedicion;
	self.cotaActual.ui.find('.valorMedicion').text(mensaje.valorMedicion);
	
	self.cotaActual.ui.addClass('completa');
	self.cotaActual.completa = true;
	
	
	if(	mensaje.valorMedicion < (self.cotaActual.base - self.cotaActual.tolMin)
	 || mensaje.valorMedicion > (self.cotaActual.base + self.cotaActual.tolMax)){
		
		self.cotaActual.ui.addClass('no_paso');
	}else{
		self.cotaActual.ui.addClass('paso');
	}
	
	self.ui.find('.cota').removeClass('anterior');
	self.cotaActual.ui.addClass('anterior');
	
	
	self.moveNextCota();
	
};