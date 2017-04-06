import React, {Component} from 'react';

class ClientDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };

console.log(this.props.routeParams);
    }

    render() {
        return (
            <div>
                {this.props.routeParams.id} <br />
                {this.props.routeParams.name}
            </div>
        );
    }
}

export default ClientDetails;