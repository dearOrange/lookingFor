/**
 * Created by Administrator on 2017/6/6.
 */
(function () {

})(jQuery)
new Vue({
    el:"#issueVue",
    data:{
        getUserById:window.dataUrl+"/personal/getUserById",
        nickText:"",
        getBuyDealedList:window.dataUrl+"/personal/getBuyDealedList",
        editDeal:window.dataUrl+"/business/deal/editDeal",
        isssueArr:[],
        dealId:"",
        currentPage:1,
        total:"",
        timeVal:null,
        nowType:null,
    },
    updated: function () {
        var arr=[1,2,3,4]
         arr.splice(2,1);
        var _this=this;

        $(".quxiao").on("click", function () {
            var _dealid=$(event.target).parent().parent().attr("dealid");
            var index=$(event.target).parent().parent().index();
            ajax({        //取消
                url: _this.editDeal,
                type: "post",
                data: JSON.stringify({
                    "dealId": _dealid,
                    "isDel": 0
                }),
                headers: {
                    "Content-Type": "application/json;charset=UTF-8"
                },
                success: function (data) {
                    if(data.code==200){
                        _this.isssueArr.splice(index,1);
                    }else{

                    }

                }
            })

        })
    },
    mounted: function () {
        this.jumpFn();
        this.timeFn();
        this.hoverFn();
        var _this=this;
        //排序降序
        var onn=true;
        $(".weight").on("click", function () {
            var select=$(".clickTop").html();

            if (select = "最近一个月") {
                select = 30
            } else if (select = "最近三个月") {
                select = 90
            } else if (select = "最近半年") {
                select = 180
            } else if (select = "最近一年") {
                select = 365
            }

            if(onn){
                $(".bg1").css({
                    "background-position":"0px 10px"
                })
                ajax({        //规格的数据接口
                    url: _this.getBuyDealedList,
                    type: "post",
                    data: JSON.stringify({
                        "dealId":_this.dealId,
                        "isDel":_this.isDel,
                        "days":select,
                        "type": 1,
                        "currentPage": 1,
                        "pageSize": 10,
                        "weight":1

                    }),
                    headers: {
                        "Content-Type": "application/json;charset=UTF-8"
                    },
                    success: function (data) {
                        if(data.code==200){
                            _this.isssueArr=data.obj;
                        }
                    }
                })
                onn=!onn;
            }else{
                $(".bg1").css({
                    "background-position":"0px 0px"
                })
                ajax({        //升降排序的接口
                    url: _this.getBuyDealedList,
                    type: "post",
                    data: JSON.stringify({
                        "dealId":_this.dealId,
                        "isDel":_this.isDel,
                        "days":select,
                        "type": 1,
                        "currentPage": 1,
                        "pageSize": 10,
                        "weight":2

                    }),
                    headers: {
                        "Content-Type": "application/json;charset=UTF-8"
                    },
                    success: function (data) {
                        if(data.code==200){
                            _this.isssueArr=data.obj;
                        }
                    }
                })
                onn=!onn;
            }
        })
        ajax({    //获取用户名称
            url: this.getUserById,
            type: "post",
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            success: function (data) {
                if(data.code==200){
                    _this.nickText=data.obj.nick;
                    $(".login").html("欢迎您\n"+data.obj.nick)
							if(data.obj.img){
                            	$("#img").attr("src", data.obj.img)
                            }
                }
            }
        });
        _this.initList()
        _this.fabuFn();
    },
    methods:{
    	selectTime(){
    		const timeVal = parseInt( document.getElementById('selectTime').value);
    		
    		this.timeVal = isNaN(timeVal)?null:timeVal
    		this.initList()
        },
       changePage(){
        	this.initList(this.nowType,this.$refs.page.currentPage)
        },
    	initList(type,page){
    		const _this = this
    		
    		let isDel = type || _this.nowType
    		if(type=='00'){
    			isDel = null
    		}
    		//存type
    		_this.nowType = isDel
    		const currentPage = page || 1
    		
    		
    		ajax({    //init数据的渲染
            url: _this.getBuyDealedList,
            type: "post",
            data: JSON.stringify({
            	"type":1,
            	"isDel":isDel,
            	"days":_this.timeVal,
            	"currentPage":currentPage,
            	"pageSize":10
            }),
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            success: function (data) {
                if(data.code==200){
                    $.each(data.obj, function (k,v) {
                        for(let item in v){
                            if(v[item]==null||""){
                                v[item]="--"
                            }
                        }
                        switch(v.isDel)
                        {
                            case 1:
                                v.isDel="待审核";
                                break;
                            case 2:
                                v.isDel="发布中"
                                break;
                            case 3:
                                v.isDel="签订合同"
                                break;
                            case 4:
                                v.isDel="预付定金"
                                break;
                            case 5:
                                v.isDel="配货装车"
                                break;
                            case 6:
                                v.isDel="司机上路"
                                break;
                            case 7:
                                v.isDel="货已到厂"
                                break;
                            case 8:
                                v.isDel="结算开票"
                                break;
                        }
                    })
                    _this.isssueArr=data.obj;
                    $.each(_this.isssueArr,function (k,v) {
                       for(var i in v){
                           if(v[i]==""){
                               v[i]="--"
                           }
                       }
                    })
                    _this.dealId=data.obj.dealId;
                    _this.total=data.total;

                }

            }
        })
    	},
        fabuFn: function () {
            $(".fabu").on("click", function () {
                window.location.href="../issue-supply/issue-supply.html"
            })
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
            /*历史供应的跳转*/
            var hisSkip=$(".his-skip");
            skip(hisSkip,"../history-supply/history-supply.html")
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
                if($(this).html()=="请登录"){
                    window.location.href="../login/login.html"
                }else{

                }

            })
            /*register*/
            $(".register").click(function () {
                window.location.href="../register/register.html"
            })
            /*my-center*/
            $(".my-center").click(function () {
                window.location.href="../my-center/my-center.html"
            })
            $(".shop").click(function () {
                window.location.href="../shop/shop.html"
            })
            $(".edit_pass").click(function () {
                window.location.href="../edit-passwords/edit-passwords.html"
            })
            /*my-order*/
            $(".my-order").click(function () {
                window.location.href="../my-order/my-order.html"
            })
            $(".is-color").click(function () {
                window.location.href="../my-issue/my-issue.html"
            })
            $(".history-issue").click(function () {
                window.location.href="../history-issue/history-issue.html"
            })
            $(".history-supply").click(function () {
                window.location.href="../history-supply/history-supply.html"
            })
        },
        timeFn: function () {
            $(".clickTop").on("click", function () {
                $(".time-none").slideToggle(500)
            })
            $(".time-none span").on("click", function () {
                $(".clickTop").html($(event.target).html())
                $(".time-none").slideUp(500)
            })
        },
        hoverFn: function () {
            $(".list").on("click", function () {
                $(this).css({
                    "border-bottom":"2px solid #02548e",
                }).siblings().css({
                    "border-bottom":0,
                })
            })
        }


    },



})