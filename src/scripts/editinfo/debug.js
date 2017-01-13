'use strict'
import dva from 'dva';
import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider ,connect} from 'react-redux';
module.exports = function(app){
	class Controller extends Component{
		render(){
			let self = this;
			return (<div className={"info-debug "+(this.props.sidebar=='debug'?'':'hide')}>
								<div className="info-debug-console" id="info-debug-console">
								</div>
							</div>)
		}
		componentDidMount(){
			let webview = document.createElement('webview');
			webview.setAttribute('partition', 'trusted');
			webview.id = 'cdt'
			webview.addEventListener('loadcommit',function(e){
				console.log('loadcommit')
			})
			webview.addEventListener('contentload', function(e) {
				// setTimeout(function(){
				// },0)
			});
			webview.addEventListener('loadstop',function(e){
				console.log('loadstop')
			})
			webview.setAttribute('src','about:blank');
			document.getElementById('info-debug-console').appendChild(webview);
		}
		shouldComponentUpdate(data){
      if(data['sidebar'] == 'debug'){
        $('.info-debug').removeClass('hide');
        document.getElementById('phone-inset').showDevTools(true, document.getElementById('cdt'));   
      }else{
        $('.info-debug').addClass('hide')
      }
			return false
		}
	}
	return Controller
}