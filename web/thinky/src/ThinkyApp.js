import React, {Component} from 'react';
import {ThinkyStore} from "core/store/ThinkyStore";
import {Provider} from 'mobx-react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {GettingStarted} from './view/GettingStarted';
import {Home} from './view/Home';
import {Introduction} from './view/Introduction';
import {SignIn} from './view/SignIn';
import {SignUp} from './view/SignUp';

let Parse = require('parse');
Parse.initialize("thinky-parseserver-alpha-APP_ID", undefined);
Parse.serverURL = "https://thinky-parseserver-alpha.herokuapp.com/parse";
Parse.User.enableUnsafeCurrentUser();

const thinkyStore = new ThinkyStore(Parse);

const PrivateRoute = ({...props}) => checkIsLoggedIn() ? <Route {...props}/> : <Redirect to="/gettingstarted"/>;

const HomeLoggedInRoute = ({...props}) => checkIsLoggedIn() ? <Redirect to="/home"/> : <Route {...props}/>;

function checkIsLoggedIn() {
    return thinkyStore.thinkyViewModel.currentUser.id !== "" 
    && thinkyStore.thinkyViewModel.currentUser.id !== undefined; 
}

export class ThinkyApp extends Component {

    constructor(props) {
        super(props);
        thinkyStore.thinkyViewModel.checkCurrentUser();
    }

    render() {
        return (
            <Provider thinkyStore={thinkyStore}>
                <Switch>
                    <Route exact path="/" component={Introduction}/>
                    <HomeLoggedInRoute exact path="/gettingstarted" component={GettingStarted}/>
                    <HomeLoggedInRoute exact path="/signup" component={SignUp}/>
                    <HomeLoggedInRoute exact path="/signin" component={SignIn}/>
                    <PrivateRoute exact path="/home" component={Home}/>
                </Switch>
            </Provider>
        );
    }
}