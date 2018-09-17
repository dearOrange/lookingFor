/**
 * Created by Administrator on 2017/6/6.
 */
new Vue({
    el:"#hisIssue",
    data:{
        getBuyList:window.dataUrl+"/personal/getBuyList",
        getUserById:window.dataUrl+"/personal/getUserById",
        hisIs:[],
        total:1,
        nameHtml:null,
    },
    mounted: function () {
        this.jumpFn();
        this.downFn();
        this.downFn1();
        this.homeFn();
        var _this=this;
//排序降序
        var onn=true;
        $(".weight").on("click", function () {
            if(onn){
                $(".bg1").css({
                    "background-position":"0px 10px"
                })
                ajax({        //规格的数据接口
                    url: _this.getBuyList,
                    type: "post",
                    data: JSON.stringify({
                        "pageSize": 10,
                        "currentPage": 1,
                        "specId":_this.specId,
                        "cityId": _this.cityId,
                        "gradeId":_this.gradeId,
                        "goodsType":_this.type,
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
                    url: _this.getBuyList   ,
                    type: "post",
                    data: JSON.stringify({
                        "pageSize": 10,
                        "currentPage": 1,
                        "specId":_this.specId,
                        "cityId": _this.cityId,
                        "gradeId":_this.gradeId,
                        "goodsType":_this.type,
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
         /*获取图片url*/
        if(!localStorage.getItem("img")){
            $("#img").attr("src","../../img/touxiang.png")
        }else{
            $("#img").attr("src",localStorage.getItem("img"))
        }
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
        ajax({
            url: _this.getBuyList,
            type: "post",
            data: JSON.stringify({
                "isDel":null,
                "days":liddays,
                "currentPage":1,
                "pageSize":10,
            }),
            headers: {
                "Content-Type":"application/json;charset=UTF-8"
            },
            success: function (data) {

                if(data.code==200){
                    _this.hisIs=data.obj;
                    $.each(_this.hisIs, function (k,v) {
                        for(var s in v){
                            if(v[s]==null||v[s]==""){
                                v[s]="--"
                            }
                        }

                    })
                    if((data.total%data.obj.pageSize)==0){
                        _this.total=(data.total/data.obj.pageSize);
                    }else{
                        _this.total=(data.total/data.obj.pageSize)+1
                    }
                }else{


                }


            }
        })
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

                }
            }
        })
    },
    updated: function () {
        $(".smark").on("mouseover", function () {
            $(event.target).next().fadeIn(500)
        }).on("mouseout", function () {
            $(event.target).next().fadeOut(500)
        })
    },
    methods:{
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
        downFn: function () {
            $(".time-slidown").html("最近三个月")
            $(".time-slidown").on("click", function () {

                $(".down").slideToggle()
            });
            $(".down").on("click", function () {
                $(".time-slidown").html($(event.target).html())
                $(".down").slideToggle()
            })
        },
        downFn1: function () {
            var _this=this;
            $(".down span").on("click", function () {
                var eventHtml=$(event.target).html();
                if(eventHtml=="最近一个月"){
                    eventHtml=30
                }else if(eventHtml=="最近三个月"){
                    eventHtml=90
                }else if(eventHtml=="最近半年"){
                    eventHtml=180
                }else if(eventHtml=="最近一年"){
                    eventHtml=365
                }
                ajax({
                    url: _this.getBuyList,
                    type: "post",
                    data: JSON.stringify({
                        "isDel":null,
                        "days":eventHtml,
                        "currentPage":1,
                        "pageSize":10,
                        "name":_this.nameHtml
                    }),
                    headers: {
                        "Content-Type":"application/json;charset=UTF-8"
                    },
                    success: function (data) {

                        if(data.code==200){
                            _this.hisIs=data.obj;
                            _this.total=Math.ceil(data.total/10)
                            $(".num").html(1)
                        }else{

                        }


                    }
                })
            })
        },
        homeFn: function () {   //首页的跳转
            var _this=this;
            $(".home").on("click", function () {
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
                ajax({
                    url: _this.getBuyList,
                    type: "post",
                    data: JSON.stringify({
                        "isDel":null,
                        "days":eventHtml,
                        "name":_this.nameHtml,
                        "currentPage":1,
                        "pageSize":10,
                    }),
                    headers: {
                        "Content-Type":"application/json;charset=UTF-8"
                    },
                    success: function (data) {

                        if(data.code==200){
                            _this.hisIs=data.obj;
                            _this.total=Math.ceil(data.total/10)
                        }else{

                        }


                    }
                })
            })
        },
        preFn: function () {
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
            if(Num1>1){
                Num1--
                ajax({
                    url: _this.getBuyList,
                    type: "post",
                    data: JSON.stringify({
                        "isDel":null,
                        "days":eventHtml,
                        "currentPage":Num1,
                        "name":_this.nameHtml,
                        "pageSize":10,
                    }),
                    headers: {
                        "Content-Type":"application/json;charset=UTF-8"
                    },
                    success: function (data) {
                        if(data.code==200){
                            _this.hisIs=data.obj;

                            $(".num").html(Num1)
                        }else{

                        }


                    }
                })
            }

        },
        nextFn: function () {
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
            Num1++
                ajax({
                    url: _this.getBuyList,
                    type: "post",
                    data: JSON.stringify({

                        "isDel":null,
                        "days":eventHtml,
                        "currentPage":Num1,
                        "pageSize":10,
                        "name":_this.nameHtml
                    }),
                    headers: {
                        "Content-Type":"application/json;charset=UTF-8"
                    },
                    success: function (data) {
                        if(data.code==200){
                            _this.hisIs=data.obj;
                            $(".num").html(Num1)
                        }else{

                        }


                    }
                })

        },
        end: function () {
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
                    url: _this.getBuyList,
                    type: "post",
                    data: JSON.stringify({
                        "isDel":null,
                        "days":eventHtml,
                        "currentPage":_this.total,
                        "pageSize":10,
                        "name":_this.nameHtml
                    }),
                    headers: {
                        "Content-Type":"application/json;charset=UTF-8"
                    },
                    success: function (data) {

                       if(data.code==200){
                           _this.hisIs=data.obj;
                           $(".num").html(_this.total)
                       }

                    }
                })

        },
        goFn: function () { //跳转到特定的页数
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
            var bluekHtml=parseInt($(".blue-k").val());
            var _this=this;
            if(typeof bluekHtml!="undefined"){
              ajax({
                    url: _this.getBuyList,
                    type: "post",
                    data: JSON.stringify({

                        "isDel":null,
                        "days":eventHtml,
                        "currentPage":bluekHtml,
                        "pageSize":10,
                        "name":_this.nameHtml
                    }),
                    headers: {
                        "Content-Type":"application/json;charset=UTF-8"
                    },
                    success: function (data) {
                        if(data.code==200){
                            _this.hisIs=data.obj;
                            $(".num").html(bluekHtml)
                        }else{

                        }

                    }
                })
            }else{

            }
        },
        hisSearchFn: function () {
            var searchHtml=$(".his-search").val();

        },
        btnFn: function () {
            var _this=this;
            var html=$(".his-search").val();
            _this.nameHtml=html;
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
                $(".num").html(_this.currentPage)
                    ajax({
                        url: _this.getBuyList,
                        type: "post",
                        data: JSON.stringify({
                            "isDel":null,
                            "days":eventHtml,
                            "currentPage":1,
                            "pageSize":10,
                            "name":_this.nameHtml
                        }),
                        headers: {
                            "Content-Type":"application/json;charset=UTF-8"
                        },
                        success: function (data) {
                            if(data.code==200){
                                _this.hisIs=data.obj;
                                _this.total=Math.ceil(data.total/10)
                            }else{

                            }

                        }
                    })

            }
        }
    }
})
