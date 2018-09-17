/**
 * Created by Administrator on 2017/6/6.
 */
(function() {

})(jQuery)
new Vue({
	el: "#issueVue",
	data: {
		getUserById: window.dataUrl + "/personal/getUserById",
		nickText: "",
		getBuyList: window.dataUrl + "/personal/getBuyList",
		updateDealBuyer: window.dataUrl + "/personal/updateBuy",
		isssueArr: [],
		currentPage: 1,
		total: "",
		isDel: null,
		del:null,
		buyId: null,
		nameHtml: null,
		cx:true,
		timeVal:null
	},
	updated: function() {
		
		$(".smark").on("mouseover", function() {
			$(event.target).next().fadeIn(500)
		}).on("mouseout", function() {
			$(event.target).next().fadeOut(500)
		})
		var _this = this;
		$(".quxiao").off().on("click", function() {
			var _dealid = parseInt($(event.target).parent().parent().attr("buyid"));
			var index = $(event.target).parent().parent().index();
			var select = $(".clickTop").html();
			if(select = "最近一个月") {
				select = 30
			} else if(select = "最近三个月") {
				select = 90
			} else if(select = "最近半年") {
				select = 180
			} else if(select = "最近一年") {
				select = 365
			}
			ajax({ //上一页
				url: _this.updateDealBuyer,
				type: "post",
				data: JSON.stringify({
					"buyId": _dealid,
					/* "isDel": _this.isDel,
					 "days":select,
					 "name":_this.nameHtml*/
				}),
				headers: {
					"Content-Type": "application/json;charset=UTF-8"
				},
				success: function(data) {
					if(data.code == 200) {
						_this.isssueArr.splice(index, 1)
					} else {}

				}
			})
		})
	},
	mounted: function() {
		this.jumpFn();
		this.timeFn();
		this.hoverFn();
		this.listsFN();
		$('.tabcolor').click()
//		$(".time-none span")[3].click()
		var _this = this;
		//排序降序
		var onn = true;
		$(".weight").on("click", function() {
			if(onn) {
				$(".bg1").css({
					"background-position": "0px 10px"
				})
				ajax({ //规格的数据接口
					url: _this.getBuyList,
					type: "post",
					data: JSON.stringify({
						"pageSize": 10,
						"currentPage": 1,
						"isDel": 0,
						"weight": 1

					}),
					headers: {
						"Content-Type": "application/json;charset=UTF-8"
					},
					success: function(data) {
						if(data.code == 100) {
							_this.supplyList = data.obj;
						}
					}
				})
				onn = !onn;
			} else {
				$(".bg1").css({
					"background-position": "0px 0px"
				})
				ajax({ //升降排序的接口
					url: _this.getBuyList,
					type: "post",
					data: JSON.stringify({
						"pageSize": 10,
						"currentPage": 1,
						"isDel": 0,
						"weight": 2

					}),
					headers: {
						"Content-Type": "application/json;charset=UTF-8"
					},
					success: function(data) {
						if(data.code == 100) {
							_this.supplyList = data.obj;
						}
					}
				})
				onn = !onn;
			}
		})
		ajax({ //获取用户名称
			url: _this.getUserById,
			type: "post",
			headers: {
				"Content-Type": "application/json;charset=UTF-8"
			},
			success: function(data) {
				if(data.code == 200) {
					_this.nickText = data.obj.nick;
					$(".login").html("欢迎您\n" + data.obj.nick)
					         if(data.obj.img){
                            	$("#img").attr("src", data.obj.img)
                            }
				}
			}
		});
		_this.upList()
		_this.fabuFn()

	},
	methods: {
		fabuFn: function() {
			$(".fabu").on("click", function() {
				window.location.href = "../issue/issue.html"
			})
		},
		comFn: function(obj) {
			$.each(obj, function(k, v) {
				for(let item in v) {
					if(v[item] == null || "") {
						v[item] = "--"
					}

				}
				switch(v.isDel) {
					case 0:
						v.isDel = "求购中";
						break;
					case 1:
						v.isDel = "已撤销"
						break;
					case 2:
						v.isDel = "待审核"
						break;

				}
			})
		},
		jumpFn: function() {
			var clicktip = $(".clicktip"),
				clicktipDis1 = $(".clicktip-dis1"),
				clicktipList = $(".clicktip-dis1 li"),
				clicktipImg = $(".clicktip img");
			var on = true;
			clicktip.on("click", function() {
				clicktipDis1.slideToggle()

				tipXS(clicktipImg)
			})

			function tipXS(clicktipImg) {
				if(on) {
					clicktipImg.attr("src", "../../img/xia1.png");
					on = false;
				} else {
					clicktipImg.attr("src", "../../img/shang1.png");
					on = true;
				}
			}
			clicktipList.on("click", function() {
				$(".clicktip span").html($(event.target).html())

			})
			var clicktip1 = $(".clicktip1"),
				clicktipDis2 = $(".clicktip-dis2"),
				clicktip1List = $(".clicktip-dis2 li"),
				clicktip1Img = $(".clicktip1 img");
			clicktip1.on("click", function() {
				clicktipDis2.slideToggle()

				tipXS(clicktip1Img)
			})
			clicktip1List.on("click", function() {
				$(".clicktip1 span").html($(event.target).html())

			})
			var clicktip2 = $(".clicktip2"),
				clicktipDis3 = $(".clicktip-dis3"),
				clicktip2List = $(".clicktip-dis3 li"),
				clicktip2Img = $(".clicktip2 img");
			clicktip2.on("click", function() {
				clicktipDis3.slideToggle()

				tipXS(clicktip2Img)
			})
			clicktip2List.on("click", function() {
				$(".clicktip2 span").html($(event.target).html())

			})
			/*历史供应的跳转*/
			var hisSkip = $(".his-skip");
			skip(hisSkip, "../history-supply/history-supply.html")

			function skip(isColor, url) {
				isColor.on("click", function() {
					window.location.href = url
				})
			}
			/*跳转*/
			$(".header-pic").click(function() {
				window.location.href = "../index.html"
			})
			$(".login").click(function() {
				if($(this).html() == "请登录") {
					window.location.href = "../login/login.html"
				}

			})
			/*register*/
			$(".register").click(function() {
				window.location.href = "../register/register.html"
			})
			/*my-center*/
			$(".my-center").click(function() {
				window.location.href = "../my-center/my-center.html"
			})
			$(".shop").click(function() {
				window.location.href = "../shop/shop.html"
			})
			$(".edit_pass").click(function () {
                window.location.href="../edit-passwords/edit-passwords.html"
            })
			$(".supply").click(function() {
				window.location.href = "../my-supply/my-supply.html"
			})
			/*my-order*/
			$(".my-order").click(function() {
				window.location.href = "../my-order/my-order.html"
			})
			$(".history-issue").click(function() {
				window.location.href = "../history-issue/history-issue.html"
			})
			$(".history-supply").click(function() {
				window.location.href = "../history-supply/history-supply.html"
			})
		},
		timeFn: function() {
			$(".clickTop").on("click", function() {
				$(".time-none").slideToggle(500)
			})
			$(".time-none span").on("click", function() {
				$(".clickTop").html($(event.target).html())
				$(".time-none").slideUp(500)
				
				
			})
		},
		listsFN: function() {
			var _this = this;
			$(".list").on("click", function(event) {
				var html = $(event.target).html();
				_this.listFn(html)
			})
		},
		listFn: function(html) {
			var _this = this;
			if(html == "全部订单") {
				_this.isDel = null;
			}
			if(html == "求购中") {
				_this.isDel = 0;
			}
			if(html == "已撤销") {
				_this.isDel = 1;
			}
			if(html == "待审核") {
				_this.isDel = 2;
			}

			var select = $(".clickTop").html();

			if(select == "最近一个月") {
				select = 30
			} else if(select == "最近三个月") {
				select = 90
			} else if(select == "最近半年") {
				select = 180
			} else if(select == "最近一年") {
				select = 365
			}
			ajax({ //list数据
				url: _this.getBuyList,
				type: "post",
				data: JSON.stringify({
					"isDel": _this.isDel,
					"days": select,

				}),
				headers: {
					"Content-Type": "application/json;charset=UTF-8"
				},
				success: function(data) {
					if(data.code == 100) {
						_this.comFn(data.obj)
						_this.total = data.total
						_this.isssueArr = data.obj;
						_this.currentPage = 1;
					}
				}
			})

		},
		searchFn: function() {
			var _this = this;
			_this.nameHtml = $(".his-search").val();
			var select = $(".clickTop").html();
			if(_this.nameHtml != "") {
				if(select == "最近一个月") {
					select = 30
				} else if(select == "最近三个月") {
					select = 90
				} else if(select == "最近半年") {
					select = 180
				} else if(select == "最近一年") {
					select = 365
				}
				ajax({ //搜索数据
					url: _this.getBuyList,
					type: "post",
					data: JSON.stringify({
						"isDel": _this.isDel,
						"days": select,
						"currentPage": 1,
						"pageSize": 10,
						"name": _this.nameHtml
					}),
					headers: {
						"Content-Type": "application/json;charset=UTF-8"
					},
					success: function(data) {
						if(data.code == 100) {
							$.each(data.obj, function(k, v) {
								for(item in v) {
									if(v[item] == null || "") {
										v[item] = "--"
									}

								}
								switch(v.isDel) {
									case 0:
										v.isDel = "求购中";
										break;
									case 1:
										v.isDel = "已撤销"
										break;
									case 2:
										v.isDel = "待审核"
										break;

								}
							})
							_this.isssueArr = data.obj;
							_this.currentPage = 1;
							_this.total = data.total
						}

					}
				})

			}

		},
		changePage(){
			this.currentPage = this.$refs.page.currentPage
			this.upList()
		},
		upDel(num){
			this.isDel = num
				if(this.isDel == 1){
					this.cx = false
				}else{
					this.cx = true
				}
		},
    	selectTime(){
    		const timeVal = parseInt( document.getElementById('selectTime').value);
    		
    		this.timeVal = isNaN(timeVal)?null:timeVal
    		this.upList()
        },
		upList(type,page){
			
			const _this = this
			const awei = {
					"currentPage":this.currentPage,
					"pageSize":10,
					"isDel": this.isDel,
					"days":this.timeVal
				}
			ajax({ //init数据的渲染
				url: _this.getBuyList,
				type: "post",
				data: JSON.stringify({
					"currentPage":this.currentPage,
					"pageSize":10,
					"isDel": this.isDel,
					"days":this.timeVal
				}),
				headers: {
					"Content-Type": "application/json;charset=UTF-8"
				},
				success: function(data) {
					if(data.code == 100) {
						$.each(data.obj, function(k, v) {
							for(var item in v) {
								if(v[item] == null || "") {
									v[item] = "--"
								}
	
							}
							switch(v.isDel) {
								case 0:
									v.isDel = "求购中";
									break;
								case 1:
									v.isDel = "已撤销"
									break;
								case 2:
									v.isDel = "待审核"
									break;
	
							}
						})
						
						_this.isssueArr = data.obj;
						_this.dealId = data.obj.dealId;
						_this.total = data.total;
						
					}
	
				}
			})
		},
		hoverFn: function() {
			$(".list").on("mouseover", function() {
				$(this).css({
					"border-bottom": "2px solid #02548e",
				}).siblings().css({
					"border-bottom": 0,
				})
			})
		}

	},

})