import React from 'react';
import {Route, IndexRoute} from 'react-router';
import Root from './root';
import Phones from '../phones/phones';
import PhoneDetails from '../phones/phoneDetails';
import Main from './main';

export default (
    <Route path="/" component={Root}>
	
        <IndexRoute component={Main}/>
		<Route path="main" component={Main}/>
		
		<Route path="phones" component={Phones}/>
		<Route path="phone-details">
            <Route path=":id/:name/:phone" component={PhoneDetails}/>
        </Route>
    </Route>
);