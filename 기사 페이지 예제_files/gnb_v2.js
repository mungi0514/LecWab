var gnbPub = {
	comhead : function(){
		setTimeout(function(){
			$(window).off('scroll').on('scroll', gnbPub.scrollEvent);
			$(window).trigger('scroll');

			$(window).off('resize').on('resize', gnbPub.resizeEvent);
			$(window).trigger('resize');
 
			gnbPub.scrollEvupdown(); //2023.06.08 추가
			gnbPub.menuEve();
			gnbPub.inputEve();
			gnbPub.footerEve();
			gnbPub.sidebarScroll();
		} , 0);
		
		setTimeout(function(){
			//gnbPub.pageTopBnr();
		}, 300)
	},

	menuEve : function() {
		//사이트맵 버튼 클릭 시 토글블라인드
		var $document = $(document);
		var $body = $("body");
		var $header = $("#header");
		var $searchBtn = $(".btn_search");
		var $headerSearchBox = $(".search_wrap");
		var $headSiteMenu = $(".anb")
		var $sitemapMenu = $(".sitemap_btn");
		var $headbackBgDim = $(".dim_ly");
		var $dim = $(".dim_ly");
		var clickChkFlag = false;

		/* 2023.04.19 : 추가
		/*
		if($("[class*='sub_ml']").length) {

			var w = $(document).outerWidth(true);
			if(w>819){
				if($("[class*='sub_ml']").length) {
					$("[class*='sub_ml']").wrapAll("<div class='sub_alk'></div>");
				}
			} else {
				if($("[class*='sub_ml']").length) {
					$("[class*='sub_ml']").removeAttr("style");
				}
			}
		}
		*/

		//var $moGnb = $(".menu_popup")

		$headbackBgDim.hide();
		$dim.hide();

		function preventScroll(type) {
			if(type) {
				$headbackBgDim.fadeIn();
			} else {
				$headbackBgDim.fadeOut();
			}
			//$body.css({overflow: type ? 'hidden' : ''})
		}
		
		$sitemapMenu.on("click", function() {
			//pc인 경우
			if ($body.hasClass("pc")) {

				//클래스 on 추가
				//$('.dim').stop().fadeToggle(0);

				$body.removeClass("open_search");
				$(".search_wrap").removeClass("show");
				$searchBtn.removeClass("active");
				$searchBtn.attr("title", "검색창 열기");
				$searchBtn.find("i>em").text("검색창 열기");

				if (clickChkFlag) {
					return false;
				}
				clickChkFlag = true;
				if ($(this).hasClass("open")) {
					$body.removeClass("is_actmap");
					$("body").removeClass("overHidden");
					$header.removeClass("open_anb");
					$(this).removeClass("open");
					$(this).find("i>em").text("사이트맵메뉴 열기");
					// $headSiteMenu.stop().slideUp().removeAttr('tabindex'); //250630 slide간섭으로 삭제
					$headSiteMenu.stop().removeAttr('tabindex');
					$headSiteMenu.find('dl').removeAttr('tabindex');
					$(".issue_pick>.inner>.btn_toggle").fadeIn(550);

					if($("[class*='is_fix_renewart']").length) {
						$('.bar_progressCont').show();
					}
					preventScroll(false);
				} else {
					$body.addClass("is_actmap");
					$("body").addClass("overHidden");
					$header.addClass("open_anb");
					$(this).addClass("open");
					$(this).find("i>em").text("사이트맵메뉴 닫기");
					// $headSiteMenu.stop().slideDown().attr('tabindex','0').focus(); //250630 slide간섭으로 삭제
					$headSiteMenu.stop().attr('tabindex','0').focus();
					$body.removeClass("open_search");
					$(".search_wrap").removeClass("show");
					$searchBtn.removeClass("active");
					$searchBtn.attr("title", "검색창 열기");
					$searchBtn.find("i>em").text("검색창 열기");
					$(".issue_pick>.inner>.btn_toggle").hide();

					if($("[class*='is_fix_renewart']").length) {
						$('.bar_progressCont').hide();
					}
					preventScroll(true);
				}
				setTimeout(function() {
					clickChkFlag = false;
				}, 500)
				return false;
				
			//pc가 아닌경우
			} else {

			}
		});

		$dim.on('click', function(e) {
			$body.removeClass("is_actmap");
			$header.removeClass("open_anb");
			$sitemapMenu.removeClass("open");
			$("body").removeClass("overHidden");
			$headSiteMenu.stop().slideUp().removeAttr('tabindex');
			$headSiteMenu.find('dl').removeAttr('tabindex');
			$body.removeClass("open_search");
			$(".search_wrap").removeClass("show");
			$(".issue_pick>.inner>.btn_toggle").fadeIn(550);
			preventScroll(false);

			if($("[class*='is_fix_renewart']").length) {
				$('.bar_progressCont').show();
			}
		});

		const openMenuBtn = $(".btn_gnb");
		openMenuBtn.on("click",function(e){
			//$headSiteMenu.show();

			e.preventDefault();

			//pc인 경우
			if($("body").hasClass("pc")){

				
			//pc가 아닌경우
			} else {

				/*
				//gnb버튼에 토글on
				$(this).toggleClass("on");
				
				//gnb버튼에 on이 있다면
				if($(this).hasClass("on")){
					$("body").addClass("overHidden");

				//gnb버튼에 on이 없다면
				} else {
					$("body").removeClass("overHidden");

				}
				*/

				$body.removeClass("open_search");
				$(".search_wrap").removeClass("show");
				$searchBtn.removeClass("active");
				$searchBtn.attr("title", "검색창 열기");
				$searchBtn.find("i>em").text("검색창 열기");

				if (clickChkFlag) {
					return false;
				}
				clickChkFlag = true;
				if ($(this).hasClass("open")) {
					$body.removeClass("is_actmap");
					//$(this).removeClass("open");
					$sitemapMenu.removeClass("open");
					$("body").removeClass("overHidden");
					$(".hd_bx>article>.btn_gnb").removeClass("open");

					preventScroll(false);
				} else {
					$(this).addClass("open");
					$body.addClass("is_actmap");
					$("body").addClass("overHidden");
					$(".hd_bx>article>.btn_gnb").addClass("open");
					$body.removeClass("open_search");
					$(".search_wrap").removeClass("show");
					$searchBtn.removeClass("active");
					$searchBtn.attr("title", "검색창 열기");
					$searchBtn.find("i>em").text("검색창 열기");
					preventScroll(false);
				}
				setTimeout(function() {
					clickChkFlag = false;
				}, 500)
				return false;
			}
		});

		const mobBtn = $(".hd_bx>article>.btn_gnb");

		if($("[class*='is_fix_renewart']").length) {
			if($("body").hasClass("pc")){
				mobBtn.on("click",function(){
					//$(this).addClass("test");
					$body.removeClass("is_actmap");
					$body.removeClass("overHidden");
					$("[class*='header_n_ty02']").removeClass("open_anb");
					$(".dim_ly").hide();
					$sitemapMenu.removeClass("open");
				});
			}
		}

		mobBtn.on("click",function(e){
			e.preventDefault();

			//pc인경우
			if($("body").hasClass("pc")){
				

			//pc가 아닌경우
			} else {
				$body.removeClass("open_search");
				$(".search_wrap").removeClass("show");
				$searchBtn.removeClass("active");
				$searchBtn.attr("title", "검색창 열기");
				$searchBtn.find("i>em").text("검색창 열기");

				if (clickChkFlag) {
					return false;
				}
				clickChkFlag = true;
				if ($(this).hasClass("open")) {
					$(this).removeClass("open");
					$sitemapMenu.removeClass("open");
					$("body").removeClass("overHidden");
					preventScroll(false);
				} else {
					$(this).addClass("open");
					$sitemapMenu.addClass("open");
					$("body").addClass("overHidden");
					$body.removeClass("open_search");
					$(".search_wrap").removeClass("show");
					$searchBtn.removeClass("active");
					$searchBtn.attr("title", "검색창 열기");
					$searchBtn.find("i>em").text("검색창 열기");
					preventScroll(false);
				}
				setTimeout(function() {
					clickChkFlag = false;
				}, 500)
				return false;
			}

		});

		$searchBtn.on('click',function(e){
			$body.removeClass("is_actmap");
			$header.removeClass("open_anb");
			$sitemapMenu.removeClass("open");
			$(".hd_bx>article>.btn_gnb").removeClass("open");
			$sitemapMenu.find("i>em").text("사이트맵메뉴 열기");
			$headSiteMenu.stop().slideUp().removeAttr('tabindex');
			$headSiteMenu.find('dl').removeAttr('tabindex');

			$("body").removeClass("overHidden");
			$(".menu_popup").removeClass("is_active");

			e.preventDefault();

			if (clickChkFlag) {
				return false;
			}
			clickChkFlag = true;
			if( $(this).hasClass('active') ){
				$(this).removeClass('active');
				$(this).attr("title", "검색창 열기");
				$(this).find("i>em").text("검색창 열기");
				$body.removeClass("open_search");
				$(".search_wrap").removeClass("show");
				$(".issue_pick>.inner>.btn_toggle").fadeIn(550);

				if($("body").hasClass("pc")){

				} else {
					$("#darkmode_switch").show();
				}

				if($("[class*='is_fix_renewart']").length) {
					$('.bar_progressCont').show();
				}

				preventScroll(false);
			}else{
				$(this).addClass('active');
				$(this).attr("title", "검색창 닫기");
				$(this).find("i>em").text("검색창 닫기");
				$body.addClass("open_search");
				$(".search_wrap").addClass("show");
				$('#search1').focus(); //2023.08.24 : 개발요청으로 스크립트 추가
				$sitemapMenu.find("i>em").text("사이트맵메뉴 열기");
				$(".issue_pick>.inner>.btn_toggle").hide();

				if($("body").hasClass("pc")){

				} else {
					$("#darkmode_switch").hide();
				}

				if($("[class*='is_fix_renewart']").length) {
					$('.bar_progressCont').hide();
				}

				preventScroll(true);

			}
			
			setTimeout(function() {
				clickChkFlag = false;
			}, 500)

			return false;
		});
	},

	footerEve : function(){
		if($(".office_open").length) {
			$('.office_open').on('click', function () {
				if ($(this).hasClass("on")) {
					$(this).removeClass("on");
					$(".office_address").slideUp();
				} else {
					$(this).addClass("on");
					$(".office_address").slideDown();
				}
			});
		}
	},

	inputEve : function() {
		if($(".search_wrap").length) {
			$(".sch_form>.input_box>input").focusout(function() {
				$(".sch_form").removeClass('focus');
			});
			$(".sch_form>.input_box>input").focus(function() {
				$(this).closest(".sch_form").addClass('focus');
			});

			/// Input Kepress Filled  Focus

			$(".sch_form>.input_box>input").keyup(function() {
				if($(this).val().length > 0){
					$(this).closest(".sch_form").addClass('filled');
					$(this).next(".remove_val").addClass("on");
				}
				else{
					$(this).closest(".sch_form").removeClass('filled');
					$(this).next(".remove_val").removeClass("on");
				}
			});

			/// Input Check Filled Focus
			var $formControl = $('.sch_form>.input_box>input');
			var values = {};
			var validate = $formControl.each(function() {
				if($(this).val().length > 0){
					$(this).closest('.sch_form').addClass('filled');
					$(this).next(".remove_val").addClass("on");
				}
				else{
					$(this).closest('.sch_form').removeClass('filled');
					$(this).next(".remove_val").removeClass("on");
				}
			});

			//clear button - clear func
			$('.sch_form>.input_box>.remove_val').click(function (e) { 
				e.preventDefault();
				$(this).removeClass("on");
				$('.sch_form>.input_box>input').val('');
				$('.sch_form').removeClass('filled');
			});
		}
	},

	resizeEvent : function(){
		// var w = $(window).width(); //2024.07.17 : 수정
		
		// var w = document.documentElement.clientWidth; //스크롤width 제외 250718
		var w =  window.innerWidth ; //스크롤width포함 250718
		

		console.log(w);
		if(w>819){
			$("body").addClass("pc");
			$("body").removeClass("mobile");
			//$("#gnb").removeAttr("style");
			//$(".cover").removeAttr("style");
			$(".btn_gnb").removeClass("on");

			$("#darkmode_switch").show();

		} else {
			$("body").addClass("mobile");
			$("body").removeClass("pc");
			//$("body").removeClass("is_actmap");
			$("#header").removeClass("open_anb");

			$(".pc>#wrapper>#container").removeAttr("style");

			if($("body").hasClass("open_search")){
				$("#darkmode_switch").hide();
			} else {
				
			}

			if($("body").hasClass("is_actmap")){
				$(".hd_bx>article>.btn_gnb").addClass("open");
			}

		}
		$("#header").removeAttr("style");
	},

	scrollEvent : function() {
		function defaultHeaderScroll() {
			const curr = $(window).scrollTop();
			const topGap = $('.header_wrap').outerHeight();
			if (curr > topGap) {
				//$("#wrapper").css("padding-top","70px");
				//2023.03.24 : 수정
				if($(".header_wrap").length) {
					$("body").addClass('is_fix');
				}

				if($("#header").hasClass("open_anb")){
					$('.bar_progressCont').hide();
				}

				if($("body").hasClass("open_search")){
					$('.bar_progressCont').hide();
				}

				if($(".article_page").length) {
					$('.bar_progress').css('display','block');
				}

				if($(".go_top").length) {
					$('.go_top').addClass('current');
				}

			} else {
				if($(".header_wrap").length) {
					$("body").removeClass('is_fix');
				}
				//$("#wrapper").css("padding-top","0px");

				if($(".go_top").length) {
					$('.go_top').removeClass('current');
				}

				if($(".article_page").length) {
					$('.bar_progress').css('display','none');
				}
			}

			/*
			const topGapnew = $(".header_n > .inner").outerHeight();
			if (curr > topGapnew) {
				$("body").addClass('is_fix');
			} else {
				$("body").removeClass('is_fix');
			}
			*/
		}

		$(window).on('scroll', defaultHeaderScroll);

		/* 2023 : 2차 헤더용 추가 */
		function defaultHeaderScrollNe() {
			/* 2024.01.10 : 수정완료 */
			if($(".header_n").length) {
				if ($(window).scrollTop() >= 119) {
					$("body").addClass('is_fix');
				} else {
					$("body").removeClass('is_fix');
				}
			}
			/* 2024.01.10 : 수정완료 End */
		}

		$(window).on('scroll', defaultHeaderScrollNe);
	},

	//2023.08~ 수정 : kmy
	scrollEvupdown : function() {
		if($("[class*='header_n_ty02']").length) {
			//var stickytblWidth = 1729; /* 2023.09.04 : kmy 수정 */
			var stickyWindowWidth = 819; /* 2023.09.04 : kmy 수정 */
			//var stickysmWidth = 359; /* 2023.09.04 : kmy 수정 */

			var navHeader = $(".header_n_ty02");
			var navbarHeight = $(".header_n_ty02").outerHeight();
			const body = $("body");
			let lastScroll = 0;
			var previousScroll = 0;

			/* 2023.09.04 : kmy 수정 */
			if($(".sub_nav").length) {
				if($(".is_on").length) {
					var scroller = $(".sub_nav");
					var scrollMenuOnt = $(".nav_l>li.is_on").position();

					/* 2023.11 : 삭제
					var titlDt = $(".h_area>dl>dt");
					var titlDtW = $(".h_area>dl>dt").width();
					var scrollMenuOn = $(".nav_l>li.is_on");
					
					var scrollLeft = titlDt.offset().left + scrollMenuOn.offset().left + scroller.scrollLeft() + scrollMenuOn.width()/2 - scroller.width()/2 - titlDtW;
					var scrollLeft2 = titlDt.offset().left + scrollMenuOn.offset().left + scroller.scrollLeft() + scrollMenuOn.width()/3 - scroller.width()/3 - titlDtW;
					*/

					var scrollLeft = scrollMenuOnt.left - 50; /* 2023.11 : 추가 */
				}
			}
			/* 2023.09.04 : kmy 수정 : End */

			const currNtop = $(window).scrollTop();

			$(window).scroll(function () {
				var arttop = $(window).scrollTop();

				if (arttop > navbarHeight) {
            		if($("[class*='is_fix_renewart']").length) {
						body.addClass('is_fix_art');
						$('.bar_progressCont').css('display','block');
					}
				} else {
					if($("[class*='is_fix_renewart']").length) {
						body.removeClass('is_fix_art');
						$('.bar_progressCont').css('display','none');
					}
				}

				var docheight = $('#wrapper').height(), winheight = $(window).height();

				//console.log(wintop);
				var totalScroll = (arttop/(docheight-winheight))*100;
				//console.log("total scroll" + totalScroll);
				$(".bar_progress").css("width",totalScroll+"%")

				if ($(window).width() > stickyWindowWidth) {
					var currNtop = $(window).scrollTop();

					/* 2023.11 : 위치변경으로 추가 */
					if($(".sub_nav").length) {
						if($(".is_on").length) {
							scroller.scrollLeft( scrollLeft );
						}
					}
					/* 2023.11 : 위치변경으로 추가 End */

					if (currNtop > navbarHeight) {
						if($("[class*='is_fix_resec']").length) {
							body.addClass('is_fix');
						}

						if($("[class*='is_fix_reissue']").length) {
							body.addClass('is_fix');
						}

						if($("[class*='is_fix_rephoto']").length) {
							body.addClass('is_fix');
						}

						if($("[class*='is_fix_reopi']").length) {
							body.addClass('is_fix');
						}

						if($("[class*='is_fix_rerank']").length) {
							body.addClass('is_fix');
						}

						/* 2023.11.14 : 추가 */
						if($("[class*='is_fix_reform']").length) {
							body.addClass('is_fix');
						}

						/* 2023.11 : 수정 제거
						if($(".sub_nav").length) {
							if($(".is_on").length) {
								scroller.scrollLeft( scrollLeft );
							}
						}
						2023.11 : 수정 END */
					} else {
						if($("[class*='is_fix_resec']").length) {
							body.removeClass('is_fix');
						}

						if($("[class*='is_fix_reissue']").length) {
							body.removeClass('is_fix');
						}

						if($("[class*='is_fix_rephoto']").length) {
							body.removeClass('is_fix');
						}

						if($("[class*='is_fix_reopi']").length) {
							body.removeClass('is_fix');
						}

						if($("[class*='is_fix_rerank']").length) {
							body.removeClass('is_fix');
						}

						/* 2023.11.14 : 추가 */
						if($("[class*='is_fix_reform']").length) {
							body.removeClass('is_fix');
						}

						/* 2023.09.04 : kmy 수정 제거
						if($(".sub_nav").length) {
							if($(".is_on").length) {
								scroller.scrollLeft( scrollLeft );
							}
						}
						2023.09.04 : kmy 수정 : End */
					}

				} else {
					body.removeClass('is_fix');

					if ($(window).scrollTop() > navbarHeight) {

						navHeader.addClass("nav-sticky");
						var currentScroll = $(this).scrollTop();
						if (currentScroll <= $(document).height() - $(window).height()){
							if ( (currentScroll > navbarHeight) && (currentScroll < previousScroll-5) ){
								//body.removeClass('nav-up').addClass("nav-down");
								if($("[class*='is_fix_resec']").length) {
									$("[class*='is_fix_resec']").removeClass("nav-up").addClass("nav-down");
								}

								if($("[class*='is_fix_reissue']").length) {
									$("[class*='is_fix_reissue']").removeClass("nav-up").addClass("nav-down");
								}

								if($("[class*='is_fix_rephoto']").length) {
									$("[class*='is_fix_rephoto']").removeClass("nav-up").addClass("nav-down");
								}

								if($("[class*='is_fix_reopi']").length) {
									$("[class*='is_fix_reopi']").removeClass("nav-up").addClass("nav-down");
								}

								if($("[class*='is_fix_rerank']").length) {
									$("[class*='is_fix_rerank']").removeClass("nav-up").addClass("nav-down");
								}

								/* 2023.11.14 : 추가 */
								if($("[class*='is_fix_reform']").length) {
									$("[class*='is_fix_reform']").removeClass("nav-up").addClass("nav-down");
								}

								/* 2023.11 : 수정 */
								if($(".sub_nav").length) {
									if($(".is_on").length) {
										scroller.scrollLeft( scrollLeft );
									}
								}
								/* 2023.11 : 수정 END */

								navHeader.addClass("header-show");
							} else if ( (currentScroll < navbarHeight) || (currentScroll > previousScroll+5) ){
								//body.removeClass("nav-down").addClass('nav-up');
								if($("[class*='is_fix_resec']").length) {
									$("[class*='is_fix_resec']").removeClass("nav-down").addClass("nav-up");
								}

								if($("[class*='is_fix_reissue']").length) {
									$("[class*='is_fix_reissue']").removeClass("nav-down").addClass("nav-up");
								}

								if($("[class*='is_fix_rephoto']").length) {
									$("[class*='is_fix_rephoto']").removeClass("nav-down").addClass("nav-up");
								}

								if($("[class*='is_fix_reopi']").length) {
									$("[class*='is_fix_reopi']").removeClass("nav-down").addClass("nav-up");
								}

								if($("[class*='is_fix_rerank']").length) {
									$("[class*='is_fix_rerank']").removeClass("nav-down").addClass("nav-up");
								}

								/* 2023.11.14 : 추가 */
								if($("[class*='is_fix_reform']").length) {
									$("[class*='is_fix_reform']").removeClass("nav-down").addClass("nav-up");
								}

								/* 2023.11 : 수정 */
								if($(".sub_nav").length) {
									if($(".is_on").length) {
										scroller.scrollLeft( scrollLeft );
									}
								}
								/* 2023.11 : 수정 END */

								$("body").removeClass("open_search");
								//$(".search_wrap").hide();
								$(".dim_ly").hide();
								$(".btn_search").removeClass("active");
								$(".search_wrap").removeClass("show");

								navHeader.removeClass("header-show");
							}
							previousScroll = currentScroll;
						}

						if($(".is_fix_real").length) {
							body.addClass('head_fix');
						}
					} else {
						//body.removeClass("nav-up"); - 예제부분
						//body.removeClass("nav-down"); - 예제부분
						if($("[class*='is_fix_resec']").length) {
							$("[class*='is_fix_resec']").removeClass("nav-up");
							$("[class*='is_fix_resec']").removeClass("nav-down");
						}

						if($("[class*='is_fix_reissue']").length) {
							$("[class*='is_fix_reissue']").removeClass("nav-up");
							$("[class*='is_fix_reissue']").removeClass("nav-down");
						}

						if($("[class*='is_fix_rephoto']").length) {
							$("[class*='is_fix_rephoto']").removeClass("nav-up");
							$("[class*='is_fix_rephoto']").removeClass("nav-down");
						}

						if($("[class*='is_fix_reopi']").length) {
							$("[class*='is_fix_reopi']").removeClass("nav-up");
							$("[class*='is_fix_reopi']").removeClass("nav-down");
						}

						if($("[class*='is_fix_rerank']").length) {
							$("[class*='is_fix_rerank']").removeClass("nav-up");
							$("[class*='is_fix_rerank']").removeClass("nav-down");
						}

						/* 2023.11.14 : 수정 */
						if($("[class*='is_fix_reform']").length) {
							$("[class*='is_fix_reform']").removeClass("nav-up");
							$("[class*='is_fix_reform']").removeClass("nav-down");
						}

						/* 2023.11 : 수정 */
						if($(".sub_nav").length) {
							if($(".is_on").length) {
								scroller.scrollLeft( scrollLeft );
							}
						}
						/* 2023.11 : 수정 END */
						
						//navHeader.removeClass("nav-sticky header-show");
						navHeader.removeClass("nav-sticky");
						navHeader.removeClass("header-show");

						if($(".is_fix_real").length) {
							body.removeClass('head_fix');
						}
					}
				}

			}); $(window).trigger("resize");
		}
	},

	sidebarScroll : function() {
		if($('.box_billwrap').length) {
			// activate if window is wider than...
			var stickyWindowWidth = 819;

			var headerT = $(".header_n_ty02").offset().top;
			var headerH = $(".header_n_ty02");
			//var topVisual = $(".top_visual").offset().top;
			var stickyNav = $(".visual_menu").offset().top;

			const body = $("body");
			let lastScroll = 0;

			const travelDistance = 150;
			const throttleDuration = 50;
			let prevScrollPosition = 0;

			const baseClass = 'header_n_ty02';
			const scrollingUp = `${baseClass}--nav-down`;
			const scrollingDown = `${baseClass}--nav-up`;
			const pinned = `${baseClass}--pinned`;

			const currentScroll = window.pageYOffset;
			const currNtop = $(window).scrollTop();

			const header = document.querySelector(`.${baseClass}`);
			let headerHeight = 0;

			const supportPageOffset = window.pageXOffset !== undefined;
			const isCSS1Compat = (document.compatMode || '') === 'CSS1Compat';
			const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

			// user has a prefers reduced motion preference. Exit before initializing any animations
			if (prefersReducedMotion && !prefersReducedMotion.matches) {
				initHeader();
				observeHeader();
			}

			function initHeader() {
				const headerInner = header.querySelector(`.${baseClass}__inner`);

				if (!header || !headerInner) {
					return false;
				}
	
				const resizeObserver = new ResizeObserver(entries => {
					headerHeight = headerInner.offsetHeight;
					header.style.setProperty('--header-height', headerHeight + 'px');
				});

				resizeObserver.observe(headerInner);
			}

			function observeHeader() {
				function handler(entries, observer) {
					const scrollPosition = getScrollPosition();
					if (!entries[0].isIntersecting && scrollPosition > 0) {
						header.classList.add(pinned);
					}
				}

				const observer = new IntersectionObserver(handler);
				observer.observe(header);
			}

			const getScrollPosition = () => {
				return Math.round(supportPageOffset ?
				window.pageYOffset :
				isCSS1Compat ?
				document.documentElement.scrollTop :
				document.body.scrollTop);
			};

			const offset = travelDistance - 1;
			const scrolledPosition = getScrollPosition();

			var a_link = $('.lienSmooth');
			var sections = $('.content_section'),
				sideNav = $('.sticky_sidebar'),
				sideHeight = sideNav.outerHeight(),
				nav_height2 = headerH.outerHeight() + $(".visual_menu").outerHeight();
			//visHeight = $(".visual_menu").outerHeight();

			/*
			if ($(window).width() > stickyWindowWidth) {
				a_link.on('click',function(e){
					e.preventDefault();
					$('html, body').animate({
						//scrollTop: $($.attr(this, 'href')).offset().top - nav_height + 300
						scrollTop: $($.attr(this, 'href')).offset().top - nav_height2 - 50
						//scrollTop: $($.attr(this, 'href')).offset().top // 모바일
					}, 500);
					
					return false;
				});
			} else {
				a_link.on('click',function(e){
					e.preventDefault();
					
					let currentTop=eval($(document).scrollTop());
					let targetTop=eval($($.attr(this, 'href')).offset().top);
					let goTop=$($.attr(this, 'href')).offset().top - nav_height2;
					if(currentTop > targetTop)	goTop=$($.attr(this, 'href')).offset().top-nav_height2-sideHeight;					
					$('html, body').animate({
						scrollTop: goTop
					}, 500);
				});
			}
			*/

			if ($(window).width() > stickyWindowWidth) {
				a_link.on('click',function(e){
					e.preventDefault();
					let clk_elm=$(this);
					$('html, body').animate({
						scrollTop: $($.attr(this, 'href')).offset().top - nav_height2 - 50
					}, 500
					,function(){
						$('.sticky_sidebar ul').find('li').removeClass('current');
						clk_elm.parent('li').addClass('current');
					});

					return false;
				});
			} else {
				a_link.on('click',function(e){
					e.preventDefault();
					let clk_elm=$(this);
					let currentTop=eval($(document).scrollTop());
					let targetTop=eval($($.attr(this, 'href')).offset().top);
					let goTop=$($.attr(this, 'href')).offset().top - nav_height2 - 30;
					if(currentTop > targetTop)	goTop=$($.attr(this, 'href')).offset().top-nav_height2-sideHeight;
					$('html, body').animate({
						scrollTop: goTop
					}, 500
					,function(){
						$('.sticky_sidebar ul').find('li').removeClass('current');
						clk_elm.parent('li').addClass('current');
					});
				});
			}
			
			$(window).scroll(function () {
				var scrollTop = $(window).scrollTop();
				const currentScroll = window.pageYOffset;

				function totalScrolled() {
					const offset = travelDistance - 1;
					const scrolledPosition = getScrollPosition();

					var scrollTop = $(window).scrollTop();

					if (scrolledPosition == 0) {
						body.removeClass("nav-down");
					}
					
					// Scroll Down
					if (scrolledPosition > prevScrollPosition + offset) {
						//body.addClass("nav-up");
						//body.removeClass("nav-down");

						body.removeClass("nav-down").addClass("nav-up");

						prevScrollPosition = scrolledPosition;
					}

					if (scrollTop > stickyNav) {
						$("#container").addClass('sticky');
						$(".top_visual").addClass('sticky');
					}

					// Scroll Up
					if (scrolledPosition < prevScrollPosition - offset) {
						//body.addClass("nav-down");
						//body.removeClass("nav-up");

						body.removeClass("nav-up").addClass("nav-down");

						prevScrollPosition = scrolledPosition;
					}

					if (scrollTop < stickyNav) {
						$("#container").removeClass('sticky');
						$(".top_visual").removeClass('sticky');
					}
				}

				let throttleTimer;

				const throttle = (callback, time) => {
					if (throttleTimer) return;

					throttleTimer = true;
					setTimeout(() => {
						callback();
						throttleTimer = false;
					}, time);
				};

				window.addEventListener('scroll', () => {
					throttle(totalScrolled, throttleDuration);
				});

				if ($(window).width() > stickyWindowWidth) {
					var contentHeight = $(".de_contb").height();
					sections.each(function() {
						//scrollTop: $($.attr(this, 'href')).offset().top - sideHeight + 300
						/*
						var top = $(this).offset().top - sideHeight,
							bottom = top + $(this).outerHeight();

						if (scrTop01 >= top && scrTop01 <= bottom) {
							sideNav.find('a').parent().removeClass('current');
							sections.removeClass('active');

							$(this).parent().addClass('current');
							sideNav.find('a[href="#' + $(this).attr('id') + '"]').parent().addClass('current');
						}
						*/

						var chapterTop = $(this).offset().top;
						var chapter = $(this).attr('id');

						if(scrollTop > chapterTop - 500) {
							$('.sticky_sidebar ul').find('li').removeClass('current');
							$('.sticky_sidebar ul').find('li[class="'+chapter+'"]').addClass('current');
						} else {
							$('.sticky_sidebar ul').find('li[class="'+chapter+'"]').removeClass('current');
						}

						var contentScroll = $(this).scrollTop();
		
						if(scrollTop <= 0) {
							$('.sticky_sidebar nav').css({'top': '0'});
						} else if(scrollTop >= contentHeight/2) {
							$('.sticky_sidebar nav').css({'bottom': '0', 'top': 'initial'});
						} else {
							$('.sticky_sidebar nav').css({'top': '0'});
						}

					});

				} else {
					sections.each(function() {
						var chapterTop = $(this).offset().top;
						var chapter = $(this).attr('id');
						var contentHeight = $(".de_contb").height();

						if(scrollTop > chapterTop - 250) {
							$('.sticky_sidebar ul').find('li').removeClass('current');
							$('.sticky_sidebar ul').find('li[class="'+chapter+'"]').addClass('current');
						} else {
							$('.sticky_sidebar ul').find('li[class="'+chapter+'"]').removeClass('current');
						}

						var contentScroll = $(this).scrollTop();
		
						if(scrollTop <= 0) {
							$('.sticky_sidebar nav').css({'top': '0'});
						} else if(scrollTop >= contentHeight/2) {
							$('.sticky_sidebar nav').css({'bottom': '0', 'top': 'initial'});
						} else {
							$('.sticky_sidebar nav').css({'top': '0'});
						}
					});
				}
			});
		}
	}
}

$(function(){
	gnbPub.comhead();


if($('#header .scroll-wrap').length) {		
	const scrollBox = document.querySelector("#header .scroll-wrap");
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
	
}

});


$(window).on('load',function(){
	//안드로이드 커버하는 뉴스리스트 swipe 제목너비 변수화
	const dtwidth = document.querySelector('.h_area dt').offsetWidth;
	document.documentElement.style.setProperty('--dt-width', `${dtwidth}px`);
})
