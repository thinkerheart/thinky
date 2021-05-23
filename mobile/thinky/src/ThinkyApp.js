import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {ThinkyStore} from '../../../core/store/ThinkyStore';
import {Provider} from "mobx-react";
import {Home} from './view/Home';
import {Introduction} from './view/Introduction';
import {GettingStarted} from './view/GettingStarted';
import {SignIn} from './view/SignIn';
import {SignUp} from './view/SignUp';
import { AsyncStorage } from 'react-native'; 

const Parse = require('parse/react-native.js');
Parse.setAsyncStorage(AsyncStorage);
Parse.initialize("thinky-parseserver-alpha-APP_ID", undefined);
Parse.serverURL = 'https://thinky-parseserver-alpha.herokuapp.com/parse';
Parse.User.enableUnsafeCurrentUser();

const thinkyStore = new ThinkyStore(Parse);

const ThinkyAppStack = createStackNavigator({
    Home: Home
}, {
    headerMode: "none"
});

const AuthenticationStack = createStackNavigator({
    GettingStarted: GettingStarted,
    SignUp: SignUp,
    SignIn: SignIn
}, {
    headerMode: "none"
});

const AppNavigator = createSwitchNavigator({
    Introduction: Introduction,
    ThinkyAppStack: ThinkyAppStack,
    AuthenticationStack: AuthenticationStack
}, {
    initialRouteName: "Introduction",
    headerMode: "none"
});

const AppContainer = createAppContainer(AppNavigator);

export class ThinkyApp extends Component {

    render() {
        return(
            <Provider thinkyStore={thinkyStore}>
                <AppContainer/>
            </Provider>
        );
    }
}