import React, {Component} from 'react';

class AboutPage extends Component {
    constructor(props) {
		super(props);
		
		this.state = {
            title: 'About'
        };
	}
	render() {
		return (
		  <div>
			<h1>{this.state.title}</h1>
			<p>This application uses React, Redux, React Router and a variety of other helpful libraries.</p>
		  </div>
		);
	}
}

export default AboutPage;
