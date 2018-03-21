import React, { Component } from 'react';
import DiscussionPage from './DiscussionPage';
import Messages from './Messages';
import Login from './Login';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "discussion"
    }

    this.switchPage = this.switchPage.bind(this);
  }


  switchPage(e) {
    console.log(e.target.getAttribute("data-page"));
    console.log(e.target.nodeName);
    if (e.target.nodeName === "LI") {
      const pageName = e.target.getAttribute("data-page");
      this.setState({
        page: pageName
      });
    }
  }

  render() {
    let page = null;
    switch (this.state.page) {
      case "discussion":
        page = <DiscussionPage />
        break;
      case "login":
        page = <Login />
        break;
      default:
        page = <DiscussionPage />
    }
    return (
      <div>
          <ul onClick={this.switchPage} className="nav">
            <li data-page={"discussion"}>Discuss</li>
            <li data-page={"login"}>Login</li>
          </ul>
        {page}
      </div>
    );
  }
}

export default App;