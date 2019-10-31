import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom'

import Users from './pages/user/index';
import UserProfile from './pages/user-profile/index';

const rootRoutes = () => (
    <Router>
        <div>
            {/* <Route path="/" component={App} /> */}
            <Route exact path="/" component={Users} />
            <Route exact path="/users" component={Users} />
            <Route exact path="/users/profile" component={UserProfile} />
        </div>
    </Router>
);

export default rootRoutes;