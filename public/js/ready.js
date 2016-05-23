$(document).ready(function(){
	var demo = function(){
		var dom, catchDom, afterCatchDom, suscribeEvents, events, initialize;
		var dom = {};
		var st = {
			btnSend : '#btnSend',
			follow	: '#follow',
			modal	 : '.overlay',
			repos  	: '.repos',
			nameFollowers : ''
		};
		catchDom = function(){
			dom.btnSend = $(st.btnSend);
			dom.follow	= $(st.follow);
			dom.modal	 = $(st.modal);
			dom.repos   = $(st.repos);
		};
		afterCatchDom = function(){
			functions.send();
		};
		suscribeEvents = function(){
			dom.btnSend.on("click", events.showModal);
			dom.follow.on("change", events.change);
		};
		events = {
			showModal: function(){
				console.log("Enviaste un regalo =)");
				$(st.modal).css("display", "flex");
				functions.repos(st.nameFollowers);
			},
			change: function(){
				if ($(this).val() != 0) {
					st.nameFollowers = $(this).val();
					//$(st.modal).empty();
					$(st.modal).css("display", "none")
					$(st.btnSend).removeAttr('disabled');
					$(st.btnSend).css("background", "#7B7BDA");
					// $(st.repos).append(`<span> ` + $(this).val()+ `</span>`  );
				}else{
					console.log("no hay nada");
					$(st.btnSend).attr("disabled", "disabled");
					$(st.btnSend).css("background", "#CBCBF1");
				}
			},
		};
		var functions = {
			send: function(){
				$.ajax({
					url: "https://api.github.com/users/KathiaNeira/followers",
					type: "GET",
					dataType: "json",
					success:function(resp){
						resp.forEach(function(data, nameFollowers) {
							var width  = 200;
							var height = 200;
							$("select").append('<option>' +data.login+ '</option>');
							console.log(data.avatar_url);
							$(st.repos).append('<img src=" '+data.avatar_url+' " class="img_repo"/>'); //imagen
					});
					}
				});
			},
			repos: function(nameFollowers){
				$.ajax({
					url: "https://api.github.com/users/"+nameFollowers+"/repos",
					type: "GET",
					dataType: "json",
					success:function(respuesta){
						respuesta.forEach(function(data){
							console.log(data);
							$(st.modal).append('<a href="">' +data.name+ '</a>')
						});
					}
				});
			}
		};

		var initialize = function(){
			catchDom();
			afterCatchDom();
			suscribeEvents();
		};
		return{
			init: initialize
		};
	};
	demo().init();
});
