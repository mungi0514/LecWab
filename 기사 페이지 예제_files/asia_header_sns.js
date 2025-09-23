var CtrlMenu = {
	ctrlMenus : []

	,findElements : function(element) {
		return (!Object.isUndefined(this.ctrlMenus[element])) ? this.ctrlMenus[element] : false;
	}

	,create : function( element ) {
		var options = Object.extend({
			groupID : 'gnb'
			,initID : ''
			,mainMenu : 'news_menu'		//Depth 1
			,subMenu : 'submenu'		//Depth 2 & Depth 3
			,subMenu_limitCount : 30
			,mainPrvPosID : ''
			,subPrvPosID : ''
			,bMenuOver : false
			,nCheckTime_menu : 50
			,nCheckTime_Close : 0
		}, arguments[1] || { });

		this.ctrlMenus[element] = options;

		this.setAction( element );

		Event.observe(this.ctrlMenus[element].groupID, 'mouseout', this.setGnbOut.bindAsEventListener(this, element, this.ctrlMenus[element].groupID));
	}

	,setGnbOut : function( event, element, groupID ) {
		var ctrlElement = '';
		if( !(ctrlElement=CtrlMenu.findElements(element)) )
			return false;

		setTimeout( CtrlMenu.closeGnb.bindAsEventListener(this, element), ctrlElement.nCheckTime_Close );
	}

	,closeGnb : function( event, element ) {
		var ctrlElement = '';
		if( !(ctrlElement=CtrlMenu.findElements(element)) )
			return false;

		if( ctrlElement.bMenuOver==false )
		{
			if( ctrlElement.mainPrvPosID!='' )
			{
				$(ctrlElement.mainPrvPosID).removeClassName('submenuHover');
				$(ctrlElement.mainPrvPosID+'_list').removeClassName('MenuBarSubmenuVisible');
				$(ctrlElement.mainPrvPosID).removeClassName(ctrlElement.mainPrvPosID+'_on');
			}
			if( ctrlElement.subPrvPosID!='' )
			{
				$(ctrlElement.subPrvPosID).removeClassName('submenuHover');
				if( $(ctrlElement.subPrvPosID+'_list')!=null ) $(ctrlElement.subPrvPosID+'_list').removeClassName('MenuBarSubmenuVisible');
				$(ctrlElement.subPrvPosID).removeClassName(ctrlElement.subPrvPosID+'_on');
			}

			//Init Menu Set
			if( ctrlElement.initID!='' && $(ctrlElement.initID)!=null )
			{
				$(ctrlElement.initID).addClassName('submenuHover');
				$(ctrlElement.initID).addClassName(ctrlElement.initID+'_on');
				ctrlElement.mainPrvPosID = ctrlElement.initID;
			}
		}
	}

	,setAction : function( element ) {
		var ctrlElement = '';
		if( !(ctrlElement=this.findElements(element)) )
			return false;

		var mainMenuCount = this.getItemCount(ctrlElement.mainMenu);
		var nMainMenuNo = nSubMenuNo = nSub3MenuNo ='';
		var mainMenuID = subMenuID = sub3MenuID = '';

		for( k=1; k<mainMenuCount; k++ )
		{
			if( k<10 ) nMainMenuNo = '0' + k;
			else       nMainMenuNo = k;

			//Depth 1 Menu Action Set
			mainMenuID = ctrlElement.mainMenu + nMainMenuNo;
			Event.observe(mainMenuID, 'mouseover', this.setMainMenuOver.bindAsEventListener(this, element, mainMenuID));
			Event.observe(mainMenuID, 'mouseout', this.setMouseOut.bindAsEventListener(this, element));

			//Init Menu Set
			if( ctrlElement.initID!='' && $(ctrlElement.initID)!=null )
			{
				if( mainMenuID==ctrlElement.initID )
				{
					$(mainMenuID).addClassName('submenuHover');
					$(mainMenuID).addClassName(mainMenuID+'_on');
					ctrlElement.mainPrvPosID = mainMenuID;
				}
			}


			//Depth 2 Menu Action Set
			for( var q=1; q<ctrlElement.subMenu_limitCount; q++ )
			{
				if( q<10 ) nSubMenuNo = '0' + q;
				else       nSubMenuNo = q;

				subMenuID = ctrlElement.subMenu + nMainMenuNo + '_' + nSubMenuNo;
				if( $(subMenuID)!=null )
				{
					Event.observe(subMenuID, 'mouseover', this.setSubMenuOver.bindAsEventListener(this, element, subMenuID));
					Event.observe(subMenuID, 'mouseout', this.setMouseOut.bindAsEventListener(this, element));
				}

				//Depth 3 Menu Action Set
				for( var p=1; p<ctrlElement.subMenu_limitCount; p++ )
				{
					if( p<10 ) nSub3MenuNo = '0' + p;
					else       nSub3MenuNo = p;

					sub3MenuID = subMenuID + '_' + nSub3MenuNo;
					if( $(sub3MenuID)!=null )
					{
						Event.observe(sub3MenuID, 'mouseover', this.setSub3MenuOver.bindAsEventListener(this, element, sub3MenuID));
						Event.observe(sub3MenuID, 'mouseout', this.setMouseOut.bindAsEventListener(this, element));
					}
				}
			}
		}
	}
	,setSub3MenuOver : function( event, element, curPosID ) {
		var ctrlElement = '';
		if( !(ctrlElement=CtrlMenu.findElements(element)) )
			return false;

		//menu on true setting
		CtrlMenu.setMouseOver(element);
	}

	,setSubMenuOver : function( event, element, curPosID ) {
		var ctrlElement = '';
		if( !(ctrlElement=CtrlMenu.findElements(element)) )
			return false;

		//sleep(ctrlElement.nCheckTime_menu);

		//menu on true setting
		CtrlMenu.setMouseOver(element);

		//previos position reset
		if( ctrlElement.subPrvPosID!='' )
		{
			$(ctrlElement.subPrvPosID).removeClassName('submenuHover');
			if( $(ctrlElement.subPrvPosID+'_list')!=null ) $(ctrlElement.subPrvPosID+'_list').removeClassName('MenuBarSubmenuVisible');
			$(ctrlElement.subPrvPosID).removeClassName(ctrlElement.subPrvPosID+'_on');
		}

		//current css style set
		if( $(curPosID+'_list')!=null )
		{
			$(curPosID).addClassName('submenuHover');
			if( $(curPosID+'_list')!=null ) $(curPosID+'_list').addClassName('MenuBarSubmenuVisible');
			$(curPosID).addClassName(curPosID+'_on');

			//current position -> previos position set
			ctrlElement.subPrvPosID = curPosID;
		}

		ctrlElement.bMenuOn = true;
	}

	,setMainMenuOver : function( event, element, curPosID ) {
		var ctrlElement = '';
		if( !(ctrlElement=CtrlMenu.findElements(element)) )
			return false;

		//sleep(ctrlElement.nCheckTime_menu);

		//menu on true setting
		CtrlMenu.setMouseOver(element);

		//previos position reset
		if( ctrlElement.mainPrvPosID!='' )
		{
			$(ctrlElement.mainPrvPosID).removeClassName('submenuHover');
			$(ctrlElement.mainPrvPosID+'_list').removeClassName('MenuBarSubmenuVisible');
			$(ctrlElement.mainPrvPosID).removeClassName(ctrlElement.mainPrvPosID+'_on');
		}

		//current css style set
		$(curPosID).addClassName('submenuHover');
		$(curPosID+'_list').addClassName('MenuBarSubmenuVisible');
		$(curPosID).addClassName(curPosID+'_on');

		//current position -> previos position set
		ctrlElement.mainPrvPosID = curPosID;

		//submenu postion data reset
		if( ctrlElement.subPrvPosID!='' )
		{
			$(ctrlElement.subPrvPosID).removeClassName('submenuHover');
			$(ctrlElement.subPrvPosID+'_list').removeClassName('MenuBarSubmenuVisible');
			$(ctrlElement.subPrvPosID).removeClassName(ctrlElement.subPrvPosID+'_on');
		}
	}

	,setMouseOver : function( element ) {
		var ctrlElement = '';
		if( !(ctrlElement=CtrlMenu.findElements(element)) )
			return false;

		ctrlElement.bMenuOver = true;
	}

	,setMouseOut : function( event, element ) {
		var ctrlElement = '';
		if( !(ctrlElement=CtrlMenu.findElements(element)) )
			return false;

		ctrlElement.bMenuOver = false;
	}

	,getItemCount : function( eleName ) {
		var nCount = 1;
		var strName = '';
		while( 1 )
		{
			if( nCount<10 ) strName = eleName + '0' + nCount;
			else            strName = eleName + nCount;

			if( $(strName)==null ) break;

			nCount++;
		}
		return nCount;
	}
};


