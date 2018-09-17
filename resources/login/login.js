/**
 * Created by Administrator on 2017/6/2.
 */
    new Vue({
        el: '#login',
        data: {
            visible: false
        },
        mounted: function () {
        	var that = this;
        	(function ($) {
    var code = $(".code");
    var code1= $(".code1");
    var loginPic=$(".login-pic");
    var on=true;
    var logining=$(".logining")
    var sign=$(".sign")
    /*var url={
        loginUser:window.bendiUrl+"/main/loginUser"
    };*/
	       
       		var decToHex = function(str) {
			    var res=[];
			    for(var i=0;i < str.length;i++)
			        res[i]=("00"+str.charCodeAt(i).toString(16)).slice(-4);
			    return "\\u"+res.join("\\u");
			}
			var hexToDec = function(str) {
			    str=str.replace(/\\/g,"%");
			    return unescape(str);
			}
    /*读取cookie*/
    var loginPic=$(".login-pic").attr("src");
    if(loginPic=="../../img/fuxuan.png"){
    	
        //使用方式：
        if(get_cookie("code")&&get_cookie("pwd")!=""){
        	if(get_cookie("code")!='\\u' && get_cookie("pwd")!='\\u'){
        		            $(".code").val(hexToDec(get_cookie("code")));
				            $(".code1").val(hexToDec(get_cookie("pwd")));
				            var dataMsg={
				                "code":$(".code").val(),
				                "pwd":$(".code1").val()
				            }
				            loginAjax(dataMsg)
        	}

        }else{

        }
    }
    function get_cookie(Name) {
        var search = Name + "="//查询检索的值
        var returnvalue = "";//返回值
        if (document.cookie.length > 0) {
          var  sd = document.cookie.indexOf(search);
            if (sd!= -1) {
                sd += search.length;
                end = document.cookie.indexOf(";", sd);
                if (end == -1)
                    end = document.cookie.length;
                //unescape() 函数可对通过 escape() 编码的字符串进行解码。
                returnvalue=unescape(document.cookie.substring(sd, end))
            }
        }
        return returnvalue;
    }
	 
	/*记住用户名密码*/
	var flag=true;
    $(".login-pic1").on("click", function () {
        if(flag){
        	setCookie();
            $(this).attr("src","../../img/fuxuan.png");
            flag=false;
        }else{
        	setCookie();
            $(this).attr("src","../../img/fuxuan1.png")
            flag=true;
        }
    })
    function setCookie(){ //设置cookie    
        var loginCode = $(".code").val(); //获取用户名信息    
        var pwd = $(".code1").val(); //获取登陆密码信息
  		var checkImg = $(".login-pic1").attr("src","../../img/fuxuan.png");
  		var checkImgNo = $(".login-pic1").attr("src","../../img/fuxuan1.png");
        if(flag){ //判断是否选中了“记住密码”复选框  
        	$.cookie("checkAll",checkImg,{ expires: 7 });
            $.cookie("code",loginCode,{ expires: 7 });//调用jquery.cookie.js中的方法设置cookie中的用户名    
            $.cookie("code1",pwd,{ expires: 7 });
            flag = false;
        }else{
        	$.cookie("checkAll",checkImgNo);
         	$.cookie("code",'',{ expire: -1 });
            $.cookie("code1", '',{ expire: -1 });
            flag = true;
        }      
    }     
    function getCookie(){ //获取cookie
        var loginCode = $.cookie("code"); //获取cookie中的用户名    
        var pwd =  $.cookie("code1"); //获取cookie中的登陆密码    
        if(loginCode != null && loginCode != '' && pwd != null && pwd != ''){//选中保存秘密的复选框
			$(".login-pic1").attr("src","../../img/fuxuan.png");
			$(".code").val(loginCode);
        	$(".code1").val(pwd);
        	flag = false;
	　　　}else{
			$(".login-pic1").attr("src","../../img/fuxuan1.png");
			$(".code").val();
        	$(".code1").val();
        	flag = true;
		}   
    }
    /*下次自动登录*/
    var kai=true;
    $(".login-pic").on("click", function () {
        if(kai){
            $(this).attr("src","../../img/fuxuan1.png")
            kai=false;
        }else{
            $(this).attr("src","../../img/fuxuan.png")
            kai=true;
        }

    })

    //账号 失去焦点是的弹框
    $(".code").on("blur", function () {
        if($(this).val()==""){
            layer.msg('您输入的内容为空',{
                anim:6,
            });
        }

    })
    $(".code1").on("blur", function () {
        if($(this).val()==""){
            layer.msg('您输入的内容为空',{
                anim:6,
            });
        }

    })
    /*登录*/
       $(".logining").on("click", function () {
           var dataMsg={
               "code":$(".code").val(),
               "pwd":$(".code1").val()
           }
           //获取当前时间
           var date=new Date();
           var expiresDays=1;
           //将date设置为10天以后的时间
           date.setTime(date.getTime()+expiresDays*24*3600*1000);
           //将userId和userName两个cookie设置为10天后过期
           document.cookie="code="+decToHex(code.val())+"; pwd="+decToHex(code1.val())+"; expires="+date.toGMTString()+"; path =/";
           document.cookie="pwd="+decToHex(code1.val())+"; expires="+date.toGMTString()+"; path =/";
           loginAjax(dataMsg)
       })
    /*按回车键自动登录*/
   	$(function(){  
        $('body').bind('keypress',function(event){
            if(event.keyCode == "13")
	            {
	                var dataMsg={
	               "code":$(".code").val(),
	               "pwd":$(".code1").val()
	           	}
	           	//获取当前时间
	           	var date=new Date();
	           	var expiresDays=1;
	           	//将date设置为10天以后的时间
	           	date.setTime(date.getTime()+expiresDays*24*3600*1000);
	           	//将userId和userName两个cookie设置为10天后过期
	           	document.cookie="code="+decToHex(code.val())+"; pwd="+decToHex(code1.val())+"; expires="+date.toGMTString()+"; path =/";
	           	document.cookie="pwd="+decToHex(code1.val())+"; expires="+date.toGMTString()+"; path =/";
	           	loginAjax(dataMsg)
	        }
        });
    });
    
	$(document).ready(function() {
	　　　//获取cookie的值
		getCookie();
	})

/*login--ajax*/
    function loginAjax(dataMsg){
        ajax({
            url:window.dataUrl+"/main/loginUser",
            type: "post",
            data: JSON.stringify(dataMsg),
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            success: function (data) {
                if(data.code=="200"){
                    //window.location.href="../index.html"
                    var url=sessionStorage.getItem("url");
                    if(url){
                        window.location.href=url
                    }else if(!url){
                        window.location.href="../index.html"
                    }
                }else{
                	that.$Message.config({
					    top: 60,
					    duration: 3
					});
                	that.$Message.info(data.msg)
                }

            }
        })
    }

    code.on("blur", function () {
        var value = $(this).val();
        isCode(value)
        if(isCode(value)==false){

        }
    })
    code1.on("blur", function () {
        var value = $(this).val();
        if(isPasswd(value)==false){

        }
    })
/**/
    function isCode(value){
        var reg=/^[1-9]\d{11}$/;
        var yes=reg.test(value)
        if(yes==false){
            return false
        }else{
            return true
        }
    }
    function isPasswd(s) {
        var patrn = /^(\w){6,20}$/;
        if (!patrn.exec(s)) return false
        return true
    }

    $(".forgetPwd").on("click", function () {
        window.location.href="../reset-passwords/reset-passwords.html"
    })
    sign.on("click", function () {
        window.location.href="../register/register.html"
    })
    /*跳转*/
    $(".header-pic").click(function () {
        window.location.href="../index.html"
    })
   /*register*/
    $(".register").click(function () {
        window.location.href="../register/register.html"
    })
    /*my-center*/
    
    /*my-order*/
    
})(jQuery)
        },
        methods: {
        }
    })





















