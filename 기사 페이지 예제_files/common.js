$(document).ready(function(){
	if( $('a').hasClass('imad_link_ad') ){
        $(".imad_link_ad").each(function (i) {
            ad_href = $(this).attr("href");
			imad_link_url = new URL( $(this).attr("href") );
			url_params = imad_link_url.searchParams;
			is_chk_no = getFindCode(url_params.get('b'));

			if( is_chk_no != false ){
				imad_click_url = ad_href.replace(/http:\/\/adc\.imadrep\.co\.kr/ , 'https:\/\/my\.newscover\.co\.kr\/_log');	
				$(this).attr("href", imad_click_url);
			}
        });
    }
});

function getFindCode(b){
	var is_check = false;
	var limit_code = ['2835580','1450209','1450210' , '1114171' ,'3095080'];

	if(/^[0-9]*$/.test(b)){
		var n = parseInt(b[0]) + 1;
		var s = n + 1;
		var e = b[n] ;
		var code_no = b.substr( s , e);

		if($.inArray(code_no, limit_code) > -1){
			is_check = true
		}
	}

	return is_check;
}