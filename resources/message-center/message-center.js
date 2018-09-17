/**
 * Created by Administrator on 2017/6/1.
 */
new Vue({
  el:"#message",
    data:{
        //getNewsListWeb:window.dataUrl+"/web/deal/getNewsListWeb",   
        getNewsListWeb:window.dataUrl+"/web/deal/getNewsListWeb",//查询新闻资讯列表
        getCarListWeb:window.dataUrl+"/personal/getCarListWeb",      //购物车数量
        getUserById:window.dataUrl+"/personal/getUserById",         //用户信息
        getPriceList:window.dataUrl+"/web/deal/getPriceList",         //charts
        type0:0,
        shopTotal:0,
        marketNews:{},
        priceNews:{},
        zbNews:{},
         focusNews:{ },
         studyNews:{},
         companyNews:{},
         seriesNews:0,
         isLogin:false,
    },
    methods:{
     	jump_noLogin(type){
    		if(type==0){
    			window.location="../login/login.html";
    		}else if(type==1){
    			window.location.href="../register/register.html"
    		}
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
    	newsMore(type){
    		window.open("../newsList/newsList.html?type="+type+"&series="+this.seriesNews)
//  		if(this.get_cookie('pwd')!=''){
//  			window.location.href="../newsList/newsList.html?type="+type+"&series="+this.seriesNews
//  		}else{
//  			this.isLogin = true
//  		}
    		
    	},
    	requestCharts(type){
    		const that = this;
    	
    		if(type==0){
				let priceObj = {
					one:that.ajaxCharts(type,44),
					two:that.ajaxCharts(type,45),
				}
				
				const interval = setInterval(function(){
					if(priceObj.one){
						if(priceObj.one && priceObj.one[0].length > 0){
							that.myCharts(priceObj,type)
							setTimeout(function(){
								clearInterval(interval)
							},1000)
						}
					}

				},500)
				
    		}else if(type==1){
    			let priceObj = {
					one:that.ajaxCharts(type,76),
					two:that.ajaxCharts(type,78),
				}
				const interval = setInterval(function(){
					if(priceObj.one){
						if(priceObj.one && priceObj.one[0].length > 0){
							that.myCharts(priceObj,type)
							setTimeout(function(){
								clearInterval(interval)
							},1000)
						}
					}
				},500)
    		}else if(type==2){
    			let priceObj = {
					one:that.ajaxCharts(type,80),
					two:that.ajaxCharts(type,81),
					three:that.ajaxCharts(type,82),
				}
			const interval = setInterval(function(){
				if(priceObj.one){
					if(priceObj.one && priceObj.one[0].length > 0){
						that.myCharts(priceObj,type)
						setTimeout(function(){
							clearInterval(interval)
						},1000)
					}
				}

				},500)
    		}
    		        
    	},
    	ajaxCharts(type,gradeId){
    		const that = this
    			let arr = []
    			let time = []
    			let arr_obj = []
    		    	ajax({
			            url:that.getPriceList,
			            type: "post",
			            data: JSON.stringify({
			           		"type": type,
							"gradeId": gradeId
			            }),
			            success: function (data) {
			            	
			            	
			            	for(let i=0;i<data.list.length;i++){
			            		
			            				let timec = new Date(data.list[i].createTime)
										const year = timec.getFullYear()
										const month = timec.getMonth() + 1
										const day = timec.getDate()
										const hours = timec.getHours()
										const minutes = timec.getMinutes()
										const seconds = timec.getSeconds()
						
										let timer = '0' + month + '.' + day
										data.list[i].createTime = timer
										
										
			            		arr.push(data.list[i].price)
			            		time.push(data.list[i].createTime)
			            	}
			            	arr_obj.push(arr)
			            	arr_obj.push(time)
			            }
			        })
    		    return arr_obj;
    	},
		myCharts(priceObj,type){
			
			if(type==0){
				var myChart = echarts.init(document.getElementById('main-line'));
				// 指定图表的配置项和数据
			    var option = {
			        title: {
			            text: '硅系',
			            y:"20",
			            subtext: '\n\n'+'75A硅铁'+'\n\n'+'75B硅铁',
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
			            backgroundColor:"0",
			            y:"20",
			            x:"100",
			            data:['75A硅铁','75B硅铁']
			
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
			           /*    min:"0",,*/
			           /*  max:"10000",*/
			            /*interval:"10"*/
			
			        },
			        series: [
				        {
				            name: '75A硅铁',
				            type: 'line',
				            data: priceObj.one[0]
				        },
			            {
			                name: '75B硅铁',
			                type: 'line',
			             	data: priceObj.two[0]
			            }
			        ]
			    };
			
			    // 使用刚指定的配置项和数据显示图表。
			    myChart.setOption(option);
			}else if(type==1){
				var myChart1 = echarts.init(document.getElementById('main-line1'));
								// 指定图表的配置项和数据
			    var option1 = {
			        title: {
			            text: '锰系',
			            y:"20",
			            subtext: '\n\n'+'硅锰6517'+'\n\n'+'65锰铁',
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
			            backgroundColor:"0",
			            y:"20",
			            x:"100",
			            data:['硅锰6517','65锰铁']
			
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
			             /* min:"0",*/
			            /*max:"10000",*/
			            /*interval:"10"*/
			
			        },
			        series: [
				        {
				            name: '硅锰6517',
				            type: 'line',
				            data: priceObj.one[0]
				        },
			            {
			                name: '65锰铁',
			                type: 'line',
			             	data: priceObj.two[0]
			            }
			        ]
			    };
			    myChart1.setOption(option1);
			}else if(type==2){
				var myChart2 = echarts.init(document.getElementById('main-line2'));
								// 指定图表的配置项和数据
			    var option2 = {
			        title: {
			            text: '铬系',
			            y:"20",
			            subtext: '\n\n'+'高碳铬铁'+'\n\n'+'低碳铬铁'+'\n\n'+'硅铬',
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
			            backgroundColor:"0",
			            y:"20",
			            x:"100",
			            data:['高碳铬铁','低碳铬铁','硅铬']
			
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
			            /*   min:"0",*/
			           /* max:"10000",*/
			            /*interval:"10"*/
			
			        },
			        series: [
				        {
				            name: '高碳铬铁',
				            type: 'line',
				            data: priceObj.one[0]
				        },
			            {
			                name: '低碳铬铁',
			                type: 'line',
			             	data: priceObj.two[0]
			            },
			            {
			                name: '硅铬',
			                type: 'line',
			             	data: priceObj.three[0]
			            }
			        ]
			    };
			    myChart2.setOption(option2);
			}
			  

			    
		},
		newsDetails(newsId){
			window.open("../newsDetails/newsDetails.html?newsId="+newsId)
//			if(this.get_cookie('pwd')!=''){
//  				window.location.href="../newsDetails/newsDetails.html?newsId="+newsId				
//			}else{
//				this.isLogin = true
//			}

    	},
        newsAjax(type,series){
        	this.seriesNews = series
        	
        	const _this = this
        	        ajax({
			            url:_this.getNewsListWeb,
			            type: "post",
			            data: JSON.stringify({
			                "pageSize": "10",
			                "currentPage": "1",
			                "type": type,//添到哪//哪个类型
			                "series": series　
			            }),
			            headers: {
			                "Content-Type": "application/json;charset=UTF-8"
			            },
			            success: function (data) {
			               if (data.code==200) {
			               		//时间格式
			               		data.obj = data.obj
			               		for(let i=0;i<data.obj.length;i++){
			               				let timec = new Date(data.obj[i].createTime)
										const year = timec.getFullYear()
										const month = timec.getMonth() + 1
										const day = timec.getDate()
										const hours = timec.getHours()
										const minutes = timec.getMinutes()
										const seconds = timec.getSeconds()
						
									let	vmonth = month<10?'0'+month:month
									let	vday = day<10?'0'+day:day
										let timer = '['+vmonth +'-' + vday + ']'
										data.obj[i].createTime = timer
			               		}
			               		
			               		
			               		if(type == 0){
			                    	_this.marketNews=data.obj.slice(0,8);
			               		}
			               		if(type == 1){
			               			_this.priceNews=data.obj.slice(0,8);
			               		}
			               		if(type == 2){
			               			_this.zbNews =data.obj.slice(0,8);
			               		}
			               		if(type == 3){
			               			_this.focusNews =data.obj.slice(0,6);
			               		}
			               		if(type == 4){
			               			_this.studyNews =data.obj.slice(0,8);
			               		}
			               		if(type == 5){
			               			_this.companyNews =data.obj.slice(0,4);
			               		}
			            	}
			            }
			        })
        }
    },
    mounted: function () {
        var _this=this;

        _this.newsAjax(3,null)
        _this.newsAjax(4,null)
        _this.newsAjax(5,null)
        _this.newsAjax(0,0)
        _this.newsAjax(1,0)
        _this.newsAjax(2,0)
        
        _this.requestCharts(0)
    	_this.requestCharts(1)
    	_this.requestCharts(2)
        //初始化数据接口
                    //主页
            $(".index").on("click", function () {
                window.location.href="../index.html"
            })

            //合金超市
            $(".supermarket").on("click", function () {
                window.location.href="../supermarket/supermarket.html"
            })
            //供应 supply
            $(".supply").on("click", function () {
                window.location.href="../supply/supply.html"
            })
            //求购
            $(".buy").on("click", function () {
                window.location.href="../buy/buy.html"
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
            
        //购物车数量
        ajax({
            url: _this.getCarListWeb,
            type: "post",
           /* data: JSON.stringify({
                "type": _this.type0,
                "series": _this.type0
            }),*/
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            success: function (data) {
                if (data.code==200) {
                    _this.shopTotal=data.list.length;
                }else{
                    _this.shopTotal=0;
                }

            }
        })
        //市场分析tab点击
        $(".tabOne li").on("click", function () {
            $(event.target).css({
                "background":"#538fef",
                 "color": "#fbfcfc"
            }).siblings().css({
                "color": "#656666",
                "background":0
            })
        })
        //价格详情tab点击
        $(".tabTwo li").on("click", function () {
            $(event.target).css({
                "background":"#538fef",
                "color": "#fbfcfc"
            }).siblings().css({
                "color": "#656666",
                "background":0
            })
        })
        //招标tab点击
        $(".tabThree li").on("click", function () {
            $(event.target).css({
                "background":"#538fef",
                "color": "#fbfcfc"
            }).siblings().css({
                "color": "#656666",
                "background":0
            })
        })
        //价格指数的更多——点击
        var onn=true;
        $(".main1-pic").on("click", function () {
            if(onn){
                $(event.target).css({
                    "background":"url('../../img/shang1.png') no-repeat 50px center"
                })
                onn=!onn;
            }else{
                $(event.target).css({
                    "background":"url('../../img/xia1.png') no-repeat 50px center"
                })
                onn=!onn;
            }
        })
    }
})


















