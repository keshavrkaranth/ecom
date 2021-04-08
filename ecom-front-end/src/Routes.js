import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import PrivateRoute from './auth/helper/PrivateRoute';
import Home from './core/Home';
import Signup from './user/Signup';
import UserDashbord from "./user/UserDashbord";
import Signin from "./user/Signin";
import Cart from "./core/Cart";








const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/Signin" component={Signin} />
                <Route exact path="/Cart" component={Cart} />
                 <PrivateRoute path="/user/dashbord" exact component={UserDashbord} />
            </Switch>

        </BrowserRouter>

    )
}
export default Routes;