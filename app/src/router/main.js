'use strict';

import React, {Component} from 'react';
import {hashHistory} from 'react-router';

import Title from '../app/title';

class Main extends Component {
    constructor(props) {
        super(props);
    }
	
	goToPhones() {
		hashHistory.push("/phones");
	}
	
	onLogOut() {
        appConfig.onLogOut();
    }
	
    render() {
		return (
			<div>
				<center>
				<Title/> 

				<div>
					<div className="items">Search items</div><br/>
					<div onClick={this.goToPhones.bind(this)} className="items">Phones</div><br/>

					<div className="items">Users</div><br/>
					<div className="items">Audit</div><br/>
					<div onClick={this.onLogOut.bind(this)} className="items">Logout</div><br/><hr/>
				</div>
 
				</center>
			</div>
		)
    }
}

export default Main;