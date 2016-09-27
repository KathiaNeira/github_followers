$(document).ready(function(){
	var demo = function(){
		var dom, catchDom, afterCatchDom, suscribeEvents, events, initialize;
		var dom = {};
		var st = {
			btnSend : '#btnSend',
			follow	: '#follow',
			modal	 : '.overlay',
			repos  	: '.repos',
			reposFollowers : '.reposFollowers',
			nameFollowers : ''
		};
		catchDom = function(){
			dom.btnSend = $(st.btnSend);
			dom.follow	= $(st.follow);
			dom.modal	 = $(st.modal);
			dom.repos   = $(st.repos);
			dom.reposFollowers = $(st.reposFollowers);
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
				$(st.modal).css("display", "flex");
			},
			change: function(){
				if ($(this).val() != 0) {
					st.nameFollowers = $(this).val();
					//$(st.modal).empty();
					$(st.modal).css("display", "flex")
					$(st.btnSend).removeAttr('disabled');
					$(st.btnSend).css("background", "#7B7BDA");
					functions.repos(st.nameFollowers);
					// $(st.repos).append(`<span> ` + $(this).val()+ `</span>`  );
				}else{
					$(st.modal).css("display", "none")
					$(st.reposFollowers).empty();
					$(st.repos).empty();
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
					});
					}
				});
			},
			repos: function(nameFollowers){
				$(st.reposFollowers).empty();
				$(st.repos).empty();
				$.ajax({
					url: "https://api.github.com/users/"+nameFollowers+"/repos",
					type: "GET",
					dataType: "json",
					success:function(respuesta){
						respuesta.forEach(function(data){
							$(st.reposFollowers).append('<div class="projects"><a href="">' +data.name+ '</a></div>')
							$(st.repos).append('<img src=" '+data.owner.avatar_url+' " class="img_repo"/>'); //imagen
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
