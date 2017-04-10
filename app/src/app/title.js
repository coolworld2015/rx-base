'use strict';

import React, {Component} from 'react';
import {hashHistory} from 'react-router';

class Title extends Component {
    constructor(props) {
        super(props);
    }
	
	goToMain() {
		hashHistory.push("/main");
	}
	
    render() {
        return (
            <div className="title1" onClick={this.goToMain.bind(this)}>
				<center>
				<div className="brandname">RX-Base</div>
				<div>
					<br/>
					<img src="./logo.jpg" className="logo"/>
					<hr/>
				</div>
				</center>
            </div>
        )
    }
}

export default Title;