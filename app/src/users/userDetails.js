import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import Title from '../app/title';

class UserDetails extends Component {
    constructor(props) {
        super(props);
		
		this.state = {
			item: appConfig.users.item 
		}
    }
	
	componentDidMount() {
		if (!appConfig.users.item.id) {
            hashHistory.push("/users");
		}
	}
	
	goUsers() {
		hashHistory.push("/users");
	}
	
    render() {
        return (
			<div>
				<Title/>
				
				<center>
				<div className="brandname">
					Login: {this.state.item.name} <br/>
					Password: {this.state.item.pass} <br/>
					ID: {this.state.item.id} <br/>
					Description: {this.state.item.description} <br/>
 				</div>
				
				<div onClick={this.goUsers.bind(this)}>
					<br/>
					<button className="button">
						Back
					</button>
				</div>		
				</center>				
			</div>
        );
    }
}

export default UserDetails;