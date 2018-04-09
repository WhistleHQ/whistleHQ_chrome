import React, { Component } from 'react';
import Messages from './Messages';

class DiscussionPage extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     comments: null
  //   }
  // }

  // componentWillMount() {
  //   if (data) {

  //   }
  // }

  render() {
    let comments = null;
    let data = this.props.data;
    if (data && data.length > 0) {
      comments = data.map(function(d, i){
        return (
          <div key={i}>
            <h3>{d.username}</h3>
            <h4>{d.domain || "placeholder for old comments"}</h4>
            <h5>{new Date(d.time).toString()}</h5>
            <p>{d.comment}</p>
          </div>
        )
      })
    } else {
      comments = (<div><p>There are no comments are this page :(</p></div>);
    }
    console.log(comments);
    return (
      <div>
        <h1>Comments on this URL</h1>
        <p className="discuss-url">The current url is: <b>{this.props.currentTab}</b></p>
        {comments}
      </div>
    );
  }
}

export default DiscussionPage;