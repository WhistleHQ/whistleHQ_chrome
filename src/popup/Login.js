import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: {
                username: '',
                password: '',
            },
            ajaxInProgress: 0,
            message: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(e) {
        const field = e.target.name;
        let login = Object.assign({}, this.state.login);
        login[field] = e.target.value;
        return this.setState({ login: login });
    }

    handleSubmit(e) {
        e.preventDefault();
        const that = this;
        const login = this.state.login;
        this.setState({
            ajaxInProgress: this.state.ajaxInProgress + 1
        })
        fetch('https://with-auth.herokuapp.com/api/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: login.username,
                password: login.password
            })
        }).then(function (res) {
            return res.json();
        }).then(function (payload) {
            let error = '';
            if (payload.hasOwnProperty("token")){
                that.props.setSessionId(payload);
            } else {
                error = payload.error;
            }
            that.setState({
                ajaxInProgress: that.state.ajaxInProgress - 1,
                message: error,
            })
        })
    }

    render() {
        const loginForm = (
            <form onSubmit={this.handleSubmit} onInput={this.handleInput}>
                <label htmlFor="username">Enter Username: </label>
                <input type="text" name="username" id="username" />
                <br />
                <label htmlFor="password">Enter Password: </label>
                <input type="password" name="password" id="password" />
                <br />
                <button type="submit" disabled={this.state.ajaxInProgress > 0}>Submit</button>
                <p>Want to sign up? go to <a href="#">WhistleHQ to learn how to register</a></p>
            </form>)
        return (
            <div>
                {this.state.ajaxInProgress ? <p className="message">Please Wait, connecting to server</p>: null}
                {this.state.message ? <p className="message error">{this.state.message}</p>: null}
                {this.props.session ? <p className="message save">You Are Logged in!</p>: loginForm}
                <button onClick={() => { this.props.navigate("discussion") }}>Back to discusssion</button>
            </div>
        );
    }
}

Login.propTypes = {
    navigate: PropTypes.func.isRequired,
    setSessionId: PropTypes.func.isRequired,
    session: PropTypes.object,
}

export default Login;