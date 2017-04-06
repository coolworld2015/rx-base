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

    getUser() {
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
            errorCtrl = <div>
                That username and password combination did not work
            </div>;
        }

        return (
            <div>
                <div onClick={this.onLoginPressed.bind(this)}>
                    LOGIN
                </div>
				
				<div>
					<hr/>
					<input type="text"
						onChange={(event) => {
						this.setState({
							name: event.target.value,
						})
					}}/>
					<hr/>
				</div>
				
                <div onClick={this.getUser.bind(this)}>
                    <button>Login</button>
                </div>
				
                {errorCtrl}
            </div>
        )
    }
}

export default Login;