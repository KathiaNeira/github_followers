$(document).ready(function(){
	var demo = function(){
		var dom, catchDom, afterCatchDom, suscribeEvents, events, initialize;
		var dom = {};
		var st = {
			btnSend : '#btnSend',
			follow	: '#follow',
      modal   : '.overlay'
		};
		catchDom = function(){
			dom.btnSend = $(st.btnSend);
			dom.follow	= $(st.follow);
      dom.modal   = $(st.modal);
		};
		afterCatchDom = function(){
			functions.send();
      functions.btn();
		};
		suscribeEvents = function(){
			dom.btnSend.on("click", events.alert);
      dom.follow.on("change", events.change);
		};
		events = {
			alert: function(){
				console.log("Enviaste un regalo =)");
        $(st.modal).css("display", "flex");

			},
      change: function(){
        if ($(this).val() != 0) {
          $(st.btnSend).removeAttr('disabled');
          $(st.btnSend).css("background", "#7B7BDA");
          console.log("Enviaste un regalo a "+$(this).val());
           return false;
        }else{
          console.log("no hay nada");
           return false;
          // $(st.btnSend).attr('disabled', 'true');
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
						resp.forEach(function(data) {
							$("select").append('<option>' +data.login+ '</option>');
              $(st.modal).append(`<div>${data.login} <img src="${data.avatar_url}" width="50px" height="50px"/></div>`)
					});
					}
				});
			},
      btn: function(){

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
