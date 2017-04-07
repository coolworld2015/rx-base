import React, {Component} from 'react';

class ListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    clickOnItem() {
        this.props.clickHandle(this.props.item);
    }

    render() {
        return (
			<div className="socket1" onClick={this.clickOnItem.bind(this)}>
				{this.props.item.message}<br/>
				<div className="span">{this.props.item.name}</div>
				<div className="span1">{this.props.item.phone}</div>
			</div>
        );
    }
}

module.exports = ListItem;