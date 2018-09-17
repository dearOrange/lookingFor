/**
 * Created by Administrator on 2017/6/9.
 */

new Vue({
	el: '#app',
	data: {
		getCompany: window.dataUrl + "/web/deal/getCompany", //增加求购
		getSalesDealWebList:window.dataUrl+"/web/deal/getSalesDealWebList",//供应订单列表
		editCar:window.dataUrl+"/personal/editCar",//添加到购物车
		companyInfo: '',
		supplyList:[],
		shopGetUserById:false,
		getUserById:window.dataUrl+"/personal/getUserById",//获取登录用户信息
	    args_list:{
			"pageSize": "100",
			"currentPage": "1",
			"userId": null
		},
		isLogin:false,
	},
	methods: {
		jump_noLogin(type){
    		if(type==0){
    			window.location="../login/login.html";
    		}else if(type==1){
    			window.location.href="../register/register.html"
    		}
    	},
		show: function() {

			var that = this
			var userId = that.getQueryString('userId')
			ajax({ //个人信息
				url: that.getCompany,
				type: "post",
				data:JSON.stringify({
					"userId": userId
				}),
				headers: {
					"Content-Type": "application/json;charset=UTF-8"
				},
				success: function(data) {
					if(data.code == 200) {
						that.companyInfo = data.obj
					}

				}
			})
			that.args_list.userId = userId
			//公共页数接口数据
            ajax({        
                url: that.getSalesDealWebList,
                type: "post",
                data: JSON.stringify(that.args_list),
                headers: {
                    "Content-Type": "application/json;charset=UTF-8"
                },
                success: function (data) {
                    if(data.code==200){
                        that.supplyList=data.obj;
                    }

                }
            })
		},
		getQueryString: function(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			var r = window.location.search.substr(1).match(reg);
			if(r != null) return unescape(r[2]);
			return null;
		}
	},
	updated:function(){
				//购买跳转购物车
				var _this = this
        $(".shopclick").off().on("click", function () {
            sessionStorage.setItem("url",window.location.href)
            if(!_this.shopGetUserById){
                window.location="../login/login.html";
            }else if(_this.shopGetUserById){

                var index=parseInt($(event.target).parent().parent().attr("dealid"));
                            ajax({        //购买
                                url: _this.editCar,
                                type: "post",
                                data: JSON.stringify({
                                    "dealId":index
                                }),
                                headers: {
                                    "Content-Type": "application/json;charset=UTF-8"
                                },
                                success: function (data) {

                                    if(data.code==200||data.code==202){
                                        window.location.href="../shop/shop.html"
                                    }

                                }
                            })
            }

        })
	},
	mounted: function() {
		this.show()
		$(".header-pic").click(function() {
			window.location.href = "../index.html"
		})
		$(".login").click(function() {
			window.location.href = "../login/login.html"
		})
		/*register*/
		$(".register").click(function() {
			window.location.href = "../register/register.html"
		})
		/*my-center*/
		$(".my-center").click(function() {
			window.location.href = "../my-center/my-center.html"
		})
		/*my-order*/
		$(".my-order").click(function() {
			window.location.href = "../my-order/my-order.html"
		})
		
		var _this = this
			     function get_cookie(Name) {
	        var search = Name + "="//查询检索的值
	        var returnvalue = "";//返回值
	        if (document.cookie.length > 0) {
	          var  sd = document.cookie.indexOf(search);
	            if (sd!= -1) {
	                sd += search.length;
	             var  end = document.cookie.indexOf(";", sd);
	                if (end == -1)
	                    end = document.cookie.length;
	                //unescape() 函数可对通过 escape() 编码的字符串进行解码。
	                returnvalue=unescape(document.cookie.substring(sd, end))
	            }
	        }
	        return returnvalue;
	    }
			     if(get_cookie('pwd')!=''){
	     	                ajax({        //company
					            url: _this.getUserById,
					            type: "post",
					            headers: {
					                "Content-Type": "application/json;charset=UTF-8"
					            },
					            success: function (data) {
					                if(data.code!==200){
					                    _this.shopGetUserById=false;
					                    /*login*/
					                    $(".login").click(function () {
					                        window.location.href="../login/login.html"
					                    })
					                }else if(data.code==200){
					                    _this.shopGetUserById=true;
					                    $(".login").html("欢迎您\n"+data.obj.nick)
					                }
					
					            }
					        })
	  		   }

	}
})