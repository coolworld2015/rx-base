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
		} else {
			this.refs.username.value = appConfig.users.item.name;
			this.refs.password.value = appConfig.users.item.pass;
			this.refs.id.value = appConfig.users.item.id;
			this.refs.description.value = appConfig.users.item.description;
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
				{/*
				<div className="brandname">
					Login: {this.state.item.name} <br/>
					Password: {this.state.item.pass} <br/>
					ID: {this.state.item.id} <br/>
					Description: {this.state.item.description} <br/>
 				</div>
				*/}
				
                <div className="header">
					{this.state.item.name}
				</div>
				
				<div className="form">
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
						<input type="text" 
							className="input"
							ref="password"
							onChange={(event) => {
								this.setState({
									password: event.target.value,
								})
							}}
							placeholder="Password"/>
					</div>			
					
					<hr className="splitter" />
					<div>
						<input type="text" 
							className="input"
							ref="id"
							onChange={(event) => {
								this.setState({
									id: event.target.value,
								})
							}}
							placeholder="ID"/>
					</div>			
					
					<hr className="splitter" />
					<div>
						<input type="text" 
							className="input"
							ref="description"
							onChange={(event) => {
								this.setState({
									description: event.target.value,
								})
							}}
							placeholder="Description"/>
					</div>
				</div>
				
				<div onClick={this.goUsers.bind(this)}>
					<br/>
					<button className="button">
						Submit
					</button>					
					
					<button className="button">
						Delete
					</button>			
					<br/>					
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