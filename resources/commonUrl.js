/**
 * Created by Administrator on 2017/7/1.
 */
(function () {
      var dataUrl="http://www.zhaothj.com/alloys";
//    var dataUrl="http://192.168.0.97:8072";
//  var bendiUrl="http://116.62.49.14:8072";
    /*192.168.0.125:8072*/
    window.dataUrl=dataUrl;
    
    
    ajax = function(info){
				if(window.XMLHttpRequest){
					var xhr = new XMLHttpRequest();	
				}else{
					var xhr = new ActiveXObject("Microsoft.XMLHTTP");
				}
				var url = info.url;
				var type = info.type||"GET";
				var data = info.data||"";
				
				if(type=="GET"){
					xhr.open("GET",url+"?"+data+"&t="+new Date().getTime(),true);
					xhr.send();
				}else{
					xhr.open("POST",url,true);
					xhr.setRequestHeader("Content-Type","application/json; charset=utf-8")  ;
					xhr.send(data);
				}
				
				xhr.onload = function(){
					if(info.success){
							
						if(xhr.responseText==''){
							console.log(info.url+" return ''")
							return;
						}
						info.success(JSON.parse(xhr.responseText));
					}
				}
	}
})(document,window)