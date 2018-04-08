import React, { Component } from 'react';
import DiscussionPage from './DiscussionPage';
import Messages from './Messages';
import Login from './Login';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "discussion",
      currentTab: null,
      data: {},
      sessionID: "",
    }
    this.switchPage = this.switchPage.bind(this);
    this.navigate = this.navigate.bind(this);
    this.setSessionId = this.setSessionId.bind(this);
    this.clearSession = this.clearSession.bind(this);
  }

  // TODO: make the resolve param two key object loggedIn: true, sessionID: etc
  // doing a get results in empty object {} if key does not exist
  getSessionId() {
    return new Promise(function (resolve, reject) {
      chrome.storage.local.get("session_id", function (items) {
        resolve(JSON.parse(items["session_id"]));
      });
    })
  }

  setSessionId(payload) {
    chrome.storage.local.set({ "session_id": JSON.stringify(payload) });
    this.setState({
      sessionID: payload
    })
  }

  clearSession() {
    chrome.storage.local.set({ "session_id": null });
    this.setState({
      sessionID: null
    })
  }

  getTabUrl() {
    return new Promise(function (resolve, reject) {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        resolve(tabs[0].url.replace(/^https?\:\/\//i, ""));
      })
    })
  }

  // used for changing views on the extension,
  // pass in the name of the conponent and add it to the switch statement
  // under the render function
  navigate(location) {
    return this.setState({ page: location });
  }

  componentWillMount() {
    const that = this; // ref to react object for the callback
    const promises = [that.getTabUrl(), that.getSessionId()];
    Promise.all(promises).then(function (data) {
      that.setState({
        currentTab: data[0],
        sessionID: data[1],
      })
      // fetch(`http://www.whistlehq.com/api/posts/${data[0]}`)
      //   .then(function(res){
      //     if (res.status === 200) {
      //       return res.json();
      //     }
      //   }).then(function(payload){
      //     that.setState({
      //       data: payload.data,
      //       currentTab: data[0],
      //       sessionID: data[1]
      //     });
      //   });
    });
  }

  switchPage(e) {
    if (e.target.nodeName === "LI") {
      const pageName = e.target.getAttribute("data-page");
      this.setState({
        page: pageName
      });
    }
  }

  render() {
    let page = null;
    let login = "Not logged in";

    switch (this.state.page) {
      case "discussion":
        page = <DiscussionPage currentTab={this.state.currentTab} />
        break;
      case "login":
        page = <Login navigate={this.navigate} setSessionId={this.setSessionId} session={this.state.sessionID}/>
        break;
      default:
        page = <DiscussionPage currentTab={this.state.currentTab} />
    }

    if (this.state.sessionID) {
      login = <div><h3>{`Welcome, ${this.state.sessionID.name}`}</h3> <p>{`Your domain is ${this.state.sessionID.domain}`}</p></div>;
    }

    return (
      <div>
        <ul onClick={this.switchPage} className="nav">
          <li data-page={"discussion"}>Discuss</li>
          {this.state.sessionID ? <li onClick={this.clearSession}> Logout </li> : <li data-page={"login"}>Login</li>}
        </ul>
        <h3>{login}</h3>
        {page}
      </div>
    );
  }
}

export default App;