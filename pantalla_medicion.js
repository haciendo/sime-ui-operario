var pantalla_medicion = function(idPieza) {
	
	var $pantalla_medicion = $('#plantilla_pantalla_medicion')
		.clone()
		.attr('id', 'pantalla_medicion_' + idPieza)
		.appendTo('body');
	
	
	$('.pantalla').hide();
	$pantalla_medicion.show();
	
	
	var listaCotas=[];
	var listaInstrumentos=[];
	var cotaAnterior;
	var cotaSiguiente;
	
	
	var agregarInstrumento = function(idInstrumento){
		
		listaInstrumentos.push(idInstrumento);
		
		
		/* DEFINICION
		Medicion Aislada
		{
			tipoDeMensaje: ‘medicionAislada’,
			idInstrumento: 111,
			valorMedicion: 2,5,
			unidad:”cm”
		}
		*/
		
		vx.when({
			tipoDeMensaje:"medicionAislada",
			idInstrumento: idInstrumento
		},function(mensaje){
			
			if(cotaSiguiente.instrumento.idInstrumento != mensaje.idInstrumento){
				// no es la que espero...
				//OJO: CHARLAR:
				//	se podría validar, si es un instrumento mio y no es el que espero como un caso particular
				
				return 0;
			}
			
			
			
			/* DEFINICION
			Medicion Completa
			{
				tipoDeMensaje: ‘medicionCompleta’,
				idInstrumento: 111,
				valorMedicion: 2,5cm ,
				idPieza: 225,
				idCota: 4252,
				idOperario: 128
			}
			*/
			
			vx.send({
				tipoDeMensaje: 'medicionCompleta',
				idInstrumento: mensaje.idInstrumento,
				valorMedicion: mensaje.valorMedicion,
				idPieza: idPieza,
				idCota: cotaSiguiente.idCota,
				idOperario: idOperario
			});
			
			cotaAnterior = cotaSiguiente;
			if(cotaSiguiente.index + 1 == listaCotas.length){
				setCotaSiguiente(listaCotas[0]);
			}else{
				setCotaSiguiente(listaCotas[cotaSiguiente.index + 1]);
			}
			
			$('.valorMedicion').hide();
			cotaAnterior.ui.find('.valorMedicion').text(mensaje.valorMedicion + ' ' + mensaje.unidad).show();
			$('.cota').removeClass('anterior');
			cotaAnterior.ui.addClass('anterior');
			
			$('.cota').removeClass('no_paso');
			$('.cota').removeClass('paso');
				
			if(mensaje.valorMedicion < cotaAnterior.min || mensaje.valorMedicion > cotaAnterior.max){
				cotaAnterior.ui.addClass('no_paso');
			}else{
				cotaAnterior.ui.addClass('paso');
			}
			
		});
	}
	
	var agregarCota = function(cota){
		listaCotas.push(cota);
		cota.index = listaCotas.length-1;
		
		
		var $cota = $('#plantilla_cota')
					.clone()
					.attr('id', 'idCota_' + cota.idCota);
		
		$pantalla_medicion.find('.lista_cotas').append($cota);
		$cota.show();
		
		
		$cota.find('.desc_cota').text(cota.descripcion);
		$cota.find('.desc_instrumento').text(cota.instrumento.descripcion);
		
	
		
		$cota.find('.valorMedicion,.regla').hide();
		
		var svgRegla = Snap('#' + $cota.attr('id') + ' svg.regla');
		//TODO: voy a probar sin la regla primero todo el circuito
		
		cota.ui = $cota;
		
		if(listaInstrumentos.indexOf(cota.instrumento.idInstrumento) < 0){
			agregarInstrumento(cota.instrumento.idInstrumento);
		}
		
	};
	
	var setCotaSiguiente = function(cota){
		cotaSiguiente = cota;
		$('.cota').removeClass('siguiente');
		cotaSiguiente.ui.addClass('siguiente');
	};
	
	
	
	
	
	/**************************************************************************/
	//TODO: pedir al charles que me mande las cotas de la base (en principio hardcoded)
	var listaCotas_SIMULADA_DESARROLLO = [
		{
			idCota: 1,
			descripcion: 'Cota costadito',
			instrumento: {
				idInstrumento: 111,
				descripcion: "Micrometro Mitutoyo Verde"
			},
			valor: 15.50,
			max: 16.00,
			min: 15.00
		},
		{
			idCota: 2,
			descripcion: 'Largo pitorro',
			instrumento: {
				idInstrumento: 111,
				descripcion: "Micrometro Peter Naranja"
			},
			valor: 15.50,
			max: 16.00,
			min: 15.00
		},
		{
			idCota: 3,
			descripcion: 'Ancho guraco',
			instrumento: {
				idInstrumento: 111,
				descripcion: "Calibre 38 Colt"
			},
			valor: 15.50,
			max: 16.00,
			min: 15.00
		},
		{
			idCota: 4,
			descripcion: 'Profundidad guraco',
			instrumento: {
				idInstrumento: 111,
				descripcion: "Micrometro Mitutoyo Violeta"
			},
			valor: 15.50,
			max: 16.00,
			min: 15.00
		}
	];
	
	
	_.each(listaCotas_SIMULADA_DESARROLLO, function(cota){
		agregarCota(cota);
	})
	
	/**************************************************************************/
	
	setCotaSiguiente(listaCotas[0]);
	
};