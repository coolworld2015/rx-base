'use strict';

import React, {Component} from 'react';

class Login extends Component {
    constructor(props) {
        super(props);
		

        
		this.state = {
            showProgress: false,
            username: '1',
            password: '1'
        }
    }
	
	componentDidMount() {
		this.refs.username.value = '1';
		this.refs.password.value = '1';
	}
	
    onLogin() {
        if (this.state.username == undefined ||
            this.state.password == undefined) {
            this.setState({
                badCredentials: true
            });
            return;
        }

        this.setState({
            showProgress: true
        });

        fetch(window.appConfig.url + 'api/login', {
            method: 'post',
			body: JSON.stringify({
                name: this.state.username,
                pass: this.state.password,
				description: 'Android'
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response)=> response.json())
            .then((responseData)=> {
                if (responseData.token) {
					appConfig.access_token = responseData.token;
					appConfig.socket.name = this.state.name; //TODO username
					
                    this.setState({
                        badCredentials: false
                    });

                    this.props.onLogin();

                } else {
                    this.setState({
                        badCredentials: true
                    });
                }
            })
            .catch((error)=> {
                this.setState({
                    badCredentials: true
                });
            })
    }

    onLoginPressed() {
		if (this.state.name == undefined ||
            this.state.name == '') {
            this.setState({
                badCredentials: true
            });
            return;
        }
		
		appConfig.socket.name = this.state.name;
        this.props.onLogin();
    }

    render() {
        var errorCtrl;

        if (this.state.badCredentials) {
            errorCtrl = <div className="valid">
                That username and password combination did not work.
            </div>;
        }

        return (
            <div>
				<center>
				<div className="brandname">RX-Base</div>
				<div>
					<br/>
					<img src="./logo.jpg" className="logo"/>
					<hr/>
					<div className="header">Login</div>
					<br/> 
				</div>
				
				<div className="login">
					<div>
						<input type="text" 
							className="input"
							ref="username"
							onChange={(event) => {
								this.setState({
									name: event.target.value,
								})
							}}
							placeholder="Login"/>
					</div>
					<hr className="splitter" />
					<div>
						<input type="password" 
							className="input"
							ref="password"
							onChange={(event) => {
								this.setState({
									password: event.target.value,
								})
							}}
							placeholder="Password"/>
					</div>
				</div>
				
                <div onClick={this.onLogin.bind(this)}>
					<br/>
					<button className="button">Login</button>
					<br/>
					<br/>
                </div>
				
                {errorCtrl}
				</center>
            </div>
        )
    }
}

export default Login;