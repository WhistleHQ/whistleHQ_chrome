import React, { Component } from 'react';
import DiscussionPage from './DiscussionPage';
import Messages from './Messages';
import Login from './Login';
import Post from './Post';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "discussion",
      currentTab: null,
      data: null,
      sessionID: "",
      message: "",
      ajaxInProgress: 0,
    }
    this.navigate = this.navigate.bind(this);
    this.setSessionId = this.setSessionId.bind(this);
    this.clearSession = this.clearSession.bind(this);
    this.updatePosts = this.updatePosts.bind(this);
  }

  // TODO: make the resolve param two key object loggedIn: true, sessionID: etc
  // doing a get results in empty object {} if key does not exist
  getSessionId() {
    return new Promise(function (resolve, reject) {
      chrome.storage.local.get("session_id", function (items) {
        // the first time extension is ran, session_id won't be initialized
        if (Object.keys(items).length === 0) {
          chrome.storage.local.set({ "session_id": null });
          resolve(null);
        } else {
          resolve(JSON.parse(items["session_id"]));
        }
      });
    })
  }

  setSessionId(payload) {
    // stringify because storage cannot accept nested objects
    // parse it when we retrieve it
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
        // resolve(tabs[0].url.replace(/^https?\:\/\//i, ""));
        resolve(tabs[0].url);
      })
    })
  }

  updatePosts() {
    const that = this;
    fetch('https://with-auth.herokuapp.com/api/getComments', {
      method: 'post',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: this.state.currentTab })
    }).then(function (res) {
      if (res.status === 200) {
        return res.json();
      }
    }).then(function (payload) {
      that.setState({
        data: payload.info
      });
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
    // this.initSessionVar();
    const promises = [that.getTabUrl(), that.getSessionId()];
    Promise.all(promises).then(function (data) {
      that.setState({
        ajaxInProgress: that.state.ajaxInProgress + 1,
        message: "getting posts from server..."
      })
      fetch("https://with-auth.herokuapp.com/api/getComments", {
        method: 'post',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: data[0] })
      }).then(function (res) {
        if (res.status === 200) {
          return res.json();
        }
      }).then(function (payload) {
        that.setState({
          data: payload.info,
          currentTab: data[0],
          sessionID: data[1],
          ajaxInProgress: that.state.ajaxInProgress - 1,
          message: null,
        });
      });
    });
  }

  render() {
    let page = null;
    switch (this.state.page) {
      case "discussion":
        page = <DiscussionPage currentTab={this.state.currentTab} data={this.state.data} navigate={this.navigate} />
        break;
      case "login":
        page = <Login navigate={this.navigate} setSessionId={this.setSessionId} session={this.state.sessionID} />
        break;
      case "post":
        page = <Post session={this.state.sessionID} navigate={this.navigate} url={this.state.currentTab} updatePosts={this.updatePosts} />
        break;
      default:
        page = <DiscussionPage currentTab={this.state.currentTab} data={this.state.data} navigate={this.navigate} />
    }

    return (
      <div>
        <ul className="nav">
          <li onClick={() => this.navigate("discussion")}>Discuss</li>
          <li onClick={() => this.navigate("post")}>Write Post</li>
          <li onClick={() => {
            if (this.state.sessionID) {
              this.clearSession();
            } else {
              this.navigate("login");
            }
          }}>{this.state.sessionID ? "Logout" : "Login"}</li>
        </ul>
        {this.state.sessionID ?
          <div><h3>{`Welcome, ${this.state.sessionID.name}`}</h3> <p>{`Your organization is associated with: ${this.state.sessionID.domain}`}</p></div>
          : <p>You are not logged in</p>}
        {this.state.ajaxInProgress? <p className="message">{this.state.message}</p>: null}
        {page}
      </div>
    );
  }
}

export default App;