import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import ListItem from './ListItem';
import Input from './Input';

class Phones extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: 'CoolWorld',
            items: []
        };
    }
	
	componentDidMount() {
		this.getItems();
	}

    getItems() {
        fetch(appConfig.url + 'api/items/get', {			
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
				'Authorization': appConfig.access_token
            }
        })
            .then((response)=> response.json())
            .then((responseData)=> {
                this.setState({
                    items: responseData.sort(this.sort),
                    filteredClients: responseData.sort(this.sort),
                    resultsCount: responseData.length
                });
            })
            .catch((error)=> {
                this.setState({
                    serverError: true
                });
            })
    }
	
	sort(a, b) {
		var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
		if (nameA < nameB) {
			return -1
		}
		if (nameA > nameB) {
			return 1
		}
		return 0;
	};
		
    showClients() {
        return this.state.items.map((item) => {
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

        hashHistory.push("/client-details/" + item.phone + "/" + item.name);
    }

    clickOnHeader() {
        var searchText = '2';

        var arr = [].concat(this.state.filteredClients);
        var items = arr.filter((el) => el.name.indexOf(searchText) >= 0);

        this.setState({
            items: items,
            resultsCount: items.length
        })
    }

    inputChange(event) {
        this.setState({
            inputTest: event.target.value
        })
    }

    render() {
		var errorCtrl;

        if (this.state.serverError) {
            errorCtrl = <div>
                Something went wrong.
            </div>;
        }

        return (
            <div>
                <div className="header" onClick={this.clickOnHeader.bind(this)}>{this.state.name}</div>
                <hr/>
                <Input
                    name="inputTest"
                    placeholder="cool"
                    ref="inputTest"
                    value={this.state.inputTest}/>
                <hr/>

                <input type="text"
                       ref="inputValue"
                       onChange={(event) => {
                           this.setState({
                               name: event.target.value,
                               inputValue: event.target.value
                           })
                       }}/>
                <hr/>

                <div className="header">
					Phones ({this.state.resultsCount})
				</div>
				
                <hr/>
				{errorCtrl}
				
                {this.showClients()}
            </div>
        )
    }
}

export default Phones;