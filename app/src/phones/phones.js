import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import ListItem from './listItem';
import Title from '../app/title';

class Phones extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showProgress: false,
            items: appConfig.phones.items.slice(0, 20),
			resultsCount: 0,
            recordsCount: 25,
            positionY: 0
        };
    }

	componentDidMount() {
		this.setState({
            resultsCount: appConfig.phones.items.length
        });
		
		if (appConfig.phones.refresh) {
            appConfig.phones.refresh = false;
			this.getItems();
		}
	}
	
	handleScroll() {
		var position = document.querySelector('.showMessages').scrollTop;
        var items, positionY, recordsCount;
        recordsCount = this.state.recordsCount;
        positionY = this.state.positionY;
		items = appConfig.phones.items.slice(0, recordsCount);
		
		if (position > positionY) {
			console.log(items.length);
			console.log(position);
            this.setState({
                items: items,
                recordsCount: recordsCount + 20,
                positionY: positionY + 1000
            });
        }
	}
	
    getItems() {
		this.setState({
            showProgress: true
        });
		
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
				appConfig.phones.items = responseData.sort(this.sort)
                this.setState({
                    items: (responseData.sort(this.sort)).slice(0, 20),
                    filteredClients: responseData.sort(this.sort),
                    resultsCount: appConfig.phones.items.length,
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
		
    makeItems() {
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
		appConfig.phones.item = {
			id: item.id,
			name: item.name,
			phone: item.phone,
			street: item.street,
			house: item.house,
			apt: item.apt,
			index: item.index
		};
        hashHistory.push("/phone-details/");
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
					Phones ({this.state.resultsCount})
				</div>
				
				<div>
					<input type="text" className="search" placeholder="Search here"/>
				</div>
				
				{loading}
				
				<div onScroll={this.handleScroll.bind(this)} className="showMessages">
					{this.makeItems()}
				</div>
									
				<div className="showButtons">
					<center>
					<hr/>
					{errorCtrl}
					<br/>
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

export default Phones;