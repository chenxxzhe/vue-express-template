(function($){
    $(".mui-scroll-wrapper").scroll({
        //bounce: false,//滚动条是否有弹力默认是true
		//indicators: false, //是否显示滚动条,默认是true
	});  
})(mui);
$('.m_checkbox').on('click', function (){
	if($('.m_checkbox').hasClass('unchecked')){
		$(this).find('img').attr('src',"/img/yes-select.png");
		$(this).removeClass('unchecked');
		$('#submitInfo').addClass('clicks');
		$('#submitInfo').removeClass('no_clicks');
	} else {
		$(this).addClass('unchecked');
		$(this).find('img').attr('src',"/img/no-select.png");
		$('#submitInfo').addClass('no_clicks');
		$('#submitInfo').removeClass('clicks');
	}
})

var activityArr = ["语言类","舞蹈类","声乐类","器乐类","模特类"];
var organizationArr = ["个人","团体"];
var selectFn = function (dom, arr) {
	var mobileSelect1 = new MobileSelect({
		trigger: dom, 
		title: '',  
		wheels: [
					{data: arr}
				],
		position:[0], //初始化定位 打开时默认选中的哪个 如果不填默认为0
		transitionEnd:function(indexArr, data){
			$('.selectContainer').find('li').eq(indexArr[0]).css('color','#FC8D2C').siblings().css('color','#333333');		
		},
		callback:function(indexArr, data){
	
		}
	});
}
	selectFn('input[name="category"]', activityArr);
	selectFn('input[name="organization"]', organizationArr);


// 上传图片
var obUrl = '';
$("#clipArea").photoClip({
	width: 200,
	height: 200,
	file: "#file",
	view: "#view",
	ok: "#clipBtn",
	loadStart: function() {
		console.log("照片读取中");
	},
	loadComplete: function() {
		console.log("照片读取完成");
	},
	clipFinish: function(dataURL) {
		
	}
});


$('#file').on('change', function () {
	$(".htmleaf-container").show();
	// setImagePreview();
});
$('.img_close').on('click',function(){
	$(".htmleaf-container").hide();
})
// 打开的方法
/**
var setImagePreview = function () {
	var preview, img_txt, localImag, file_head = document.getElementById("file_head"),
			picture = file_head.value;
	if (!picture.match(/.jpg|.gif|.png|.bmp/i)) return alert("您上传的图片格式不正确，请重新选择！"),
			!1;
	if (preview = document.getElementById("preview"), file_head.files && file_head.files[0]) preview.style.display = "block",
			preview.style.width = "63px",
			preview.style.height = "63px",
			preview.src = window.navigator.userAgent.indexOf("Chrome") >= 1 || window.navigator.userAgent.indexOf("Safari") >= 1 ? window.webkitURL.createObjectURL(file_head.files[0]) : window.URL.createObjectURL(file_head.files[0]);
	else {
		file_head.select(),
				file_head.blur(),
				img_txt = document.selection.createRange().text,
				localImag = document.getElementById("localImag"),
				localImag.style.width = "63px",
				localImag.style.height = "63px";
		try {
			localImag.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)",
					localImag.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = img_txt
		} catch(f) {
			return alert("您上传的图片格式不正确，请重新选择！"),
					!1
		}
		preview.style.display = "none",
				document.selection.empty()
	}
	return document.getElementById("DivUp").style.display = "block",
			!0
}
*/
// 截取图片的方法
var imgId;
$("#clipBtn").click(function(){
	// var files = document.getElementById('file').files[0];
	var fd = new FormData();
	var blob = convertBase64UrlToBlob(imgsource);
	fd.append('file', blob);	
	$.ajax({
		url: '/loader-img',
		type: 'post',
		processData: false,
		data: fd,
		contentType: false,
		success: function(myData) {
			var imgPath = myData.imgpath;
			imgId = myData.imgpath;
			$('#form_upload').hide().next().next().show();
			$('#childer_img').attr('src',"http://14.152.78.100:8081/download/img?type=1&img="+imgPath);
			$(".htmleaf-container").hide();
		},
		error: function(data) {
			mui.toast('上传失败');
		}
	});
	
})


