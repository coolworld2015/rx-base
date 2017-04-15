import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import ListItem from './listItem';
import Title from '../app/title';

class SearchResults extends Component {
    constructor(props) {
        super(props);

        this.state = {
			searchQueryHttp: this.props.routeParams.name,
			searchType: this.props.routeParams.type,
            items: appConfig.search.items.slice(0, 20),
			resultsCount: 0,
            recordsCount: 25,
            positionY: 0
        };
    }
	
	componentDidMount() {		
		this.setState({
			showProgress: false,
            resultsCount: appConfig.search.items.length
        });
		
		if (appConfig.search.refresh) {
            appConfig.search.refresh = false;
			this.findByPhone();
		}
	}
	
	handleScroll() {
		var position = document.querySelector('.showMessages').scrollTop;
        var items, positionY, recordsCount;
        recordsCount = this.state.recordsCount;
        positionY = this.state.positionY;
		items = appConfig.search.items.slice(0, recordsCount);
		
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
	
    findByPhone() {
		this.setState({
            showProgress: true
        });
		
		var webUrl;
		if (this.state.searchType == 'Search by phone') {
			webUrl = 'api/items/findByPhone/'
		} else {
			webUrl = 'api/items/findByName/'
		}
		
		fetch(appConfig.url + webUrl + this.state.searchQueryHttp, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
				'Authorization': appConfig.access_token
            }
        })
            .then((response)=> response.json())
            .then((responseData)=> {
				appConfig.search.items = responseData.sort(this.sort)
                this.setState({
                    items: (responseData.sort(this.sort)).slice(0, 20),
                    filteredItems: responseData.sort(this.sort),
                    resultsCount: appConfig.search.items.length,
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

    onChangeText(e) {
		var text = e.target.value;
        var arr = [].concat(appConfig.search.items);
        var items = arr.filter((el) => el.name.toLowerCase().indexOf(text.toLowerCase()) != -1);
        this.setState({
            items: items,
            resultsCount: items.length,
            filteredItems: items,
            searchQuery: text
        })
    }
	
    clickHandle(item) {
		appConfig.search.item = {
			id: item.id,
			name: item.name,
			phone: item.phone,
			street: item.street,
			house: item.house,
			apt: item.apt,
			index: item.index
		};
        hashHistory.push("/search-details/");
    }
	
	goSearch() {
		hashHistory.push("/search");
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
					{this.state.searchQueryHttp} ({this.state.resultsCount})
				</div>
				
				<div>
					<input type="text" className="search" 
						onChange={this.onChangeText.bind(this)}
						placeholder="Search here"
					/>
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
						onClick={this.goSearch.bind(this)}>
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

export default SearchResults;