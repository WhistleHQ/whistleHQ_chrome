import React, { Component } from 'react';
import Messages from './Messages';
import PropTypes from 'prop-types';

class DiscussionPage extends Component {
  render() {
    let comments = null;
    let data = this.props.data;
    if (data && data.length > 0) {
      comments = data.map(function(d, i){
        return (
          <div key={i} className="comment">
            <h3>{d.username} <span className="comment-date">{new Date(d.time).toString()}</span> </h3>
            <h4>Org Domain: <span className="comment-domain">{d.domain || "placeholder for old comments"}</span></h4>
            <p>{d.comment}</p>
          </div>
        )
      })
    } else {
      comments = (<div><p>There are no comments are this page :(</p></div>);
    }
    return (
      <div>
        <h1>Comments on this URL</h1>
        <p className="discuss-url">The current url is: <b>{this.props.currentTab}</b></p>
        {comments}
        <button onClick={() => this.props.navigate("post")}>New post</button>
      </div>
    );
  }
}

DiscussionPage.propTypes = {
  navigate: PropTypes.func.isRequired,
  currentTab: PropTypes.string,
  data: PropTypes.array,
}

export default DiscussionPage;