/**
 * Created by Administrator on 2017/6/1.
 */
new Vue({
    el:"#mCenter",
    data:{
        getUserById:window.dataUrl+"/personal/getUserById",
        centerMsg:"",
        getDealCountByUser:window.dataUrl+"/personal/getDealCountByUser",
        upToken:window.dataUrl+"/main/upToken",
        updateUserById:window.dataUrl+"/personal/updateUserById",
        userMsg:"",
        token:"",
        imgSrc:"",

    },
    methods:{
    	editUserInfo(){
    		var _this=this;
            ajax({        //获取tokern
                url: _this.updateUserById,
                type: "post",
                data: JSON.stringify({
                    "img": _this.imgSrc
                }),
                headers: {
                    "Content-Type": "application/json;charset=UTF-8"
                },
                success: function (data) {
                }
            })
    	},
        init: function () {
            var _this=this;
            var orderPic=$(".order-pic");
            var layer=$(".layer");
            ajax({        //获取tokern
                url: _this.upToken,
                type: "post",
                headers: {
                    "Content-Type": "application/json;charset=UTF-8"
                },
                success: function (data) {
                    _this.token=data.upToken;
                    var uploader = Qiniu.uploader({
                        runtimes: 'html5,flash,html4',
                        browse_button: "box",//上传按钮的ID
                        container: "box1",//上传按钮的上级元素ID
                        /*drop_element: 'btn-uploader',*/
                        max_file_size: '100mb',//最大文件限制
                        dragdrop: false,
                        chunk_size: '4mb',//分块大小
                        //Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
                        uptoken: _this.token,
                        // 默认 false，key为文件名。若开启该选项，SDK会为每个文件自动生成key（文件名）
                        // save_key: true,
                        // 默认 false。若在服务端生成uptoken的上传策略中指定了 `sava_key`，则开启，SDK在前端将不对key进行任何处理
                        domain: 'http://ojantumyo.bkt.clouddn.com/',//自己的七牛云存储空间域名
                        multi_selection: false,//是否允许同时选择多文件
                        //文件类型过滤，这里限制为图片类型
                        filters: {
                            mime_types: [
                                {title: "Image files", extensions: "jpg,jpeg,gif,png"}
                            ]
                        },
                        auto_start: true,
                        unique_names: true,
                        init: {
                            'FilesAdded': function (up, files) {
                                //do something
                            },
                            'BeforeUpload': function (up, file) {
                                //do something
                            },
                            'UploadProgress': function (up, file) {
                                //可以在这里控制上传进度的显示
                                //可参考七牛的例子
                            },
                            'UploadComplete': function () {
                                //do something
                            },
                            'FileUploaded': function (up, file, info) {
                                //每个文件上传成功后,处理相关的事情
                                var domain = up.getOption('domain');
                                var res = eval('(' + info + ')');
                                var sourceLink = domain + res.key; //**获取上传文件的链接地址**
                                console.log(sourceLink)
                                _this.imgSrc=sourceLink;
                                _this.editUserInfo();
                                localStorage.setItem("img",sourceLink)
                                $("#img").attr("src",localStorage.getItem("img"))
                                $("body").data()
                            },
                            'Error': function (up, err, errTip) {

                            },
                            'Key': function (up, file) {
                                //当save_key和unique_names设为false时，该方法将被调用
                                return "";
                            }
                        }
                    })
                    uploader.start();
                }
            });
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
            /*my-center*/
            $(".my-center").click(function () {
                window.location.href="../my-center/my-center.html"
            })
            /*my-order*/
            $(".my-order").click(function () {
                window.location.href="../my-order/my-order.html"
            })

            $(".reset").click(function () {
                window.location.href="../my-order/my-order.html"
            })
            $(".history-issue").click(function () {
                window.location.href="../history-issue/history-issue.html"
            })
            $(".history-supply").click(function () {
                window.location.href="../history-supply/history-supply.html"
            })
            $(".supply").click(function () {
                window.location.href="../my-supply/my-supply.html"
            })
            $(".is-color").click(function () {
                window.location.href="../my-issue/my-issue.html"
            })

        }
    },
    mounted: function () {
        this.$nextTick(function () {
        var _this=this;
        _this.init();
        /**/

//      if(!localStorage.getItem("img")){
//         $("#img").attr("src","../../img/touxiang.png")
//      }else{
//          $("#img").attr("src",localStorage.getItem("img"))
//      }

        ajax({
            url: _this.getUserById,
            type: "post",
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            success: function (data) {
                if(data.code==200){
                	if(data.obj.img){
                		$("#img").attr("src",data.obj.img)
                	}
                	
                    if(data.obj.sex==0){
                        data.obj.sex="男"
                    }else{
                        data.obj.sex="女"
                    }
                    _this.centerMsg=data.obj;
                    $(".login").html("欢迎您\n"+data.obj.nick)
                    sessionStorage.setItem("name", data.obj.nick)
                }

            }
        });
        ajax({
            url: _this.getDealCountByUser,
            type: "post",
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            success: function (data) {
                _this.userMsg=data;
                for(var i in _this.userMsg){
                    if(_this.userMsg.i==null){
                        _this.userMsg.i="--"
                    }
                }
            }
        })
    })
    }
})







