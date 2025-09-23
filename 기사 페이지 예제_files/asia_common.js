$(function(){
	//////////////////////////////////////////////////
	// 모바일 링크변경
	//////////////////////////////////////////////////
	var UserAgent = navigator.userAgent;
	/* 모바일 접근 체크*/
	if (UserAgent.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || UserAgent.match(/LG|SAMSUNG|Samsung/) != null) {
		$('[data-mUrl]').each(function(index) {
			let mUrl = $(this).attr('data-mUrl');
			if(mUrl!=null && mUrl!='' && mUrl!=undefined){
				$(this).attr('href', mUrl);
			}
		});
	}
	//////////////////////////////////////////////////
	// 모바일 링크변경//
	//////////////////////////////////////////////////


	//////////////////////////////////////////////////
	// 앱다운로드
	//////////////////////////////////////////////////
	var currentOS;
	var mobile = (/iphone|ipad|ipod|android/i.test(navigator.userAgent.toLowerCase()));

	if (mobile) {
		// 유저에이전트를 불러와서 OS를 구분합니다.
		var userAgent = navigator.userAgent.toLowerCase();

		if (userAgent.search("android") > -1)
			currentOS = "android";
		else if ((userAgent.search("iphone") > -1) || (userAgent.search("ipod") > -1) || (userAgent.search("ipad") > -1))
			currentOS = "ios";
		else
			currentOS = "else";
	} else {
		// 모바일이 아닐 때
		currentOS = "nomobile";
	}

	var appLink = 'https://play.google.com/store/apps/details?id=org.asiae.google';
	if(currentOS == "ios"){
		appLink = 'http://itunes.apple.com/kr/app/id348579978';
	}

	$("#footerApp").click(function(e){
		document.location.href = appLink;
	});
	//////////////////////////////////////////////////
	// 앱다운로드//
	//////////////////////////////////////////////////


	//////////////////////////////////////////////////
	// 로그인체크
	//////////////////////////////////////////////////
	/*if(get_cookie('snsid') && get_cookie('islogin')=='1' && get_cookie('UniqueAknKey'))
	{
		$('.utile_menu').addClass('mem_user'); //pc
		$('.mem_login').attr('class', 'mem_user'); //mobile

		let snsform = get_cookie('snsform');
		let snsClass = '';
		if(snsform=='a'){snsClass = 'sns_asiae';}
		else if(snsform=='n'){snsClass = 'sns_naver';}
		else if(snsform=='k'){snsClass = 'sns_kko';}
		else if(snsform=='f'){snsClass = 'sns_facebook';}
		else if(snsform=='g'){snsClass = 'sns_google';}
		else{snsClass = 'sns_asia';}
		$('.user').addClass(snsClass);

		let nick = get_cookie('asia_nick');
		nick = decodeURIComponent(decodeURI(nick).replace(/\+/g, " "));
		$('#myNick').html(nick);
		$('#myNick_m').html(nick);

		$('#bottom_login').hide();
		$('#bottom_logout').show();
	}
	$('.utile_menu').show();*/
	//////////////////////////////////////////////////
	// 로그인체크 //
	//////////////////////////////////////////////////

	////////////////////////////
	///로그인 체크 ver2
	/////////////////////////////
	if(get_cookie('check_login'))
		login_check();		
	else
		login_area_show();
	////////////////////////////
	///로그인 체크 ver2 //
	/////////////////////////////
});

let bLoginCheck=false;
function login_check()
{
	if(!bLoginCheck)
	{
		bLoginCheck=true;
		$.ajax({
			url: 'https://user.asiae.co.kr/snslogin/login_info.php',
			dataType: 'jsonp',
			jsonp : "callback",
			cache: false,
			success: function(getData){
				let data = getData;
				if(data['result'] != 'error' )
				{
					if(data['result'] == '100')
					{
						$('.utile_menu').addClass('mem_user'); //pc
						//$('.mem_login').attr('class', 'mem_user'); //mobile
						$('.member_login').attr('class', 'member_user'); //mobile
				
						let login_form = data['data']['login_form'];
						let nick = data['data']['user_nick'];
						let Login_class = '';
						if(login_form=='a'){Login_class = 'sns_asiae';}
						else if(login_form=='n'){Login_class = 'sns_naver';}
						else if(login_form=='k'){Login_class = 'sns_kko';}
						else if(login_form=='f'){Login_class = 'sns_facebook';}
						else if(login_form=='g'){Login_class = 'sns_google';}
						else{Login_class = 'sns_asia';}
						$('.user').addClass(Login_class);
				
						$('#myNick').html(nick);
						$('#myNick_m').html(nick);
				
						$('#bottom_login').hide();
						$('#bottom_logout').show();
					}
				}
			},
			complete :function()
			{
				login_area_show();
			},
			error: function(getData,status,err){
				console.log('login_check error');
			}
		});
	}
}


function login_area_show()
{	
	//data-show가 none이면 로그인 영역 display:none;
	let login_show=$('.utile_menu').data('show');
	if(login_show != 'none')	$('.utile_menu').show();
}


function set_cookie(name, value, expires, path, domain, secure)
{
	var argv = set_cookie.arguments;
	var argc = set_cookie.arguments.length;
	var expires = (2 < argc) ? argv[2] : null;
	var path = (3 < argc) ? argv[3] : null;
	var domain = (4 < argc) ? argv[4] : null;
	var secure = (5 < argc) ? argv[5] : false;
	var strCookie = name + "=" + escape (value) + 
		((expires == null || !expires ) ? "" : 
			("; expires=" + expires.toGMTString())) + 
		((path == null) ? "" : ("; path=" + path)) + 
		((domain == null) ? "" : ("; domain=" + domain)) + 
		((secure == true) ? "; secure" : "");

	document.cookie = strCookie;
}


function get_cookie(cookieName)
{
    var cookieValue=null;
    if(document.cookie){
        var array=document.cookie.split((escape(cookieName)+'='));
        if(array.length >= 2){
            var arraySub=array[1].split(';');
            cookieValue=unescape(arraySub[0]);
        }
    }
    return cookieValue;
}


function delete_cookie( name, path, domain )
{
  if( get_cookie( name ) ) {
    document.cookie = name + "=" +
      ((path) ? ";path="+path:"")+
      ((domain)?";domain="+domain:"") +
      ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
  }
}

function LoginPageJump_n()
{
	var strUrl = document.location.href;

	strUrl = strUrl.replace(/\</g, "&lt;");
	strUrl = strUrl.replace(/\>/g, "&gt;");

	SetCookie("JUMP_URI", strUrl, 0, "/", ".asiae.co.kr" );

	document.location.href="https://user.asiae.co.kr/snslogin/login.htm?udt=1";
}
