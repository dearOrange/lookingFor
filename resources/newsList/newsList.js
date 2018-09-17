/**
 * Created by Administrator on 2017/6/1.
 */
new Vue({
	el: "#message",
	data: {
		type: "",
		series:"",
		getNewsListWeb: window.dataUrl + '/web/deal/getNewsListWeb',
		obj: {},
		currentPage: 1,
		total: '',
		typeContent: ''
	},
	methods: {
		newsDetails(newsId) {
			window.location.href = "../newsDetails/newsDetails.html?newsId=" + newsId
		},
		changePage() {
			this.currentPage = this.$refs.page.currentPage
			this.updateList()

		},
		updateList() {

			const that = this
			const url = window.location.href;
			this.type = getQueryString('type')
			this.series = getQueryString('series')
			function getQueryString(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
				var r = window.location.search.substr(1).match(reg);
				if(r != null) return unescape(r[2]);
				return null;
			}
			if(this.type == 0) {
				that.typeContent = '铁合金市场分析'
			} else if(this.type == 1) {
				that.typeContent = '铁合金价格详情'
			} else if(this.type == 2) {
				that.typeContent = '钢厂招标'
			} else if(this.type == 3) {
				that.typeContent = '行业聚焦'
			} else if(this.type == 4) {
				that.typeContent = '行业研究'
			} else if(this.type == 5) {
				that.typeContent = '企业新闻'
			}
			if(this.series == 0) {
				that.typeContent += '－硅合金'
			} else if(this.series == 1) {
				that.typeContent += '－锰合金'
			} else if(this.series == 2) {
				that.typeContent += '－铬合金'
			} else if(this.series == 3) {
				that.typeContent += '－镍合金'
			} else if(this.series == 4) {
				that.typeContent += '－特种合金'
			} else if(this.series == 5) {
				that.typeContent += '－其它合金'
			}

			ajax({
				url: that.getNewsListWeb,
				type: "post",
				data: JSON.stringify({
					"pageSize": "20",
					"currentPage": that.currentPage,
					"type": parseInt(that.type),
					"series":parseInt(that.series)
				}),
				success: function(data) {
					if(data.obj) {
						that.obj = data.obj
						for(let i = 0; i < data.obj.length; i++) {

							let timec = new Date(data.obj[i].createTime)
							const year = timec.getFullYear()
							const month = timec.getMonth() + 1
							const day = timec.getDate()
							const hours = timec.getHours()
							const minutes = timec.getMinutes()
							const seconds = timec.getSeconds()
							let timer = year + '年' + month + '月' + day + '日 ' + hours + ':' + minutes + ':' + seconds
							data.obj[i].createTime = timer
						}
						that.total = data.total
					}

				}
			})
		}
	},
	mounted: function() {
		this.updateList()
	}
})