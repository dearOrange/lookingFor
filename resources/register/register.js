/**
 * Created by Administrator on 2017/6/5.
 */
new Vue({
    el:"#regVue",
    data:{
        province:[],
        cityArr:[],
        parentCode:"",
        childCode:"",
        src:'',
        cityId:''
    },
    mounted: function () {
        this.commom();
        var _this=this;
        var timestamp = new Date().getTime();
        this.src = window.dataUrl+'/verificationcode?'+ timestamp
//      $(".verificationcode").attr("src",window.dataUrl+'/verificationcode?');
//      ajax({
//          url:window.dataUrl+"/business/user/getCity",
//          type: "post",
//          data: JSON.stringify({"parentCode":100000}),
//          /*data: {"parentCode":100000},*/
//          headers: {
//              "Content-Type": "application/json;charset=UTF-8"
//          },
//          success: function (data) {
//              if(data.code==200){
//                  _this.province=data.obj;
//                  _this.cityClick(data.obj)
//              }
//          },
//          error: function (res) {
//              console.log(res)
//          }
//      })

        		//二级联动
		        $('#demo').citys({code:350206});
				$('#demo').citys({
				    required:false,
				    nodata:'disabled',
				    onChange:function(data){
				    	
//				    	110000 120000 500000 810000 820000
						var aa = $('#aa option:selected').val()
				    	if( aa == "110000" ||aa == "120000" ||aa == "500000" ||aa == "810000" ||aa == "820000" || aa == "310000"){
				    		_this.cityId = $('#aa option:selected').val()==''?null:$('#aa option:selected').val()
				    	}else{
				    		_this.cityId = $('#bb option:selected').val()==''?null:$('#bb option:selected').val()
				    	}
				    }
				});
    },
    methods:{
        commom: function () {
            function selfunc(sel1,sel1val,distpicke){
                sel1.on("click", function (event) {
                    if(on){
                        distpicke.attr("src","../../img/shang2.png")
                        on=false
                    }else{
                        distpicke.attr("src","../../img/xiala.png");
                        on=true;
                    }

                })
                sel1.on("change", function () {

                    if(sel1val!=$(".sel1").val()){
                        distpicke.attr("src","../../img/xiala.png")
                    }

                })
            }
            /*手机号*/
            var call=$("#call"),
                calVal=$("#call").val(),
                dis=$(".dis"),
                passw=$("#passw"),
                dis1=$(".dis1"),
                dis2=$(".dis2"),
                reset=$("#reset"),
                passwVal=$("#passw").val(),
                resetVal=$(".reset").val();

            call.on("blur", function () {
                checkMobile(call,$("#call").val(),dis)
            })
            call.on("focus", function () {
                dis.css('display','none');
            })

            /*手机号函数*/
            function checkMobile(sMobile,mobile,dis){
                if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(mobile))){
                    dis.css('display','block');
                    //sMobile.focus();
                    return false;
                }
            }
            /*设置密码*/
            passw.on("blur", function () {
                isPasswd($("#passw").val())
            })
            passw.on("focus", function () {
                dis1.css('display','none');
            })
            /*密码函数
             * 只能输入6-20个字母、数字、下划线
             * */
            function isPasswd(s) {
                var patrn=/^[\w]{6,12}$/;
                if (!patrn.test(s)) {
                    dis1.css('display','block');
                }
                return false;
            }
            /*重置密码*/
            reset.on("blur", function () {
                resfunc($("#reset").val(),$("#passw").val())
            })
            reset.on("focus", function () {
                dis2.css('display','none');
            })
            function resfunc(resetVal,passwVal){
                if(resetVal!=passwVal){
                    dis2.css('display','block');
                }

            };
            /*验证码*/
            $("#code").on("blur", function () {
                if( $(this).val()==""){
                    $(".dis3").css("display","block")
                }
            })
            $("#code").on("focus", function () {
                if( $(this).val()==""){
                    $(".dis3").css("display","none")
                }
            })
            $(".codeHuan").on("click", function (event) {
                event.stopPropagation();
                var timestamp = new Date().getTime();
                $(".verificationcode").attr("src",window.dataUrl+'/verificationcode?'+ timestamp);
            })
            /*手机号验证码*/
            $("#check").on("blur", function () {
                if($(this).val()==""){
                    $(".dis4").css("display","block")
                }

            })
            $("#check").on("focus", function () {
                $(".dis4").css("display","none")
            })
            $("#name").on("blur", function () {
                if($(this).val()==""){
                    $(".dis5").css("display","block")
                }

            }).on("focus", function () {
                $(".dis5").css("display","none")
            })
            $("#company").on("blur", function () {
                if($(this).val()==""){
                    $(".dis6").css("display","block")
                }

            }).on("focus", function () {
                $(".dis6").css("display","none")
            })
            var countDown = 60
            $(".code-pic").on("click", function () {
                var val=$("#call").val();
                var off=true;
                var that = this
                if(countDown<60){
                	return false;
                }
                if(val!=""&&off==true){
                	console.log(123)
                    ajax({
                        url:window.dataUrl+"/msg/sendMsg",
                        type: "post",
                        data: JSON.stringify({"tel":val}),
                        headers: {
                            "Content-Type": "application/json;charset=UTF-8"
                        },
                        success: function (data) {
                        	console.log(data)
                            if(data.code==200){
                            	console.log({"tel":val})
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
                            	alert('单日短信获取数量达到上限!')
                            }
                        }
                    })
                    off=!off;
                }
            })
            /*图片转换*/
            var off=true;
            $(".reg-pic").on("click", function () {
                if(off){
                    $(this).attr("src","../../img/fuxuan_1.png")
                    off=false;
                }else{
                    $(this).attr("src","../../img/fuxuan.png")
                }

            })
            
            /*获取城市*/


            /*跳转*/
            $(".header-pic").click(function () {
                window.location.href="../index.html"
            })
            /*login*/
            $(".login").click(function () {
                window.location.href="../login/login.html"
            })
            /*my-center*/
            /*$(".my-center").click(function () {
                window.location.href="../my-center/my-center.html"
            })*/
            /*my-order*/
            /*$(".my-order").click(function () {
                window.location.href="../my-order/my-order.html"
            })*/
        },
        cityClick: function (item) {
            var _this=this;
            $(".sel1").on("change", function () {
                var val=$(this).val()
                $.each(item,function (k,v) {
                    if(v.name==val){
                        _this.parentCode= v.code;
                        _this.cityFn(v.code)
                    }
                })
            })
        },
        cityFn: function (code) {
            var _this=this;
            ajax({
                url:window.dataUrl+"/business/user/getCity",
                type: "post",
                data: JSON.stringify({"parentCode":code}),
                headers: {
                    "Content-Type":"application/json;charset=UTF-8"
                },
                success: function (data) {
                    if(data.code==200){
                        _this.cityArr= data.obj;
                        $(".sel2").on("change", function () {
                            var val=$(this).val()
                            $.each(data.obj,function (k,v) {
                                if(v.name==val){
                                    _this.childCode= v.code;

                                }
                            })
                        })
                    }
                }
            })
        },
        submit(){
        	            /*提交信息注册*/
                var _this=this;
                
                let awei = {
                        "code":$("#call").val(),
                        "pwd": $("#passw").val(),
                        "pwd2":$("#reset").val(),
//                      "verification":$("#code").val(),
                        "mCode":$("#check").val(),
                        "name": $("#name").val(),
                        "company":$("#company").val(),
//                      "provinceId":$("#check").val(),
                        "cityId":_this.cityId,
                        }
                    ajax({
                        url:window.dataUrl+"/main/regionUser",
                        type: "post",
                        data: JSON.stringify({
                        "code":$("#call").val(),
                        "pwd": $("#passw").val(),
                        "pwd2":$("#reset").val(),
//                      "verification":$("#code").val(),
                        "mCode":$("#check").val(),
                        "name": $("#name").val(),
                        "company":$("#company").val(),
//                      "provinceId":$("#check").val(),
                        "cityId":_this.cityId,
                        }),
                        headers: {
                        "Content-Type": "application/json;charset=UTF-8"
                        },
                        success: function (data) {
                        	_this.$Message.info(data.msg)
                            if(data.code==200){
                            	
                                window.location.href="../login/login.html"
                            }
                        }
                    })
        }
    },
})