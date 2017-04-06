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
            <div onClick={this.clickOnItem.bind(this)}>
                <h4>{this.props.item.name} - {this.props.item.phone}</h4>
                <hr/>
            </div>
        );
    }
}

module.exports = ListItem;