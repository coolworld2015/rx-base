import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import ListItem from './listItem';
import Title from '../app/title';

class Users extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showProgress: false,
            items: appConfig.users.items.slice(0, 20),
			resultsCount: 0
        };
    }
	
	componentDidMount() {
		this.setState({
            resultsCount: appConfig.users.items.length
        });
		
		if (appConfig.users.refresh) {
            appConfig.users.refresh = false;
			this.getItems();
		}
	}

    getItems() {
		this.setState({
            showProgress: true
        });
		
        fetch(appConfig.url + 'api/users/get', {			
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
				'Authorization': appConfig.access_token
            }
        })
            .then((response)=> response.json())
            .then((responseData)=> {
				appConfig.users.items = responseData.sort(this.sort)
                this.setState({
                    items: (responseData.sort(this.sort)).slice(0, 20),
                    filteredClients: responseData.sort(this.sort),
                    resultsCount: appConfig.users.items.length,
					showProgress: false
                });
            })
            .catch((error)=> {
                this.setState({
                    serverError: true,
					showProgress: false
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
		appConfig.users.item = {
			id: item.id,
			name: item.name,
			pass: item.pass,
			description: item.description
		};
        hashHistory.push("/user-item/");
    }
	
	goToMain() {
		hashHistory.push("/main");
	}
	
    render() {
		var errorCtrl, loading;

        if (this.state.serverError) {
            errorCtrl = <div className="valid">
				Something went wrong.
            </div>;
        }
		
        if (this.state.showProgress) {
            loading = <div className="loading">
                <span>Loading...</span>
            </div>;
        }
		
        return (
            <div>
				<Title/>
				
                <div className="header">
					Users ({this.state.resultsCount})
				</div>
				
				<div>
					<input type="text" className="search" placeholder="Search here"/>
				</div>
				
				{loading}
				
				<div className="showMessages">
					{this.showClients()}
				</div>
									
				<div className="showButtons">
					<center>
					<hr/>
					{errorCtrl}
					<br/>
					<button className="button"
						onClick={this.goToMain.bind(this)}>
						Add
					</button>
	
					<button className="button"
						onClick={this.goToMain.bind(this)}>
						Back
					</button>
					<br/>
					<br/>
					</center>
				</div>

            </div>
        )
    }
}

export default Users;