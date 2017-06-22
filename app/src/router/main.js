'use strict';

import React, {Component} from 'react';
import {hashHistory} from 'react-router';

import Title from '../app/title';

class Main extends Component {
    constructor(props) {
        super(props);
    }
	
	goSearch() {
		hashHistory.push("/search");
	}
	
	goPhones() {
		hashHistory.push("/phones");
	}	
	
	goUsers() {
		hashHistory.push("/users");
	}
	
	goAudit() {
		hashHistory.push("/audit");
	}
	
	onLogOut() {
        appConfig.onLogOut();
    }
	
    render() {
		return (
			<div>
				<div className="top">
					<div className="header">
						RX-Base
					</div>
				</div>
				
				<div className="middle-menu">
					<hr/>
					<div onClick={this.goSearch.bind(this)} className="items-menu">Search</div><hr/>
					<div onClick={this.goPhones.bind(this)} className="items-menu">Phones</div><hr/>
					<div onClick={this.goUsers.bind(this)} className="items-menu">Users</div><hr/>
					<div onClick={this.goAudit.bind(this)} className="items-menu">Audit</div><hr/>
					<div onClick={this.onLogOut.bind(this)} className="items-menu">Logout</div><hr/>
				</div>
			</div>
		)
    }
}

export default Main;