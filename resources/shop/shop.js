/**
 * Created by Administrator on 2017/6/16.
 */
new Vue({
    el:"#shopId",
    data:{
        getCarListWeb:window.dataUrl+"/personal/getCarListWeb",
        orderCar:window.dataUrl+"/personal/orderCar",
        deleteCar:window.dataUrl+"/personal/deleteCar",
        getUserById:window.dataUrl+"/personal/getUserById",
        getCarArr:[],
        totalPrice:"",
        totalWeight:"",
        uint:"",
        orderArr:[],
        carId:"",
    },
    filters:{
        unitFn:function(item){
            return item+"吨"
        }
    },
    updated: function () {
        var _this=this;
        $(".place").on("click", function () {

            if($(event.target).attr("src")=="../../img/fuxuan1.png"){
                $(event.target).attr("src","../../img/fuxuan.png")
                var orderBoj={
                    "carId":parseInt($(event.target).parent().parent().attr("carId"))
                }
                _this.orderArr.push(orderBoj)
            }else{
                $(event.target).attr("src","../../img/fuxuan1.png")
            }
        })
        $(".nav2-li2 li:eq(4)").on("mouseover",function(){
        	$(this).attr("title",$(this).html())
        })
    },
    methods:{

        allFn: function () {
            var off=true;
            var _this=this;

           $(".all").on("click", function () {
               if(off){
                   _this.orderArr=[];
                   $(this).attr("src","../../img/fuxuan.png");
                   $(".replace").attr("src","../../img/fuxuan.png");
                   var orderBoj={}
                   $.each(_this.getCarArr, function (index,item) {
                       orderBoj={
                           "carId":parseInt(item.carId)
                       }
                       _this.orderArr.push(orderBoj)
                   })
                   off=!off;
               }else{
                   $(this).attr("src","../../img/fuxuan1.png");
                   $(".replace").attr("src","../../img/fuxuan1.png");
                   off=!off;
               }
           })
        },
        orderFn: function () {

            var _this=this;
            ajax({
                url: _this.orderCar,
                type: "post",
                data: JSON.stringify({
                    "list":_this.orderArr
                }),
                headers: {
                    "Content-Type": "application/json;charset=UTF-8"
                },
                success: function (data) {
                    if(data.code==200||data.code==202){
                    	window.location.href="../my-order/my-order.html"
                    }
                }
            })
        },
        removeFn: function (index) {
            var attrcarid=parseInt($(event.target).parent().parent().attr("carid"));
            var index=$(event.target).parent().parent().index();
            var _this=this;
            ajax({
                url: _this.deleteCar,
                type: "post",
                data: JSON.stringify({
                    "carId":attrcarid
                }),
                headers: {
                    "Content-Type": "application/json;charset=UTF-8"
                },
                success: function (data) {
                    if(data.code==200){
                        _this.getCarArr.splice(index,1)
                    }
                }
            })
        },
        jumpFm: function () {
            $(".login").on("click", function () {
                window.location.href="../login/login.html"
            })
            $(".register").on("click", function () {
                window.location.href="../register/register.html"
            })
            $(".my-center").on("click", function () {
                window.location.href="../my-center/my-center.html"
            })
            $(".my-order").on("click", function () {
                window.location.href="../my-order/my-order.html"
            })
            $(".header-pic").on("click", function () {
                window.location.href="../index.html"
            })
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            this.allFn();
            this.jumpFm()
            var _this=this;
            //排序降序
            var onn=true;
            $(".weight").on("click", function () {
                if(onn){
                    $(".bg1").css({
                        "background-position":"0px 10px"
                    })
                    ajax({        //规格的数据接口
                        url: _this.getCarListWeb,
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
                        url: _this.getCarListWeb,
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
            //价格升降排序
            var off=true;
            $(".price").on("click", function () {
                if(off){
                    $(".bg2").css({
                        "background-position":"0px 10px"
                    })
                    ajax({        //升降排序的接口
                        url: _this.getCarListWeb,
                        type: "post",
                        data: JSON.stringify({
                            "pageSize": 10,
                            "currentPage": 1,
                            "specId":_this.specId,
                            "cityId": _this.cityId,
                            "gradeId":_this.gradeId,
                            "goodsType":_this.type,
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
                    ajax({        //规格的数据接口
                        url: _this.getCarListWeb,
                        type: "post",
                        data: JSON.stringify({
                            "pageSize": 10,
                            "currentPage": 1,
                            "specId":_this.specId,
                            "cityId": _this.cityId,
                            "gradeId":_this.gradeId,
                            "goodsType":_this.type,
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
            $(".quxiao").on("click", function () {
                window.location.href="../supermarket/supermarket.html"
            })
            ajax({        //company
                url: _this.getUserById,
                type: "post",
                headers: {
                    "Content-Type": "application/json;charset=UTF-8"
                },
                success: function (data) {
                    if(data.code!==200){
                        /*login*/
                        $(".login").click(function () {
                            window.location.href="../login/login.html"
                        })
                    }else if(data.code==200){
                        _this.company=data.obj.company;
                        $(".login").html("欢迎您\n"+data.obj.nick)
                    }

                }
            })
            ajax({
                url:_this.getCarListWeb,
                type: "post",
                headers: {
                    "Content-Type": "application/json;charset=UTF-8"
                },
                success: function (data) {
                    if(data.code!=200){
                        _this.getCarArr=0;
                        _this.totalPrice=0;
                        _this.totalWeight=0;
                        _this.uint=0;
                    }else{
                        _this.getCarArr=data.list;
                        _this.totalPrice=data.totalPrice;
                        _this.totalWeight=data.totalWeight;
                        _this.uint=data.list.length
                    }

                }
            })
        })

    }

})