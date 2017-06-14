/*
*  全局常量和变量
* */
/*服务器地址*/
var URL_SERVER='http://114.215.178.10:10000/';
/*本地测试服务器*/
//var URL_SERVER='http://localhost:10000/';
/*网络或服务器端出错提示信息*/
var error_network = '网络异常，请检查后重试！';
var error_form = '所填内容有误，请更正后提交！';
var error_account_input = '* 手机号：11位数字；邮箱：30个字以内';
var error_birthday_input = '* 日期选择有误';
var error_password_input = '* 密码为6到10位';
var error_pWConfirm_input = '* 确认密码不正确';
var erro_userUnMatch = '账号或密码不正确！';
var erro_userExisted = '账号已存在！';
var erro_addDevice = '抱歉！该设备已被其他人绑定！';
var erro_wifi_connect_timeout = '抱歉！设备联网失败！请先长按设备上的配置按键3s,待红灯闪烁后再尝试联网。';
var erro_wifi_not_connected = '抱歉！你的手机WiFi没有连接！';
var error_suggest_input = '抱歉！1~120字以内！';
/*成功提示*/
var success_userCreate = '恭喜！账号创建成功!';
var success_userLogin = '恭喜！账号登陆成功!';
var success_addDevice = '恭喜！设备添加成功!';
var success_deviceLink = '恭喜！设备联网成功!';
var success_feedback = '恭喜！意见反馈成功!';


/*cookie过期时间*/
var toDate_Long = new Date(3000,1,25);

/*数据库相关*/
var refreshNum = 3;

/*
 *  自定义函数
 * */
/*显示加载器*/
function showLoader(mText) {
	$.mobile.loading('show', {
		text: mText, //加载器中显示的文字
		textVisible: true, //是否显示文字
		theme: 'b',        //加载器主题样式a-e
		textonly: false,   //是否只显示文字
		html: ''           //要显示的html内容，如图片等
	});
}
/*隐藏加载器*/
function hideLoader()
{
	$.mobile.loading('hide');
}
/*显示提示框*/
function showHintBox(mText) {
	$.mobile.loading('show', {
		text: mText, //加载器中显示的文字
		textVisible: true, //是否显示文字
		theme: 'b',        //加载器主题样式a-e
		textonly: true,   //是否只显示文字
		html: ''        //要显示的html内容，如图片等
	});
}
/*通用前后端交互结果提示框显示函数*/
function popHintBox(hintText){
	setTimeout(function () {showHintBox(hintText);}, 50);
	setTimeout(function () {hideLoader();}, 2000);
}
function popHintBox(type, hintText, bgColor, closeBtn){
	var icon, animateEntrance, animateClosing, autoclose, buttons, background, fontColor;
	if(type=='success'){
		icon = 'ic_check.png';
		animateEntrance = 'bounceIn';
	} else {
		icon = 'ic_error.png';
		animateEntrance = 'shake';
	}
	if(closeBtn==true){
		autoclose = false;
		buttons = {
			close: {
				text: '确定',
				style: 'success',
				action: function () {
					return true;
				}
			}
		};
	} else {
		autoclose = true;
		buttons = {};
	}
	if(bgColor==null||bgColor=='black'){ //- 默认黑色背景
		background = 'black';
		fontColor = 'white';
	} else if(bgColor=='white'){
		background = 'white';
		fontColor = 'black';
	} else {
		background = 'black';
		fontColor = 'white';
	}
	new $.flavr({
		animateEntrance: animateEntrance,
		//animateClosing: animateClosing,
		background: background,
		fontColor: fontColor,
		icon: icon,
		iconPath: '/images/icons-png',
		content : hintText,
		autoclose : autoclose,
		//- timeout : timeout, /* Default timeout is 3 seconds */
		buttons : buttons
	});
}
/**
 * 判断是否为微信浏览器
 * @returns {boolean}
 */
function isWeiXin(){
	var agent = window.navigator.userAgent.toLowerCase();
	return agent.match(/MicroMessenger/i) == 'micromessenger';
}