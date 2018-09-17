/**
 * Created by Administrator on 2017/6/1.
 */
new Vue({
  el:"#message",
    data:{
    	getNewsById:window.dataUrl + "/web/deal/getNewsById",
    	getNewsListWeb:window.dataUrl + "/web/deal/getNewsListWeb",
    	newsId:"",
    	obj:{},
    	recommend_obj:[]
    },
    methods:{
    	newsDetails(newsId){
    		window.location.href="../newsDetails/newsDetails.html?newsId="+newsId
    	},
    	initNews(){
    		const url = window.location.href;
			this.newsId = url.split('=')[1]
			const that = this
	        ajax({
	            url:that.getNewsById,
	            type: "post",
	            data: JSON.stringify({
	                "newsId": this.newsId
	            }),
	            success: function (data) {
	            	if(data.code == 200){
	            		if(!data.obj){
		            		return;
		            	}
	    			            let timec = new Date(data.obj.createTime)
								const year = timec.getFullYear()
								const month = timec.getMonth() + 1
								const day = timec.getDate()
								const hours = timec.getHours()
								const minutes = timec.getMinutes()
								const seconds = timec.getSeconds()
				
								let timer = year + '年' + month + '月' + day + '日 '+hours+':'+minutes+':'+seconds
								data.obj.createTime = timer
	
		            	that.obj = data.obj
		            	that.recommend_news()
	            	}

	           	}
          })
    	},
    	recommend_news(){
    		const that = this
	        ajax({
	            url:that.getNewsListWeb,
	            type: "post",
	            data: JSON.stringify({
	            		"pageSize": "5",
						"currentPage": "1",
						"type": that.obj[0]?that.obj[0].type:null
	            }),
	            success: function (data) {
	            	if(data.obj){
			            	for(let i=0;i<data.obj.length;i++){
		    			            let timec = new Date(data.obj[i].createTime)
									const year = timec.getFullYear()
									const month = timec.getMonth() + 1
									const day = timec.getDate()
									const hours = timec.getHours()
									const minutes = timec.getMinutes()
									const seconds = timec.getSeconds()
					
									let timer = year + '年' + month + '月' + day + '日 '+hours+':'+minutes+':'+seconds
									data.obj[i].createTime = timer
			            	}
			            	that.recommend_obj = data.obj
	            	}

	            }
	        })
    	}
    },
    mounted: function () {
    	this.initNews()
    	this.recommend_news()
    }
})


















