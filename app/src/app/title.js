'use strict';

import React, {Component} from 'react';

class Title extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
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