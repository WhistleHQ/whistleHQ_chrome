import React, { Component } from 'react';
import Messages from './Messages';

class DiscussionPage extends Component {
  render() {
    return (
      <div>
        <h1>Comments on this URL</h1>
        <p>The current url is: <b>{this.props.currentTab}</b></p>
      </div>
    );
  }
}

export default DiscussionPage;