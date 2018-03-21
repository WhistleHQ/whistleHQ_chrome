import React, { Component } from 'react';

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(e.target);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="username">Enter Username</label>
                    <input type="text" name="username" id="username"/>
                    <br/>
                    <label htmlFor="password">Enter Password</label>
                    <input type="password" name="password" id="password"/>
                    <br/>
                    <button type="submit">Submit</button>
                </form>
                <p>Want to sign up? go to <a href="#">WhistleHQ to learn how to register</a></p>
            </div>
        );
    }
}

export default Login;