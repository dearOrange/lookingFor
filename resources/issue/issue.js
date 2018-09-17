/**
 * Created by Administrator on 2017/6/7.
 */
/**
 * Created by Administrator on 2017/6/6.
 */

new Vue({
    el:"#issue-supply",
    data:{
    	selectType:[],
        getGoodsListTwo:window.dataUrl+"/web/deal/getGoodsList",//商品名称
        getSpecList:window.dataUrl+"/web/deal/getSpecList", //商品规格
        getDealCity:window.dataUrl+"/web/deal/getDealCity",//产地
        getGradeList:window.dataUrl+"/personal/getGradeList",//牌号
        editBuy:window.dataUrl+"/personal/editBuy",//增加求购
        getUserById:window.dataUrl+"/personal/getUserById",//获取个人信息
        getVarietyList:window.dataUrl+'/web/deal/getVarietyList',//大类－名种
        getGoodsList:window.dataUrl+'/web/deal/getGoodsList',//品种　－品名
        editBuyArr:[],
        getGoodsListTwoArr:[],
        getSpecListArr:[],
        getDealCityArr:[],
        getGradeListArr:[],
        arrr:[
                            {
                                value: 'ali',
                                label: '阿里巴f巴',
                                children: [],
                        		loading:false
                            },
                            {
                                value: '163',
                                label: '网易'
                            }
              ],
        cityId:'',
                data4: [{
                    value: 0,
                    label: '硅合金',
                    children: [],
                    loading: false
                }, {
                    value: 1,
                    label: '锰合金',
                    children: [],
                    loading: false
                },{
                    value: 2,
                    label: '铬合金',
                    children: [],
                    loading: false
                },{
                    value: 3,
                    label: '镍合金',
                    children: [],
                    loading: false
                },{
                    value: 4,
                    label: '特种合金',
                    children: [ ],
                    loading: false
                },{
                    value: 5,
                    label: '其他合金',
                    children: [],
                    loading: false
                }]
                
    },
    mounted: function () {
        this.jumpFn();
        var _this=this;
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


        if(!localStorage.getItem("img")){
            $("#img").attr("src","../../img/touxiang.png")
        }else{
            $("#img").attr("src",localStorage.getItem("img"))
        }
        ajax({        //个人信息
            url: _this.getUserById,
            type: "post",
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            success: function (data) {
                if(data.code==200){
                    $(".login").html("欢迎您\n"+data.obj.nick)
                    $(".name").html(data.obj.nick)
                }

            }
        })
        ajax({        //商品名称
            url: _this.getGoodsListTwo,
            type: "post",
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            data:JSON.stringify({
                "pageSize":10,
                "currentPage": 1
            }),
            success: function (data) {
                if(data.code==200){
                    _this.getGoodsListTwoArr=data.obj
                }
            }
        })
        ajax({        //商品规格
            url: _this.getSpecList,
            type: "post",
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            success: function (data) {
                if(data.code==200){
                    _this.getSpecListArr=data.obj
                }
            }
        })
        ajax({        //牌号
            url: _this.getGradeList,
            type: "post",
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            data:JSON.stringify({
                "pageSize": 111110,
                "currentPage": 0
            }),
            success: function (data) {
               if(data.code==200){
                   _this.getGradeListArr=data.obj
               }

            }
        })
    },
    updated: function () {
        $(".clicktip-dis1 li").on("click", function () {
            $(".clicktip span").html($(event.target).html())
            $(".clicktip span").attr("goodsid",$(event.target).attr("goodsid"))
            $(".clicktip-dis1").slideUp()
        })
        $(".clicktip-dis2 li").on("click", function () {
            $(".clicktip-dis2").slideUp()
            $(".clicktip1 span").html($(event.target).html())
            $(".clicktip1 span").attr("specId",$(event.target).attr("specId"))

        })
        $(".clicktip-dis3 li").on("click", function () {
            $(".clicktip-dis3").slideUp()
            $(".clicktip2 span").html($(event.target).html())
            $(".clicktip2 span").attr("cityId",$(event.target).attr("cityId"))

        })
        $(".clicktip-dis4 li").on("click", function () {
            $(".clicktip-dis4").slideUp()
            $(".clicktip3 span").html($(event.target).html())
            $(".clicktip3 span").attr("cityId",$(event.target).attr("cityId"))

        })
    },
    methods:{
			loadData(item, callback) {
				const that = this
				item.loading = true;
				let arr = []
				if(item.value <= 5) {
					ajax({
						url: that.getVarietyList,
						type: "post",
						data: JSON.stringify({
							"type": item.value
						}),
						headers: {
							"Content-Type": "application/json;charset=UTF-8"
						},
						success: function(data) {
							if(data.code == 200 && data.obj != null) {
								for(let i = 0; i < data.obj.length; i++) {
									arr.push({
										value: data.obj[i].varietyId,
										label: data.obj[i].name,
										children: [],
	                 				    loading: false
									})
								}
								item.children = arr
								item.loading = false;
								callback();
							}
						}
					})
				}else{
					ajax({
						url: that.getGoodsList,
						type: "post",
						data: JSON.stringify({
							"varietyId": item.value
						}),
						headers: {
							"Content-Type": "application/json;charset=UTF-8"
						},
						success: function(data) {
							if(data.code == 200 && data.obj != null&&data.obj.length!=0) {
								for(let i = 0; i < data.obj.length; i++) {
									arr.push({
										value: data.obj[i].goodsId,
										label: data.obj[i].name,
									})
								}
								item.children = arr
								item.loading = false;
								callback();
							}else{
								item.children = [
									{
					                    value: '',
					                    label: '',
					                }
								]
								item.loading = false;
								callback();								
							}
							
						}
					})
				}
			},
    	typeChange(){
    		    ajax({
                    url: _this.editBuy,
                    type: "post",
                    data:JSON.stringify({
                        "type": 2
                    }),
                    headers: {
                        "Content-Type": "application/json;charset=UTF-8"
                    },
                    success: function (data) {
                        if(data.code==200){
                        }

                    }
                })
                    
    	},
        jumpFn: function () {
        	var _this=this;
            var clicktip=$(".clicktip"),
                clicktipDis1=$(".clicktip-dis1"),
                clicktipList=$(".clicktip-dis1 li"),
                clicktipImg=$(".clicktip img");
            var on=true;
            clicktipDis1.on("click", function () {
                $(".clicktip span").html($(event.target).html())
            })

            clicktip.on("click", function () {
                clicktipDis1.slideToggle(100);

                $(".clicktip span").attr("goodsid",$(event.target).attr("goodsid"))
                tipXS (clicktipImg,clicktip,clicktipDis1)
            })
            function tipXS (clicktipImg,clicktip,clicktipDis1) {
                if(on){
                    clicktipImg.attr("src","../../img/xia1.png");
                    clicktip.css({
                        "border-radius": "4px",
                    })
                    clicktipDis1.css({
                    	"border-radius": "4px",
                    })
                    on=false;
                }else{
                    clicktipImg.attr("src","../../img/shang1.png");
                    clicktip.css({
                        "-webkit-border-radius":"4px 4px 4px 4px",
                        "-moz-border-radius": "4px 4px 4px 4px",
                        "border-radius": "4px 4px 4px 4px",
                    })
                    clicktipDis1.css({
                        "border-radius": "4px",
                    })
                    on=true;
                }
            }

            var clicktip1=$(".clicktip1"),
                clicktipDis2=$(".clicktip-dis2"),
                clicktip1List=$(".clicktip-dis2 li"),
                clicktip1Img=$(".clicktip1 img");
            clicktipDis2.on("click", function (ev) {
//              $(".clicktip1 span").html($(event.target).html())
                $(".clicktip1 span").html(ev.target.innerHTML)
                $(".clicktip1 span").attr("specId",ev.target.getAttribute('specid'))
                console.log(1)
            })
            clicktip1.on("click", function () {
                clicktipDis2.slideToggle(100)

                $(".clicktip1 span").attr("specId",$(event.target).attr("specId"))
                tipXS (clicktip1Img,clicktip1,clicktipDis2)
                console.log(2)
//                          	console.log(11111,ev.target.innerHTML,ev.target.getAttribute('specid'))
//              $(".clicktip1 span").html(ev.target.innerHTML)
//              $(".clicktip1 span").attr("specId",ev.target.getAttribute('specid'))
            })
            clicktip1List.on("click", function () {
            	console.log(3)
                $(".clicktip1 span").html($(event.target).html())
            })
            var clicktip2=$(".clicktip2"),
                clicktipDis3=$(".clicktip-dis3"),
                clicktip2List=$(".clicktip-dis3 li"),
                clicktip2Img=$(".clicktip2 img");
            clicktip2.on("click", function () {
                clicktipDis3.slideToggle(100)

                $(".clicktip2 span").attr("gradeId",$(event.target).attr("gradeId"))
                tipXS (clicktip2Img,clicktip2,clicktipDis3)
            })
            clicktip2List.on("click", function () {
                $(".clicktip2 span").html($(event.target).html())
            })

            var clicktip3=$(".clicktip3"),
                clicktipDis4=$(".clicktip-dis4"),
                clicktip3List=$(".clicktip-dis4 li"),
                clicktip3Img=$(".clicktip3 img");
            clicktipDis3.on("click", function () {
                $(".clicktip2 span").html($(event.target).html())
            })
            clicktip3.on("click", function () {
                clicktipDis4.slideToggle(100)
                $(".clicktip3 span").attr("cityId",$(event.target).attr("cityId"))
                tipXS (clicktip3Img,clicktip3,clicktipDis4)
            })
            clicktip3List.on("click", function () {
                $(".clicktip3 span").html($(event.target).html())
            })
            /*发布*/
            
            $(".issue").on("click", function () {
              ajax({
                    url: _this.editBuy,
                    type: "post",
                    data:JSON.stringify({
                        "type": _this.selectType[0],
                        "varietyId": _this.selectType[1],
                        "goodsId": _this.selectType[2],
                        
                        "cityId": _this.cityId,
                        "specId": $(".clicktip1 span").attr("specid"),
                        "weight":parseInt($(".inp").val()),
                        "remake": $(".con").val(),
                    }),
                    headers: {
                        "Content-Type": "application/json;charset=UTF-8"
                    },
                    success: function (data) {
                    	
                        if(data.code==200){
                        	
                            window.location.href="../my-issue/my-issue.html"
                        }

                    }
                })
            })
            /*跳转*/
            $(".header-pic").click(function () {
                window.location.href="../index.html"
            })
            $(".login").click(function () {
                if($(this).html()=="请登录"){
                    window.location.href="../login/login.html"
                }
            })
            /*register*/
            $(".shop").click(function () {
                window.location.href="../shop/shop.html"
            })
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
            $(".history-issue").click(function () {
                window.location.href="../history-issue/history-issue.html"
            })
            $(".is-color").click(function () {
                window.location.href="../my-issue/my-issue.html"
            })
            $(".supply").click(function () {
                window.location.href="../my-supply/my-supply.html"
            })
            $(".history-supply").click(function () {
                window.location.href="../history-supply/history-supply.html"
            })
        }
    },

})
