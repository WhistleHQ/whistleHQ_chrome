import React, { Component } from 'react';
import Messages from './Messages';

class DiscussionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: null,
      data: {},
      sessionID: ""
    }
    this.extractHostname = this.extractHostname.bind(this);
    this.extractRootDomain = this.extractRootDomain.bind(this);
    this.getTabUrl = this.getTabUrl.bind(this);
  }

  extractHostname(url) {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("://") > -1) {
      hostname = url.split('/')[2];
    }
    else {
      hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
  }

  extractRootDomain(url) {
    var domain = this.extractHostname(url),
      splitArr = domain.split('.'),
      arrLen = splitArr.length;

    //extracting the root domain here
    //if there is a subdomain
    if (arrLen > 2) {
      domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1];
      //check to see if it's using a Country Code Top Level Domain (ccTLD) (i.e. ".me.uk")
      if (splitArr[arrLen - 2].length == 2 && splitArr[arrLen - 1].length == 2) {
        //this is using a ccTLD
        domain = splitArr[arrLen - 3] + '.' + domain;
      }
    }
    return domain;
  }

  getSessionId() {
    return new Promise(function(resolve, reject){
      chrome.storage.local.get("session_id", function(items){
        resolve(items);
      });
    })
  }

  getTabUrl(){
    const that = this; // component object
    return new Promise(function(resolve, reject){
      chrome.tabs.query({ active: true, currentWindow: true}, function(tabs){
        resolve(that.extractRootDomain(tabs[0].url));
      })
    })
  }

  componentWillMount() {
    const that = this; // ref to react object for the callback
    // chrome.storage.local.set({"session_id": "testing"});
    const promises = [that.getTabUrl(), that.getSessionId()];
    Promise.all(promises).then(function(data){
        fetch(`http://www.whistlehq.com/api/posts/${data[0]}`)
          .then(function(res){
            if (res.status === 200) {
              return res.json();
            }
          }).then(function(payload){
            that.setState({
              data: payload.data,
              currentTab: data[0],
              sessionID: data[1]
            });
          });
    });
  }

  render() {
    return (
      <div>
        <h1>Testing the World</h1>
        <p>The current domain is: <b>{this.state.currentTab}</b></p>
        <Messages data={this.state.data} />
      </div>
    );
  }
}

export default DiscussionPage;