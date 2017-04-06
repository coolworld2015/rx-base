import React, { Component } from 'react';

import ListItem from './listItem';

class Socket extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
 
			messages: [],
			messageText: '',
			showProgress: true
		}
		
		window.ws = new WebSocket('ws://ui-socket.herokuapp.com');
		
		ws.onerror = (e) => {
			this.message = 'error'
		};
		
		ws.onopen = () => {
			ws.send('Hello ' + appConfig.socket.name + ' !!!'); 
			this.setState({
				showProgress: false
			});
		};

		ws.onmessage = (e) => {
			let d = new Date; 
			let messageObject = e.data;
			this.state.messages.unshift({
				id: +new Date(),
				name: messageObject.split('###')[1],
				date: d.toTimeString().split(' ')[0],
				message: messageObject.split('###')[0]
			})
			
			this.setState({
				showProgress: false
			});
		};
		
	}
 
 	goSend() {
		if (this.state.messageText == '') {
			this.setState({
				invalidValue: true
			});
			return;
		}
		
		let messageObject;
		messageObject = this.state.messageText + '###' + appConfig.socket.name;
		
		ws.send(messageObject); //TODO
		this.setState({
			messageText: '',
			showProgress: true
		});
	}
	
    onChangeText(text) {
        this.setState({
            messageText: text
        })
    }

    showMessages() {
        return this.state.messages.map((item) => {
            return (
                <ListItem
                    key={item.id}
                    item={item}
				/>
            )
        })
    }
	
	render() {
        var errorCtrl, loader;

        if (this.state.serverError) {
            errorCtrl = 'Something went wrong.'
        }

        if (this.state.showProgress) {
            loader = <div style={{
                justifyContent: 'center',
                height: 100
            }}>
                loader
            </div>;
        }
		
		return (
			<div>
				<div>
					<hr/>
					<input type="text"
						onChange={(event) => {
						this.setState({
							messageText: event.target.value,
						})
					}}/>
					<br/>
					<br/>
				</div>	
				
				<div onClick={this.goSend.bind(this)}>
					<button>Send</button>
					<br/>
				</div>
				
 				<div>
					{loader}
					{this.showMessages()}
					<hr/>
				</div>	
			</div>
		);
	}
}

export default Socket;