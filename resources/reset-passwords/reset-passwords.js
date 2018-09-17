/**
 * Created by Administrator on 2017/6/5.
 */
(function () {
        function isPasswd(s) {
            var patrn=/^[\w]{6,20}$/;
            return patrn.test(s);
        }
      var password=$(".password");
      password.change( function() {
      	var val=$(this).val();
    	if(!isPasswd(val)){
            $(".dis:eq(2)").html("请输入6-20位的密码!")
        }else{
        	$(".dis:eq(2)").html(" ")
        }
	  });
	  var call = $(".call");
	  call.change( function() {
      	var val=$(this).val();
    	if(!isPhoneNo(val)){
            $(".dis:eq(0)").html("请输入正确的手机号!")
        }else{
        	$(".dis:eq(0)").html("")
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
        $.ajax({
            url:window.dataUrl+"/main/resetPwd",
            type: "post",
            data: JSON.stringify({
                "pwd":$(".password").val(),
                "code": $(".call").val(),
                "mCode":$(".code").val()
            }),
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            success: function (data) {
                if(data.code==100){
                    window.location.href="../login/login.html"
                }

            }
        })
    })
    var countDown = 60
    // 获取验证码
    $(".gain").on("click", function () {
		var that = this
		var val = $(".call").val()
		if(countDown<60){
			return false;
		}
        if(isPhoneNo(val)){
        	console.log(JSON.stringify({
                    "tel":$(".call").val()
                }))
        	
            ajax({
                url:window.dataUrl+"/msg/sendMsg",
                type: "post",
                data: JSON.stringify({
                    "tel":$(".call").val()
                }),
                headers: {
                    "Content-Type": "application/json;charset=UTF-8"
                },
                success: function (data) {
                	console.log(JSON.stringify(data))
                    if(data.code==200){
                    	console.log(data)
							var timing = setInterval(function(){
								if(countDown>=0){
					    			$(that).css({background:"#eee",color:'#666'})
						    		$(that).html(countDown+'s后重新获取')			
						    		countDown--;
								}else{
									$(that).css({background:"#02548e",color:'#fff'})
						    		$(that).html('获取验证码')	
						    		countDown = 60
									clearInterval(timing)
								}
							},1000)
				       
                    }else{
                    	alert(data.msg)
                    }
                }
            })
        }else{
        	alert('输入了错误的手机号！')
        }

    })
})(jQuery)