function sleep(msecs)
{
	var start = new Date().getTime();
	var cur = start
	while(cur - start < msecs)
	{
		cur = new Date().getTime();
	}
}


function recentView( type )
{
	if( type == "news" )
	{
		$('marketsboxset').hide();
		$('newsboxset').show();
		$('recentChk1').checked = true;
		$('recentChk3').checked = true;
		SetCookie("RECENT_VIEW", "", 0, "/", ".asiae.co.kr" );
		SetCookie("RECENT_VIEW", type, 0, "/", ".asiae.co.kr" );
	}
	else if( type == "stock" )
	{
		$('newsboxset').hide();
		$('marketsboxset').show();
		$('recentChk2').checked = true;
		$('recentChk4').checked = true;
		my_comp();
		SetCookie("RECENT_VIEW", "", 0, "/", ".asiae.co.kr" );
		SetCookie("RECENT_VIEW", type, 0, "/", ".asiae.co.kr" );
	}
	else if( type == "stock_init" )
	{
		$('newsboxset').hide();
		$('marketsboxset').show();
		$('recentChk2').checked = true;
		$('recentChk4').checked = true;
		my_comp();
	}

}

function recentModView( type )
{
	SetCookie("RECENT_MOD", "", 0, "/", ".asiae.co.kr" );
	SetCookie("RECENT_MOD", type, 0, "/", ".asiae.co.kr" );

	if( type == "open" )
	{
		$('tabtopmodule').show();
		$('tabtopmodule small').hide();
	}
	else if( type == "close" )
	{
		$('tabtopmodule').hide();
		$('tabtopmodule small').show();
	}
}

