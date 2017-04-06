import React, {Component} from 'react';

class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value || '',
        };
    }

    inputChange(event) {
        this.setState({
            value: this.refs.input.value
        })
    }

    render() {
        return (
            <div>
                <input type="text"
                       ref="input"
                       name={this.props.name}
                       className="className"
                       placeholder={this.props.placeholder}
                       onChange={this.inputChange.bind(this)}
                       value={this.state.value}/>
            </div>
        );
    }
}

export default Input;