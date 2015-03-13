$(document).ready(function() {  
    //toda esta garcha es para detectar si la aplicacion esta corriendo en un celular o en una pc.
    //En el celular para arrancar la app hay que esperar al evento deviceReady, en la pc solo al documentReady
    //window.isphone = false;
	window.isphone = (document.URL.indexOf("com.") > 0);

    if(window.isphone) {
        document.addEventListener("deviceready", onDeviceReady, false);
    } else {
        onDeviceReady();
    }
});


var onDeviceReady = function() {
    
	vx.start({verbose:false});
    
	vx.conectarPorWebSockets({
		url: 'https://sime-backend.herokuapp.com'
	});
	/**************/
	
	var listaCotas=[];
	var cotaAnterior;
	var cotaSiguiente;
	
	var agregarCota = function(cota){
		listaCotas.push(cota);
		cota.index = listaCotas.length-1;
		
		var $cota = $('#plantilla_cota')
					.clone()
					.attr('id', 'idCota_' + cota.idCota)
					.appendTo('#lista_cotas')
					.show();
		
		$cota.find('.desc_cota').text(cota.descripcion);
		$cota.find('.desc_instrumento').text(cota.instrumento.descripcion);
		
	
		
		$cota.find('.valorMedicion,.regla').hide();
		
		var svgRegla = Snap('#' + $cota.attr('id') + ' svg.regla');
		//TODO: voy a probar sin la regla primero todo el circuito
		
		cota.ui = $cota;
		
		
		/* DEFINICION
		Medicion Aislada
		{
			tipoDeMensaje: ‘medicionAislada’,
			idInstrumento: 111,
			valorMedicion: 2,5,
			unidad:”cm”
		}
		*/
		
		
		
		/* TODO: debería publicar un filtro por instrumento */
		vx.when({
			tipoDeMensaje:"medicionAislada",
			idInstrumento: cota.instrumento.idInstrumento
		},function(mensaje){
			
			alert('llegó un tipoDeMensaje medicionAislada');
			
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
			
			/*
			vx.send({
				tipoDeMensaje: 'medicionCompleta',
				idInstrumento: mensaje.idInstrumento,
				valorMedicion: mensaje.valorMedicion,
				idPieza: 999,	//<<<<<<<< TODO: falta setear la pieza
				idCota: cotaSiguiente.idCota,
				idOperario: 999,	//<<<<<<<< TODO: falta setear el usuario
			});
			*/
			
			cotaAnterior = cotaSiguiente;
			if(cotaSiguiente.index + 1 == listaCotas.length){
				setCotaSiguiente(listaCotas[0]);
			}else{
				setCotaSiguiente(listaCotas[cotaSiguiente.index + 1]);
			}
			
			cotaAnterior.ui.find('.valorMedicion').text(mensaje.valorMedicion + ' ' + mensaje.unidad);
			$('.cota').removeClass('anterior');
			cotaAnterior.ui.addClass('anterior');
			
			if(mensaje.valorMedicion < cotaAnterior.min || mensaje.valorMedicion > cotaAnterior.max){
				$('.cota').removeClass('no_paso');
				cotaAnterior.ui.addClass('no_paso');
			}else{
				$('.cota').removeClass('paso');
				cotaAnterior.ui.addClass('paso');
			}
			
		});
				
	};
	
	var setCotaSiguiente = function(cota){
		cotaSiguiente = cota;
		$('.cota').removeClass('siguiente');
		cotaSiguiente.ui.addClass('siguiente');
	};
	
	
	
	
	
	/**************************************************************************/
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
	
	
	
	//DEBUG
	$('body').on('click', function(){
		
	});
	
	
	
	if(window.plugin){
		window.plugin.backgroundMode.enable();
	}
};




