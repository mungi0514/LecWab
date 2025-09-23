var artCnt = {
	artCnt : function(){
		setTimeout(function(){
			artCnt.featureEve();
			artCnt.hoverEve();
			artCnt.shareEve();
		} , 0);

		setTimeout(function(){

		}, 300)
	},

	featureEve : function() {
			$('.btn_open').attr('class','btn_open');
			$('.lay_feature').css('display','none');
			$(".btn_open").click(function() {
				var display=$(this).next('.lay_feature').css('display');
				$('.btn_open').attr('class','btn_open');
				$('.lay_feature').css('display','none');
				if (display == "none") {
					$(this).attr('class','btn_open sub_on');
					if($(".atm_view .lay_feature").length) {
						//atm_view에서만 top style추가
						$(this).next('.lay_feature').css({
							'display': 'block',
							top:  ($(window).height() - 384 ) / 2 + $(window).scrollTop()
						});
					} else{
						$(this).next('.lay_feature').css('display', 'block');
					}

				} else {
					$(this).attr('class','btn_open');
					$(this).next('.lay_feature').css('display', 'none');
				}
			});

			$(".lay_feature .btn_close").click(function() {
				$('.lay_feature').css('display','none');
			});
		// }
	},

	hoverEve : function() {
		if($(".btn_title").length) {
	        $('a.btn_title').hover(
		        function(){
		            $('.lc_marea').css({'display':'block'});
		        },
		        function(){
		            $('.lc_marea').css({'display':'none'});
		        }
		    );

		    $('.lc_marea').hover(
		        function(){
		            $(this).css({'display':'block'});
		            $('a.btn_title').addClass('on');
		        },
		        function(){
		            $(this).css({'display':'none'});
		            $('a.btn_title').removeClass('on');
		        }
		    );
		}

		if($(".depth_3").length) {
		    $('.depth_3 > a').hover(
		        function(){
		            $('.gnlc_marea').css({'display':'block'});
		            $(this).css("color", "#000");
		        },
		        function(){
		            $('.gnlc_marea').css({'display':'none'});
		            $(this).css("color", "#777");
		            $('.on.depth_3 > a').css("color", "#ed1d25");
		        }
		    );
	    }
	},

	shareEve : function() {
		if($(".area_util_2023").length) {
			/*
	        $(document).on("click", ".share_btn", function (e) {
			    e.preventDefault();
			    var target = $(".wrapsns_layer");

				$(target).addClass("active");
				$(".share_btn").addClass("on");
				$("body").css({'height':'100%'});
			});
			*/

			let $shareEvn = $(".share_btn"),
				$fontEvn = $(".fontsize_btn"),
				$summaryEvn = $(".summary_btn");

			$shareEvn.on("mouseenter", function(e) {
		        e.preventDefault();

		        $(this).addClass("img_hov");
		    }).on("mouseleave", function() {
		        $(this).removeClass("img_hov");
		    });

		    /* 기사뷰 공유 레이어팝업 2024 */
			if($(".wrapsns_layer").length) {
				var share_pop = $(".share_btn");
				share_pop.on("click", function(event) {
					event.stopPropagation();

					$(".wrapsummnews_layer").removeClass("active");
					$(".fontsize_btn").removeClass("on");
					$(".fontsize_btn").removeClass("img_hov");
					$(".wrapfont_layer").removeClass("active");

					share_pop.toggleClass("on");

					var target = $(".wrapsns_layer");

			        if($(target).hasClass("active")) {
			        	$("body").removeClass({'height':'100%'});
			        	$(".share_btn").removeClass("img_hov");
	                    $(target).removeClass("active");
	                } else {
	                    $("body").css({'height':''});
	                    $(".share_btn").addClass("img_hov");
	                    $(target).addClass("active");
	                };
			    });

				$(".wrapsns_layer .btn_close").on("click", function () {
					var target = $(".wrapsns_layer");

					$(target).removeClass("active");
					$(".share_btn").removeClass("on");
					$(".share_btn").removeClass("img_hov");
					$('body').css({'overflow':'', 'height':''});
				});

				var wrapsnsTy = $(".wrapsns_layer");
			    $(document).click(function(e){
		            // 팝업 아이디
		            if (!wrapsnsTy.is(e.target) && wrapsnsTy.has(e.target).length === 0){
		                share_pop.removeClass("on");
		                wrapsnsTy.removeClass("active");
		            }
		        });
			}

			/* 기사뷰 숏뉴스 레이어팝업 2024 */
			if($(".summary_btn").length) {
				var summaryBtn = $(".summary_btn");
				summaryBtn.on("click", function(event) {
					event.stopPropagation();

					$(".share_btn").removeClass("on");
					$(".share_btn").removeClass("img_hov");
					$(".wrapsns_layer").removeClass("active");
					$(".fontsize_btn").removeClass("on");
					$(".fontsize_btn").removeClass("img_hov");
					$(".wrapfont_layer").removeClass("active");


					var target = $(".wrapsummnews_layer");

			        if($(target).hasClass("active")) {
						$('html').removeClass("scrollLock");
			        	$("body").removeClass({'height':'100%'});
	                    $(target).removeClass("active");


	                } else {
						$('html').addClass("scrollLock");
	                    $("body").css({'height':''});
	                    $(target).addClass("active");
	                    target.find('.txtbox').scrollTop( 0 );
	                };
				});

				/* 기사뷰 숏뉴스 레이어팝업 닫기 */
				$(".wrapsummnews_layer .btn_close").on("click", function () {
				    var target = $(".wrapsummnews_layer");

					$('html').removeClass("scrollLock");
				    $(target).removeClass("active");
				});

				var wrapsummaryTy = $(".wrapsummnews_layer");
			    $(document).click(function(e){
		            // 팝업 아이디
		            if (!wrapsummaryTy.is(e.target) && wrapsummaryTy.has(e.target).length === 0){
		                wrapsummaryTy.removeClass("active");
		            }
					$('html').removeClass("scrollLock");
		        });
			}

			$fontEvn.on("mouseenter", function(e) {
		        e.preventDefault();

		        $(this).addClass("img_hov");
		    }).on("mouseleave", function() {
		        $(this).removeClass("img_hov");
		    });

			/* 기사뷰 폰트 레이어팝업 2024 */
			if($(".fontsize_btn").length) {
				var fontBtn = $(".fontsize_btn");
				fontBtn.on("click", function(event) {
					event.stopPropagation();

					$(".wrapsummnews_layer").removeClass("active");
					$(".share_btn").removeClass("on");
					$(".share_btn").removeClass("img_hov");
					$(".wrapsns_layer").removeClass("active");

				    fontBtn.toggleClass("on");

					var target = $(".wrapfont_layer");

			        if($(target).hasClass("active")) {
			        	$("body").removeClass({'height':'100%'});
			        	$(".fontsize_btn").removeClass("img_hov");
	                    $(target).removeClass("active");
	                } else {
	                    $("body").css({'height':''});
	                    $(".fontsize_btn").addClass("img_hov");
	                    $(target).addClass("active");
	                };
				});

				/* 기사뷰 폰트 레이어팝업 2023 닫기 */
				$(".wrapfont_layer .btn_close").on("click", function () {
				    var target = $(".wrapfont_layer");

				    $(target).removeClass("active");
				    $(".fontsize_btn").removeClass("img_hov");
				    $(".fontsize_btn").removeClass("on");
				    $('body').css({'overflow':'', 'height':''});
				});

				var wrapfontTy = $(".wrapfont_layer");
			    $(document).click(function(e){
		            // 팝업 아이디
		            if (!wrapfontTy.is(e.target) && wrapfontTy.has(e.target).length === 0){
		                fontBtn.removeClass("on");
		                fontBtn.removeClass("img_hov");
		                wrapfontTy.removeClass("active");
		                wrapfontTy.removeClass("img_hov");
		            }
		        });
			}


			/* 뉴스 기사뷰 공유 더보기 레이어팝업 */
		    $('.btn_frame').click( function(e) {
		        e.preventDefault(); // stops link from making page jump to the top
		        e.stopPropagation(); // when you click the button, it stops the page from seeing it as clicking the body too
		        $('.area_floatbarn .frame_box').toggle();
		    });

		    /*
		    $('.area_floatbarn .frame_box').click( function(e) {
		        e.stopPropagation(); // when you click within the content area, it stops the page from seeing it as clicking the body too
		    });
		    */

		    $('.btn_goback').click( function(e) {
		        e.preventDefault(); // stops link from making page jump to the top
		        e.stopPropagation(); // when you click the button, it stops the page from seeing it as clicking the body too
		        $('.tit_sns .frame_box').toggle();
		    });

		    /*
		    $('.tit_sns .frame_box').click( function(e) {
		        e.stopPropagation(); // when you click within the content area, it stops the page from seeing it as clicking the body too
		    });
		    */

		    $('.btn_iframe').click( function(e) {
		        e.preventDefault(); // stops link from making page jump to the top
		        e.stopPropagation(); // when you click the button, it stops the page from seeing it as clicking the body too
		        $('.g_photo .util_com .frame_box').toggle();
		    });

		    $('.btn_iframe02').click( function(e) {
		        e.preventDefault(); // stops link from making page jump to the top
		        e.stopPropagation(); // when you click the button, it stops the page from seeing it as clicking the body too
		        $('.util_com .frame_box').toggle();
		    });

		    $('.btn_share').click( function(e) {
		        e.preventDefault(); // stops link from making page jump to the top
		        e.stopPropagation(); // when you click the button, it stops the page from seeing it as clicking the body too
		        $('.toon_sns .frame_box').toggle();
		    });

		    $('.btn_google > a').click( function(e) {
		        e.preventDefault(); // stops link from making page jump to the top
		        e.stopPropagation(); // when you click the button, it stops the page from seeing it as clicking the body too
		        $('.util_menu .flag_layerbox').toggle();
		    });

		    $('body').click( function() {
		        $('.area_floatbarn .frame_box').hide();
		        $('.tit_sns .frame_box').hide();
		        $('.photo_txt .frame_box').hide();
		        $('.util_com .frame_box').hide();
		        $('.g_photo .util_com .frame_box').hide();
		        $('.toon_sns .frame_box').hide();
		        $('.util_menu .flag_layerbox').hide();
		    });

		    /* 2020.05.19 공유하기버튼 */
		    $('.sns_area .share').click(function(){
		        $('.share_box').toggleClass('on');
		    });
		    /*$('.btn_comment').click(function(){
		        $(this).toggleClass('on');
		    })*/
		}
	}
}