// 查看范例
$('.type_examples').on('click', function () {
	mui('#popover').popover('show');
})
$('.m_close').on('click', function(){
	mui('#popover').popover('hide');
	mui('#popover_tip').popover('hide');
})
// 报名须知
$('.about_detail a').on('click', function () {
	mui('#popover_tip').popover('show');
})

// 身份证跟手机号码验证
var passportReg = /^[a-zA-Z0-9]{5,17}$/;  //护照号
var cardReg = /^[a-zA-Z0-9]{8,18}$/;  //身份证
var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;  //手机号码
$(document).on('input propertychange', 'input[name="cardCode"]', function(e) {
	if(e.type === "input" || e.orignalEvent.propertyName === "value") {
		if(this.value.length == 18) {
			if(!cardReg.test(this.value)){ 
				$(this).parent().next().show();
				return;
			}else{
				$(this).parent().next().hide();
			}
		} else if(this.value.length > 18) {
			$(this).parent().next().show();
			return;
		}		
	}
})
$(document).on('input propertychange', 'input[name="teacherMobile"]', function(e) {
	if(e.type === "input" || e.orignalEvent.propertyName === "value") {
		if(this.value.length == 11) { 
			if(!phoneReg.test(this.value)){ 
					$(this).parent().next().show();
					return;
				}else{
					$(this).parent().next().hide();
				}
		} else {
			$(this).parent().next().show();
			return;
		}
	}
})
$(document).on('input propertychange', 'input[name="parentsMobile"]', function(e) {
	if(e.type === "input" || e.orignalEvent.propertyName === "value") {
		if(this.value.length == 11) {  
			if(!phoneReg.test(this.value)){ 
					$(this).parent().next().show();
					return;
				}else{
					$(this).parent().next().hide();
				}
		} else {
			$(this).parent().next().show();
			return;
		}
	}
})

// 身份证识别年龄性别
var idToInfo = function (id_card) {
	var c_caseCode = id_card;
	var c_sex, c_birthday, y, m, d, a;
	if (c_caseCode.split('').length != 15 && c_caseCode.split('').length != 18) {
		mui.toast('身份证格式错误');
		return ;
	}
	if (c_caseCode.split('').length == 15) {
		a = c_caseCode.substr(6, 6).split('');
		c_sex = c_caseCode.substr(15) % 2 == 0 ? 0 : 1;
		y = '19' + a[0] + a[1];
		m = a[2] + a[3];
		d = a[4] + a[5];
		c_birthday = y + '-' + m + '-' + d;
	} else {
		a = c_caseCode.substr(6, 8).split('');
		c_sex = c_caseCode.substr(16, 1) % 2 == 0 ? 0 : 1;
		y = a[0] + a[1] + a[2] + a[3];
		m = a[4] + a[5];
		d = a[6] + a[7];
		c_birthday = y + '-' + m + '-' + d;
	}
	return c_sex;
}
var IdCard = function (UUserCard) {
	var myDate = new Date();
	var month = myDate.getMonth() + 1;
	var day = myDate.getDate();
	var age = myDate.getFullYear() - UUserCard.substring(6, 10) - 1;
	if(UUserCard.substring(10, 12) < month || UUserCard.substring(10, 12) == month && UUserCard.substring(12, 14) <= day) {
		age++;
	}
	return age;
}

