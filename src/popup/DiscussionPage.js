import React, { Component } from 'react';
import Messages from './Messages';

class DiscussionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: "placeholder",
      comments: {},
    }
    this.extractHostname = this.extractHostname.bind(this);
    this.extractRootDomain = this.extractRootDomain.bind(this);
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

  componentWillMount() {
    const that = this; // ref to react object for the callback
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      that.setState({
        currentTab: that.extractRootDomain(tabs[0].url)
      })
    });
  }

  componentDidMount() {
    const DEMO_URL = "http://www.whistlehq.com/demo";
    const that = this;

    fetch(DEMO_URL)
      .then(function (res) {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then(function (data) {
        that.setState({
          comments: data
        })
      })
  }


  render() {
    return (
      <div>
        <h1>Testing the World</h1>
        <p>The current domain is: <b>{this.state.currentTab}</b></p>
        <Messages comments={this.state.comments} />
      </div>
    );
  }
}

export default DiscussionPage;