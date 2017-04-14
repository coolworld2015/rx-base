import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import Title from '../app/title';

class PhoneDetails extends Component {
    constructor(props) {
        super(props);
		
		this.state = {
			item: appConfig.phones.item 
		}
		
		//console.log(this.props.routeParams);
    }
	
	componentDidMount() {
		if (!appConfig.phones.item.id) {
            hashHistory.push("/phones");
		}
	}
	
	goPhones() {
		hashHistory.push("/phones");
	}
	
    render() {
        return (
			<div>
				<Title/>
				
				<center>
				<div className="brandname">
					<hr/>
					{this.state.item.name} <br/>
					{this.state.item.phone} <br/>
					Street: {this.state.item.street} <br/>
					House: {this.state.item.house} <br/>
					Apt: {this.state.item.apt} <br/>
					Index: {this.state.item.index} <br/>
					ID: {this.state.item.id} <br/>
					<hr/>
 				</div>
				
				<div onClick={this.goPhones.bind(this)}>
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

export default PhoneDetails;