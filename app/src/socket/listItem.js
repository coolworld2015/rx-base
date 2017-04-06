'use strict';

import React, { Component } from 'react';

class ListItem extends Component {
    constructor(props) {
        super(props);
 
    }

    render() {
		if (this.props.item.message != 'still alive') {
			if (this.props.item.name == appConfig.socket.name) {
				return (
					<div>
						<hr/>
						{this.props.item.message}
						{this.props.item.date}
						{this.props.item.name}
					</div>
				);
			} else {
				return (
					<div>
						<hr/>
						{this.props.item.message}
						{this.props.item.date}
						{this.props.item.name}
					</div>
				);				
			}
		} else {
			return null;
		}
    }
}

export default ListItem;