function my_comp()
{
	var url = "/include/my_comp.htm";
	var sendAjax = new Ajax.Request(
		url,
		{
			method: "get",
			parameters: "",
			onComplete: viewCompInfo
		});
}

function viewCompInfo( requestVal )
{
	var result = requestVal.responseText;

	if( result == '' )
	{
		$('recent_box').hide();
		$('recent_not').show();
	}
	else
	{
		$('recent_box').show();
		$('recent_not').hide();
		$('recent_mycomp').innerHTML= result;
	}
}

function mod_view( obj, mode, tag, useNavi )
{
	var length = $(obj).getElementsByTagName(tag).length;
	var message = '';
	var nextObjNum = '';
	var viewObjNum = '';

	for( var i=0; i<length; i++ )
	{
		var target = $(obj+"_"+i);
		var state = target.getStyle("display");
		if( state == 'block' )	viewObjNum = i;
	}

	if( mode == "pre" )
	{
		if( viewObjNum == 0 )	nextObjNum = length-1;
		else					nextObjNum = viewObjNum-1;
	}
	else if( mode == "next" )
	{
		if( viewObjNum == length-1 )	nextObjNum = 0;
		else							nextObjNum = viewObjNum+1;
	}
	else if( mode == 'pre_jisu' )
	{
		if( viewObjNum == length-1 )	nextObjNum = 0;
		else							nextObjNum = viewObjNum+1;
		$('chart_jisu').innerHTML = '<a href="javascript:view_jisu_chart(\''+nextObjNum+'\');" class="btn_pop"><strong>��Ʈ������</strong></a>';
	}
	else if( mode == "next_jisu" )
	{
		if( viewObjNum == length-1 )	nextObjNum = 0;
		else							nextObjNum = viewObjNum+1;
		$('chart_jisu').innerHTML = '<a href="javascript:view_jisu_chart(\''+nextObjNum+'\');" class="btn_pop"><strong>��Ʈ������</strong></a>';
	}

	if( length > 1 )
	{
		for( var i=0; i<length; i++ )
		{
			//if( i == viewObjNum )		$(obj+"_"+i).setStyle("display:none");
			//else if( i == nextObjNum )	$(obj+"_"+i).setStyle("display:block");
			if( i == viewObjNum )		$(obj+"_"+i).style.display = 'none';
			else if( i == nextObjNum )	$(obj+"_"+i).style.display = 'block';
		}
	}

	if( useNavi == true )
	{
		var nowNum = nextObjNum+1;
		$(obj+"_num").innerHTML = "<em>"+nowNum+"</em>/"+length;
	}
}

