import React from 'react';
import {Route, IndexRoute} from 'react-router';
import Root from './root';
import Phones from '../phones/phones';
import PhoneDetails from '../phones/phoneDetails';
import Header from './Header';
export default (
    <Route path="/" component={Root}>
	
        <IndexRoute component={Header}/>
		<Route path="header" component={Header}/>
		
		<Route path="phones" component={Phones}/>
		<Route path="phone-details">
            <Route path=":id/:name/:phone" component={PhoneDetails}/>
        </Route>
    </Route>
);