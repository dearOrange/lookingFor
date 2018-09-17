/**
 * Created by Administrator on 2017/5/26.
 */
new Vue({
	el: "#vm",
	data: {
		getDealAvgList: [],
		getDealAvgList1: [],
		getDealAvgList2: [],
		getDealAvgList3: [],
		dataUrl: {
			getDealDynamicsByType: window.dataUrl + "/web/deal/getDealDynamicsByType",
			getDealNoByType: window.dataUrl + "/web/deal/getDealNoByType"
		},
		getCarListWeb: window.dataUrl + "/personal/getCarListWeb",
		getExpressList: window.dataUrl + "/web/deal/getExpressList",
		
		getUserById: window.dataUrl + "/personal/getUserById",
		getSpecAndGradeByType: window.dataUrl + "/web/deal/getSpecAndGradeByType", //查询系列获取牌号、规格
		getSupplierListUrl:window.dataUrl + "/web/deal/getSupplierList",//供应商列表
		//根据上一级查下一级
		getVarietyList: window.dataUrl + "/web/deal/getVarietyList",
		getGoodsList: window.dataUrl + "/web/deal/getGoodsList",
		getGradeList: window.dataUrl + "/web/deal/getGradeList",
		getSalesCity: window.dataUrl + "/web/deal/getSalesCity",
		getPriceList:window.dataUrl+"/web/deal/getPriceList",         //charts
		getHeadList:window.dataUrl+"/web/deal/getHeadList",         //charts
		getSalesDealWebList:window.dataUrl+"/web/deal/getSalesDealWebList",
		getCarListWebTxt:'',
		dataType: {
			type0: 0,
			type1: 1,
			type2: 2,
			type3: 3
		},
		noByTypeList: [],
		noByTypeList1: [],
		noByTypeList2: [],
		noByTypeList3: [],
		lodingGif: true,
		lodingGif1: true,
		lodingGif2: true,
		lodingGif3: true,
		total1: "",
		total2: "",
		total3: "",
		total4: "",
		nick: "",
		indexClassify:[0,1,2,3,4,5],
		variety:[],
		goods:[],
		yesterdayTotal:'',
		supplierList:[],
		salesCity:'',
		hot0:'',
		hot1:'',
		hot2:'',
		hot3:'',
		qh_time:[],
		now_city_name:'',
		now_city_name1:'',
		now_city_name2:'',
		now_city_name3:'',
		city0:'630000',
		city1:'640000',
		city2:'150000',
		city3:'210000',
		expressArr:[],
		isLogin:false,

	},
	updated: function() {
	},
	watch:{
	},
	mounted: function() {
		
			
				var _this = this
				
				/*硅系列*/
		
		if($(".msg-index1-list:eq(0) li:eq(0)")) {
			var liLength = $(".msg-index1-list:eq(0) li:eq(0)").length;
			var html = parseInt($(".count1:eq(0)").html());
			var html1 = parseInt($(".sum1").html());
			var progress11 = parseInt($(".index1-progress1:eq(0)").width())
			var progress21 = parseInt($(".index1-progress2:eq(0)").width())
			var step = (html / html1).toFixed(3)
			$(".index1-progress2:eq(0)").css("width", progress11 * step + "px")
			$(".index1-progress3:eq(0)").css("left", progress11 * step + "px")
		}
		if($(".msg-index1-list:eq(0) li:eq(1)")) {
			var liLength = $(".msg-index1-list:eq(0) li:eq(1)").length;
			var html = parseInt($(".count1:eq(1)").html());
			var html1 = parseInt($(".sum1").html());
			var progress11 = parseInt($(".index1-progress1:eq(1)").width())
			var progress21 = parseInt($(".index1-progress2:eq(1)").width())
			var step = (html / html1).toFixed(3)
			$(".index1-progress2:eq(1)").css("width", progress11 * step)
			$(".index1-progress3:eq(1)").css("left", progress11 * step)
		}
		if($(".msg-index1-list:eq(0) li:eq(2)")) {
			var liLength = $(".msg-index1-list:eq(0) li:eq(2)").length;
			var html = parseInt($(".count1:eq(2)").html());
			var html1 = parseInt($(".sum1").html());
			var progress11 = parseInt($(".index1-progress1:eq(2)").width())
			var progress21 = parseInt($(".index1-progress2:eq(2)").width())
			var step = (html / html1).toFixed(3)
			$(".index1-progress2:eq(2)").css("width", progress11 * step)
			$(".index1-progress3:eq(2)").css("left", progress11 * step)

		}
		if($(".msg-index1-list:eq(0) li:eq(3)")) {
			var liLength = $(".msg-index1-list:eq(0) li:eq(4)").length;
			var html = parseInt($(".count1:eq(3)").html());
			var html1 = parseInt($(".sum1").html());
			var progress11 = parseInt($(".index1-progress1:eq(3)").width())
			var progress21 = parseInt($(".index1-progress2:eq(3)").width())
			var step = (html / html1).toFixed(3)
			$(".index1-progress2:eq(3)").css("width", progress11 * step)
			$(".index1-progress3:eq(3)").css("left", progress11 * step)
		}
		/*锰系列*/
		if($(".msg-index1-list:eq(1) li:eq(0)")) {
			var liLength = $(".msg-index1-list:eq(1) li:eq(0)").length;
			var html = parseInt($(".count2:eq(0)").html());
			var html1 = parseInt($(".sum2").html());
			var progress11 = parseInt($(".index2-progress1:eq(0)").width())
			var progress21 = parseInt($(".index2-progress2:eq(0)").width())
			var step = (html / html1).toFixed(3)
			$(".index2-progress2:eq(0)").css("width", progress11 * step + "px")
			$(".index2-progress3:eq(0)").css("left", progress11 * step + "px")
		}
		if($(".msg-index1-list:eq(1) li:eq(1)")) {
			var liLength = $(".msg-index2-list:eq(0) li:eq(1)").length;
			var html = parseInt($(".count2:eq(1)").html());
			var html1 = parseInt($(".sum2").html());
			var progress11 = parseInt($(".index2-progress2:eq(1)").width())
			var progress21 = parseInt($(".index2-progress2:eq(1)").width())
			var step = (html / html1).toFixed(3)
			$(".index2-progress2:eq(1)").css("width", progress11 * step)
			$(".index2-progress3:eq(1)").css("left", progress11 * step)
		}
		if($(".msg-index1-list:eq(1) li:eq(2)")) {
			var liLength = $(".msg-index2-list:eq(0) li:eq(2)").length;
			var html = parseInt($(".count2:eq(2)").html());
			var html1 = parseInt($(".sum2").html());
			var progress11 = parseInt($(".index2-progress1:eq(2)").width())
			var progress21 = parseInt($(".index2-progress2:eq(2)").width())
			var step = (html / html1).toFixed(3)
			$(".index2-progress2:eq(2)").css("width", progress11 * step)
			$(".index2-progress3:eq(2)").css("left", progress11 * step)

		}
		if($(".msg-index1-list:eq(1) li:eq(3)")) {
			var liLength = $(".msg-index2-list:eq(0) li:eq(3)").length;
			var html = parseInt($(".count2:eq(3)").html());
			var html1 = parseInt($(".sum1").html());
			var progress11 = parseInt($(".index2-progress1:eq(3)").width())
			var progress21 = parseInt($(".index2-progress2:eq(3)").width())
			var step = (html / html1).toFixed(3)
			$(".index2-progress2:eq(3)").css("width", progress11 * step)
			$(".index2-progress3:eq(3)").css("left", progress11 * step)
		}
		/*铬系列*/
		if($(".msg-index1-list:eq(2) li:eq(0)")) {
			var liLength = $(".msg-index1-list:eq(2) li:eq(0)").length;
			var html = parseInt($(".count3:eq(0)").html());
			var html1 = parseInt($(".sum3").html());
			var progress11 = parseInt($(".index3-progress1:eq(0)").width())
			var progress21 = parseInt($(".index3-progress2:eq(0)").width())
			var step = (html / html1).toFixed(3)
			$(".index3-progress2:eq(0)").css("width", progress11 * step + "px")
			$(".index3-progress3:eq(0)").css("left", progress11 * step + "px")

		}
		if($(".msg-index1-list:eq(2) li:eq(1)")) {
			var liLength = $(".msg-index2-list:eq(0) li:eq(1)").length;
			var html = parseInt($(".count3:eq(1)").html());
			var html1 = parseInt($(".sum3").html());
			var progress11 = parseInt($(".index3-progress2:eq(1)").width())
			var progress21 = parseInt($(".index3-progress2:eq(1)").width())
			var step = (html / html1).toFixed(3)
			$(".index3-progress2:eq(1)").css("width", progress11 * step)
			$(".index3-progress3:eq(1)").css("left", progress11 * step)
		}
		if($(".msg-index1-list:eq(2) li:eq(2)")) {
			var liLength = $(".msg-index2-list:eq(0) li:eq(2)").length;
			var html = parseInt($(".count3:eq(2)").html());
			var html1 = parseInt($(".sum3").html());
			var progress11 = parseInt($(".index3-progress1:eq(2)").width())
			var progress21 = parseInt($(".index3-progress2:eq(2)").width())
			var step = (html / html1).toFixed(3)
			$(".index3-progress2:eq(2)").css("width", progress11 * step)
			$(".index3-progress3:eq(2)").css("left", progress11 * step)

		}
		if($(".msg-index1-list:eq(2) li:eq(3)")) {
			var liLength = $(".msg-index2-list:eq(0) li:eq(3)").length;
			var html = parseInt($(".count3:eq(3)").html());
			var html1 = parseInt($(".sum3").html());
			var progress11 = parseInt($(".index3-progress1:eq(3)").width())
			var progress21 = parseInt($(".index3-progress2:eq(3)").width())
			var step = (html / html1).toFixed(3)
			$(".index3-progress2:eq(3)").css("width", progress11 * step)
			$(".index3-progress3:eq(3)").css("left", progress11 * step)
		}
		$(".hover1").on("mouseover", function() {
			$(".mb-fadeo").css("display", "block")
			var Id = $(".hover1").attr("setid")
			sessionStorage.setItem("id", Id);
		}).on("mouseout", function() {
			$(".mb-fadeo").css("display", "none")
		})
		$(".hover2").on("mouseover", function() {
			var Id = $(".hover2").attr("setid")
			sessionStorage.setItem("id", Id);
			$(".mb-fade1").css("display", "block")
		}).on("mouseout", function() {

			$(".mb-fade1").css("display", "none")
		})
		$(".hover3").on("mouseover", function() {
			var Id = $(".hover3").attr("setid")
			sessionStorage.setItem("id", Id);
			$(".mb-fade2").css("display", "block")
		}).on("mouseout", function() {
			$(".mb-fade2").css("display", "none")
		})
		$(".hover4").on("mouseover", function() {
			$(".mb-fade3").css("display", "block")
			var Id = $(".hover4").attr("setid")
			sessionStorage.setItem("id", Id);
		}).on("mouseout", function() {
			$(".mb-fade3").css("display", "none")
		})
		$(".hover5").on("mouseover", function() {
			$(".mb-fade4").css("display", "block")
			var Id = $(".hover5").attr("setid")

			sessionStorage.setItem("id", Id);
		}).on("mouseout", function() {
			$(".mb-fade4").css("display", "none")
		})
		$(".hover6").on("mouseover", function() {
			$(".mb-fade5").css("display", "block")
			var Id = $(".hover6").attr("setid")

			sessionStorage.setItem("id", Id);
		}).on("mouseout", function() {
			$(".mb-fade5").css("display", "none")
		})
		$(".hover7").on("mouseover", function() {
			$(".mb-fade6").css("display", "block")
			var Id = $(".hover7").attr("setid")

			sessionStorage.setItem("id", Id);
		}).on("mouseout", function() {
			$(".mb-fade6").css("display", "none")
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
					//shop跳转
			$(".header-nav-btn2").on("click", function() {
				if(get_cookie('pwd')!=''){
					window.location.href = "../resources/shop/shop.html"
				} else {
					window.location.href = "../resources/login/login.html"
				}
			})
			//shop--hover事件
			$(".shop").on("mouseover", function() {
				$(".fade-shop").stop()
				$(".fade-shop").slideDown(100)
			}).on("mouseout", function() {
				$(".fade-shop").stop()
				$(".fade-shop").slideUp(100)
			})
			/*login*/
			$(".login").click(function() {
				if($(this).html() == "请登录") {
					window.location.href = "../resources/login/login.html"
				}
			})
			/*register*/
			$(".register").click(function() {
				window.location.href = "../resources/register/register.html"
			})
			/*my-center*/
			$(".my-center").click(function() {
				window.location.href = "../resources/my-center/my-center.html"
			})
			/*my-order*/
			$(".my-order").click(function() {
				window.location.href = "../resources/my-order/my-order.html"
			})
			$(".issue").click(function() {
				window.location.href = "../resources/buy/buy.html"
			})
			$(".about-us").on("click", function() {
				window.location.href = "../resources/message-center/message-center.html"
			})
			$(".supermarket").click(function() {
				window.location.href = "../resources/supermarket/supermarket.html"
				sessionStorage.removeItem("id")
			})
			
			
			
		//$nextTickDOM为更新后执行
		this.$nextTick(function() {
			this.pageJumps()
			this.playFn();
			this.expressList();//底部轮播
			// this.datalistNum();
			
			this.dataTimes();
			var _this = this;
			this.getSupplierList()
//			this.myEcharts()
        _this.requestCharts(0)
    	_this.requestCharts(1)
    	_this.requestCharts(2)
    	_this.requestCharts(3)
    	_this.init()
			//首页查询合金系列获取所有品种　品名
			const varietyArr = []
			for(let i=0;i<6;i++){
				//查询品种
				ajax({
					url: _this.getVarietyList,
					type: "post",
					data: JSON.stringify({
						"type": i
					}),
					success: function(data) {
						if(data.code == 200) {
							//arr	大类－品种
							_this.indexClassify[i] = data.obj
							
								//根据品种查品名
								//遍历大类
								for(let j=0;j<_this.indexClassify.length;j++){
									//品种－－品名
									let goods = _this.indexClassify[j]
									
									if(goods.length == 0){
										return;
									}
									//遍历品种
									for(let v=0;v<goods.length;v++){
											//当前variety
											
											let varietyId = goods[v].varietyId
											ajax({
												url: _this.getGoodsList,
												type: "post",
												data: JSON.stringify({
													"varietyId": varietyId
												}),
												success: function(data) {
													if(data.code == 200 && data.obj!=null &&data.obj.length!=0) {
														//大类－－品种--品名
														_this.indexClassify[j][v].goodsArr = data.obj
													}
													//最后调用
													if(i==5&&j==_this.indexClassify.length-1&&v==goods.length-1){
														addGoods()
													}
												}
											})
									}
								}
						}
					
					}
				})
			}

			//添加品名&绑定跳转事件
			function addGoods(){
				//遍历大类
				for(let o=0;o<_this.indexClassify.length;o++){
					
					const goods = _this.indexClassify[o] 
					
					//遍历品种
						for(let a=0;a<goods.length;a++){
							
							if(goods[a].goodsArr){
//								//遍历品名
								for(let b=0;b<goods[a].goodsArr.length;b++){
									$('.varietyId'+goods[a].varietyId).parent().append($('<a></a>').addClass('goodsid')
									.attr('goodsid',goods[a].goodsArr[b].goodsId).text(goods[a].goodsArr[b].name))
									
								}
							}

						}
				}
				$(".goodsid").on("click", function(event) {
					const goodsid = $(event.target).attr("goodsid");
					const goodsIndex = $(event.target).index();
					const html = $(event.target).index();
					const varietyIndex = $(event.target).parent().attr("varietyIndex");
					
					
					sessionStorage.setItem("goodsid", goodsid);
					sessionStorage.setItem("goodsname", html);
					sessionStorage.setItem("varietyIndex", varietyIndex);
					sessionStorage.setItem("goodsIndex", goodsIndex);
					
					window.location.href = "../resources/supply/supply.html"
				})
			}

			var inSear = $(".in-sear");
			inSear.on("keyup", function() {
				var length = inSear.val().length;
				if(length > 10) {

					inSear.val(inSear.val().slice(0, 10))
					return false;
				}

			})
			/*页面跳转*/
			pageJumps()

			function pageJumps() {
				var list = $(".list li");
				var list1 = list.eq(0);
				var list2 = list.eq(1);
				var list3 = list.eq(2);
				var list4 = list.eq(3);
				list1.on("click", function() {
					window.location.href = "../resources/index.html"
				})
				list2.on("click", function() {
					window.location.href = "../resources/supermarket/supermarket.html"
				})
				list3.on("click", function() {
					window.location.href = "../resources/supply/supply.html"
				})
			}


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
					//购物车信息
				ajax({ 
						url: _this.getCarListWeb,
						type: "post",
						success: function(data) {
							if(data.code == 200) {
								_this.getCarListWebTxt = data.list.length
							}
						}
					})
	     }
			/*硅系热度*/
			ajax({
				url: _this.dataUrl.getDealNoByType,
				type: "post",
				data: JSON.stringify({
					"type": 0
				}),
				success: function(data) {
					if(data.code == 200 && data.list.length!=0) {
						_this.hot0 = data.hot
						_this.lodingGif = false;
						_this.noByTypeList1 = data.list.splice(0, 5)
						var num = data.index
						_this.total1 = num
						_this.lodingGif1 = false;
						setTimeout(function() {
							//_this.dataList1(_this.noByTypeList1)
							_this.now_city_name = _this.noByTypeList1[0].cityName
							_this.city0 = _this.noByTypeList1[0].cityId
							_this.dataListState();
							for(let i=0;i<_this.noByTypeList1.length;i++){
								
								let width = _this.noByTypeList1[i].yesterday/100 *240
								const widthPx　= isNaN(width)?'0px':width + 'px'
								
//								const width = 21+'px'
								$('.zs1 .index1-progress2').eq(i).css({width:widthPx})
								
							}
							
						}, 100)
					}

				}
			})

			/*锰系热度*/
			ajax({
				url: _this.dataUrl.getDealNoByType,
				type: "post",
				data: JSON.stringify({
					"type": 1
				}),
				success: function(data) {
					

					if(data.code == 200 && data.list.length!=0){
						_this.hot1 = data.hot
						_this.noByTypeList2 = data.list.splice(0, 5)
						
						var num = data.index
						_this.total2 = num
						_this.lodingGif1 = false;
						
						setTimeout(function() {
							_this.now_city_name1 = _this.noByTypeList2[0].cityName
							_this.city1 = _this.noByTypeList2[0].cityId
							_this.dataListState();
							for(let i=0;i<_this.noByTypeList2.length;i++){
								let width = _this.noByTypeList2[i].yesterday/100 *240
								const widthPx　= isNaN(width)?'0px':width + 'px'
								
								$('.index2-progress2').eq(i).css({width:widthPx})
								
							}
							
						}, 100)
					}

				}
			})
			
			
			/*铬系热度*/
			ajax({
				url: _this.dataUrl.getDealNoByType,
				type: "post",
				data: JSON.stringify({
					"type": 2
				}),
				success: function(data) {
					if(data.code == 200 && data.list.length!=0) {
						_this.hot2 = data.hot
						_this.noByTypeList3 = data.list.splice(0, 5)
						console.log(1,_this.noByTypeList3)
						var num = data.index
						_this.total3 = num
						_this.lodingGif2 = false;
						setTimeout(function() {
							_this.dataList3(_this.noByTypeList3)
							_this.now_city_name2 = _this.noByTypeList3[0].cityName
							_this.city2= _this.noByTypeList3[0].cityId
							_this.dataListState();
							for(let i=0;i<_this.noByTypeList3.length;i++){
								
								let width = _this.noByTypeList3[i].yesterday/100 *240
								const widthPx　= isNaN(width)?'0px':width + 'px'
								
								$('.index3-progress2').eq(i).css({width:widthPx})
							}
						}, 100)
					} else {

					}

				}
			})
			
			/*镍系热度*/
			ajax({
				url: _this.dataUrl.getDealNoByType,
				type: "post",
				data: JSON.stringify({
					"type": 3
				}),
				success: function(data) {
					if(data.code == 200 && data.list.length!=0){
						
						_this.hot3 = data.hot
						_this.noByTypeList = data.list.splice(0, 5)
						var num = data.index

						_this.total4 = num
						_this.lodingGif3 = false;
						setTimeout(function() {
							_this.dataList(_this.noByTypeList)
							_this.now_city_name3 = _this.noByTypeList[0].cityName
							
							_this.city3= _this.noByTypeList[0].cityId
							
							_this.dataListState();
							for(let i=0;i<_this.noByTypeList.length;i++){
								
								let width = _this.noByTypeList[i].yesterday/100 *240
								const widthPx　= isNaN(width)?'0px':width + 'px'
								
								$('.index4-progress2').eq(i).css({width:widthPx})
							}
						}, 1000)
						
					}

				}
			})

		})
	},

	methods: {
		init(){
			const _this = this
			ajax({
				url: _this.getSalesCity,
				type: "post",
				data: JSON.stringify({
				}),
				success: function(data) {
					if(data.code == 200) {
						_this.salesCity = data.obj
					}
				}
			})
		},
		expressList(){
			const _this = this
			ajax({
				url: _this.getExpressList,
				type: "post",
				data: JSON.stringify({
				}),
				success: function(data) {
					if(data.code == 200) {
						let arr = []
						for(let i=0;i<data.obj.length;i++){
							
							arr.push(data.obj[i])
							if( (i+1)%3 == 0 || i==data.obj.length-1){
								if(arr!=[]){
									_this.expressArr.push(arr)
									arr = []
								}
							}
						}
					}
				}
			})
		},
		cityNews(code,type,name){
			const _this = this
			if(type==0){
				_this.now_city_name = name
			}else if(type==1){
				_this.now_city_name1 = name
			}else if(type==2){
				_this.now_city_name2 = name
			}else if(type==3){
				_this.now_city_name3 = name
			}
			ajax({
				url: _this.getSalesDealWebList,
				type: "post",
				data: JSON.stringify({
					"pageSize": "4",
					"currentPage": "1",
					"goodsType":type,
					"createTime":1,
					"cityId":code
				}),
				success: function(data) {
					if(data.code == 200) {
						$.each(data.obj, function(k, v) {
							v.createTime = (_this.dataTimes(v.createTime))
						})
						
						if(type==0){
							_this.getDealAvgList = data.obj;
							_this.now_city_name = name
						}else if(type==1){
							_this.getDealAvgList1 = data.obj;
							_this.now_city_name1 = name
						}else if(type==2){
							_this.getDealAvgList2 = data.obj;
							_this.now_city_name2 = name
						}else if(type==3){
							_this.getDealAvgList3 = data.obj;
							_this.now_city_name3 = name
						}
						
					}

				}
			})
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
		upSupplier(userId){
			window.open("../resources/about-us/about-us.html?userId="+userId)
//			if(this.get_cookie('pwd')!=''){
//				window.location.href = "../resources/about-us/about-us.html?userId="+userId
//			}else{
//				this.isLogin = true
//			}
			
		},
		jump_noLogin(type){
    		if(type==0){
    			window.location="../resources/login/login.html";
    		}else if(type==1){
    			window.location.href = "../resources/register/register.html"
    		}
    	},
		getSupplierList(){
			var _this = this;
			ajax({
				url: _this.getSupplierListUrl,
				type: "post",
				data: JSON.stringify({
					"state":1
				}),
				success: function(data) {
					if(data.code == 200) {
						_this.supplierList = data.obj.splice(0,10)
					}

				}
			})
		},    	
		requestCharts(type){
    		const that = this;
    		if(type==0){
				let priceObj = {
					one:that.ajaxCharts(type,630000),//青海
					two:that.ajaxCharts(type,150000),//内蒙
				}
				let onOff = true
				const interval = setInterval(function(){
					if(priceObj.one[0].length > 0 && onOff){
						that.myCharts(priceObj,type)
						setTimeout(function(){
							onOff = false		
							clearInterval(interval)
						},1000)
					}
				},500)
				
    		}else if(type==1){
    			let priceObj = {
					one:that.ajaxCharts(type,150000),//内蒙
					two:that.ajaxCharts(type,450000),//广西
				}
    			let onOff = true
				const interval = setInterval(function(){
					if(priceObj.one[0].length > 0 && onOff){
						that.myCharts(priceObj,type)
						setTimeout(function(){
							onOff = false		
							clearInterval(interval)
						},1000)
					}
				},500)
    		}else if(type==2){
    			let priceObj = {
					one:that.ajaxCharts(type,150000),//内蒙
					two:that.ajaxCharts(type,510000 ),//四川
					three:that.ajaxCharts(type,310000),//上海
				}
    			let onOff = true
				const interval = setInterval(function(){
					if(priceObj.one[0].length > 0 && onOff){
						that.myCharts(priceObj,type)
						setTimeout(function(){
							onOff = false			
							clearInterval(interval)
						},1000)
					}
				},500)
    		}else if(type==3){
    			let priceObj = {
					one:that.ajaxCharts(type,320000),//江苏
					two:that.ajaxCharts(type,310000),//上海
				}
    			let onOff = true
				const interval = setInterval(function(){
					if(priceObj.two[0].length > 0 && onOff){
						that.myCharts(priceObj,type)
						setTimeout(function(){
							onOff = false			
							clearInterval(interval)
						},1000)
					}
				},500)
    		}
    		        
    	},
    	timer(time){
    		    let timec = new Date(time)
				const year = timec.getFullYear()
				const month = timec.getMonth() +1
				const day = timec.getDate()
				const hours = timec.getHours()
				const minutes = timec.getMinutes()
				const seconds = timec.getSeconds()
				
				let timer = month+'.'+day
				return timer;
		},
    	ajaxCharts(type,cityId){
    		const that = this
    			let arr = []
    			let time = []
    			let objArr = []
    		    	ajax({
			            url:that.getHeadList,
			            type: "post",
			           　
			            data: JSON.stringify({
			           		"type": type,
							"cityId": cityId
			            }),
			            success: function (data) {
							
			            	for(let i=0;i<data.list.length;i++){
			            		arr.push(data.list[i].avg)
			            		time.push(that.timer(data.list[i].createTime))
			            	}
								objArr.push(arr);
								objArr.push(time);
			            }
			        })
    		    return [arr,time];
    	},
		myCharts(priceObj,type){
			const that = this 
			if(type==0){
				var myChart = echarts.init(document.getElementById('main'));
				// 指定图表的配置项和数据
			    var option = {
			        title: {
			            text: '硅铁合金',
			            y:"20",
			            textStyle:{
			                fontSize:"16",
			                color:"#02548e"
			            },
			            subtextStyle:{
			                fontSize:"14",
			                color:"#3d3d3d"
			            }
			        },
			        tooltip: {},
			        legend: {
			            type:"rect",
			            backgroundColor:"none",
			            y:"20",
			            x:"100",
			            data:['青海','内蒙']
			
			        },
			        xAxis: {
			            data: priceObj.one[1],
			            nameLocation:"start",
			            axisTick:{
			                alignWithLabel:true
			            }
			
			        },
			         
			        grid: {
			            left: '70',
			            right: '4%',
			            bottom: '3%',
			            containLabel: true
			        },
			        yAxis: {
			         
			
			        },
			        series: [
				        {
				            name: '青海',
				            type: 'line',
				            data: priceObj.one[0]
				        },
			            {
			                name: '内蒙',
			                type: 'line',
			             	data: priceObj.two[0]
			            }
			        ]
			    };
			    // 使用刚指定的配置项和数据显示图表。
			   myChart.setOption(option);
			}else if(type==1){
				var myChart1 = echarts.init(document.getElementById('main1'));
								// 指定图表的配置项和数据
			    var option1 = {
			        title: {
			            text: '硅锰合金',
			            y:"20",
			            textStyle:{
			                fontSize:"16",
			                color:"#02548e"
			            },
			            subtextStyle:{
			                fontSize:"14",
			                color:"#3d3d3d"
			            }
			        },
			        tooltip: {},
			        legend: {
			            type:"rect",
			            backgroundColor:"none",
			            y:"20",
			            x:"100",
			            data:['内蒙','广西']
			
			        },
			        xAxis: {
			            data: priceObj.one[1],
			            nameLocation:"start",
			            axisTick:{
			                alignWithLabel:true
			            }
			
			        },
			        grid: {
			            left: '70',
			            right: '4%',
			            bottom: '3%',
			            containLabel: true
			        },
			        yAxis: {
			            /*show:false,*/
			         // min:"0",
			           // max:"10000",
			            /*interval:"10"*/
			
			        },
			        series: [
				        {
				            name: '内蒙',
				            type: 'line',
				            data: priceObj.one[0]
				        },
			            {
			                name: '广西',
			                type: 'line',
			             	data: priceObj.two[0]
			            }
			        ]
			    };
			       
			    myChart1.setOption(option1);
			 
			}else if(type==2){
				var myChart2 = echarts.init(document.getElementById('main2'));
								// 指定图表的配置项和数据
			    var option2 = {
			        title: {
			            text: '高碳铬铁',
			            y:"20",
			            textStyle:{
			                fontSize:"16",
			                color:"#02548e"
			            },
			            subtextStyle:{
			                fontSize:"14",
			                color:"#3d3d3d"
			            }
			        },
			        tooltip: {},
			        legend: {
			            type:"rect",
			            backgroundColor:"none",
			            y:"20",
			            x:"100",
			            data:['内蒙','四川','上海']
			
			        },
			        xAxis: {
			            data: priceObj.one[1],
			            nameLocation:"start",
			            axisTick:{
			                alignWithLabel:true
			            }
			
			        },
			        grid: {
			            left: '70',
			            right: '4%',
			            bottom: '3%',
			            containLabel: true
			        },
			        yAxis: {
			            
			        },
			        series: [
				        {
				            name: '内蒙',
				            type: 'line',
				            data: priceObj.one[0]
				        },
			            {
			                name: '四川',
			                type: 'line',
			             	data: priceObj.two[0]
			            },
			            {
			                name: '上海',
			                type: 'line',
			             	data: priceObj.three[0]
			            }
			        ]
			    };
			    myChart2.setOption(option2);
			}else if(type==3){
				var myChart3 = echarts.init(document.getElementById('main3'));
								// 指定图表的配置项和数据
			    var option3 = {
			        title: {
			            text: '镍',
			            y:"20",
			            textStyle:{
			                fontSize:"16",
			                color:"#02548e"
			            },
			            subtextStyle:{
			                fontSize:"14",
			                color:"#3d3d3d"
			            }
			        },
			        tooltip: {},
			        legend: {
			            type:"rect",
			            backgroundColor:"none",
			            y:"20",
			            x:"100",
			            data:['上海']
			
			        },
			        xAxis: {
			            data: priceObj.two[1],
			            nameLocation:"start",
			            axisTick:{
			                alignWithLabel:true
			            }
			
			        },
			        grid: {
			            left: '70',
			            right: '4%',
			            bottom: '3%',
			            containLabel: true
			        },
			        yAxis: {
			            /*show:false,*/
//			            min:"0",
//			            max:"10000",
			            /*interval:"10"*/
			
			        },
			        series: [
			            {
			                name: '上海',
			                type: 'line',
			             	data: priceObj.two[0]
			            }
			        ]
			    };
			    myChart3.setOption(option3);
			}
			  

			    
		},
		pageJumps: function() {
			function pageJumps() {
				var list = $(".list li");
				var list1 = list.eq(0);
				var list2 = list.eq(1);
				var list3 = list.eq(2);
				var list4 = list.eq(3);
				list1.on("click", function() {
					window.location.href = "../resources/index.html"
				})
				list2.on("click", function() {
					window.location.href = "../resources/supermarket/supermarket.html"
				})
				list3.on("click", function() {
					window.location.href = "../resources/supply/supply.html"
				})
			}
		},
		playFn: function() {

			/*login*/

			/*register*/
			$(".register").click(function() {
				window.location.href = "../resources/register/register.html"
			})
			/*my-center*/
			$(".my-center").click(function() {
				window.location.href = "../resources/my-center/my-center.html"
			})
			/*my-order*/
			$(".my-order").click(function() {
				window.location.href = "../resources/my-order/my-order.html"
			})
			$(".issue").click(function() {
				window.location.href = "../resources/issue/issue.html"
			})
			$(".buy").click(function() {
				window.location.href = "../resources/buy/buy.html"
			})
			$(".about-us").on("click", function() {
				window.location.href = "../resources/message-center/message-center.html"
			})
			$(".logistics").on("click", function () {
                window.location.href="../resources/logistics/logistics.html"
            })       
            $(".financial").on("click", function () {
                window.location.href="../resources/financial/financial.html"
            })       
            $(".mtl-pic").on("click", function () {
                window.location.href="../resources/index.html"
            }) 

			var inSear = $(".in-sear");
			inSear.on("keyup", function() {
				var length = inSear.val().length;
				if(length > 10) {

					inSear.val(inSear.val().slice(0, 10))
					return false;
				}

			})
		},

		dataListState: function() {
			var _this = this;
			
			/*硅供应动态*/
			ajax({
				url: _this.getSalesDealWebList,
				type: "post",
				data: JSON.stringify({
					"pageSize": "4",
					"currentPage": "1",
					"goodsType":0,
					"createTime":1,
					"cityId":_this.city0
				}),
				success: function(data) {
					if(data.code == 200) {
						$.each(data.obj, function(k, v) {
							if(v.createTime){
								v.createTime = (_this.dataTimes(v.createTime))
							}
						})
						
						_this.getDealAvgList = data.obj;
					}

				}
			})
			/*锰供应动态*/
			ajax({
				url: _this.getSalesDealWebList,
				type: "post",
				data: JSON.stringify({
					"pageSize": "4",
					"currentPage": "1",
					"goodsType":1,
					"createTime":1,
					"cityId":_this.city1
				}),
				success: function(data) {
					if(data.code == 200) {
						$.each(data.obj, function(k, v) {
							v.createTime = (_this.dataTimes(v.createTime))
						})

						_this.getDealAvgList1 = data.obj;
					}

				}
			})
			/*铬供应动态*/
			ajax({
				url: _this.getSalesDealWebList,
				type: "post",
				data: JSON.stringify({
					"pageSize": "4",
					"currentPage": "1",
					"goodsType":2,
					"createTime":1,
					"cityId":_this.city2
				}),
				success: function(data) {
					if(data.code == 200) {
						$.each(data.obj, function(k, v) {
							v.createTime = (_this.dataTimes(v.createTime))
						})

						_this.getDealAvgList2 = data.obj;
					} else {

					}

				}
			})
			/*镍供应动态*/
			ajax({
				url: _this.getSalesDealWebList,
				type: "post",
				data: JSON.stringify({
					"pageSize": "4",
					"currentPage": "1",
					"goodsType":3,
					"cityId":_this.city3
				}),
				success: function(data) {
					if(data.code == 200) {
						$.each(data.obj, function(k, v) {
							v.createTime = (_this.dataTimes(v.createTime))
						})

						_this.getDealAvgList3 = data.obj;
					} else {

					}

				}
			})

		},
		dataTimes: function(dd) {
			var da = dd;
			da = new Date(da);
			var month = da.getMonth() + 1 + '月';
			var date = da.getDate() + '日 ';
			var hours = da.getHours() + ":";
			var minutes = da.getMinutes();
			var datastring = [month, date, hours, minutes].join('')
			return datastring
		},

		dataList: function(dataNum) {
			if($(".msg-index1-list:eq(3) li:eq(0)")) {
				var progress1 = $(".msg-index1-list:eq(3) li:eq(0) .progress1");
				const depNum = ($(".index-num:eq(0)").html()) / ($(".sum").html()),
					widthP1 = progress1.width(),
					widthp2 = widthP1 * depNum;
				$(".msg-index1-list:eq(3) li:eq(0) .progress2").css({
					width: 0,
					height: "10px"
				})
				$(".msg-index1-list:eq(3) li:eq(0) .progress3").css({
					left: "-24px",
					height: "10px"
				})
				$(".msg-index1-list:eq(3) li:eq(0) .progress2").animate({
					width: widthp2 + "px",

				}, 500)
				$(".msg-index1-list:eq(3) li:eq(0) .progress3").animate({
					left: widthp2 - 36 + "px"
				}, 500)
			}
			if($(".msg-index1-list:eq(3) li:eq(1)")) {
				var progress1 = $(".msg-index1-list:eq(3) li:eq(1) .progress1");

				const depNum = ($(".index-num:eq(1)").html()) / ($(".sum").html()),
					widthP1 = progress1.width(),
					widthp2 = widthP1 * depNum;
				$(".msg-index1-list:eq(3) li:eq(1) .progress2").css({
					width: 0,
					height: "10px"
				})
				$(".msg-index1-list:eq(3) li:eq(1) .progress3").css({
					left: "-24px",
					height: "10px"
				})
				$(".msg-index1-list:eq(3) li:eq(1) .progress2").animate({
					width: widthp2 + "px",

				}, 500)
				$(".msg-index1-list:eq(3) li:eq(1) .progress3").animate({
					left: widthp2 - 36 + "px"
				}, 500)
			}
			if($(".msg-index1-list:eq(3) li:eq(2)")) {
				var progress1 = $(".msg-index1-list:eq(3) li:eq(2) .progress1");
				const depNum = ($(".index-num:eq(2)").html()) / ($(".sum").html()),
					widthP1 = progress1.width(),
					widthp2 = widthP1 * depNum;
				$(".msg-index1-list:eq(3) li:eq(2) .progress2").css({
					width: 0,
					height: "10px"
				})
				$(".msg-index1-list:eq(3) li:eq(2) .progress3").css({
					left: "-24px",
					height: "10px"
				})
				$(".msg-index1-list:eq(3) li:eq(2) .progress2").animate({
					width: widthp2 + "px",

				}, 500)
				$(".msg-index1-list:eq(3) li:eq(2) .progress3").animate({
					left: widthp2 - 36 + "px"
				}, 500)
			}
			if($(".msg-index1-list:eq(3) li:eq(3)")) {
				var progress1 = $(".msg-index1-list:eq(3) li:eq(3) .progress1");
				const depNum = ($(".index-num:eq(3)").html()) / ($(".sum").html()),
					widthP1 = progress1.width(),
					widthp2 = widthP1 * depNum;
				$(".msg-index1-list:eq(3) li:eq(3) .progress2").css({
					width: 0,
					height: "10px"
				})
				$(".msg-index1-list:eq(3) li:eq(3) .progress3").css({
					left: "-24px",
					height: "10px"
				})
				$(".msg-index1-list:eq(3) li:eq(3) .progress2").animate({
					width: widthp2 + "px",

				}, 500)
				$(".msg-index1-list:eq(3) li:eq(3) .progress3").animate({
					left: widthp2 - 36 + "px"
				}, 500)
			}
			if($(".msg-index1-list:eq(3) li:eq(4)")) {
				var progress1 = $(".msg-index1-list:eq(3) li:eq(4) .progress1");
				const depNum = ($(".index-num:eq(4)").html()) / ($(".sum").html()),
					widthP1 = progress1.width(),
					widthp2 = widthP1 * depNum;
				$(".msg-index1-list:eq(3) li:eq(4) .progress2").css({
					width: 0,
					height: "10px"
				})
				$(".msg-index1-list:eq(3) li:eq(4) .progress3").css({
					left: "-24px",
					height: "10px"
				})
				$(".msg-index1-list:eq(3) li:eq(4) .progress2").animate({
					width: widthp2 + "px",

				}, 500)
				$(".msg-index1-list:eq(3) li:eq(4) .progress3").animate({
					left: widthp2 - 36 + "px"
				}, 500)
			}

		},
		dataList1: function() {
			if($(".msg-index1-list:eq(0) li:eq(0)")) {
				var progress1 = $(".msg-index1-list:eq(0) li:eq(0) .progress1");
				const depNum = ($(".count1:eq(0)").html()) / ($(".sum").html()),
					widthP1 = progress1.width(),
					widthp2 = widthP1 * depNum;
				$(".msg-index1-list:eq(0) li:eq(0) .progress2").css({
					width: 0,
					height: "10px"
				})
				$(".msg-index1-list:eq(0) li:eq(0) .progress3").css({
					left: "-24px",
					height: "10px"
				})
				$(".msg-index1-list:eq(0) li:eq(0) .progress2").animate({
					width: widthp2 + "px",

				}, 500)
				$(".msg-index1-list:eq(0) li:eq(0) .progress3").animate({
					left: widthp2 - 36 + "px"
				}, 500)
			}
			if($(".msg-index1-list:eq(0) li:eq(1)")) {
				var progress1 = $(".msg-index1-list:eq(0) li:eq(1) .progress1");

				const depNum = ($(".count1:eq(1)").html()) / ($(".sum").html()),
					widthP1 = progress1.width(),
					widthp2 = widthP1 * depNum;
				$(".msg-index1-list:eq(0) li:eq(1) .progress2").css({
					width: 0,
					height: "10px"
				})
				$(".msg-index1-list:eq(0) li:eq(1) .progress3").css({
					left: "-24px",
					height: "10px"
				})
				$(".msg-index1-list:eq(0) li:eq(1) .progress2").animate({
					width: widthp2 + "px",

				}, 500)
				$(".msg-index1-list:eq(0) li:eq(1) .progress3").animate({
					left: widthp2 - 36 + "px"
				}, 500)
			}
			if($(".msg-index1-list:eq(0) li:eq(2)")) {
				var progress1 = $(".msg-index1-list:eq(0) li:eq(2) .progress1");
				const depNum = ($(".count1:eq(2)").html()) / ($(".sum").html()),
					widthP1 = progress1.width(),
					widthp2 = widthP1 * depNum;
				$(".msg-index1-list:eq(0) li:eq(2) .progress2").css({
					width: 0,
					height: "10px"
				})
				$(".msg-index1-list:eq(0) li:eq(2) .progress3").css({
					left: "-24px",
					height: "10px"
				})
				$(".msg-index1-list:eq(0) li:eq(2) .progress2").animate({
					width: widthp2 + "px",

				}, 500)
				$(".msg-index1-list:eq(0) li:eq(2) .progress3").animate({
					left: widthp2 - 36 + "px"
				}, 500)
			}
			if($(".msg-index1-list:eq(0) li:eq(3)")) {
				var progress1 = $(".msg-index1-list:eq(0) li:eq(3) .progress1");
				const depNum = ($(".count1:eq(0)").html()) / ($(".sum").html()),
					widthP1 = progress1.width(),
					widthp2 = widthP1 * depNum;
				$(".msg-index1-list:eq(0) li:eq(3) .progress2").css({
					width: 0,
					height: "10px"
				})
				$(".msg-index1-list:eq(0) li:eq(3) .progress3").css({
					left: "-24px",
					height: "10px"
				})
				$(".msg-index1-list:eq(0) li:eq(3) .progress2").animate({
					width: widthp2 + "px",

				}, 500)
				$(".msg-index1-list:eq(0) li:eq(3) .progress3").animate({
					left: widthp2 - 36 + "px"
				}, 500)
			}
			if($(".msg-index1-list:eq(0) li:eq(4)")) {
				var progress1 = $(".msg-index1-list:eq(0) li:eq(4) .progress1");
				const depNum = ($(".count1:eq(4)").html()) / ($(".sum").html()),
					widthP1 = progress1.width(),
					widthp2 = widthP1 * depNum;
				$(".msg-index1-list:eq(0) li:eq(4) .progress2").css({
					width: 0,
					height: "10px"
				})
				$(".msg-index1-list:eq(0) li:eq(4) .progress3").css({
					left: "-24px",
					height: "10px"
				})
				$(".msg-index1-list:eq(0) li:eq(4) .progress2").animate({
					width: widthp2 + "px",

				}, 500)
				$(".msg-index1-list:eq(0) li:eq(4) .progress3").animate({
					left: widthp2 - 36 + "px"
				}, 500)
			}

		},
		dataList2: function() {
			if($(".msg-index1-list:eq(1) li:eq(0)")) {
				var progress1 = $(".msg-index1-list:eq(0) li:eq(0) .progress1");
				const depNum = ($(".count2:eq(1)").html()) / ($(".sum").html()),
					widthP1 = progress1.width(),
					widthp2 = widthP1 * depNum;
				$(".msg-index1-list:eq(1) li:eq(0) .progress2").css({
					width: 0,
					height: "10px"
				})
				$(".msg-index1-list:eq(1) li:eq(0) .progress3").css({
					left: "-24px",
					height: "10px"
				})
				$(".msg-index1-list:eq(1) li:eq(0) .progress2").animate({
					width: widthp2 + "px",

				}, 500)
				$(".msg-index1-list:eq(1) li:eq(0) .progress3").animate({
					left: widthp2 - 36 + "px"
				}, 500)
			}
			if($(".msg-index1-list:eq(1) li:eq(1)")) {
				var progress1 = $(".msg-index1-list:eq(0) li:eq(1) .progress1");

				const depNum = ($(".count2:eq(1)").html()) / ($(".sum").html()),
					widthP1 = progress1.width(),
					widthp2 = widthP1 * depNum;
				$(".msg-index1-list:eq(1) li:eq(1) .progress2").css({
					width: 0,
					height: "10px"
				})
				$(".msg-index1-list:eq(1) li:eq(1) .progress3").css({
					left: "-24px",
					height: "10px"
				})
				$(".msg-index1-list:eq(1) li:eq(1) .progress2").animate({
					width: widthp2 + "px",

				}, 500)
				$(".msg-index1-list:eq(1) li:eq(1) .progress3").animate({
					left: widthp2 - 36 + "px"
				}, 500)
			}
			if($(".msg-index1-list:eq(1) li:eq(2)")) {
				var progress1 = $(".msg-index1-list:eq(0) li:eq(2) .progress1");
				const depNum = ($(".count2:eq(2)").html()) / ($(".sum").html()),
					widthP1 = progress1.width(),
					widthp2 = widthP1 * depNum;
				$(".msg-index1-list:eq(1) li:eq(2) .progress2").css({
					width: 0,
					height: "10px"
				})
				$(".msg-index1-list:eq(1) li:eq(2) .progress3").css({
					left: "-24px",
					height: "10px"
				})
				$(".msg-index1-list:eq(1) li:eq(2) .progress2").animate({
					width: widthp2 + "px",

				}, 500)
				$(".msg-index1-list:eq(1) li:eq(2) .progress3").animate({
					left: widthp2 - 36 + "px"
				}, 500)
			}
			if($(".msg-index1-list:eq(1) li:eq(3)")) {
				var progress1 = $(".msg-index1-list:eq(0) li:eq(3) .progress1");
				const depNum = ($(".count2:eq(1)").html()) / ($(".sum").html()),
					widthP1 = progress1.width(),
					widthp2 = widthP1 * depNum;
				$(".msg-index1-list:eq(1) li:eq(3) .progress2").css({
					width: 0,
					height: "10px"
				})
				$(".msg-index1-list:eq(1) li:eq(3) .progress3").css({
					left: "-24px",
					height: "10px"
				})
				$(".msg-index1-list:eq(1) li:eq(3) .progress2").animate({
					width: widthp2 + "px",

				}, 500)
				$(".msg-index1-list:eq(1) li:eq(3) .progress3").animate({
					left: widthp2 - 36 + "px"
				}, 500)
			}
			if($(".msg-index1-list:eq(1) li:eq(4)")) {
				var progress1 = $(".msg-index1-list:eq(0) li:eq(4) .progress1");
				const depNum = ($(".count2:eq(4)").html()) / ($(".sum").html()),
					widthP1 = progress1.width(),
					widthp2 = widthP1 * depNum;
				$(".msg-index1-list:eq(1) li:eq(4) .progress2").css({
					width: 0,
					height: "10px"
				})
				$(".msg-index1-list:eq(1) li:eq(4) .progress3").css({
					left: "-24px",
					height: "10px"
				})
				$(".msg-index1-list:eq(1) li:eq(4) .progress2").animate({
					width: widthp2 + "px",

				}, 500)
				$(".msg-index1-list:eq(1) li:eq(4) .progress3").animate({
					left: widthp2 - 36 + "px"
				}, 500)
			}

		},
		dataList3: function() {
			if($(".msg-index1-list:eq(2) li:eq(0)")) {
				var progress1 = $(".msg-index1-list:eq(0) li:eq(0) .progress1");
				const depNum = ($(".count3:eq(2)").html()) / ($(".sum").html()),
					widthP1 = progress1.width(),
					widthp2 = widthP1 * depNum;
				$(".msg-index1-list:eq(2) li:eq(0) .progress2").css({
					width: 0,
					height: "10px"
				})
				$(".msg-index1-list:eq(2) li:eq(0) .progress3").css({
					left: "-24px",
					height: "10px"
				})
				$(".msg-index1-list:eq(2) li:eq(0) .progress2").animate({
					width: widthp2 + "px",

				}, 500)
				$(".msg-index1-list:eq(2) li:eq(0) .progress3").animate({
					left: widthp2 - 36 + "px"
				}, 500)
			}
			if($(".msg-index1-list:eq(2) li:eq(1)")) {
				var progress1 = $(".msg-index1-list:eq(0) li:eq(1) .progress1");

				const depNum = ($(".count3:eq(2)").html()) / ($(".sum").html()),
					widthP1 = progress1.width(),
					widthp2 = widthP1 * depNum;
				$(".msg-index1-list:eq(2) li:eq(1) .progress2").css({
					width: 0,
					height: "10px"
				})
				$(".msg-index1-list:eq(2) li:eq(1) .progress3").css({
					left: "-24px",
					height: "10px"
				})
				$(".msg-index1-list:eq(2) li:eq(1) .progress2").animate({
					width: widthp2 + "px",

				}, 500)
				$(".msg-index1-list:eq(2) li:eq(1) .progress3").animate({
					left: widthp2 - 36 + "px"
				}, 500)
			}
			if($(".msg-index1-list:eq(2) li:eq(2)")) {
				var progress1 = $(".msg-index1-list:eq(0) li:eq(2) .progress1");
				const depNum = ($(".count3:eq(2)").html()) / ($(".sum").html()),
					widthP1 = progress1.width(),
					widthp2 = widthP1 * depNum;
				$(".msg-index1-list:eq(2) li:eq(2) .progress2").css({
					width: 0,
					height: "10px"
				})
				$(".msg-index1-list:eq(2) li:eq(2) .progress3").css({
					left: "-4px",
					height: "10px"
				})
				$(".msg-index1-list:eq(2) li:eq(2) .progress2").animate({
					width: widthp2 + "px",

				}, 500)
				$(".msg-index1-list:eq(2) li:eq(2) .progress3").animate({
					left: widthp2 - 36 + "px"
				}, 500)
			}
			if($(".msg-index1-list:eq(2) li:eq(3)")) {
				var progress1 = $(".msg-index1-list:eq(0) li:eq(3) .progress1");
				const depNum = ($(".count3:eq(2)").html()) / ($(".sum").html()),
					widthP1 = progress1.width(),
					widthp2 = widthP1 * depNum;
				$(".msg-index1-list:eq(2) li:eq(3) .progress2").css({
					width: 0,
					height: "10px"
				})
				$(".msg-index1-list:eq(2) li:eq(3) .progress3").css({
					left: "-24px",
					height: "10px"
				})
				$(".msg-index1-list:eq(2) li:eq(3) .progress2").animate({
					width: widthp2 + "px",

				}, 500)
				$(".msg-index1-list:eq(2) li:eq(3) .progress3").animate({
					left: widthp2 - 36 + "px"
				}, 500)
			}
			if($(".msg-index1-list:eq(2) li:eq(4)")) {
				var progress1 = $(".msg-index1-list:eq(0) li:eq(4) .progress1");
				const depNum = ($(".count3:eq(4)").html()) / ($(".sum").html()),
					widthP1 = progress1.width(),
					widthp2 = widthP1 * depNum;
				$(".msg-index1-list:eq(2) li:eq(4) .progress2").css({
					width: 0,
					height: "10px"
				})
				$(".msg-index1-list:eq(2) li:eq(4) .progress3").css({
					left: "-24px",
					height: "10px"
				})
				$(".msg-index1-list:eq(2) li:eq(4) .progress2").animate({
					width: widthp2 + "px",

				}, 500)
				$(".msg-index1-list:eq(2) li:eq(4) .progress3").animate({
					left: widthp2 - 36 + "px"
				}, 500)
			}

		}
	}
})