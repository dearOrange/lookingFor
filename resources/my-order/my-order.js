/**
 * Created by Administrator on 2017/6/1.
 */

(function($){

})(jQuery)
new Vue({
    el:"#order",
    data:{
        getUserById:window.dataUrl+"/personal/getUserById",
        getDealedList:window.dataUrl+"/personal/getDealedList",
        dataDealed:[],
        userId:"",
        trailer:10,
        txt:"",
        nick:"",
        sortarr1:[],
        ininArr:[],
        isDel:null,
        total:null,
        searH:null,
        timeVal:null,
        timeOver: [
                {
                    value: '',
                    label: '请选择'
                },
                {
                    value: 30,
                    label: '一个月'
                },
                {
                    value: 90,
                    label: '三个月'
                },
                {
                    value: 180,
                    label: '半年'
                },
                {
                    value: 365,
                    label: '一年'
                }
        ],
        timeValue: ''
    },
    mounted: function () {
        this.$nextTick(function () {
            this.downFn();
            this.msgAjax();
            this.hoverFn();
            this.statusFn();
            this.init();
            
            //排序降序
            var onn=true;
            $(".weight").on("click", function () {
                if(onn){
                    $(".bg1").css({
                        "background-position":"0px 10px"
                    })
                    ajax({        //规格的数据接口
                        url: _this.getDealedList,
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
                        url: _this.getDealedList,
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
                        url: _this.getDealedList,
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
                        url: _this.getDealedList,
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

            //全部订单．．切换
            var _this = this;
        
        	$(".main-right-nav li").eq(0).click()
        
        })
        /*-----*/
    },
    updated: function () {  //dataDealed1
    },
    methods:{
    	selectTime(){
    		const timeVal = parseInt( document.getElementById('selectTime').value);
    		
    		this.timeVal = isNaN(timeVal)?null:timeVal
    		this.orderMsg()
        },
        init: function () {
            limitNum()
            function limitNum(){
                var seart=$(".seart");
                var bluek=$(".blue-k");
                seart.on("keyup",function(){
                    var length=seart.val().length;
                    if(length>10){

                        seart.val(seart.val().slice(0,10))
                        return false;
                    }
                })
                bluek.on("keyup",function(){
                    var length=bluek.val().length;
                    if(length>3){
                        bluek.val(bluek.val().slice(0,3));
                        return false;
                    }

                })
            }
            /*跳转*/
            /*跳转*/
            $(".header-pic").click(function () {
                window.location.href="../index.html"
            })
            $(".login").click(function () {
                window.location.href="../login/login.html"
            })
            /*register*/
            $(".register").click(function () {
                window.location.href="../register/register.html"
            })
            $(".shop").click(function () {
                window.location.href="../shop/shop.html"
            })
            $(".edit_pass").click(function () {
                window.location.href="../edit-passwords/edit-passwords.html"
            })
            /*my-center*/
            $(".my-center").click(function () {
                window.location.href="../my-center/my-center.html"
            })
            $(".supply").click(function () {
                window.location.href="../my-supply/my-supply.html"
            })
            /*my-order*/
            $(".is-color").click(function () {
                window.location.href="../my-issue/my-issue.html"
            })
            $(".history-supply").click(function () {
                window.location.href="../history-supply/history-supply.html"
            })
            $(".history-issue").click(function () {
                window.location.href="../history-issue/history-issue.html"
            })
        },
        downFn: function () {
            $(".down-fn").html("最近三个月")
            $(".down-fn").on("click", function () {

                $(".down").slideToggle()
            });
            $(".down").on("click", function () {
                $(".down-fn").html($(event.target).html())

            })
        },
        msgAjax: function () {  //获取用户的id
            var _this=this
            console.log(_this.getUserById)
                ajax({
                    url: _this.getUserById,
                    type: "post",
                    headers: {
                        "Content-Type": "application/json;charset=UTF-8"
                    },
                    success: function (data) {
                    	console.log('ok',JSON.stringify(data))
                        if(data.code==201){

                        }else if(data.code==200){
                            _this.userId=data.obj.userId;
                            _this.nick=data.obj.nick;
                            $(".login").html("欢迎您\n"+data.obj.nick)
                            _this.orderMsg();
                            if(data.obj.img){
                            	$("#img").attr("src", data.obj.img)
                            	console.log('ok')
                            }
							 
                        }

                    }
                })


        },
        orderMsg: function (page) {   //init 页面的数据
            var _this=this;
           let currentPage = page || 1
             ajax({
                    url: _this.getDealedList,
                    type: "post",
                    data: JSON.stringify({
                        "days":_this.timeVal,
                        "pageSize": 10,
                        "currentPage":currentPage,
                        "isDel": _this.isDel,
                    }),
                    headers: {
                        "Content-Type": "application/json;charset=UTF-8"
                    },
                    success: function (data) {
                        _this.ininArr=data.obj;
                      if(data.code==200){
                            _this.dataDealed=data.obj;
                            _this.total=Math.ceil((data.total)/10);
                          $.each(_this.dataDealed, function (k,v) {
                              for(let i in v){
                                  if(v[i]==null){
                                      v[i]="--"
                                  }
                              }
                              if(v.isDel==3){
                                  v.isDel="签订合同"
                              }if(v.isDel==4){
                                  v.isDel="预付定金"
                              }
                              if(v.isDel==5){
                                  v.isDel="配货装车"
                              }
                              if(v.isDel==6){
                                  v.isDel="司机上路"
                              }
                              if(v.isDel==7){
                                  v.isDel="货已到厂"
                              }
                              if(v.isDel==8){
                                  v.isDel="结算开票"
                              }
                              if(v.isDel==9){
                                  v.isDel="订单完成"
                              }

                          })
                            _this.trailer=data.total;
                        }

                    }
                })


        },
        changePage(){
        	this.orderMsg(this.$refs.page.currentPage)
        },
        searchFn:function (){
            var _this=this;
            _this.searH=$(".seart").val()
	            if(_this.searH==""){
	            	_this.searH = null
	            }
            	if(_this.timeValue==''){
            		_this.timeValue = null
            	}
                ajax({
                    url: _this.getDealedList,
                    type: "post",
                    data: JSON.stringify({
                        "pageSize":10,
                        "days":_this.timeValue,
                        "currentPage":1,
                        "dealId":_this.searH,
                        "isDel": _this.isDel,
                    }),
                    headers: {
                        "Content-Type": "application/json;charset=UTF-8"
                    },
                    success: function (data) {
                        if(data.code==200){
                            _this.dataDealed=data.obj;
                        }else{

                        }

                    }
                })
            


        },
        hoverFn: function () {
        	const _this = this
            $(".main-right-nav li").on("click", function (event){
                $(event.target).siblings().css({
                    "color":"#000",
                    "border-bottom":0,
                })
                $(event.target).css({
                    "color":"#02548e",
                    "border-bottom":"2px solid #02548e"
                })
                
                var statusHtml=$(event.target).html();
                if(statusHtml=="全部订单"){
                    _this.isDel=null
                }else if(statusHtml=="签订合同"){
                    _this.isDel=3
                }else if(statusHtml=="预付定金"){
                    _this.isDel=4
                }else if(statusHtml=="配货装车"){
                    _this.isDel=5
                }else if(statusHtml=="货已到厂"){
                    _this.isDel=6
                }else if(statusHtml=="订单完成"){
                    _this.isDel=7
                }else if(statusHtml=="司机上路"){
                    _this.isDel=8
                }else if(statusHtml=="结算开票"){
                    _this.isDel=9
                }
               _this.orderMsg()
            })
        },
        statusFn: function () {

        }
    }   
})



















