(function($){
	$.fn.reveal = function(callback, undo_callback){
		if($(this).size() < 1) return;
		var tamanho_da_janela, posicao_do_elemento_na_janela, scroll_da_janela;
		var tamanho_do_objeto = $(this).height();
		var me = this;
		var obj = $(this);
		var callback = callback;
		var undo_callback = undo_callback;
		var disparou_callback = "nao_disparou";

		this.elemento_apareceu = function(){
			var linha_de_baixo_da_janela = scroll_da_janela + tamanho_da_janela;
			var linha_de_cima_da_janela = scroll_da_janela;

			if (linha_de_baixo_da_janela > posicao_do_elemento_na_janela){
				return linha_de_cima_da_janela < posicao_do_elemento_na_janela + tamanho_do_objeto;
			} else {
				return false;
			}
		}

		$(window).resize(function(){
			tamanho_da_janela = $(window).height();
			$(window).scroll();
		});

		$(window).scroll(function(){
			scroll_da_janela = $(window).scrollTop();
			posicao_do_elemento_na_janela = obj.offset()["top"];
			if(me.elemento_apareceu()){
				if(disparou_callback == "nao_disparou" || disparou_callback == "disparou_mas_voltou"){
					callback.call();
					disparou_callback = "ja_disparou";
				}
			} else if(disparou_callback == "ja_disparou") {
				undo_callback.call();
				disparou_callback = "disparou_mas_voltou";
			}
		})
		$(window).resize();
	}
})(jQuery);
