/**
 * Created by Administrator on 2017/6/5.
 */
(function () {

        function isPasswd(s) {
            var patrn=/^[\w]{6,20}$/;
            if (!patrn.test(s)) {
            	return false;
            }
            return true;
        }
      var oPass=$(".oPass");
      oPass.change( function() {
      	var val=$(this).val();
    	if(!isPasswd(val)){
            $(".dis:eq(0)").html("请输入6-20位的密码!")
        }else{
        	$(".dis:eq(0)").html(" ")
        }
	  });
	  
	  var newPass=$(".newPass");
	    newPass.change( function() {
      	var val=$(this).val();
    	if(!isPasswd(val)){
            $(".dis:eq(1)").html("请输入6-20位的密码!")
        }else{
        	$(".dis:eq(1)").html(" ")
        }
	  });
	 	  var newPass2=$(".newPass2");
	    newPass2.change( function() {
      	var val=$(this).val();
    	if(!isPasswd(val)){
            $(".dis:eq(2)").html("请输入6-20位的密码!")
        }else{
        	$(".dis:eq(2)").html(" ")
        }
	  }); 
	  
	  
    /*验证码失焦*/
    $(".code").on("blur", function () {

        if($(this).val()==""){
            $(".dis:eq(1)").html("您的验证码为空")
        }
    })
    $(".code").on("focus", function () {
        var val=$(this).val()
        $(".dis:eq(1)").html("")
    })
    function isPhoneNo(phone) {
        var pattern = /^1[34578]\d{9}$/;
        return pattern.test(phone)
    }
    /*^[a-zA-Z]\w{5,17}$*/
    var password=$(".password")
    password.on("blur", function () {
        var val=$(this).val()
        if(! passwordFn(val)){
            $(".dis:eq(2)").html("您输入的验证码有错误!")
        }
        if(val==""){
            $(".dis:eq(2)").html("你输内容为空!")
        }
    });
    password.on("focus", function () {
        var val=$(this).val()
        $(".dis:eq(2)").html("")
    })
    function passwordFn(phone) {
        var pattern = /^[A-Za-z0-9]{6,12}$/;
        return pattern.test(phone)
    }


    /*跳转*/
    $(".header-pic").click(function () {
        window.location.href="../index.html"
    })
    /*register*/
    $(".register").click(function () {
        window.location.href="../register/register.html"
    })
    /*login*/
    $(".login").click(function () {
        window.location.href="../login/login.html"
    })
    /*my-center*/
   /* $(".my-center").click(function () {
        window.location.href="../my-center/my-center.html"
    })*/
    /*my-order*/
    /*$(".my-order").click(function () {
        window.location.href="../my-order/my-order.html"
    })*/
    /*提交信息*/
    $(".btn").on("click", function () {
    	if($(".newPass").val().length < 6 || $(".newPass2").val().length < 6){
    		alert('密码必需在6-20位之间')
    		return;
    	}
        ajax({
            url:window.dataUrl+"/personal/updateUserPwd",
            type: "post",
            data: JSON.stringify({
                "pwd":$(".oPass").val(),
                "pwd2": $(".newPass").val(),
                "newPwd":$(".newPass2").val()
            }),
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            success: function (data) {
            	
            	
            	//200成功202原密码错误203两次输入密码不一致204密码过长
                if(data.code==200){
							    var d = new Date();
							    d.setTime(d.getTime() + (1*24*60*60*1000));
							    var expires = "expires="+d.toUTCString();
						     	document.cookie="pwd="+""+"; expires="+expires+"; path =/";
								document.cookie="code="+""+"; expires="+expires+"; path =/";
								
				window.location.href="../login/login.html"
                }else if(data.code==202){
                	alert('原密码错误！请重新输入！')
                }else if(data.code==203){
                	alert('两次输入密码不一致！请重新输入！')
                }else if(data.code==204){
                	alert('密码过长！请重新输入！')
                }

            }
        })
    })
})(jQuery)