import React, {Component} from 'react';

class Test extends Component {
	constructor(props) {
		super(props);
		
        this.state = {
            access_token: window.appConfig.access_token
        }
	}
	
	onLogOut() {
        window.appConfig.onLogOut();
    }
 
	render() {
		return (
			<div>
				<div>
					<hr/>
					{appConfig.socket.name}
				</div>
								
				<div onClick={this.onLogOut.bind(this)}>
					<hr/>
					Logout
				</div>
 
				<div>
					<hr/>
					{this.state.access_token}
					<hr/>
				</div>
			</div>
		);
	}
}

export default Test;