var gestor_medicion = {
	
	onSetMedicionAnterior_vEventos: [],
	onSetMedicionAnterior: function(nuevoEvento){
		if(nuevoEvento === undefined){
			_.each(this.onSetMedicionAnterior_vEventos, function(evento){
				evento();
			});
		}else{
			this.onSetMedicionAnterior_vEventos.push(nuevoEvento);
		}
	},
	
	onSetMedicionSiguiente_vEventos: [],
	onSetMedicionSiguiente: function(nuevoEvento){
		if(nuevoEvento === undefined){
			_.each(this.onSetMedicionSiguiente_vEventos, function(evento){
				evento();
			});
		}else{
			this.onSetMedicionSiguiente_vEventos.push(nuevoEvento);
		}
	},
	
	setMedicionSiguiente: function(pieza, cota){
		
		datos.medicionSiguiente = {
			pieza: pieza,
			cota: cota
		};
		
		this.onSetMedicionSiguiente();
	},

	enviarPieza: function(pieza){
		var self = this;
		//INFO: Acá compongo el mensaje de piezaCompleta
		
		/*
		//TODO:
			- validar que todas las cotas estén completas, advertir con warning
		*/
		
		Vx.send({
			tipoDeMensaje: 'updatePieza',
			idUsuario: datos.idUsuario,
			pieza: pieza
		}, function(mensaje){
			console.log('recepcion de updatePieza ');
			console.log(mensaje);
		});
		
		delete datos.piezas[pieza.idPieza];
		
		
		
		pieza = {
			idTipoDePieza: pieza.idTipoDePieza,
			mediciones: []
		};
		
		
		Vx.send({
			tipoDeMensaje: 'newPieza',
			idUsuario: datos.idUsuario,
			pieza: pieza
		}, function(mensaje){
			
			pieza = $.extend(true, pieza, mensaje.pieza);
			
			datos.piezas[pieza.idPieza] = pieza;
			
			self.setMedicionSiguiente(pieza, datos.tiposDePieza[pieza.idTipoDePieza].cotas[0]);
		
		});
		
	},

	
	agregarInstrumento: function(instrumento){
		var self = this;
		
		/* DEFINICION
		Medicion Aislada
		{
			tipoDeMensaje: ‘medicionAislada’,
			idInstrumento: 111,
			valorMedicion: 2,5
		}
		*/
		
		Vx.when({
			tipoDeMensaje:"medicionAislada",
			idInstrumento: instrumento.idInstrumento
			
		},function(mensaje){
			
			var pieza = datos.medicionSiguiente.pieza;
			var tipoDePieza = datos.tiposDePieza[pieza.idTipoDePieza];
			var cota = datos.medicionSiguiente.cota;
			
			var medicion = {
				fecha				: moment().format('YYYY-MM-DD hh:mm:ss'),
				idCota				: cota.idCota,
				idInstrumento		: mensaje.idInstrumento,
				valorMedido			: mensaje.valorMedicion,
				idUsuarioMedidor	: datos.idUsuario
			};
			
			
			console.log('pieza');
			console.log(pieza);
			
			pieza.mediciones.push(medicion);
			// Acá podría enviar un piezaUpdate con la medicion solita
			
			datos.medicionAnterior = {
				pieza: pieza,
				cota: cota,
				medicion: medicion
			}
			
			/**************** SET SIGUIENTE ******************/
			
			var cotasMedidas = _.map(pieza.mediciones, function(item){
				return item.idCota;
			});
			
			var cotasTipoDePieza = _.map(tipoDePieza.cotas, function(item){
				return item.idCota;
			});
			
			var cotasPorMedir = _.difference(cotasTipoDePieza, cotasMedidas);
			
			if(cotasPorMedir[0]){
				self.setMedicionSiguiente(pieza, tipoDePieza.cotas[cotasPorMedir[0]-1]);
			}else{
				//INFO: todas las cotas estarían completas
				self.enviarPieza(pieza);
			}
			
			/**************** ************ ******************/
			
			self.onSetMedicionAnterior();
		});
		
		
	}
	
	
};