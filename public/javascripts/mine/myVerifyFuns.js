/*
 *cardCreate页面用到的函数
 */
/*验证账号登陆表单数据*/
function verify_userLoginForm(account,password){
	var verifyAccount=verify_account($(account).val());
	if(verifyAccount)
		$(account).parent().next("span").remove();
	else{
		$(account).parent().next("span").remove();
		$(account).parent().after('<span class="erro_notification">'+error_account_input+"</span>")
	}
	var verifyPassword=verify_password($(password).val());
	if(verifyPassword)
		$(password).parent().next("span").remove();
	else{
		$(password).parent().next("span").remove();
		$(password).parent().after('<span class="erro_notification">'+error_password_input+"</span>")
	}
	return verifyAccount&&verifyPassword;
}
/*验证账号创建表单数据*/
function verify_userCreateForm(account,password,pWConfirm,birthday,div_birthday){
	var result = false;
	if($(password).val()==$(pWConfirm).val()){
		$(password).parent().next("span").remove();
		$(pWConfirm).parent().next("span").remove();
		result = verify_userCreateForm_exceptPwConfirm(account,password,birthday,div_birthday);
	}else{
		$(password).parent().next("span").remove();
		verify_userCreateForm_exceptPwConfirm(account,password,birthday,div_birthday);
		$(pWConfirm).parent().next("span").remove();
		$(pWConfirm).parent().after('<span class="erro_notification">'+error_pWConfirm_input+"</span>")
		result = false;
	}
	return result;
}
/*验证表单数据(除确认密码外)*/
function verify_userCreateForm_exceptPwConfirm(account,password,birthday,div_birthday){
	var verifyAccount=verify_account($(account).val());
	if(verifyAccount)
		$(account).parent().next("span").remove();
	else{
		$(account).parent().next("span").remove();
		$(account).parent().after('<span class="erro_notification">'+error_account_input+"</span>")
	}
	var verifyPassword=verify_password($(password).val());
	if(verifyPassword)
		$(gender).parent().next("span").remove();
	else{
		$(password).parent().next("span").remove();
		$(password).parent().after('<span class="erro_notification">'+error_password_input+"</span>")
	}
	var verifyBirthday=verify_birthday(birthday);
	if(verifyBirthday)
		$(div_birthday).next("span").remove();
	else{
		$(div_birthday).next("span").remove();
		$(div_birthday).after('<span class="erro_notification">'+error_birthday_input+"</span>")
	}

	return verifyAccount&&verifyPassword&&verifyBirthday;
}
/*验证输入的账号是否合理（手机号或者邮箱）*/
function verify_account(mText){
    return verify_phoneNum(mText)||verify_email(mText);
}
/*验证输入的密码是否合理（6到10位）*/
function verify_password(mText){
    var reg = /^.{6,10}$/;
    return reg.test(mText);
}
/*验证输入的手机号码是否合理（11位数字）*/
function verify_phoneNum(mText){
    var reg = /^[0-9]{11}$/;
    return reg.test(mText);
}
/*验证输入的邮箱地址是否正确（30个字符以内）*/
function verify_email(mText){
	var result = false;
	if(mText.length>30);
	else{
		var reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
		result = reg.test(mText);
	}
	return result;
}
/*验证输入的生日日期是否合理*/
function verify_birthday(birthday){
	if(birthday.indexOf('--') >= 0 )
		return false;
	else return true;
}
/*验证账号创建表单数据*/
function verify_feedbackForm(suggest){
	var len_suggest = $(suggest).val().length;
	var verifySuggest = len_suggest>0&&len_suggest<=120;
	if(verifySuggest)
		$(suggest).parent().next("span").remove();
	else{
		$(suggest).parent().next("span").remove();
		$(suggest).parent().after('<span class="erro_notification">'+error_suggest_input+"</span>")
	}
	return verifySuggest;
}