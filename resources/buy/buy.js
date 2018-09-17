/**
 * Created by Administrator on 2017/6/1.
 */
new Vue({
    el:"#supermarket",
   data:{
        getBuyDealWebList:window.dataUrl+"/web/deal/getBuyDealWebList",//合金超市订单列表
        getSpecList:window.dataUrl+"/web/deal/getSpecList",//获取所有规格
        getDealCity:window.dataUrl+"/web/deal/getDealCity",//获取所有城市
        getCarListWeb:window.dataUrl+"/personal/getCarListWeb",//查询购物车列表
        getUserById:window.dataUrl+"/personal/getUserById",//获取登录用户信息
        editCar:window.dataUrl+"/personal/editCar",//添加到购物车
        getSpecAndGradeByType:window.dataUrl+"/web/deal/getSpecAndGradeByType",   //根据系列获取所有牌号、规格
        getGradeList:window.dataUrl+"/web/deal/getGradeList",
        getGoodsList:window.dataUrl+"/web/deal/getGoodsList",
        norms:[],
        cityArr:[],
        shopNum:"",
        company:"0",
        supplyList:[],
       getSpecAndGradeByTypegrade1:[],
       getSpecAndGradeByTypespec1:[],
        dealId:"",
        currentPage:1,
        pages:"",
       total:"",
       cityId:null,
       type:0,
       specId:null,
       gradeId:null,
       htmlText:"",
       shopGetUserById:false,
       id:"",
       type0:0,
       kg:1,
       v_kg:1,
       pageSize:'',
       variety_List: [],
       goods_List:[],
       data_getSpecAndGradeByType:{},
       vPage:'',
	   args_list:{
			"pageSize": "20",
			"currentPage": "1",
			"varietyId": null,
			"goodsId": null,
			"specId": null,
			"gradeId": null,
			"cityId": null,
			"goodsType": null,
			"company": null,
			"price": null,
			"weight": null,
			"createTime": 1
		},
		isLogin:false
   },
    mounted: function () {

		 
		 
        this.jumpFn();
        this.picFn();
        var _this=this;
        
        _this.updateList()
        
        
        
        		//二级联动
		        $('#demo').citys({code:350206});
				$('#demo').citys({
				    required:false,
				    nodata:'disabled',
				    onChange:function(data){
				    	
//				    	110000 120000 500000 810000 820000
						var aa = $('#aa option:selected').val()
						var bb = $('#bb option:selected').val()
						
						if(bb!='' && bb!=undefined){
									_this.args_list.cityId = bb
						}else if(aa != '' && aa!=undefined){
									_this.args_list.cityId = aa
						}else{
							_this.args_list.cityId = null
						}
					_this.updateList()
				    }
				});

        		 
        
        
        
        //排序降序
        var onn=true;
        $(".weight").off().on("click", function () {

            if(onn){
            	        	
        	let upDownList = _this.args_list
        	upDownList.weight = 1
        	upDownList.createTime = null
        	
                $(".bg1").css({
                    "background-position":"0px 10px"
                })
                ajax({        //合金超市订单列表
                    url: _this.getBuyDealWebList,
                    type: "post",
                    data: JSON.stringify(upDownList),
                    headers: {
                        "Content-Type": "application/json;charset=UTF-8"
                    },
                    success: function (data) {
                        if(data.code==100){
                        	_this.pageSize = data.total
                            _this.supplyList=data.obj;
                        }
                    }
                })
                onn=!onn;
            }else{
            	        	
        	let upDownList = _this.args_list
        	upDownList.weight = 2
        	upDownList.createTime = null
        	
                $(".bg1").css({
                    "background-position":"0px 0px"
                })
                ajax({        //升降排序的接口
                    url: _this.getBuyDealWebList,
                    type: "post",
                    data: JSON.stringify(upDownList),
                    headers: {
                        "Content-Type": "application/json;charset=UTF-8"
                    },
                    success: function (data) {
                        if(data.code==100){
                        	_this.pageSize = data.total
                            _this.supplyList=data.obj;
                        }
                    }
                })
                onn=!onn;
            }
        })
        //价格升降排序
        var off=true;
        $(".price").off().on("click", function () {
            if(off){
                $(".bg2").css({
                    "background-position":"0px 10px"
                })
                ajax({        //升降排序的接口
                    url: _this.getBuyDealWebList,
                    type: "post",
                    data: JSON.stringify({
                        "pageSize": 20,
                        "currentPage": 1,
                        "specId":_this.specId,
                        "cityId": _this.cityId,
                        "gradeId":_this.gradeId,
                        "goodsType":_this.type,
                        "createTime": 1,
                        "price":2

                    }),
                    headers: {
                        "Content-Type": "application/json;charset=UTF-8"
                    },
                    success: function (data) {
                        if(data.code==200){
                        	_this.pageSize = data.total
                            _this.supplyList=data.obj;
                        }
                    }
                })
                off=!off;
            }else{
                $(".bg2").css({
                    "background-position":"0px 0px"
                })
                ajax({        //规格的数据接口
                    url: _this.getBuyDealWebList,
                    type: "post",
                    data: JSON.stringify({
                        "pageSize": 20,
                        "currentPage": 1,
                        "specId":_this.specId,
                        "cityId": _this.cityId,
                        "gradeId":_this.gradeId,
                        "goodsType":_this.type,
                        "createTime": 1,
                        "price":1

                    }),
                    headers: {
                        "Content-Type": "application/json;charset=UTF-8"
                    },
                    success: function (data) {
                        if(data.code==200){
                        	_this.pageSize = data.total
                            _this.supplyList=data.obj;
                        }
                    }
                })
                off=!off;
            }
        })
        //session
            var key1=parseInt(sessionStorage.getItem("specId"));
            var key2=parseInt(sessionStorage.getItem("gradeId"));
            
		//大类选择
        if(!sessionStorage.getItem("id")){
            _this.id=0
        }else{
            _this.id=sessionStorage.getItem("id")
        }
        if(key1){
            _this.specId=key1;
        }else{
        }
        if(key2){
            _this.gradeId= key2;
        }

        //全部按钮筛选
        $(".super-left img").off().on("click", function (event) {
//          $(".main1-tab-nav3-bottom span")[0].click()
           
           if($(event.target).attr("type") == "variety"){
           		_this.args_list.varietyId = null 
           		_this.updateList()
           		$(".super-right00 li").children().css({background:'none',color: "#666"})
           }else if($(event.target).attr("type") == "goods"){
           		_this.args_list.goodsId = null 
           		_this.updateList()
           		$(".super-right0 li").children().css({background:'none',color: "#666"})
           }else if($(event.target).attr("type") == "spec"){
           		_this.args_list.specId = null 
           		_this.updateList()
           		$(".super-right1 li").children().css({background:'none',color: "#666"})
           }else if($(event.target).attr("type") == "grade"){
           		_this.args_list.gradeId = null 
           		_this.updateList()
           		$(".super-right2 li").children().css({background:'none',color: "#666"})
           }else if($(event.target).attr("type") == "city"){
           		_this.args_list.cityId = null 
           		_this.updateList()
				document.getElementById("aa")[0].selected=true;
				if(document.getElementById("bb")[0]){
					document.getElementById("bb")[0].selected=true;
				}
				
           }
            
            event.stopPropagation();
            window.event.cancelBubble=true;//阻止冒泡事件
        })

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
	     	        ajax({        //购物车数量数据接口
			            url: _this.getCarListWeb,
			            type: "post",
			            // data: JSON.stringify({"type": _this.dataType.type3}),
			            headers: {
			                "Content-Type": "application/json;charset=UTF-8"
			            },
			            success: function (data) {
			                if(data.code!==200){
			                }else{
			                    _this.shopNum=data.list.length
			                }
			            }
			        })
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
							                   _this.company=data.obj.company;
							                    $(".login").html("欢迎您\n"+data.obj.nick)
							                }
							
							            }
							        })

	     }

    },
    updated: function () {
    	 var _this=this;
    	if(this.v_kg){
    		this.v_kg = 0
//  		$('.classify').eq(0).click()	
    		
    	    　　const goodsid=parseInt(sessionStorage.getItem("goodsid"));
		 	 const id=parseInt(sessionStorage.getItem("id"));//大类
		  	 const goodsname=parseInt(sessionStorage.getItem("goodsname"));//index
			 const varietyIndex=parseInt(sessionStorage.getItem("varietyIndex"));//varietyIndex
			 const goodsIndex=parseInt(sessionStorage.getItem("goodsIndex"));//goodsIndex
					$('.classify').eq(id).click()    
					
					
					setTimeout(()=>{
						$('.super-right00 li a').eq(varietyIndex-1).click() 
						$('.super-right0 li a').eq(goodsIndex-1).click()  
						
					},1000)
					
					
					setTimeout(()=>{
						    	sessionStorage.removeItem("id")
    							sessionStorage.removeItem("varietyIndex")
    							sessionStorage.removeItem("goodsIndex")
					},1000)
    	}
		//触发后更改样式与下级item与列表数据				
		 $('.super-right li a').off().click(function(ev){
		 	$(ev.target).css({background: "#007DE4",color: "#fff"}).siblings().css({background:'none',color: "#666"})
		 	const type =  $(ev.target).attr('type')
		 	const typeId =  parseInt($(ev.target).attr('typeId'))
		 			 	
		 	//更新下级样式与下级参数初始化
		 	if( $(ev.target).parent().parent().hasClass("super-right00") ){
		 		$('.super-right0 li a').css({background:'none',color: "#666"})
		 		$('.super-right2 li a').css({background:'none',color: "#666"})
		 				_this.args_list.goodsId = null
			 	   		_this.args_list.gradeId = null
			 			_this.updateList(type,typeId)
		 	}else{
		 		_this.updateList(type,typeId)
		 	}
		 })

            $(".smark").on("mouseover", function () {
                $(event.target).parent().siblings(".hover-fade").fadeIn(500)
            }).on("mouseout", function () {
                $(event.target).parent().siblings(".hover-fade").fadeOut(500)
            })
//      if(sessionStorage.getItem("gradename")){
//          sessionStorage.removeItem("specname");
//          var key3=parseInt(sessionStorage.getItem("gradename"))
//          $(".super-right2 li a").eq(key3).css({
//              "background-color":"#0283ee",
//              "color": "#fff"
//          })
//      }
        if(sessionStorage.getItem("specname")){
        	
        	this.kg = 0
            sessionStorage.removeItem("gradename");
            var key4=parseInt(sessionStorage.getItem("specname"))
            $(".super-right1 li a").eq(key4).css({
                "background-color":"#0283ee",
                "color": "#fff"
            })
        }
      /*  if(sessionStorage.getItem("specname")){
            sessionStorage.removeItem("id");
            var key5=parseInt(sessionStorage.getItem("id"))
            $(".super-right1 li a").eq(key5).css({
                "background-color":"#0283ee",
                "color": "#fff"
            })
        }*/
       
		//购买跳转购物车
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
//              layer.open({
//                  title: '提示'
//                  ,content: '您已经确定离开了吗'
//                      ,anim:3
//                  ,btn:["确定","取消"]
//                  ,yes: function () {
//                          ajax({        //购买
//                              url: _this.editCar,
//                              type: "post",
//                              data: JSON.stringify({
//                                  "dealId":index
//                              }),
//                              headers: {
//                                  "Content-Type": "application/json;charset=UTF-8"
//                              },
//                              success: function (data) {
//
//                                  if(data.code==200||data.code==202){
//                                      window.location.href="../shop/shop.html"
//                                  }
//
//                              }
//                          })
//                  }
//              });
            }

        })

    },
    methods:  {
    	jump_noLogin(type){
    		if(type==0){
    			window.location="../login/login.html";
    		}else if(type==1){
    			window.location.href="../register/register.html"
    		}
    	},
    	jump_company(id){
    		window.open("../about-us/about-us.html?userId="+id)
//			if(this.get_cookie('pwd')!=''){
//				 window.location.href="../about-us/about-us.html?userId="+id
//			}else{
//				this.isLogin = true
//			}
    		
    	},
    	get_cookie(Name) {
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
	    },
    	updateList(type,id){
    		const that = this;
    		if(type == 'varietyId'){
    			this.args_list.varietyId = id
    			//更新下级
    		    ajax({
                    url: that.getGoodsList,
                    type: "post",
                    data: JSON.stringify({
                    	"varietyId":id
                    }),
                    headers: {
                        "Content-Type": "application/json;charset=UTF-8"
                    },
                    success: function (data) {
                    	that.data_getSpecAndGradeByType.goodsList = data.obj
                    }
                })
    		}else if(type == 'goodsId'){
    			this.args_list.goodsId = id
    			//更新下级
    		    ajax({
                    url: that.getGradeList,
                    type: "post",
                    data: JSON.stringify({
                    	"goodsId":id
                    }),
                    headers: {
                        "Content-Type": "application/json;charset=UTF-8"
                    },
                    success: function (data) {
                    	that.data_getSpecAndGradeByType.gradeList = data.obj
                    }
                })
    		}else if(type == 'specId'){
    			this.args_list.specId = id
    		}else if(type == 'gradeId'){
    			this.args_list.gradeId = id
    		}
    		    
    		    //更新列表
			    ajax({
                    url: that.getBuyDealWebList,
                    type: "post",
                    data: JSON.stringify(this.args_list),
                    headers: {
                        "Content-Type": "application/json;charset=UTF-8"
                    },
                    success: function (data) {
//                  	if(that.get_cookie('pwd')==''){
//                  		for(let i=0;i<data.obj.length;i++){
//                  			data.obj[i].code = '请登录后查看!'
//                  		}
//                  	}
                    	that.supplyList = data.obj
                    	that.pageSize = data.total
                    	
                    }
                })
    	},
    	classifyClick (type) {
    		const that = this;
    		that.args_list.goodsType = type || null
    			$('.classify').eq(type).css({background:'#2d8cf0'}).siblings().css({background:'none'})
    			$('.classify').eq(type).children().css({color:'#fff'})
    			$('.classify').eq(type).siblings().children().css({color:'#666'})
    			
			    ajax({
                    url: that.getSpecAndGradeByType,
                    type: "post",
                    data: JSON.stringify({
                    	"type":type
                    }),
                    headers: {
                        "Content-Type": "application/json;charset=UTF-8"
                    },
                    success: function (data) {
                    	that.data_getSpecAndGradeByType = data
                    	
                    }
                })
			    	//点击大类初始化参数
			    	that.args_list = {
						"pageSize": "20",
						"currentPage": "1",
						"varietyId": null,
						"goodsId": null,
						"specId": null,
						"gradeId": null,
						"cityId": null,
						"type": type,
						"company": null,
						"price": null,
						"weight": null
					}  
			    	that.updateList()
			    $('.super-right li a').css({background:'none',color: "#666"})
                
        },
        jumpFn: function () {
            var main1Tit=$(".main1-pic");
            var main1Tab=$(".main1-tab");
            main1Tit.on("click", function () {
                main1Tab.fadeToggle()
            })

            $(".header-pic").click(function () {
                window.location.href="../index.html"
            })
            /*register*/
            $(".register").click(function () {
                window.location.href="../register/register.html"
            })

            /*my-center*/
            $(".my-center").click(function () {
                window.location.href="../my-center/my-center.html"
            })
            /*my-order*/
            $(".my-order").click(function () {
                window.location.href="../my-order/my-order.html"
            })
            $(".index").on("click", function () {
                window.location.href="../index.html"
            })
            $(".supermarket").on("click", function () {
                window.location.href="../supermarket/supermarket.html"
            })
            $(".supply").on("click", function () {
                window.location.href="../supply/supply.html"
            })
            $(".my-issue").on("click", function () {
                window.location.href="../buy/buy.html"
            })
            $(".message-center").on("click", function () {
                window.location.href="../message-center/message-center.html"
            })
            $(".logistics").on("click", function () {
                window.location.href="../logistics/logistics.html"
            })       
            $(".financial").on("click", function () {
                window.location.href="../financial/financial.html"
            })       
            $(".logo").on("click", function () {
                window.location.href="../index.html"
            })    
        },
        picFn: function () {
            var on=true;
            $(".super-more-pic:eq(1)").on("click", function () {
                if(on){
                    $(".nav-list:eq(1)").animate({
                        "min-height":"96px",
                    },500).siblings().animate({
                        "min-height":"48px",
                    },500)
                    on=!on;
                }else{
                    $(".nav-list:eq(1)").animate({
                        "min-height":"48px",
                    },500)
                    on=!on;
                }

            })
            var onn=true;
            $(".super-more-pic:eq(0)").on("click", function () {
                if(onn){
                    $(".nav-list:eq(0)").animate({
                        "min-height":"96px",
                    },500).siblings().animate({
                        "min-height":"48px",
                    },500)
                    onn=!onn;
                }else{
                    $(".nav-list:eq(0)").animate({
                        "min-height":"48px",
                    },500)
                    onn=!onn;
                }

            })
            var onnn=true;
            $(".super-more-pic:eq(2)").on("click", function () {
                if(onnn){
                    $(".nav-list:eq(2)").animate({
                        "min-height":"96px",
                    },500).siblings().animate({
                        "min-height":"48px",
                    },500)
                    onnn=!onnn;
                }else{
                    $(".nav-list:eq(2)").animate({
                        "min-height":"48px",
                    },500)
                    onnn=!onnn;
                }

            })
			$(".super-more-pic:eq(3)").on("click", function () {
                if(onnn){
                    $(".nav-list:eq(3)").animate({
                        "min-height":"96px",
                    },500).siblings().animate({
                        "min-height":"48px",
                    },500)
                    onnn=!onnn;
                }else{
                    $(".nav-list:eq(3)").animate({
                        "min-height":"48px",
                    },500)
                    onnn=!onnn;
                }

            })
        },
        searchFn: function () {     //名称搜索
            var val=$(".searchPush").html();
            if(val==""){
            }else{
                var _this=this;
                ajax({        //名称搜索+.
                    url: _this.getBuyDealWebList,
                    type: "post",
                    data: JSON.stringify({
                        "pageSize": 20,
                        "currentPage": 1,
                        "goodsType": _this.type,
                        "createTime": 1,
                        "name":val
                    }),
                    headers: {
                        "Content-Type": "application/json;charset=UTF-8"
                    },
                    success: function (data) {
                        if (data.code == 200) {
                        	_this.pageSize = data.total
                            _this.supplyList = data.obj;
                            _this.dealId = data.obj.dealId;
                            _this.pages = Math.ceil(data.total / 10);
                            _this.total = data.total;
                            //$(".main1-tab-nav3-bottom span")[0].click()
                        } else {

                        }

                    }
                })
            }

        },
        changePage() {
        	
        	this.args_list.currentPage = this.$refs.page.currentPage
        	
            var _this=this;
            if(_this.cityId==""){
                _this.cityId=null;
            }
            if(_this.specId==""){
                _this.specId=null;
            }
			//公共页数接口数据
            ajax({        
                url: _this.getBuyDealWebList,
                type: "post",
                data: JSON.stringify(_this.args_list),
                headers: {
                    "Content-Type": "application/json;charset=UTF-8"
                },
                success: function (data) {
                    if(data.code==100){
                    	_this.pageSize = data.total
                        _this.supplyList=data.obj;
                        _this.dealId=data.obj.dealId;
                        
                        
                    }else{

                    }

                }
            })
        }
		
    }
})