function view_tab( obj, tag, number )
{
	// ID SETTING : ObjName >> ObjName_tab >> ObjName_item_(NUMBER)
	var tab = $(obj+"_tab").getElementsByTagName(tag);
	var tab_len = tab.length;

	for( i=0; i<tab_len; i++ )
	{
		if( i == number )
		{
			if( obj == 'updown_mod' )
			{
				var num = i+1;
				$(obj+"_tab").addClassName('select0'+num);
				$(obj+'_item_'+i).show();
			}
			else
			{
				$(tab[i]).addClassName('selected');
				$(obj+'_item_'+i).style.display='block';
			}
		}
		else
		{
			if( obj == 'updown_mod' )
			{
				var num = i+1;
				$(obj+"_tab").removeClassName('select0'+num);
				$(obj+'_item_'+i).hide();
			}
			else
			{
				$(tab[i]).removeClassName('selected');
				$(obj+'_item_'+i).style.display='none';
			}
		}
	}
}

function r_Tab_view( obj, tag, num )
{
	//obj, obj_list0, obj_item0
	var list = $(obj).getElementsByTagName(tag);
	var loop = list.length;

	for( i=0; i<loop ; i++ )
	{
		if( num == i )
		{
			$(obj+'_item'+i).show();
			$(obj+'_list'+i).addClassName('on');
		}
		else
		{
			$(obj+'_item'+i).hide();
			$(obj+'_list'+i).removeClassName('on');
		}
	}
}

