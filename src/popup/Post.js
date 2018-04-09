import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: {
                content: '',
            },
            ajaxInProgress: 0,
            message: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.setMessage = this.setMessage.bind(this);
    }

    setMessage(res) {
        let message = null;
        if (res.hasOwnProperty("error")) {
            message = <span className="error">{res.error}</span>;
        } else if (res.hasOwnProperty("save")) {
            message = <span className="save">{res.save}</span>;
        }
        return message;
    }

    handleChange(e) {
        const field = e.target.name;
        let comment = Object.assign({}, this.state.comment);
        comment[field] = e.target.value;
        return this.setState({ comment: comment });
    }

    handleSubmit(e) {
        e.preventDefault();
        const comment = this.state.comment;
        const token =  this.props.session.token;
        const url = this.props.url;
        const that = this;

        this.setState({
            ajaxInProgress: this.state.ajaxInProgress + 1
        });
        fetch("http://localhost:3000/api/putComments",{
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token: token,
                url: url,
                comment: comment.content
            })
        }).then(function(res){
            return res.json();
        }).then(function(payload){
            that.setState({
                ajaxInProgress: that.state.ajaxInProgress - 1,
                comment: {
                    content: ''
                },
                message: that.setMessage(payload),
            })
        })
    }

    render() {
        const isLoggedIn = this.props.session !== null;
        const form = (
            <form onSubmit={this.handleSubmit}>
                <h3>Create New Post</h3>
                <textarea
                    name="content"
                    id="comment-box"
                    cols="50"
                    rows="10"
                    placeholder="Enter your post here"
                    value={this.state.comment.content}
                    onChange={this.handleChange}>
                </textarea>
                <p>Mmaximum 10000 characters</p>
                <p>Current Number of characters: {this.state.comment.content.length}</p>
                <br />
                <button type="submit" disabled={this.state.ajaxInProgress > 0}>Submit Post</button>
            </form>
        )

        const redirect = (
            <div>
                <p>You need to be logged in to post</p>
                <button onClick={() => { this.props.navigate("login") }}>Log In</button>
            </div>
        )
        return (
            <div>
                {this.state.message}
                {isLoggedIn ? form : redirect}
            </div>
        );
    }
}

Post.propTypes = {
    session: PropTypes.object,
    navigate: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired,
};

export default Post;