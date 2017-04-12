import React from 'react';
import {Route, IndexRoute} from 'react-router';
import Root from './root';
import Main from './main';

import Phones from '../phones/phones';
import PhoneDetails from '../phones/phoneDetails';

import Audit from '../audit/audit';
import AuditDetails from '../audit/auditDetails';

export default (
    <Route path="/" component={Root}>
	
        <IndexRoute component={Main}/>
		<Route path="main" component={Main}/>
		
		<Route path="phones" component={Phones}/>
		<Route path="phone-item" component={PhoneDetails}/>
		
		<Route path="audit" component={Audit}/>
		<Route path="audit-item" component={AuditDetails}/>
    </Route>
);