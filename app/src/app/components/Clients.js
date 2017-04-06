import React, {Component} from 'react';
import ListItem from './ListItem';
import {hashHistory} from 'react-router';
import Input from './Input';

class Clients extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: 'CoolWorld',
            clients: []
        };

        this.sort = (a, b) => {
            var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
            if (nameA < nameB) {
                return -1
            }
            if (nameA > nameB) {
                return 1
            }
            return 0;
        };

        this.getClients();
    }

    getClients() {
        fetch('http://ui-warehouse.herokuapp.com/api/clients/get')
            .then((response)=> response.json())
            .then((responseData)=> {
                this.setState({
                    clients: responseData.sort(this.sort),
                    filteredClients: responseData.sort(this.sort),
                    resultsCount: responseData.length
                });
            })
            .catch(()=> {
                this.setState({
                    serverError: true
                });
            })
    }

    showClients() {
        return this.state.clients.map((item) => {
            return (
                <ListItem
                    key={item.id}
                    item={item}
                    clickHandle={this.clickHandle.bind(this)}/>
            )
        })
    }

    clickHandle(item) {
        this.refs.inputValue.value = item.name;
        this.refs.inputTest.state.value = item.name;

        this.setState({
            name: item.name
        });

        hashHistory.push("/client-details/" + item.id + "/" + item.name);
    }

    clickOnHeader() {
        var searchText = '2';

        var arr = [].concat(this.state.filteredClients);
        var items = arr.filter((el) => el.name.indexOf(searchText) >= 0);

        this.setState({
            clients: items,
            resultsCount: items.length
        })
    }

    inputChange(event) {
        this.setState({
            inputTest: event.target.value
        })
    }

    render() {
        return (
            <div>
                <div className="header" onClick={this.clickOnHeader.bind(this)}>{this.state.name}</div>
                <hr />
                <Input
                    name="inputTest"
                    placeholder="cool"
                    ref="inputTest"
                    value={this.state.inputTest}/>
                <hr />

                <input type="text"
                       ref="inputValue"
                       onChange={(event) => {
                           this.setState({
                               name: event.target.value,
                               inputValue: event.target.value
                           })
                       }}/>
                <hr />

                <div className="header">Clients ({this.state.resultsCount})</div>
                <hr />

                {this.showClients()}

            </div>
        )
    }
}

export default Clients;