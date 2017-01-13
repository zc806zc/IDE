import dva from 'dva';
import { Router, Route ,Link} from 'dva/router';
import React,{ Component }from 'react';
import { createStore } from 'redux';
import { Provider ,connect} from 'react-redux';
import { EventEmitter } from 'events';
module.exports = function(){
  let project = projects[0];
  let url = project['src'].split('file://')[1];
  const app = dva();
  const emitter = new EventEmitter();
  const appServer = express();
  appServer.use(bodyParser())
  appServer.set('view engine', 'html');
  appServer.use(express.static(url));
  appServer.get('/', function (req, res) {
    res.sendfile(url+'/index.html')
  });
  var server = appServer.listen(10000,'127.0.0.1',function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
    let date = Date.parse(new Date())/1000;
    $("#phone-inset").attr({src:"http://127.0.0.1:10000?time="+date});
    $("#phone-inset").removeClass('hide')
    // setTimeout(function(){
    //   document.getElementById('phone-inset').showDevTools(true, document.getElementById('cdt'));   
    // })
    // $('#aaa').attr({src:"http://127.0.0.1:10000?time="+Math.random()});
  });

  const nowWin = require('nw.gui').Window.get();
  app.model({
    namespace: 'info',
    state: {
      windowW:nowWin.width,
      windowH:nowWin.height,
      project:project,
      sidebar:'edit',
      showPlatform:false,
      showPlatformVal:'iPhone 4',
      phoneW:320,
      phoneH:480,
      filesList:[],
      title:'Joywok',
      btns:[],
      footer:[],
      tabs:[],
      tabsBg:''
    },
    reducers: {
      changeSidebar(state,action){
        return { ...state,
          sidebar: action["payload"],
        };
      },
      showPlatform(state,action) {
        return { ...state,
          showPlatform: action["payload"],
        };
      },
      changePhoneSize(state,action){
        return _.extend({},state,action['payload']);
      },
      changeWindow(state,action){
        return _.extend({},state,action['data']);
      },
      addFileList(state,action){
        return _.extend({},state,{filesList:action['data']});
      },
      changeTitle:function(state,action){
        return _.extend({},state,{title:action['data']});
      },
      setFuncBtns:function(state,action){
        return _.extend({},state,{btns:action['data']});
      },
      setFuncBtnStatus:function(state,action){
        let btns = [];
        _.each(state["btns"],function(i){
          if(i['type'] == action['data']['type']){
            i['disabled'] = (action['data']['disabled']=='disable'?true:false)
            btns.push(i)
          }else{
            btns.push(i)
          }
        })
        return _.extend({},state,{btns:btns});
      },
      showTabs:function(state,action){
        return _.extend({},state,{tabs:action['data']['tabs'],tabsBg:action['data']['style']});
      },
      changeTabs:function(state,action){
        let tabs = [];
        _.each(state["tabs"],function(i){
          if(i['num'] == action['data']['num']){
            i['active'] = true
            tabs.push(i)
          }else{
            i['active'] = false
            tabs.push(i)
          }
        })
        return _.extend({},state,{tabs:tabs});
      },
      hideTabs:function(state){
        return _.extend({},state,{tabs:[],tabsBg:''});
      },
      resetNormal:function(state){
        return _.extend({},state,{tabs:[],tabsBg:'',btns:[],footer:[],title:'Joywok'});
      }
    }
  });
  function App(state = app._models[0]["state"],action){
    if(app._models['0'].reducers){
      let hasFunc = _.filter(app._models['0'].reducers,function(i,key){return key==action['type']})
      if(hasFunc.length!=0){
        return (hasFunc[0](state,action))
      }else{
        return state  
      }
    }else{
      return state
    }
  }
  let store = createStore(App);
  const menu = require('./../menu/index')(emitter);
  const Phone = require('./../components/phone.js')(app,store);
  const Edit = require('./../editinfo/edit')(app,store);
  const Debug = require('./../editinfo/debug')(app,store);
  const Project = require('./../editinfo/project')(app,store);
  const windows = require('./../platform/windows')(app,store,emitter)
  class CountApp extends Component{
  	render(){	
  		return (
  	    <div className="info ide-info">
          <div className="ide-info-sidebar">
            <div className="ide-info-user">
              <img src="http://192.168.1.73/openfile/getfile?type=jw_n_avatar&size=small&id=AZ6lvWUgrMqVj5G5 "/>
            </div>
            <div className="ide-info-nav">
              <div activeClassName="active" className={"ide-info-nav-i "+(this.props.sidebar=='edit'?'active':'')} onClick={(e)=>this.changeSidebar(e,'edit')}>
                <div className="ide-info-nav-icon"><i className="fa fa-edit"></i></div>
                <div className="ide-info-nav-val">编辑</div>
              </div>
              <div activeClassName="active" className={"ide-info-nav-i "+(this.props.sidebar=='debug'?'active':'')} onClick={(e)=>this.changeSidebar(e,'debug')}>
                <div className="ide-info-nav-icon"><i className="fa fa-code"></i></div>
                <div className="ide-info-nav-val">调试</div>
              </div>
              <div activeClassName="active" className={"ide-info-nav-i "+(this.props.sidebar=='project'?'active':'')} onClick={(e)=>this.changeSidebar(e,'project')}>
                <div className="ide-info-nav-icon"><i className="fa fa-bars"></i></div>
                <div className="ide-info-nav-val">项目</div>
              </div>
            </div>
          </div>
          <div className="ide-info-childview">
            <div className={"ide-info-spcail "+(this.props.sidebar=='project'?'hide':'')}>
              <Phone {...this.props}></Phone>
              <Edit {...this.props}></Edit>
              <Debug {...this.props}></Debug>  
            </div>
            <Project {...this.props}></Project>
          </div>
  	    </div>
  	  );
  	}
    componentDidMount(){
      const {dispatch} = this.props;
      let fs = require('fs');
      setTimeout(function(){
        return 
        $('.xxxxx').html('');
        var oHead = document.getElementsByClassName('xxxxx')[0];
        var oScript= document.createElement("iframe");
        oScript.id = "foo";
        oScript.src='file:///'+basurl+'/src/template/editor.html';
        oScript.onload=function(){
          fs.readFile(basurl+'/webpack.config.js',{
            encoding:'utf-8'
          },function(err,data){
            console.log('发送数据')
            oScript.contentWindow.postMessage(data, "*");
          })
        }
        oHead.appendChild(oScript);
        return 
        let iframeWin =  document.getElementById("foo").contentWindow;
        console.log(iframeWin,'1231231');
        fs.readFile(basurl+'/webpack.config.js',{
          encoding:'utf-8'
        },function(err,data){
          console.log('发送数据')
          iframeWin.postMessage(data, "*");
        })
        return 
        $('.xxxxx').html('')
        var oHead = document.getElementsByClassName('xxxxx')[0];
        var oScript= document.createElement("iframe");
        oScript.id = "foo";
        oScript.partition = "trusted";
        // oScript.src='file:///'+basurl+'/src/template/template.html?src=xxxxxxxxx';
         oScript.src='chrome-extension://lblocnhdapdghmpkknoijhgonjfikalb/src/template/template.html';
        oHead.appendChild(oScript);
        console.log(oScript,'1231');
      },0)
      console.log(document.getElementById('body'))
    }
    changeSidebar(e,data){
      let dispatch = this.props.dispatch;
      dispatch({
        type:'info/changeSidebar',
        payload:data
      })
    }
  }
  function mapStateToProps(state) {
    return state;
  }
  const RootApp = connect(mapStateToProps)(CountApp);
  class Main extends Component{
    render(){
      return (<Provider store={store}>
                <RootApp {...this.props} />
              </Provider>
              )
    }
  }
  return Main
}()