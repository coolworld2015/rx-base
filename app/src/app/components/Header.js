import React, {Component} from 'react';
import {Link} from 'react-router';

class Header extends Component {
    constructor(props) {
        super(props);
    }
	
	onLogOut() {
        appConfig.onLogOut();
    }
	
	render() {
		return (
			<nav>
				<Link to="/home">Home</Link>
				{" | "}
				<Link to="/about">About</Link>
				{" | "}
				<Link to="/clients">Clients</Link>
				{" | "}
				<Link to="/client-details/1/cool">Client-details</Link>
				{" | "}
				<Link to="/phones">Phones</Link>				
				{" | "}
				<Link to="/test">Test</Link>
				{" | "}
				<Link to="/socket">Socket</Link>
				{" | "}
				<Link to="/" onClick={this.onLogOut.bind(this)}>Logout</Link>
			</nav>
		);
	}
};

export default Header;