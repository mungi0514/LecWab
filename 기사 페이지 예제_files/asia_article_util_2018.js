function article_scrap( idxno )
{
	if( idxno=='' || idxno==undefined )
		return;
	else
	{
		var url = 'https://www.asiae.co.kr/scrap/scrap.htm?idxno=' + idxno;
		WinCenterOpen(url, 'scrap', 390, 150, 'toolbar=0,scrollbars=no,resizable=no');
	} 
}


function fontPlusMinus(type)
{
	var getSize = $('.article_view #txt_area').css('fontSize');
	var num = parseFloat(getSize, 10);
	var unit = getSize.slice(-2);

	if(type=='p')
	{
		if(num<21)
			num = num + 2;
		else if(num==21)
			alert('더 이상 글자를 크게 할 수 없습니다.');
	}
	else
	{
		if(num>11)
			num = num - 2;
		else if(num==11)
			alert('더 이상 글자를 작게 할 수 없습니다.');
	}
	$('.article_view #txt_area').css('fontSize',num+unit);
}

function fontPlusMinus2(size)
{
	$('.article_view #txt_area').css('fontSize',size);
}
//페이스북 본문드레그
(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.src = "https://connect.facebook.net/eu_US/sdk.js#xfbml=1&version=v2.6";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
//페이스북 본문드레그


function urlLink()
{
	var URL = $(location).attr('href');
	prompt('트랙백 주소입니다. Ctrl+C 를 눌러 클립보드에 복사하세요.', URL);
}


$(function () {
		//주소복사
		if(eval($('#urlcopy, #urlcopy_f, #urlcopy_2').length) > 0)	
		{
			var clipurl = $(location).attr('href');
			
			var urlcopy=$('#urlcopy').attr('data-clipboard-text');
			var urlcopy_f=$('#urlcopy_f').attr('data-clipboard-text');
			var urlcopy_2=$('#urlcopy_2').attr('data-clipboard-text');

			if(urlcopy == '' || urlcopy == undefined) $('#urlcopy').attr('data-clipboard-text', clipurl);
			if(urlcopy_f == '' || urlcopy_f == undefined) $('#urlcopy_f').attr('data-clipboard-text', clipurl);
			if(urlcopy_2 == '' || urlcopy_2 == undefined) $('#urlcopy_2').attr('data-clipboard-text', clipurl);
			 

			var clipboard = new Clipboard('#urlcopy, #urlcopy_f, #urlcopy_2');
			clipboard.on('success', function(e) {
			    alert("주소가 복사 되었습니다.");
			});
			clipboard.on('error', function(e) {
				console.log(e);
			});
		}
		
		if(get_cookie('check_login'))
		{
			//아경 뷰 스크랩
			let scrap_btn=eval(('.scrap_btn').length);
			if(scrap_btn>0)
			{				
				let idx = $('.scrap_btn').data('id');//기사idxno
				$('.scrap_btn').attr('href', `javascript:article_scrap( '${idx}' );`);
			}
		}
});

var audio;
function play_audio()
{
	var voiceurl=$('#voice_url').val();
	if(!audio)
	{
		audio = new Audio(voiceurl);
		audio.addEventListener('ended',function(){
			$('#playbtn').attr('class','off_plybtn');
		});
	}


	if($('#playbtn').hasClass('off_plybtn'))
	{
		$('#playbtn').attr('class','on_plybtn');
		audio.play();
	}
	else
	{
		$('#playbtn').attr('class','off_plybtn');
		audio.pause();
	}
}

function play_audio2()
{
	var voiceurl=$('#voice_url').val();
	if(!audio)
	{
		audio = new Audio(voiceurl);
		audio.addEventListener('ended',function(){
			//$('#playbtn').attr('class','off_plybtn');
			$('#playbtn').removeClass('on');
		});
	}

	if(!$('#playbtn').hasClass('on'))
	{
		$('#playbtn').addClass('on');
		$('#playbtn').removeClass('off');
		audio.play();
	}
	else
	{
		$('#playbtn').removeClass('on');
		$('#playbtn').addClass('off');
		audio.pause();
	}
}
