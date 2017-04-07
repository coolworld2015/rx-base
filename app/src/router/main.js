import React, {Component} from 'react';
import {hashHistory} from 'react-router';

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
				<div>
				<div className="brandname">RX-Base</div>
					<div>
						<br/>
						<img src="./logo.jpg" className="logo"/> 
					</div>
					<div>
						<hr/>
							<div className="items">Search items</div><br/>
							<div onClick={this.goToPhones.bind(this)} className="items">Phones</div><br/>

							<div className="items">Users</div><br/>
							<div className="items">Audit</div><br/>
							<div onClick={this.onLogOut.bind(this)} className="items">Logout</div><br/>
						<hr/>
					</div>
				</div>
				</center>
			</div>
		)
    }
}

export default Main;