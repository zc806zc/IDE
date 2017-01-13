'use strict';
const nowWin = require('nw.gui').Window.get();
const Screen = require('nw.gui').Screen.Init();
window.phoneInset;
module.exports = function(app,store,emitter){
	let platform = Screen.screens[0]['bounds'];
	if(platform['width']>1440){
		nowWin.resizeTo(1440,900);
	}else{
		nowWin.maximize();
	}
	nowWin.on('resize',function(){
    store.dispatch({
      type:'info/changeWindow',
      data:{
        windowW:nowWin.width,
        windowH:nowWin.height
      }
    })
  })
  function reloadWindow(){
    let date = Date.parse(new Date())/1000;
    // let src = $('#phone-inset').attr('src').split('?')[0];
    $('#phone-inset').attr('src','http://127.0.0.1:10000?time='+date);
    let consoleContainer = document.getElementById('phone-inset');
    consoleContainer.src = 'http://127.0.0.1:10000?time='+date;
    store.dispatch({
      type:'info/resetNormal',
    })
    setTimeout(function(){
      document.getElementById('phone-inset').showDevTools(true, document.getElementById('cdt'));   
    },0)
  }
  emitter.on('reload',reloadWindow)
  window.addEventListener('message',function(e){
    let type = e.data['type'];
    let data = e.data;
    if(type == 'changeFile'){
      reloadWindow();
    }else if(type == 'changePhone'){
      switch(data['phoneType']){
        case "setTitle":
          store.dispatch({
            type:'info/changeTitle',
            data:data['data']['title']
          })
          break;
        case "setFuncBtns":
          store.dispatch({
            type:'info/setFuncBtns',
            data:data['data']['buttons']
          })
          break;
        case "setFuncBtnStatus":
          store.dispatch({
            type:'info/setFuncBtnStatus',
            data:{
              type:data['data']['type'],
              disabled:data['data']['status']
            }
          })
          break;
        case "showTabs":
          store.dispatch({
            type:'info/showTabs',
            data:data['data']
          })
          break;
        case "hideTabs":
          store.dispatch({
            type:'info/hideTabs'
          })
          break;
        default:
          break;
      }
    }else if(type=="phoneInsetInit"){
      if(!window.phoneInset) {
        window.phoneInset = e.source;
      }
    }else if(type=="phoneFile"){
      if(data['phoneType'] == 'choseFile'){
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
      }else if(data['phoneType'] == 'xxxxx'){

      }
    }
  })
};