// from 对象的集合
$.fn.serializeObject = function() {
	var o = {};
	var a = this.serializeArray();
	$.each(a, function() {
		if (o[this.name]) {
			if (!o[this.name].push) {
				o[this.name] = [o[this.name]];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
};
// 验证信息是否完善
var checkInput = function() {
	var myInput = $('.mui-input-group').find('input[type="text"]');
	for (var i = 0; i <= myInput.length - 1; i++) {
		if ($(myInput[i]).val() == '' || $('#form_upload').is('visible')) {
			mui.toast('请填写完整信息');
			return false;
		}
	}
};
// 验证身份证是否有效
function isCardAvailable($poneInput) { 
	var c_caseCode = $poneInput.val();
	var c_sex, c_birthday, y, m, d, a; 
	if (!cardReg.test($poneInput.val())) {  
		mui.toast('身份证格式错误');  
		return false;
	} else if (c_caseCode.split('').length != 15 && c_caseCode.split('').length != 18) {
		mui.toast('身份证格式错误');
		return false;
	}
} 

// 获取所有信息
var infoFn = function (){
	var infoArr = $('.mui-input-group').find('input[type="text"]').serializeObject();
	return infoArr;
}

// 提交报名
var submitInfoFn = function () {	
	if(!$('.m_checkbox').hasClass('unchecked')){
		if(checkInput() == false){
			return;
		} 
		if(isCardAvailable($('input[name="cardCode"]')) == false){
			return;
		} 
		if($('#form_upload').is(':visible')){
			return;
		}
		var _data = infoFn();
		var _age = 	idToInfo(_data.cardCode);
		var _sex = 	IdCard(_data.cardCode);	
		var myInfo = JSON.parse(myStorage.getItem("myInfo"));
		var infoData= {
			events_id: myInfo.events_id,				
			name: _data.name,
			cardCode: _data.cardCode,
			category: _data.category,
			headImg: imgId,
			affiliation: _data.affiliation,
			teachersName: _data.teachersName,
			teacherMobile: _data.teacherMobile,
			parentsName: _data.parentsName,
			parentsMobile: _data.parentsMobile,
			programName: _data.program,
			type: _data.organization == "个人"? 1: 2,
			age: _age,
			sex: _sex,
			unionId: myInfo.unionid,
			openId: myInfo.openid
		}
			//判断是否报名
			$.ajax({  
				url: '/isUnionId',
				type: 'post',
				data: {
					unionId: infoData.unionId
				},
				success: function(myData) {				
					if(myData.data.type == 0){
						
						submitInfo(infoData,myInfo);
						
					} else {
						mui.toast("你已经报过名了");
						return;
					}
				},
				error: function(data) {
					mui.toast(data);
				}
			});		
			
		} else {
			mui.toast('请选择阅读相关事项');
		}
}
// 提交报名请求
var submitInfo = function (infoData,_info){
	mui.showLoading("正在加载..","div");		
	$.ajax({
		url: '/formSubmit',
		type: 'post',
		data: infoData,
		success: function(myData) {
			mui.hideLoading();//隐藏后的回调函数
			// 判断浏览器是否支持localstorage					
			// // console.log(myStorage.getItem("dataInfo"));
			
			if(myData.data.subscribe ){  //判断是否关注公众号了

				location.href = "sign-success?unionId="+infoData.unionId;	
			} else {	
				$.ajax({  
					url: '/ischannel?unionId='+infoData.unionId+"&events_id="+_info.events_id,
					type: 'GET',
					success: function(myData) {				
					},
					error: function(data) {
						mui.toast(data);
					}
				});	
				$('#popover_qrcode').show();								
				return;																												
			}
		},
		error: function(data) {
		   mui.toast(data);
		}
	});	
}

// base64位图片转二进制
function convertBase64UrlToBlob(urlData){  
      
	var bytes=window.atob(urlData.split(',')[1]);        //去掉url的头，并转换为byte  
	  
	//处理异常,将ascii码小于0的转换为大于0  
	var ab = new ArrayBuffer(bytes.length);  
	var ia = new Uint8Array(ab);  
	for (var i = 0; i < bytes.length; i++) {  
		ia[i] = bytes.charCodeAt(i);  
	}  
  
	return new Blob( [ab] , {type : "png"});  
} 
var cookie = {
    set:function(key,val){
        var date=new Date();
        var expiresHours=9;
        date.setTime(date.getTime()+expiresHours*3600);
        console.log(date.toGMTString());
        document.cookie=key + "=" + val +";expires="+date.toGMTString()+";path=/";
    },
    get:function(key){
        var getCookie = document.cookie.replace(/[ ]/g,"");
        var arrCookie = getCookie.split(";")
        var tips;
        for(var i=0;i<arrCookie.length;i++){
            var arr=arrCookie[i].split("=");
            if(key==arr[0]){
                tips=arr[1];
                break;
            }
        }
        return tips;
    }
}
