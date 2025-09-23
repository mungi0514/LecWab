function wingCheck()
{
	var scr_width = $(window).width();
	var objArr_l = $('#wing_left');
	var objArr_r = $('#wing_right');

	if(scr_width >= 1358){
		objArr_l.css({'width':'160px'});
		objArr_r.css({'width':'160px'});
	}
	/*
	else{
		objArr_l.css({'width':'120px'});
		objArr_r.css({'width':'120px'});
	}
	*/

	objArr_l.show();
	objArr_r.show();
}

$(window).resize(function() {
	wingCheck();
});

$(function(){
	wingCheck();

	var $win = $(window);
	var top = $(window).scrollTop(); // 현재 스크롤바의 위치값을 반환합니다.

	//사용자 설정 값 시작
	var speed          = 'fast';			// 따라다닐 속도 : "slow", "normal", or "fast" or numeric(단위:msec)
	var easing         = 'linear';			// 따라다니는 방법 기본 두가지 linear, swing
	var $layer1        = $('#wing_left');	// 레이어 셀렉팅
	var $layer2        = $('#wing_right');	// 레이어 셀렉팅
	var layerTopOffset = 210;				// 레이어 높이 상한선, 단위:px
	$layer1.css('position', 'absolute');
	$layer2.css('position', 'absolute');
	//사용자 설정 값 끝

	// 스크롤 바를 내린 상태에서 리프레시 했을 경우를 위해
	if (top > 0 )
		$win.scrollTop(layerTopOffset+top);
	else
		$win.scrollTop(0);

	//스크롤이벤트가 발생하면
	window.addEventListener('scroll', function(){
		yPosition = $win.scrollTop() - 140;
		if(yPosition < 0)
		{
			//상단띠우는간격
			yPosition = 210;
		}else{
			yPosition = yPosition+240;
		}

		var docHeight = $(document).height()-1450;
		if(yPosition>docHeight)
		{
			yPosition = docHeight;
		}

		$layer1.animate({"top":yPosition }, {duration:speed, easing:easing, queue:false});
		$layer2.animate({"top":yPosition }, {duration:speed, easing:easing, queue:false});
	});
});
