import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import ListItem from './listItem';

class Phones extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: 'CoolWorld',
            items: [],
			resultsCount: 0
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
                    items: (responseData.sort(this.sort)).slice(0, 10),
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
        hashHistory.push("/phone-details/" + item.id + "/" + item.name + "/" + item.phone);
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
                <div className="header">
					Phones ({this.state.resultsCount})
				</div>
				
 
				{errorCtrl}
				
                {this.showClients()}
            </div>
        )
    }
}

export default Phones;