let bSumm=false;
function getSummary()
{
	if(!bSumm)
	{
		bSumm=true;
		let idx = $('.summary_btn').data('id');
		idx=encodeURIComponent( idx );
	
		$.ajax({
			url: 'https://www.asiae.co.kr/news/getSummary.php',
			data: 'idxno='+idx,
			dataType: 'jsonp',
			jsonp : "callback",
			cache: false,
			success: function(getData){
				let data = getData;

				if(data['result'] != 'error' )
				{							
					if(data['result']['business_code'] == '1000')
						$('#summary_txtbox').html(data['result']['summary']);
					else
						$('#summary_txtbox').html('요약문을 제공하지 않는 기사입니다.');
				}
				else 
					$('#summary_txtbox').html('잠시 후 다시 시도해 주세요.');

			},
			error: function(getData,status,err){
				$('#summary_txtbox').html('오류가 발생하였습니다. 잠시 후 다시 시도해 주세요.');
				bSumm=false;
			}
		});
	}
}

//자동출처
function copy_play(idxno)
{
	const addText = '\n | 출처 : 아시아경제 | https://www.asiae.co.kr/article/'+idxno;

	const isIos = navigator.userAgent.match(/ipad|iphone/i);
	if (isIos) {
		const textarea = document.createElement('textarea');
		document.body.appendChild(textarea);

		const range = document.createRange();
		range.selectNodeContents(textarea);

		const selection = window.getSelection();
		let iosText = '';
		iosText = selection.toString();

		selection.addRange(range);
		textarea.setSelectionRange(0, 999999);
		document.execCommand('copy');
		document.body.removeChild(textarea);

		//alert(iosText);
		navigator.clipboard.writeText(iosText+addText);
	}else{
		if (window.event)
		{
			window.event.returnValue = true;
			var copyText = selectText();
			var lastText = copyText+addText;
			navigator.clipboard.writeText(lastText).then().catch((error) =>{
				alert('다시 복사해주세요.('+error+')');
			});
		}
	}
}

function selectText(){
	var selectionText = "";
	if (document.getSelection) {
		selectionText = document.getSelection();
	} else if (document.selection) {
		selectionText = document.selection.createRange().text;
	}
	return selectionText;
}
//자동출처