$(function(){
	artCnt.artCnt();

	// 구독버튼 스크롤 표출
	if($("div").hasClass("area_info") === true) {
		window.addEventListener('scroll', function(){
			var this_scroll = $(this).scrollTop();
			var info_top=$('.area_info').offset().top;
			if(this_scroll <= info_top){
				$(".btn_naver_subs").fadeOut(300);
			}else{
				$(".btn_naver_subs").fadeIn(300);
				$(".btn_naver_subs").addClass("fixed");
			}
		});
		}
	// 네이버 랭킹 기사 스와이프
	var swiper = new Swiper(".n_ranking", {
		slidesPerView: 1,
		loop: true,
		autoplay: {
			delay: 3500,
			disableOnInteraction: false,
		},
		pagination: {
			el: ".swiper-pagination",
		},
	});

	// 2023.05.11 : 추가 외부영역 클릭 시 팝업 닫기
	$(document).mouseup(function (e) {
	    var LayerPopup3 = $(".lay_feature>.lay_inner>.btn_close"); /* 2023.05.11 : 특징주 팝업 닫기 추가 */

	    if (LayerPopup3.has(e.target).length === 0) {
	      LayerPopup3.removeClass("active");
	      $("[class*='feature'] > .btn_open").removeClass('sub_on');
	      $('.lay_feature').css('display','none');
	    }
	});

	$('.lay_feature').mouseup(function(e) {
		e.stopPropagation();
	});


});


