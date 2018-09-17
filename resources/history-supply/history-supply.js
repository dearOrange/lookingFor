/**
 * Created by Administrator on 2017/6/6.
 */
new Vue({
    el:"#hisIssue",
    data:{
        getHistoryDealedList:window.dataUrl+"/personal/getHistoryDealedList",
        getUserById:window.dataUrl+"/personal/getUserById",
        editDeal:window.dataUrl+"/business/deal/editDeal",
        hisIs:[],
        total:1,
        timeVal:null,
        vPage:1
    },
    mounted: function () {
        this.jumpFn();
        var _this=this;
        //排序降序
        var onn=true;
        

        $(".weight").on("click", function () {
            if(onn){
                $(".bg1").css({
                    "background-position":"0px 10px"
                })
                ajax({        //数据接口
                    url: _this.getHistoryDealedList,
                    type: "post",
                    data: JSON.stringify({
                        "pageSize": 10,
                        "currentPage": 1,
                        "type":1,
                        "weight":1

                    }),
                    headers: {
                        "Content-Type": "application/json;charset=UTF-8"
                    },
                    success: function (data) {
                        if(data.code==200){
                            _this.supplyList=data.obj;
                        }
                    }
                })
                onn=!onn;
            }else{
                $(".bg1").css({
                    "background-position":"0px 0px"
                })
                ajax({        //升降排序的接口
                    url: _this.getHistoryDealedList,
                    type: "post",
                    data: JSON.stringify({
                        "pageSize": 10,
                        "currentPage": 1,
                        "type":1,
                        "weight":2

                    }),
                    headers: {
                        "Content-Type": "application/json;charset=UTF-8"
                    },
                    success: function (data) {
                        if(data.code==200){
                            _this.supplyList=data.obj;
                        }
                    }
                })
                onn=!onn;
            }
        })
        //价格升降排序
        var off=true;
        $(".price").on("click", function () {
            if(off){
                $(".bg2").css({
                    "background-position":"0px 10px"
                })
                ajax({        //升降排序的接口
                    url: _this.getHistoryDealedList,
                    type: "post",
                    data: JSON.stringify({
                        "pageSize": 10,
                        "currentPage": 1,
                        "type":1,
                        "price":2

                    }),
                    headers: {
                        "Content-Type": "application/json;charset=UTF-8"
                    },
                    success: function (data) {
                        if(data.code==200){
                            _this.supplyList=data.obj;
                        }
                    }
                })
                off=!off;
            }else{
                $(".bg2").css({
                    "background-position":"0px 0px"
                })
                ajax({        //数据接口
                    url: _this.getHistoryDealedList,
                    type: "post",
                    data: JSON.stringify({
                        "pageSize": 10,
                        "currentPage": 1,
                        "type":1,
                        "price":1

                    }),
                    headers: {
                        "Content-Type": "application/json;charset=UTF-8"
                    },
                    success: function (data) {
                        if(data.code==200){
                            _this.supplyList=data.obj;
                        }
                    }
                })
                off=!off;
            }
        })
        var liddays=$(".time-slidown").html()
        if(liddays=="最近一个月"){
            liddays=30
        }else if(liddays=="最近三个月"){
            liddays=90
        }else if(liddays=="最近半年"){
            liddays=180
        }else if(liddays=="最近一年"){
            liddays=365
        }
        ajax({    //个人信息
            url: _this.getUserById,
            type: "post",
            headers: {
                "Content-Type":"application/json;charset=UTF-8"
            },
            success: function (data) {
                if(data.code==200){
                    $(".name").html(data.obj.nick)
                    $(".login").html(data.obj.nick)
					
							if(data.obj.img){
                            	$("#img").attr("src", data.obj.img)
                            }
                }


            }
        })
        _this.upList()
    },
    methods:{
    	changePage() {
        	
        	this.vPage = this.$refs.page.currentPage
            this.upList()
            
        },
    	upList(){
    		const _this = this
    		        ajax({
			            url: _this.getHistoryDealedList,
			            type: "post",
			            data: JSON.stringify({
			                "currentPage":_this.vPage,
			                "pageSize":10,
			                "days":this.timeVal
			            }),
			            headers: {
			                "Content-Type":"application/json;charset=UTF-8"
			            },
			            success: function (data) {
			                if(data.code == 200){
			                    _this.hisIs=data.obj;
			                        _this.total=data.total;
			
			                }
			
			
			            }
			        })
    	},
    	selectTime(){
    		const timeVal = parseInt( document.getElementById('selectTime').value);
    		
    		this.timeVal = isNaN(timeVal)?null:timeVal
    		this.upList()
        },
        jumpFn: function () {
            var clicktip=$(".clicktip"),
                clicktipDis1=$(".clicktip-dis1"),
                clicktipList=$(".clicktip-dis1 li"),
                clicktipImg=$(".clicktip img");
            var on=true;
            clicktip.on("click", function () {
                clicktipDis1.slideToggle()

                tipXS (clicktipImg )
            })
            function tipXS (clicktipImg ) {
                if(on){
                    clicktipImg.attr("src","../../img/xia1.png");
                    on=false;
                }else{
                    clicktipImg.attr("src","../../img/shang1.png");
                    on=true;
                }
            }
            clicktipList.on("click", function () {
                $(".clicktip span").html($(event.target).html())

            })
            var clicktip1=$(".clicktip1"),
                clicktipDis2=$(".clicktip-dis2"),
                clicktip1List=$(".clicktip-dis2 li"),
                clicktip1Img=$(".clicktip1 img");
            clicktip1.on("click", function () {
                clicktipDis2.slideToggle()

                tipXS (clicktip1Img )
            })
            clicktip1List.on("click", function () {
                $(".clicktip1 span").html($(event.target).html())

            })
            var clicktip2=$(".clicktip2"),
                clicktipDis3=$(".clicktip-dis3"),
                clicktip2List=$(".clicktip-dis3 li"),
                clicktip2Img=$(".clicktip2 img");
            clicktip2.on("click", function () {
                clicktipDis3.slideToggle()

                tipXS (clicktip2Img )
            })
            clicktip2List.on("click", function () {
                $(".clicktip2 span").html($(event.target).html())

            })
            /*我的求购的跳转*/
            var mySkip=$(".my-skip");
            skip(mySkip,"../my-issue/my-issue.html")
            /*我的订单的跳转*/
            var reset=$(".reset")
            skip(reset,"../my-order/my-order.html")
            function skip(isColor,url){
                isColor.on("click", function () {
                    window.location.href=url
                })
            }
            /*跳转*/
            $(".header-pic").click(function () {
                window.location.href="../index.html"
            })
            $(".login").click(function () {
                window.location.href="../login/login.html"
            })
            $(".shop").click(function () {
                window.location.href="../shop/shop.html"
            })
         	$(".edit_pass").click(function () {
                window.location.href="../edit-passwords/edit-passwords.html"
            })
            /*register*/
            $(".register").click(function () {
                window.location.href="../register/register.html"
            })
            $(".history-issue").click(function () {
                window.location.href="../history-issue/history-issue.html"
            })
            /*my-center*/
            $(".my-center").click(function () {
                window.location.href="../my-center/my-center.html"
            })
            /*my-order*/
            $(".my-order").click(function () {
                window.location.href="../my-order/my-order.html"
            })
            $(".history-supply").click(function () {
                window.location.href="../history-supply/history-supply.html"
            })

            $(".supply").click(function () {
                window.location.href="../my-supply/my-supply.html"
            })
            $(".issue").click(function () {
                window.location.href="../my-issue/my-issue.html"
            })
        },
        listFn:function(html){
            var isDel=0;

            if(html=="全部订单"){
                isDel=0
            }
            if(html=="签订合同"){
                isDel=3;
            }
            if(html=="预付定金"){
                isDel=4;
            }
            if(html=="配货装车"){
                isDel=5;
            }
            if(html=="货已到厂"){
                isDel=6;
            }
            if(html=="司机上路"){
                isDel=7;
            }
            if(html=="结算开票"){
                isDel=8;
            }
            var select=$(".clickTop").html();

            if(select="最近一个月"){
                select=30
            }else if(select="最近三个月"){
                select=90
            }else if(select="最近半年"){
                select=180
            }else if(select="最近一年"){
                select=365
            }
            var _this=this;

            ajax({    //list数据
                url: window.dataUrl+"/personal/getHistoryDealedList",
                type: "post",
                data: JSON.stringify({
                    "isDel":isDel,
                    "days":select

                }),
                headers: {
                    "Content-Type": "application/json;charset=UTF-8"
                },
                success: function (data) {
                    _this.isssueArr=data.obj;
                }
            })


        },
        hisSearchFn: function () {
            var searchHtml=$(".his-search").val();

        },
        btnFn: function () {
            var html=Number($(".his-search").val());
            if(html!==""){
                var eventHtml=$(".time-slidown").html();
                if(eventHtml=="最近一个月"){
                    eventHtml=30
                }else if(eventHtml=="最近三个月"){
                    eventHtml=90
                }else if(eventHtml=="最近半年"){
                    eventHtml=180
                }else if(eventHtml=="最近一年"){
                    eventHtml=365
                }
                var Num1=Number($(".num").html());
                var _this=this;

                ajax({
                    url: _this.getHistoryDealedList,
                    type: "post",
                    data: JSON.stringify({
                        "type":1,
                        "isDel":9,
                        "days":eventHtml,
                        "currentPage":1,
                        "pageSize":10,
                        "dealId":html
                    }),
                    headers: {
                        "Content-Type":"application/json;charset=UTF-8"
                    },
                    success: function (data) {
                        if(data.obj==null||""||[]){

                        }else{
                            _this.hisIs=data.obj;
                            $(".num").html(bluekHtml)
                        }

                    }
                })

            }
        }
    }
})
