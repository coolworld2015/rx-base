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

        fetch('http://ui-base.herokuapp.com/api/users/findByName/'
            + this.state.username, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response)=> response.json())
            .then((responseData)=> {
                if (this.state.password == responseData.pass) {

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

                <div onClick={this.getUser.bind(this)}>
                    getUser
                </div>
                {errorCtrl}
            </div>
        )
    }
}

export default Login;
