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
	this.cotaActual;
	
	var self = this;
	
	this.ui.find('.flecha_der').on('click', function(){
		//INFO: Acá compongo el mensaje de piezaCompleta
		
		/*
		//TODO:
			- validar que todas las cotas estén completas, advertir con warning
			- detectar que se completaron todas las cotas para enviar automáticamente, charlar ui en detalle
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
		
		$pantalla.find('.cota').removeClass('completa');
		
		
		self.setCotaActual(self.listaCotas[0]);
		
	});
	
	
	
	this.setCotaActual = function(cota){
		var i;
		
		
		
		self.cotaActual = cota;
		
		var iCota = self.cotaActual;
		
		$($pantalla.find('.cota').get().reverse()).each(function() {
			
			iCota.ui = $(this);
			
			iCota.ui.find('.desc_cota'	).text(iCota.descripcion);
			iCota.ui.find('.unidad'		).text(iCota.descripcion);
			iCota.ui.find('.unidad'		).text(iCota.unidad);
			iCota.ui.find('.base'		).text(iCota.base);
			iCota.ui.find('.tolMax'		).text(iCota.tolMax);
			iCota.ui.find('.tolMin'		).text(iCota.tolMin);
			iCota.ui.find('.precision'	).text(iCota.precision);
			
			
			if(iCota.index - 1 < 0){
				iCota = self.listaCotas[self.listaCotas.length - 1];
				
			}else{
				iCota = self.listaCotas[iCota.index - 1];
			}
			
		});
		
	};
	
	
	Vx.send({
		tipoDeMensaje: 'buscarCotas',
		idTipoPieza: this.idTipoPieza
	}, function(mensaje){
		
		$pantalla.find('.lista_cotas').empty();
		
		_.each(mensaje.cotas, function(cota){
			
			var $cota = $('#plantilla_cota')
						.clone()
						.attr('id', 'idCota_' + cota.idCota);
		
			$pantalla.find('.lista_cotas').append($cota);
			$cota.show();
			var svgRegla = Snap('#' + $cota.attr('id') + ' svg.regla');
			//TODO: voy a probar sin la regla primero todo el circuito
			
			
			/***************/
			self.listaCotas.push(cota);
			cota.index = self.listaCotas.length-1; // INFO: esto es el orden por ahora
			cota.completa = false;
			
			
		});
		
		
		self.setCotaActual(self.listaCotas[0]);
	});
	
};

pantalla_medicion.prototype.show = function(){
	$('.pantalla').hide();
	this.ui.show();
};


pantalla_medicion.prototype.recibirMedicionAislada = function(mensaje){
	
	//TODO: resolver cola circular de cotas
	
	
	this.cotaActual.valorMedicion = mensaje.valorMedicion;
	
	this.cotaActual.ui.find('.valorMedicion').text(mensaje.valorMedicion);
	
	
	this.cotaActual.ui.addClass('completa');
	this.cotaActual.completa = true;
	
	
	this.ui.find('.cota').removeClass('no_paso');
	this.ui.find('.cota').removeClass('paso');
	
	if(mensaje.valorMedicion < this.cotaActual.min || mensaje.valorMedicion > this.cotaActual.max){
		this.cotaActual.ui.addClass('no_paso');
	}else{
		this.cotaActual.ui.addClass('paso');
	}
	
	this.ui.find('.cota').removeClass('anterior');
	this.cotaActual.ui.addClass('anterior');
	
	
	this.cotaAnterior = this.cotaActual;
	if(this.cotaActual.index + 1 == this.listaCotas.length){
		this.setCotaActual(this.listaCotas[0]);
	}else{
		this.setCotaActual(this.listaCotas[this.cotaActual.index + 1]);
	}
};