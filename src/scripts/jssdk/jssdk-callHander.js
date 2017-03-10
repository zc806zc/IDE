module.exports = function(){
	function JssdkCallhander(store){
		this.callback = function(func_name,data){
			window.phoneInset.postMessage({
        type:'jssdkcallback',
        data:{
        	func_name:func_name,
        	data:JSON.stringify(data)
        }
      },'*')
		}
		this.init = function(data){
			if(typeof(this[data.func_name]) == 'function'){
				this[data.func_name](data["data"])
			}
		}
		this.setTitle = function(data){
			store.dispatch({
        type:'info/changeTitle',
        data:data['title']
      })
	  }
	  this.checkJsApi = function(data){
	    let self = this;
	    let datas = {
	      "errMsg":"checkJsApi:ok"
	    }
	    data["jsApiList"].forEach(function(i){
	      if(typeof(self[i]) == 'function'){
	        datas[i] = 1
	      }else{
	        datas[i] = 0
	      }
	    })
	    this.callback("checkJsApi",datas)
	  }
	  this.getInfo = function(data){
	    let datas = _.clone(window.user);
	    datas['avatar'] = {
	    	avatar_l:serverUrl+datas['avatar']["avatar_l"],
	    	avatar_s:serverUrl+datas['avatar']["avatar_s"]
	    }
	    this.callback("getInfo",{"info":datas,"errMsg":"getInfo:ok"})
	  }
	  this.pushWebView = function(data){
	    alert('此功能需要在真机调试！');
	  }
	  this.newWebView = function(data){
	    alert('此功能需要在真机调试！');
	  }
	  this.closeWebView = function(data){
	    alert('此功能需要在真机调试！');
	  }
	  this.setFuncBtns = function(data){
	  	store.dispatch({
        type:'info/setFuncBtns',
        data:data['buttons']
      })
	  }
	  this.setFuncBtnStatus = function(data){
	  	store.dispatch({
        type:'info/setFuncBtnStatus',
        data:{
          type:data['type'],
          disabled:data['status']
        }
      })
	  }
	  this.showTabs = function(data){
	    let datas = [];
	    let num = 0
	    data["tabs"].forEach(function(i){
	      let obj = {num:num,val:i}
	      if(num == 0){
	        obj['active'] = true
	      }
	      datas.push(obj)
	      num++
	    })
	    store.dispatch({
        type:'info/showTabs',
        data:{
        	tabs:datas,
	        style:data['style']
        }
      })
	  }
	  this.hideTabs = function(data){
	  	store.dispatch({
        type:'info/hideTabs'
      })
	  }
	  this.mailto = function(data){
	    alert('此功能需要在真机调试！')
	  }
	  this.back = function(data){
	    alert('此功能需要在真机调试！')
	  }
	  this.AuthCode = function(data){
	    this.callback('AuthCode',{
	    	code:'HLCnErseMMsGxtF5',
	    	errMsg:'AuthCode:ok'
	    })
	  }
	  this.getLocation = function(data){
	  	this.callback("getLocation",{"altitude":72.34257,"errMsg":"getLocation:ok","latitude":39.90902,"name":"融科创意中心","longitude":116.2,"address":"八角东街65幢(游乐园西南门对面)"})
	  }
	  this.openLocation = function(data){
	    this.callback("openLocation",{"errMsg":"openLocation:ok"})
	  }
	  this.previewImages = function(data){
	    this.callback("previewImages",{"errMsg":"previewImages:ok"})
	  }
	  this.choseFile = function(data){
	  	let self = this;
	  	$('.phone-specail').html('<input style="display:none;" id="fileDialog" type="file" accept=".png,.gif,.jpg,.jpeg" />');
      let chooser = $('#fileDialog');
      chooser.unbind('change cancel');
      chooser.change(function(evt){
        phoneInset.postMessage({
          type:'callback',
          data:'{"errMsg":"choseFile:ok","localFiles":[{"id":"http://blogs-1774886889.cn-north-1.elb.amazonaws.com.cn/siteconsole/public/images/blog/article/1AdnlO_resize.jpeg","type":"image/jpeg"},{"id":"http://blogs-1774886889.cn-north-1.elb.amazonaws.com.cn/siteconsole/public/images/blog/article/1B5Rto_resize.png","type":"image/png"}]}'
        },'*')
      });
      chooser.on("cancel",function(evt) {
        phoneInset.postMessage({
          type:'callback',
          data:'{"errMsg":"choseFile:cancel"}'
        },'*')
      });
      chooser.click(); 
	  }
	  this.uploadFile = function(data){
	    this.callback("uploadFile",{"serverId":data["localId"],"errMsg":"uploadFile:ok"})
	  }
	  this.downloadFile = function(data){
	   this.callback("downloadFile",{"localId":data["serverId"],"errMsg":"downloadFile:ok"})
	  }
	  this.scanQRCode = function(data){
	    this.callback("scanQRCode",{"errMsg":"scanQRCode:ok","resultStr":"https://itunes.apple.com/cn/app/joywok/id734946636"})
	  }
	  this.setBarBg = function(data){
	  	store.dispatch({
        type:'info/setBarBg',
        data:data['background']
      })
	  }
	  this.chartInit = function(data){
	  	alert('此功能需要在真机调试！')
	  }
		this.chartSingle = function(data){
	  	alert('此功能需要在真机调试！')
	  }
		return this
	}
	return JssdkCallhander
}()