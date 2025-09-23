var comPub = {
	comSub : function(){
		setTimeout(function(){
			comPub.subSwpe();
			comPub.menuDatety();
			comPub.setTopButton();
			comPub.inputSubeve();
			comPub.optEvn();
			//comPub.setMarquee();
			comPub.tabEvn();
			comPub.moreEvn();
			comPub.modalEvn(); // 재추가
			comPub.dropEvn();
			comPub.tooltipEvn();
			comPub.bindSlideTabs();
		} , 0);
		
		setTimeout(function(){
			comPub.setTopBnr();
		}, 300)
	},

	subSwpe : function() {
		if($(".ft_service").length) {
			let eventCnt = $('.event').find('.swiper-slide').length;
			let eventLoop = true;
			if(eventCnt<2)
			eventLoop = false;

			const eventSwiper = new Swiper('.event > .swiper-container', {
				direction: 'vertical',
			    effect: 'slide',
			    slidesPerView: 1,
			    loop: eventLoop,
			    autoplay: {
			        delay: 4000,
			        reverseDirection: true,
			        disableOnInteraction: false,
			    },
	        });
		}

		if($('.h_area > dl > dd > nav').length) {
			/* 2023.11 : kmy 수정 */
			//var stickytblWidth = 1729; /* 2023.11 : kmy 삭제 */

			if($('.sub_nav').length) {
				/* 2023.11 : 수정 */
				const scrollBox = document.querySelector(".sub_nav");
				var isDown = false;
				var scrollX;
				var scrollLeft;

				// Mouse Up Function
				scrollBox.addEventListener("mouseup", () => {
					isDown = false;
					scrollBox.classList.remove("active");
				});

				// Mouse Leave Function
				scrollBox.addEventListener("mouseleave", () => {
					isDown = false;
					scrollBox.classList.remove("active");
				});

				// Mouse Down Function
				scrollBox.addEventListener("mousedown", (e) => {
					e.preventDefault();
					isDown = true;
					scrollBox.classList.add("active");
					scrollX = e.pageX - scrollBox.offsetLeft;
					scrollLeft = scrollBox.scrollLeft;
				});

				// Mouse Move Function
				scrollBox.addEventListener("mousemove", (e) => {
					if (!isDown) return;
					e.preventDefault();
					var element = e.pageX - scrollBox.offsetLeft;
					var scrolling = (element - scrollX) * 2;
					scrollBox.scrollLeft = scrollLeft - scrolling;
				});

				if($(".is_on").length) {
					var scroller = $(".sub_nav");
					var scrollMenuOnt = $(".nav_l>li.is_on");

					scroller.animate({
						//'scrollLeft': scroller + position.left - 30
						'scrollLeft' : scrollMenuOnt.position().left - 50
					}, 700);
				}
				/* 2023.11 : 수정 End */
			}

			/*
			var x,y,top,left,down;

			$(".nav_l").mousedown(function(e){
				e.preventDefault();
				down = true;
				x = e.pageX;
				left = $(this).scrollLeft();
			});

			$("body").mousemove(function(e){
				if(down){
					var newX = e.pageX;
					$(".nav_l").scrollLeft(left - newX + x);    
				}
			});

			$("body").mouseup(function(e){down = false;});

			// 서브 탭 스크롤
			var pageList = ".nav_l";
			//var pageListFadeEl = ".scroll_fade";
			var pageListItem = ".nav_l li";

			$(pageList).on("scroll", function() {
				console.log($(this)[0].offsetWidth);
				var scrollLeft = $(this).scrollLeft();
				var pageListWidth = $(this)[0].scrollWidth - $(this)[0].offsetWidth;

				if(scrollLeft === pageListWidth){
					//$(this).siblings(pageListFadeEl).addClass('is-hide');
				} else {
					//$(this).siblings(pageListFadeEl).removeClass('is-hide');
				}
			});

			if($(pageListItem).hasClass("is_on") === true){
				var activeWidth = $(".nav_l li.is_on").width();
				var activeOffset = $(".nav_l li.is_on").offset().left;
				$(pageList).animate({
					scrollLeft: activeOffset - activeWidth
				}, 300);
			}
			*/
			/* 2023.09.04 : kmy 수정 : End */
		}

		if($(".real_news").length) {
			let eventCnt = $('.real_news').find('.swiper-slide').length;
			let eventLoop = true;
			if(eventCnt<2)
			eventLoop = false;

			const eventSwiper = new Swiper('.real_news > .swiper-container', {
				direction: 'vertical',
			    effect: 'slide',
			    slidesPerView: 1,
			    loop: eventLoop,
			    autoplay: {
			        delay: 4000,
			        reverseDirection: true,
			        disableOnInteraction: false,
			    },
	        });
		}

		if($(".slide_tabwr").length) {
			const tabNavsw = new Swiper('.slide_tabwr', {
				slidesPerView: 'auto',
				freeMode: true,
				preventClicks: true,
				preventClicksPropagation: false,
				observer: true,
				observeParents: true,
				initialSlide: 0, //카테고리 위치 값
	        });
		}

		if($(".top_issue_box").length) {
			const $slider = $('.top_issue_box');

	        const swiper = new Swiper($slider, {
	            loop: true,
	            autoHeight : true,
	            speed: 1000,
	            slidesPerView: 1,
	            effect: 'fade',
	            followFinger: false,
	            fadeEffect: {
	                crossFade: true
	            },
	            navigation: {
	                nextEl: '.top_issue_box .btn_next',
	                prevEl: '.top_issue_box .btn_prev'
	            },
	            pagination: {
		            el: '.swiper-pagination',
		            clickable: true,
		            type: 'fraction',
		            renderFraction: function (currentClass, totalClass) {
		                return '<span class="' + currentClass + '"></span>' +
		                    '<span class="barSpace">' +
		                    '/</span>' +
		                    '<span class="' + totalClass + '"></span>';
		            }
		        },
	            autoplay: {
	                delay: 3000,
	                disableOnInteraction: false
	            },
	            breakpoints: {
				    
				}
	        });
		}

		if($(".years_tab").length) {
			/*
			const tabNavsw = new Swiper('.slide_tabwr', {
				slidesPerView: 'auto',
				freeMode: true,
				preventClicks: true,
				preventClicksPropagation: false,
				observer: true,
				observeParents: true,
				initialSlide: 0, //카테고리 위치 값
	        });
	        */

	        const tabNavsw = new Swiper('.years_tab > .swiper-container', {
	        	slidesPerView: 'auto',
				paginationClickable: true,
				slidesOffsetAfter: 130,
				spaceBetween: 0,
				freeMode: true,
				pagination: false,
				initialSlide: 0, //카테고리 위치 값
				navigation: {
			      nextEl: '.years_tab > .swiper-container > .swiper-button-next',
			      prevEl: '.years_tab > .swiper-container > .swiper-button-prev'
			    },
			    breakpoints: {
			    	/*
			    	1368: {
						slidesPerView: 6,
					},
					990: {
						slidesPerView: 7,
					},
					989: {
						slidesPerView: 6.2,
					},
					860: {
						slidesPerView: 6,
					}
					
					430: {
						slidesPerView: 4.5,
					},
					380: {
						slidesPerView: 4.3,
					},
					360: {
						slidesPerView: 3,
					}
					*/
				}
	        });
		}

		if($(".photop_swp").length) {
			const phoTopswp = new Swiper('.photop_swp > .swiper-container', {
				centeredSlides: true,
				preloadImages: false,
				lazy: true,
				loop: true,
				slidesPerView: "auto",
				spaceBetween: 50,
				navigation: {
					prevEl: '.photop_swp .swiper-button-prev',
					nextEl: '.photop_swp .swiper-button-next',
				},
				pagination: {
					el: '.swiper-pagination',
				},
	        });

		}

		if($(".toon_rollimg").length) {
			const cartoon = new Swiper(".it_roll", {
				slidesPerView: 1,
				centeredSlides:true,
	            loop: true,
	            direction: 'horizontal',
				//autoplay: {delay: 3000,},
	            navigation: {
	                prevEl: ".toon_rollimg > .btn_swp_wr > .btn_prev",
	                nextEl: ".toon_rollimg > .btn_swp_wr > .btn_next",
	            },
	            observer: true,
	            observeParents: true,
	        });

		}

		if($(".keyword_wr").length) {
			const cartoon = new Swiper(".keyword_wr > .swiper-container", {
				init: true,
				slidesPerView: 'auto',
				spaceBetween: 13,
				grabCursor: true,
	        });
		}

		if($(".category_sec").length) {
			const categorySlider = new Swiper(".category_sec_slide", {
				slidesPerView: 'auto',
				spaceBetween: 16,
				slidesOffsetAfter: 50,
				freeMode: true,
				preventClicks: true,
				observer: true,
				observeParents: true,
				watchSlidesVisibility: true,
				initialSlide: 0, //카테고리 위치 값
	        });

			$(".category_sec").addClass("is_swipe_start");

			// 카테고리 클릭
			$(".category_sec_item:first-of-type").addClass('is_active');
			$(".category_sec_item").on('click', function () {
				var index = $(this).index();
				$(".category_sec_item").removeClass('is_active');
				$(this).addClass('is_active');
				if ($(window).width() < 819) {
					// Mobile ~
					categorySlider.slideTo(index, 100);
				} else {
					// Desktop ~
					categorySlider.slideTo(index - 1, 100);
				}
			});

	        // 패널
			var tabCont = $(".s_contents .thumb_list li");
			var tabBtn = $(".category_sec_item");

			tabCont.hide().eq(0).show();
			tabBtn.click(function() {
				var target = $(this);
				var index = target.index();
				tabBtn.removeClass('is_active');
				target.addClass('is_active');
				tabCont.css('display','none');
				tabCont.eq(index).css('display','block');
			});
		}

		if($(".bill_articw").length) {
			/*
			const cartoon = new Swiper(".swp_bx > .swiper-container", {
				
				slidesPerView: 1,
				centeredSlides:true,
	            loop: this.SwioperLength > 1,
	            direction: 'horizontal',
				//autoplay: {delay: 3000,},
	            navigation: {
	                prevEl: ".bill_articw > .btn_bx > .btn_prev",
	                nextEl: ".bill_articw > .btn_bx > .btn_next",
	            },
	            observer: true,
	            observeParents: true,
	            pagination: {
                    el: '.thumb_tab',
                    clickable: false,
                    renderBullet: function (index, className) {
                        return '<span class="' + className + '">' + '<em class="blind">' + (index + 1) + '</em>' + '</span>';
                    }
                },
                
	        });
			*/

			let options = {};
			if ( $(".swp_bx >.swiper-container .swiper-slide").length > 1 ) {
				options = {
					slidesPerView: 1,
					centeredSlides:true,
					loop: this.SwioperLength > 1, /* swiper-slide가 한개일땐 스와이퍼 기능막기 */		
					direction: 'horizontal',				
					navigation: {
						prevEl: ".bill_articw > .btn_bx > .btn_prev",
						nextEl: ".bill_articw > .btn_bx > .btn_next",
					},
					observer: true,
					observeParents: true,
					pagination: {
						el: '.thumb_tab',
						clickable: false,
						renderBullet: function (index, className) {						
							return '<span class="' + className + '">' + '<em class="blind">' + (index + 1) + '</em>' + '</span>';
						}
					}
				}
			} else {
				options = {
					slidesPerView: 1,
					centeredSlides:true,
					direction: 'horizontal',
					navigation: {
						prevEl: ".bill_articw > .btn_bx > .btn_prev",
						nextEl: ".bill_articw > .btn_bx > .btn_next",
					},	
					pagination: false
				}
			}
			const bill_swp = new Swiper(".swp_bx > .swiper-container", options);
		}
	},

	menuDatety : function() {
		if($(".h_area").length) {
			$(".sec_header > .h_wr > .h_area .nav_l > li > strong > a").each(function () {
				$(this).attr("data-text",$.trim($(this).text()));
			});
		}

		if($(".tab_nav").length) {
			$(".tab_nav > li > strong > a").each(function () {
				$(this).attr("data-text",$.trim($(this).text()));
			});
		}
		
	},

	setTopButton : function() {
		/* 2023.08.31 ~ 줄바꿈 및 간격 수정 : kmy */
		var duration = 100;

		$(".btn_scroll_top").each(function  () {
			$(window).scroll(function() {
				var this_scroll = $(this).scrollTop();
				if(this_scroll > 0){
					$(".btn_scroll_top").addClass("bottom-fixed");
				}else{
					$(".btn_scroll_top").removeClass("bottom-fixed");
				}
			});
		});

		/*
		$(".btn_scroll_top").on('click', function(e){
			e.preventDefault();
			$("html, body").animate({
				scrollTop:0
			}, 100);
		});
		*/

		$(".btn_scroll_top").on('click', function(event) {
			event.preventDefault();
			$("html, body").animate({
				scrollTop: 0
			}, duration);
			return false;
		});
		/* 2023.08.31 ~ 줄바꿈 및 간격 수정 : kmy End */
	},

	setTopBnr : function() {
		if($(".inside_b").length) {
			let ban02Cnt = $('.inside_b').find('.swiper-slide').length;
			let ban02Loop = true;
			if(ban02Cnt<2){
				ban02Loop = false;
				$('.inside_b').find('.swiper_btn_wrap').hide();
			}

			const insideban = new Swiper('.inside_b > .swiper-container', {
	           	slidesPerView: 1,
	            spaceBetween: 0,
			    loop: ban02Loop,
			    autoplay: {
			        delay: 4000,
			        disableOnInteraction: false,
			    },
			    navigation: {
					prevEl: "#inside_prev",
					nextEl: "#inside_next",
	            },
	        });
		}
	},

	inputSubeve : function() {
		if($(".hds_frm").length) {
			$(".hds_frmin>.input_box>input").focusout(function() {
			    $(".hds_frmin").removeClass('focus');
			});
			$(".hds_frmin>.input_box>input").focus(function() {
			    $(this).closest(".hds_frmin").addClass('focus');
			});

			/// Input Kepress Filled  Focus

			$(".hds_frmin>.input_box>input").keyup(function() {
			    if($(this).val().length > 0){
			        $(this).closest(".hds_frmin").addClass('filled');
			        $(this).next(".remove_val").addClass("on");
			    }
			    else{
			        $(this).closest(".hds_frmin").removeClass('filled');
			        $(this).next(".remove_val").removeClass("on");
			    }
			});

			/// Input Check Filled Focus
			var $formControl = $('.hds_frmin>.input_box>input');
			var values = {};
			var validate = $formControl.each(function() {
			    if($(this).val().length > 0){
			        $(this).closest('.hds_frmin').addClass('filled');
			        $(this).next(".remove_val").addClass("on");
			    }
			    else{
			        $(this).closest('.hds_frmin').removeClass('filled');
			        $(this).next(".remove_val").removeClass("on");
			    }
			});

			//clear button - clear func
			$('.hds_frmin>.input_box>.remove_val').click(function (e) { 
			    e.preventDefault();
			    $(this).removeClass("on");
			    $('.hds_frmin>.input_box>input').val('');
			    $('.hds_frmin').removeClass('filled');
			});
		}
	},

	optEvn : function() {
		if($(".opinion_editw").length) {
			let optBtn = $(".top_tabwr>.inner>.opinion_wr");

			$(".top_tabwr>.inner>.opinion_wr").click(function () {
				var $obj = $(".opinion_editw");
				if ($obj.hasClass('open')) {
					$obj.removeClass('open');
					$obj.slideUp(300);
					optBtn.removeClass('opt_cls');
					optBtn.find("i>em").text("열기");
				} else {
					$obj.addClass('open');
					$obj.slideDown(300);
					optBtn.addClass('opt_cls');
					optBtn.find("i>em").text("닫기");
				}
				window.scrollTo({top:0, left:0, behavior:'auto'});
			});
		}

		if($(".list_artinfo_news > .tit_b > h1 > a").length) {
			let allBtn = $(".list_artinfo_news > .tit_b > h1 > a");

			$(".list_artinfo_news > .tit_b > h1 > a").click(function () {
				var $swpobj = $(".slide_tabwr");
				if ($swpobj.hasClass('open')) {
					$swpobj.removeClass('open');
					allBtn.removeClass('opt_cls');
					//optBtn.find("i>em").text("열기");
				} else {
					$swpobj.addClass('open');
					allBtn.addClass('opt_cls');
					//optBtn.find("i>em").text("닫기");
				}
				window.scrollTo({top:0, left:0, behavior:'auto'});
			});
		}

		if($(".rank .tit_b > h1 > a").length) {
			let allBtn = $(".rank .tit_b > h1 > a");

			$(".rank .tit_b > h1 > a").click(function () {
				var $swpobj = $(".slide_tabwr");
				if ($swpobj.hasClass('open')) {
					$swpobj.removeClass('open');
					allBtn.removeClass('opt_cls');
					//optBtn.find("i>em").text("열기");
				} else {
					$swpobj.addClass('open');
					allBtn.addClass('opt_cls');
					//optBtn.find("i>em").text("닫기");
				}
				window.scrollTo({top:0, left:0, behavior:'auto'});
			});
		}
	},

	tabEvn : function() {
		if($("[class*='list_artinfo']").length) {
			var $wrapper = $("[class*='list_artinfo']"),
				$allTabs = $(".sec_li_tabcont > .tab_cont_view"),
				$tabMenu = $("[class*='list_stab']>li");

			$(".sec_li_tabcont > .tab_cont_view:first-of-type").show();

			$tabMenu.each(function(i) {
				$(this).attr("data-tab", "tab"+i);
			});

			$allTabs.each(function(i) {
				$(this).attr("data-tab", "tab"+i);
			});

			/*
			$tabMenu.on('click', function() {
				var dataTab = $(this).data("tab"),
					$getWrapper = $(this).closest($wrapper);

				$getWrapper.find($tabMenu).removeClass("current");
				$(this).addClass("current");

				$getWrapper.find($allTabs).hide();
				$getWrapper.find($allTabs).filter("[data-tab="+dataTab+"]").show();
			});
			*/
		}
	},

	modalEvn : function() {
		if($("[class*='is_fix_reissue'] .wrapsns_layer").length) {
			/*
			$(".btn_share").click(function(e){
				e.preventDefault();
				var target = $(".wrapsns_layer");

				$(target).addClass("active");
				$(".btn_share").addClass('on');
			});
			*/

			$(".wrapsns_layer > .sns_layer > .inner > .btn_close").click(function() {
				var target = $(".wrapsns_layer");

				$(target).removeClass("active");
				$(".btn_share").removeClass("on");
				//$('body').css({'overflow':'', 'height':''});
			});

			$(document).mouseup(function (e) {
				var LayerPopup = $(".wrapsns_layer");

				if (LayerPopup.has(e.target).length === 0) {
					LayerPopup.removeClass("active");
				}
			});
			
			$(window).scroll(function() {
				$(".wrapsns_layer").removeClass("active");
				$(".btn_share").removeClass("on");
			});
		}

		if($("[class*='is_fix_reopi'] .wrapsns_layer").length) {
			$(".wrapsns_layer > .sns_layer > .inner > .btn_close").click(function() {
				var target = $(".wrapsns_layer");

				$(target).removeClass("active");
				$(".btn_share").removeClass("on");
				//$('body').css({'overflow':'', 'height':''});
			});

			$(document).mouseup(function (e) {
				var LayerPopup = $(".wrapsns_layer");

				if (LayerPopup.has(e.target).length === 0) {
					LayerPopup.removeClass("active");
				}
			});
			
			$(window).scroll(function() {
				$(".wrapsns_layer").removeClass("active");
				$(".btn_share").removeClass("on");
			});
		}
	},

	moreEvn : function() {
		if($(".graph_wr").length) {
			$('.btn_morew').on('click', function() {
				if ($(this).is('.open')) {
					$(this).removeClass("open").addClass("close_btn");
					$(this).html("<strong>접기</strong>");
					$(this).parent().removeClass("slide_up").addClass("slide_down");
				} else {
					//$(this).removeClass("close_btn");
					$(this).addClass("open").removeClass("close_btn");
					$(this).html("<strong>펼치기</strong>");
					$(this).parent().removeClass("slide_down").addClass("slide_up");
				}
			});
		}

		if($(".remark_bx").length) {
			$('.btn_morew02').on('click', function() {
				if ($(this).is('.open')) {
					$(this).removeClass("open").addClass("close_btn");
					$(this).html("<strong>접기</strong>");
					$(this).parent().removeClass("slide_up").addClass("slide_down");
				} else {
					//$(this).removeClass("close_btn");
					$(this).addClass("open").removeClass("close_btn");
					$(this).html("<strong>펼치기</strong>");
					$(this).parent().removeClass("slide_down").addClass("slide_up");
				}
			});
		}

	},

	dropEvn : function() {
		if($(".dropbox_wr").length) {
			$(document).ready(function (e) {
			    function t(t) {
			        e(t).bind("click", function (t) {
			            t.preventDefault();
			            e(this).parent().fadeOut()
			        })
			    }
			    e(".dropdown_toggle").click(function () {
			        var t = e(this).parents(".button_dropdown").children(".dropdown_menu").is(":hidden");
			        e(".button_dropdown .dropdown_menu").hide();
			        e(".button_dropdown .dropdown_toggle").removeClass("active");
			        if (t) {
			            e(this).parents(".button_dropdown").children(".dropdown_menu").toggle().parents(".button_dropdown").children(".dropdown_toggle").addClass("active")
			        }
			    });
			    e(document).bind("click", function (t) {
			        var n = e(t.target);
			        if (!n.parents().hasClass("button_dropdown")) e(".button_dropdown .dropdown_menu").hide();
			    });
			    e(document).bind("click", function (t) {
			        var n = e(t.target);
			        if (!n.parents().hasClass("button_dropdown")) e(".button_dropdown .dropdown_toggle").removeClass("active");
			    })
			});
		}
	},

	tooltipEvn : function() {
		if($(".tooltip_container").length) {
			// 외부영역 클릭 시 팝업 닫기
			var processWr = $(".tooltip_container");
			$(document).click(function(e){
			    // 팝업 아이디
			    if (!processWr.is(e.target) && processWr.has(e.target).length === 0){
			    	$(".tooltip_container .hoverPopup").hide();
			        $(".tooltip_container .hoverPopup").removeClass("show");
			    }
			});

			$(document).ready(function (e) {
			    function t(t) {
			        e(t).bind("click", function (t) {
			            t.preventDefault();
			            e(this).parent().fadeOut()
			        })
			    }
			    e(".tooltip_container>.txt_b").click(function () {
			    	var tooltipWr = e(this).parents(".tooltip_container");
			        var t = e(this).parents(".tooltip_container").children(".hoverPopup").is(":hidden");
			        e(".tooltip_container .hoverPopup").hide();
			        e(".tooltip_container .hoverPopup").removeClass("show");
			        if (t) {
			        	e(this).parents(".tooltip_container").children(".hoverPopup").toggle().addClass("show");
			        }
			    });
			    e(document).bind("click", function (t) {
			        var n = e(t.target);
			        if (!n.parents().hasClass("tooltip_container")) e(".button_dropdown .hoverPopup").hide();
			    });
			});
		}
	},

	bindSlideTabs : function() {
		const slider = $('.stock_item');
	
		let x, left, down;
	
		slider.mousedown(function (e) {
		  e.preventDefault();
		  down = true;
		  x = e.pageX;
		  left = $(this).scrollLeft();
		});
	
		slider.mousemove(function (e) {
		  if (down) {
			var newX = e.pageX;
			$(this).scrollLeft(left - newX + x);
		  }
		});
	
		slider.mouseleave(function (e) {
		  down = false;
		});
	
		slider.mouseup(function (e) {
		  down = false;
		});
	}
}



$(function(){
	comPub.comSub();
});

/*			
jQuery().ready(function(){
  
	jQuery('.tab').hide();
	
	jQuery('ul.tabs li').click(function(){
	  jQuery('.tab').hide();
	  jQuery(jQuery('.tab')[jQuery(this).index()]).show();
	}).first().trigger('click');
	
  });

$(function(){
	$("ul.tabs li:first").addClass("active");
	$("div.tab").hide();
	$("div.tab:first").show();

	$("ul.tabs li").click(function(e) {
	 var index = $(this).index();
	 $("ul.tabs li").removeClass("active");
	 $(this).addClass("active");
	 $("div.tab").hide();
	 $("div.tab:eq(" + index + ")").show();
   
	 return false
	   
	});
	
});
*/