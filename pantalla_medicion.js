var pantalla_medicion = function(idTipoPieza) {
	
	this.idTipoPieza = idTipoPieza;
	
	
	var $pantalla = $('#plantilla_pantalla_medicion')
		.clone()
		.attr('id', 'pantalla_medicion_' + this.idTipoPieza)
		.appendTo('body');
	
	this.ui = $pantalla;
	
	this.show();
	
	this.listaCotas=[];
	this.cotaAnterior;
	this.cotaSiguiente;
	
	var self = this;
	
	var agregarCota = function(cota){
		self.listaCotas.push(cota);
		cota.index = self.listaCotas.length-1;
		
		
		var $cota = $('#plantilla_cota')
					.clone()
					.attr('id', 'idCota_' + cota.idCota);
		
		$pantalla.find('.lista_cotas').append($cota);
		$cota.show();
		
		
		$cota.find('.desc_cota').text(cota.descripcion);
		
		
		$cota.find('.valorMedicion,.regla').hide();
		
		var svgRegla = Snap('#' + $cota.attr('id') + ' svg.regla');
		//TODO: voy a probar sin la regla primero todo el circuito
		
		cota.ui = $cota;
		
		console.log('cota');
		console.log(cota);
		
		
	};
	
	var setCotaSiguiente = function(cota){
		
		self.cotaSiguiente = cota;
		$('.cota').removeClass('siguiente');
		self.cotaSiguiente.ui.addClass('siguiente');
	};
	
	
	Vx.send({
		tipoDeMensaje: 'buscarCotas',
		idTipoPieza: this.idTipoPieza
	}, function(mensaje){
		
		$pantalla.find('.lista_cotas').empty();
		
		_.each(mensaje.cotas, function(cota){
			agregarCota(cota);
		});
		
		setCotaSiguiente(self.listaCotas[0]);
	});
	
};

pantalla_medicion.prototype.show = function(){
	$('.pantalla').hide();
	this.ui.show();
};


pantalla_medicion.prototype.recibirMedicionAislada = function(mensaje){
	
	/* DEFINICION
	Medicion Completa
	{
		tipoDeMensaje: ‘medicionCompleta’,
		idInstrumento: 111,
		valorMedicion: 2,5cm ,
		idTipoPieza: 225,
		idCota: 4252,
		idUsuario: 128
	}
	*/
	
	Vx.send({
		tipoDeMensaje: 'medicionCompleta',
		idInstrumento: mensaje.idInstrumento,
		valorMedicion: mensaje.valorMedicion,
		idTipoPieza: this.idTipoPieza,
		idCota: this.cotaSiguiente.idCota,
		idUsuario: datos.idUsuario
	});
	
	this.cotaAnterior = this.cotaSiguiente;
	if(this.cotaSiguiente.index + 1 == this.listaCotas.length){
		setCotaSiguiente(this.listaCotas[0]);
	}else{
		setCotaSiguiente(this.listaCotas[this.cotaSiguiente.index + 1]);
	}
	
	$('.valorMedicion').hide();
	this.cotaAnterior.ui.find('.valorMedicion').text(mensaje.valorMedicion + ' ' + mensaje.unidad).show();
	$('.cota').removeClass('anterior');
	this.cotaAnterior.ui.addClass('anterior');
	
	$('.cota').removeClass('no_paso');
	$('.cota').removeClass('paso');
		
	if(mensaje.valorMedicion < this.cotaAnterior.min || mensaje.valorMedicion > this.cotaAnterior.max){
		this.cotaAnterior.ui.addClass('no_paso');
	}else{
		this.cotaAnterior.ui.addClass('paso');
	}
	
};