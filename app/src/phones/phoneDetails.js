import React, {Component} from 'react';
import {hashHistory} from 'react-router';

class PhoneDetails extends Component {
    constructor(props) {
        super(props);
		console.log(this.props.routeParams);
    }
	
	goToSocket() {
		hashHistory.push("/phones");
	}
	
    render() {
        return (
			<div>
				<center>
				<br/>
				<div className="brandname">
					{this.props.routeParams.id} <br />
					{this.props.routeParams.name}<br />
					{this.props.routeParams.phone}
				</div>
				<div onClick={this.goToSocket.bind(this)}>
					<br/>
					<button className="button">
						Back
					</button>
					<br/>
					<br/>
					<hr/>
				</div>		
				</center>				
			</div>
        );
    }
}

export default PhoneDetails;