function SetCookie(name, value, expire, path, domain, secure)
{
	var argv = SetCookie.arguments;
	var argc = SetCookie.arguments.length;
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

function getCookie( cookieName )
{
	var search = cookieName + "=";
	var cookie = document.cookie;

	if( cookie.length > 0 )
	{
		startIndex = cookie.indexOf( cookieName );
		if( startIndex != -1 )
		{
			startIndex += cookieName.length;
			endIndex = cookie.indexOf( ";", startIndex );
			if( endIndex == -1) endIndex = cookie.length;
			return unescape( cookie.substring( startIndex + 1, endIndex ) );
		}
		else
		{
			return false;
		}
	}
	else
	{
		return false;
	}
}

function delCompCookie( comp_code )
{
	var getCompCookie = getCookie( 'COMP_COOKIE' );
	var arrCompInfo = getCompCookie.split('|');
	var len = arrCompInfo.length;
	var reCompCookie = '';
	var num = 0;
	var expDate = new Date();
	expDate.setTime(expDate.getTime() + 1000*60*60*24*120);

	for( i=0; i<len; i++ )
	{
		var arrCompInfo_detail = arrCompInfo[i].split('@');
		if( arrCompInfo_detail[0] != comp_code )
		{
			if( num == 0 )	reCompCookie += arrCompInfo[i];
			else			reCompCookie += '|'+arrCompInfo[i];
			num++;
		}
	}
	SetCookie( 'COMP_COOKIE', reCompCookie, expDate, '/', 'asiae.co.kr', '');
	my_comp();
}

function RegistPageJump()
{
	var strUrl = document.location.href;

	strUrl = strUrl.replace(/\</g, "&lt;");
	strUrl = strUrl.replace(/\>/g, "&gt;");

	SetCookie("JUMP_URI", strUrl, 0, "/", ".asiae.co.kr" );
 
	//os update ������
	SetCookie("INFLOW_URL", "https://user.asiae.co.kr/snslogin/user_reg.htm?udt=1", 0, "/", ".asiae.co.kr" );
	document.location.href="https://user.asiae.co.kr/snslogin/user_reg.htm?udt=1";
	//os update ������
	//document.location.href="https://user.asiae.co.kr/new_login/reg_welcome.htm?udt=1";
}

function LoginPageJump()
{
	var strUrl = document.location.href;

	strUrl = strUrl.replace(/\</g, "&lt;");
	strUrl = strUrl.replace(/\>/g, "&gt;");

	SetCookie("JUMP_URI", strUrl, 0, "/", ".asiae.co.kr" );

	document.location.href="https://user.asiae.co.kr/snslogin/login.htm?udt=1";
}

function LogoutPageJump()
{

	var strUrl = document.location.href;
	SetCookie("JUMP_URI", strUrl, 0, "/", ".asiae.co.kr" );

	document.location.href="https://user.asiae.co.kr/mypage/logout.htm?udt=1";
}

function LoginPage()
{
	var strUrl = document.location.href;
	SetCookie("JUMP_URI", strUrl, 0, "/", ".asiae.co.kr" );

	WinCenterOpen('https://user.asiae.co.kr/snslogin/login_popup.htm?udt=1', 'LoginWin', 391, 701, 'toolbars=0,resizable=0,scrollbars=no');
}
 
function goSS( obj, strLink )
{
	var key = $(obj).value;

	if(key == '')
	{
		if( !objClick )
		{
			if( strLink == 'asia_news_top' ) {
				window.open( 'http://military.asiae.co.kr/' );
			}
			else if( strLink == 'asia_market_top' ) {
				window.open( 'http://www.asiae.co.kr/event/2011bond/' );
			}
		}
		return false;
	}
	else
	{
		if( key == 'CARPLE�� ��ģ�� �Ǿ��ּ���!' ) {
			window.open('http://www.asiae.co.kr/event/carple_open/');
		}
		else {
			var baseUrl = gUrlVar['WebUrl']+'/market/item/search_item.htm?sn=';
			if( obj == 'search1' )		document.mySSForm1.submit();
			else if( obj == 'search2' )
			{
				//var reKey = key.toUpperCase();//���� �빮�ڷιٲٱ�
				var reKey = key.toLowerCase();//���� �ҹ��ڷιٲٱ�
				if(reKey=='ls') reKey = 'l%s%';
				document.location.href = baseUrl+encodeURIComponent(reKey);
			}
			else if( obj == 'search3' )	document.mySSForm3.submit();
			else if( obj == 'search4' )	document.location.href = baseUrl+encodeURIComponent(key);
		}
	}
}

function goSS_new( obj, strLink, strTarget ){
	var key = $(obj).value;

	if( key == ''){

		if( strLink=='')
			return;

		if( strTarget == '_blank'){
			window.open( strLink );
		}
		else {
			document.location.href = strLink;
		}
		return false;
	} 
	else{
		if( key == 'CARPLE�� ��ģ�� �Ǿ��ּ���!' ) {
			window.open('http://www.asiae.co.kr/event/carple_open/');
		}
		else if( key == '���ڳ�͸��� �űԵ��� �����̺�Ʈ' ) {
			window.open('http://er.asiae.co.kr/company/request.htm');
		}
		else {
			var baseUrl = gUrlVar['WebUrl']+'/market/item/search_item.htm?sn=';
			if( obj == 'search1' )		document.mySSForm1.submit();
			else if( obj == 'search2' )	document.location.href = baseUrl+encodeURIComponent(key);
			else if( obj == 'search3' )	document.mySSForm3.submit();
			else if( obj == 'search4' )	document.location.href = baseUrl+encodeURIComponent(key);
		}
	}
}


/*
function autoword_load()
{
	new CtrlXML(
		'content'
		,{
			url: gUrlVar['WebUrl']+'/xml/jongmok_split.xml.htm'
			,onSubmit: [ [ autoword ], {} ]
		}
	);
	return;

	autoword( strAutowordData );
}
*/

function autoword_load( ctrlObj )
{
	/*
	var strArrayData = [];
	strArrayData['JCODE'] = [];
	strArrayData['JTITLE'] = [];
	strArrayData['JWORD'] = [];

	var strArrTmp = [];
	var strArrTmp_2;

	strArrTmp = splits(ctrlObj.parseData['ITEMS']['JDATA'][0], "\n");
	for( var k=0; k<strArrTmp.length; k++ )
	{
		strArrTmp_2 = [];
		strArrTmp_2 = splits(strArrTmp[k], "|");

		strArrayData['JCODE'][k]  = strArrTmp_2[0];
		strArrayData['JTITLE'][k] = strArrTmp_2[1];
		strArrayData['JWORD'][k]  = strArrTmp_2[2];
	}
	*/

	if( $('search1')!=null )
	{
		CtrlAutoWord.create(
			'srhform'
			,{
				ctrlForm : 'mySSForm1'
				, inputBox : 'search1'
				, resultBox : 'query_result1'
				, handleID : 'srhitem1'
			}
		);
	}

	if( $('search2')!=null )
	{
		CtrlAutoWord.create(
			'srhform2'
			,{
				ctrlForm : 'mySSForm2'
				, inputBox : 'search2'
				, resultBox : 'query_result2'
				, handleID : 'srhitem2'
			}
		);
	}

	if( $('search3')!=null )
	{
		CtrlAutoWord.create(
			'srhform3'
			,{
				ctrlForm : 'mySSForm3'
				, inputBox : 'search3'
				, resultBox : 'query_result3'
				, handleID : 'srhitem3'
			}
		);
	}

	if( $('rec_jong_input')!=null )
	{
		CtrlAutoWord.create(
			'srhform4'
			,{
				ctrlForm : 'rec_jong_form'
				, inputBox : 'rec_jong_input'
				, resultBox : 'rec_jong_result'
				, hdnValueBox : 'recent_jong_code'
				, handleID : 'srhitem4'
			}
		);
	}
}

function sokbo( stat )
{
	var windowHeight = screen.height - 80;
	var windowWidth = screen.width - 10;

	if( stat=='ent' ) stat = '?st='+stat;
	else              stat = '';

	window.open( gUrlVar['WebUrl'] + '/news/sokbo/'+stat,'asia_sokbo', "width=" + windowWidth + ",height=" + windowHeight + ",top=0,left=0,resizable=1,toolbar=no" );
}

var layerFlagArray = Array();
function showHideSimpleLayer(strName)
{
	if( Object.isUndefined(layerFlagArray[strName]) )
	{
		layerFlagArray[strName] = false;
	}

	if( !layerFlagArray[strName] )
	{
		$(strName).setStyle( 'display:block;' );
		layerFlagArray[strName] = true;
	}
	else
	{
		$(strName).setStyle( 'display:none;' );
		layerFlagArray[strName] = false;
	}
}

var isDOM = (document.getElementById ? true : false);
var isIE4 = ((document.all && !isDOM) ? true : false);
var isNS4 = (document.layers ? true : false);
var gVarImage = '';
if( isNS4 ) document.captureEvents(Event.KEYPRESS);
function id2obj( id )
{
	var obj = null;

	if( isDOM )
		obj = document.getElementById(id);
	else if( isIE4 )
		obj = document.all[id];
	else
		obj = document.layers[id];

	return( obj );
}

function splits( source, separator, seq ) {
	return seq ? source.split(separator)[seq] : source.split(separator);
}

function WinCenterOpen(strUrl, strWinName, intWidth, intHeight, strOption)
{
	if (screen.width <= 800) {
		intTop = 0;
		intLeft = 0;
	} else {
		intTop = (screen.height)?(screen.height-intHeight)/2:100;
		intLeft = (screen.width)?(screen.width-intWidth)/2:100;
	}

	if(strOption.length > 0) strOption = "," + strOption;

	window.open(strUrl, strWinName, "top="+intTop+", left="+intLeft+", width="+intWidth+", height="+intHeight + strOption);
}

function jongmok_sise_view()
{
	WinCenterOpen(gUrlVar['WebUrl'] + '/common/comp_kind/comp_kind.htm', 'jongmok_sise', 926, 720, 'toolbars=0,resizable=0,scrollbars=yes');
}

function popup_close()
{
	opener=window;
	window.close();
	//self.opener = self;
	//self.close();
}
function topPage() {
document.documentElement.scrollTop = 0;
}

function view_mk_tab( module_id, type_num, item_length )
{
	var url = "/include/right_module/r_getData.inc.php";
	var sendAjax = new Ajax.Request(
		url,
		{
			method: "get",
			parameters: "mi="+module_id+"&tn="+type_num+'&il'+item_length,
			onComplete: function(returnValue)
			{
				var getData = returnValue.responseText;
				$(module_id+'_r_view').update(getData);
			}
		});

	var tabs = $(module_id).getElementsByTagName('li');
	var tab_len = tabs.length;

	for( var i=0; i<tab_len; i++ )
	{
		$(tabs[i]).removeClassName('selected');
	}

	if( type_num < 2 )							tabs[0].addClassName('selected');
	else if( type_num >= 2 && type_num < 4 )	tabs[1].addClassName('selected');
	else if( type_num >= 4)						tabs[2].addClassName('selected');
}

function view_mk_tab_foreign( module_id, type, gubun )
{
	var url = "/include/right_module/r_getData_foreign.inc.php";
	var sendAjax = new Ajax.Request(
		url,
		{
			method: "get",
			parameters: "tp="+type+"&gb="+gubun,
			onComplete: function(returnValue)
			{
				var getData = returnValue.responseText;
				$(module_id+'_r_view_foreign').update(getData);
			}
		});
}

function UserHomeSet()
{
	document.body.style.behavior = 'url(#default#homepage)';
	document.body.setHomePage('http://www.asiae.co.kr');
}

function HomeSetHidden()
{
	if( $('homeset')!=null )
	{
		if( navigator.appName=='Netscape' )
		{
			$('homeset').setStyle({display:'none'});
		}
	}
}

function getIntranet()
{
	new Ajax.Request(
		"/include/frame/get_clientip.php",
		{
			method: 'get',
			parameters: '',
			onComplete: function(request){
				if( request.responseText == '124.111.208' || request.responseText == '218.235.67.' ){
					$('strIntranetView').update('<a href="http://intra.asiae.co.kr" target="_blank" title="��Ʈ���" rel="��Ʈ��� Home">��Ʈ���</a>');
				}else{
					$('strIntranetView').update('');
				}
			}
		}
	);
}

var curTbl_idx = {};
function mover_tbl( obj )
{
	$(obj).setStyle({backgroundColor: '#F8FAFC'});
}
function mout_tbl( obj )
{
	var expArr = splits(obj.id, '_');

	if( curTbl_idx[ expArr[0] ] != obj.id )
		$(obj).setStyle({backgroundColor: ''});
}
function mclick_tbl( obj )
{
	var expArr = splits(obj.id, '_');
	if( $(curTbl_idx[ expArr[0] ])!=null )
		$(curTbl_idx[ expArr[0] ]).setStyle({backgroundColor: ''});

	curTbl_idx[ expArr[0] ] = obj.id;
	$(obj).setStyle({backgroundColor: '#F8FAFC'});
}

function RightMouseReturn()
{
	document.oncontextmenu = new Function ("return false");
	document.ondragstart = new Function ("return false");
	document.onselectstart = new Function ("return false");
}


//aside function
//var tabnumber=1;
//var interval_id=setInterval("tabChange()",3000);
function tabChange (type,area)
{ 
	//alert(type);
	if (type=='p'){
		//clearInterval(interval_id);

		//document.getElementById("stab").className = 'st07_0'+area+' side_tab type2';

		for(var i=1; i<3; i++) {
			document.getElementById('ntab'+i).style.display = 'none';
		}		
		document.getElementById('ntab'+area).style.display = 'block';

	} else if (type=='r') {
		//clearInterval(interval_id);

		document.getElementById("tab").className = '';
		document.getElementById("tab").className = 'st04_0'+area+' side_tab';

		for(var i=1; i<4; i++) {
			document.getElementById('rtab'+i).style.display = 'none';
		}

		document.getElementById('rtab'+area).style.display = 'block';

	} else if(type=='n') {
		//clearInterval(interval_id);

		for(var i=1; i<3; i++) {
			document.getElementById('btn'+i).style.display = 'none';
		}
		
		if( area == 1) { area = area+1;} 
		else if(area == 2) { area = area-1;}

		document.getElementById('btn'+area).style.display = 'block';
	} else {

		document.getElementById("tab").className = '';
		document.getElementById("tab").className = 'st02_0'+tabnumber+' side_tab';

		for(var i=1; i<4; i++) {
			document.getElementById('rtab'+i).style.display = 'none';
		}

		document.getElementById('rtab'+tabnumber).style.display = 'block';

		//tabnumber++;
		//if( tabnumber >=4 ) { tabnumber = 1; }

	}
}

function jongmok_sise()
{
	WinCenterOpen(gUrlVar['WebUrl'] + '/common/comp_kind/comp_kind2014.htm', 'jongmok_sise', 930, 720, 'toolbars=0,resizable=0,scrollbars=yes');
}


//오늘의 운세 스크롤 링크
function go_fortune(tg)
{
	if(tg == 'star')
	{
		if(j$('#starfortune'))
		{

			var star_t=eval(j$('#starfortune')[0].offsetTop)+350;
			j$('html, body').animate({scrollTop : star_t}, 400);
		}

	}
	else
	{
		if(j$('#anifortune'))
		{
			var ani_t=eval(j$('#anifortune')[0].offsetTop)+350;
			j$('html, body').animate({scrollTop : ani_t}, 400);
		}
	}

	return false;
}

