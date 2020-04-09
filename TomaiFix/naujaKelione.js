	function kelionesCrud(){
		var dialog, form,
			id, pav, apras, flag_poilsines, flag_pazintines, flag_viskas_isk, kaina, trukme_val;
		id_keliones = $( "#id" );
		pav_keliones = $( "#pav" );
		apras_keliones = $( "#apras" );
		flag_poilsines_keliones = $("#flagPoilsines");
		flag_pazintines_keliones = $("#flagPazintines");
		flag_viskas_isk_keliones = $("#flagViskasIsk");
		kaina_keliones = $("#kaina");
		trukme_val_keliones = $("#trukmeVal");
		allFields = $( [] ).add( id_keliones ).add( pav_keliones ).add( apras_keliones ).add( flag_poilsines_keliones ).add( flag_pazintines_keliones ).add( flag_viskas_isk_keliones ).add( kaina_keliones ).add( trukme_val_keliones );
		pasiimtiKeliones();
		dialog = $( "#dialog-form" ).dialog({
			autoOpen: false,
			height: "auto",
			width: 350,
			modal: true,
			buttons: {
				"Sukurti": function(){
					addKelione();
				},
				"Atsaukti": function() {
					$(this).dialog( "close" );
				}
			},
			close: function() {
				form[ 0 ].reset();
				allFields.removeClass( "ui-state-error" );
			}
		});
		trintidialog = $( "#dialog-confirm" ).dialog({
			autoOpen: false,
			resizable: false,
			height: "auto",
			width: 400,
			modal: true,
			buttons: {
				"Istrinti irasa": function() {
					$.ajax('/ajax/salinti-kelione?' + params_str)
					.done( function( data ) {
						trintidialog.dialog( "close" );
						pasiimtiKeliones();
					});
				},
				"Atsaukti": function() {
					$(this).dialog( "close" );
				}
			},
			close: function() {
				form[ 0 ].reset();
				allFields.removeClass( "ui-state-error" );
			}
		});
		form = dialog.find( 'form' ).on ("submit", function(event){
			event.preventDefault();
			addKelione();
		});
		
		function keistiBusena( id, busena) {
			params_str = 'id=' + id;
			if (busena == 'trinti'){
				$('#pav').val(pav);
				trintidialog.dialog( "open" );				
			}
			if (busena == 'redaguoti'){
				
				$( '#pav_veiksmo' ).html ( 'Redaguojamas irasas' );
				$('#id').val(id);
				$( '#pav' ).val(pav);
				$( '#apras' ).val(apras);
				$('#flagPoilsines').val(flag_poilsines);
				$('#flagPazintines').val(flag_pazintines);
				$('#flagViskasIsk').val(flag_viskas_isk);
				$( '#kaina' ).val(kaina);
				$( '#trukmeVal' ).val(trukme_val);
				if ( flag_poilsines == 1){
					alert("flag poilsines pazymeti");
					document.getElementById("flagPoilsines").checked = true;
				} else {
					document.getElementById("flagPoilsines").checked = false;
				}
				if ( flag_pazintines == 1){
					alert("flag pazintines pazymeti");
					document.getElementById("flagPazintines").checked = true;
				} else {
					document.getElementById("flagPazintines").checked = false;
				}
				if ( flag_viskas_isk == 1){
					alert("flag viskas iskaiciuota pazymeti");
					document.getElementById("flagViskasIsk").checked = true;
				} else {
					document.getElementById("flagViskasIsk").checked = false;
				}
				dialog.dialog( "open" );
				
			}
		}

		function pasiimtiKeliones() {
			
			alert ("Kelioniu sarasas");
		
			$.ajax( '/ajax/lst-keliones' 
				
															/*
															, beforeSend: function( xhr ) {
																xhr.overrideMimeType( "text/plain; charset=x-user-defined" );
															}
															*/
			)
			.done( function( data ) {
																		// alert ( 'jquery ok ' + data );
				res_str = '<table>'
						+ '<tr>'
							+ '<th>Id</th>'
							+ '<th>Pavadinimas</th>'
							+ '<th>Aprasymas</th>'
							+ '<th>Poilsines</th>'
							+ '<th>Pazintines</th>'
							+ '<th>Viskas iskaiciuota</th>'
							+ '<th>Kaina</th>'
							+ '<th>Trukme val</th>'
							+ '<th>Veiksmai</th>'
						+ '</tr>';
				for ( i = 0; i < data.length; i++) {
					
					if (data [ i ].flagPoilsines == 1){
						checked1 = "&check;";
					} else {
						checked1 = "&cross;";
					}
					if (data [ i ].flagPazintines == 1){
						checked2 = "&check;";
					} else {
						checked2 = "&cross;";
					}
					if (data [ i ].flagViskasIsk == 1){
						checked3 = "&check;";
					} else {
						checked3 = "&cross;";
					}
					res_str += '<tr data-id="' + data [ i ].id  
						+ '" data-pav="' + data [ i ].pav 
						+ '" data-apras="' + data [ i ].apras 
						+ '" data-flagpoilsines="' + data [ i ].flagPoilsines 
						+ '" data-flagpazintines="' + data [ i ].flagPazintines 
						+ '" data-flagviskasisk="' + data [ i ].flagViskasIsk
						+ '" data-kaina="' + data [ i ].kaina 
						+ '" data-trukmeval="' + data [ i ].trukmeVal 
						+ '">'
						+ '<td>' + data [ i ].id + '</td>' 
						+ '<td>' + data [ i ].pav + '</td>'
						+ '<td>' + data [ i ].apras + '</td>'
						+ '<td>'
						+ '<div  id="flagXxxPoilsines" value="' + data [ i ].flagPoilsines + '">' + checked1 + '</div>'
						+ '</td>'
						+ '<td>' 
						+ '<div  id="flagXxxPazintines" value="' + data [ i ].flagPazintines + '">' + checked2 + '</div>'
						+ '</td>'
						+ '<td>'
						+ '<div  id="flagXxxViskasIsk"" value="' + data [ i ].flagViskasIsk + '">' + checked3 + '</div>'
						+ '</td>'
						+ '<td>' + data [ i ].kaina + '</td>'
						+ '<td>' + data [ i ].trukmeVal + '</td>'
						+ '<td><input type="button" class="trinti" value="trinti">'
						+ '<input type="button" class="redaguoti" value="redaguoti"></td>'
						;
					
					res_str += '</tr>';
				}
				res_str += '</table>';
				$( '#keliones' ).html ( res_str );
				$( "#create-kelione" ).button().on( "click", function() {
					$( '#pav_veiksmo' ).html ( 'Kuriamas naujas irasas' );
					$( '#id' ).val ( '0' );
					dialog.dialog( "open" );
				});
				$( '.trinti' ).on ( 'click', function() {
						
					$( this ).each ( function() {
						
						id = $( this ).parent( ).parent().data ( 'id' );

						keistiBusena ( id, 'trinti' );
					});
				});
				
				$( '.redaguoti' ).on ( 'click', function() {
				
					$( this ).each ( function() {
						
						id = $( this ).parent( ).parent().data ( 'id' );
						pav = $( this ).parent().parent().data ('pav');
						apras = $( this ).parent().parent().data ('apras');
						flag_poilsines = $( this ).parent().parent().data ('flagpoilsines');
						flag_pazintines = $( this ).parent().parent().data ('flagpazintines');
						flag_viskas_isk = $( this ).parent().parent().data ('flagviskasisk');
						kaina = $( this ).parent().parent().data ('kaina');
						trukme_val = $( this ).parent().parent().data ('trukmeval');
						alert("flag " + " " + flag_poilsines + " " + flag_pazintines + " " + flag_viskas_isk);
						keistiBusena ( id, 'redaguoti' );
						
					});
				});	
				
			});
		}			
				
				
		function addKelione() {
			
			alert ( 'Saugoma ' );
			var flagPoilsinesCheckbox = $ ( "#flagPoilsines"  ).prop ( 'checked' );
			alert(flagPoilsinesCheckbox);
			var flagPazintinesCheckbox = $ ( "#flagPazintines" ).prop ( 'checked' );
			alert(flagPazintinesCheckbox);
			var flagViskasIskCheckbox = $ ( "#flagViskasIsk").prop ( 'checked' );
			alert(flagViskasIskCheckbox);
			
			nauja_kelione= {
				id: $('#id').val()
				, pav: $( '#pav' ).val()
				, apras: $('#apras').val()
				, flagPoilsines:  ( flagPoilsinesCheckbox ? '1' : '0' )
				, flagPazintines:  ( flagPazintinesCheckbox ? '1' : '0' )
				, flagViskasIsk:  ( flagViskasIskCheckbox ? '1' : '0' )
				, kaina:  $( '#kaina' ).val() 
				, trukmeVal:  $( '#trukmeVal' ).val() 
			}

			// alert ( 'miestas ' + miestas.pav + ' ' );
			
			params_str = 
				"id=" + nauja_kelione.id
				+ "&pav="  + nauja_kelione.pav
				+ "&apras=" + nauja_kelione.apras
				+ "&flagPoilsines=" + nauja_kelione.flagPoilsines
				+ "&flagPazintines=" + nauja_kelione.flagPazintines
				+ "&flagViskasIsk=" + nauja_kelione.flagViskasIsk
				+ "&kaina=" + nauja_kelione.kaina
				+ "&trukmeVal=" + nauja_kelione.trukmeVal

			alert ( "/ajax/saugoti-kelione?" + params_str );
				
			$.ajax(
				 "/ajax/saugoti-kelione?" + params_str
				)

			.done( function( data ) {
				
				dialog.dialog ("close");
				pasiimtiKeliones();
				/*$('#id').val('0');
				$( '#pav' ).val('');
				$('#apras').val('');
				$( '#flagPoilsines' ).val('');
				$( '#flagPazintines' ).val('');
				$( '#flagViskasIsk' ).val('');
				$( '#kaina' ).val('');
				$( '#trukmeVal' ).val('');
				*/
				
			});
			
		}
	}