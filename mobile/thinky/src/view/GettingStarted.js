import React, {Component} from 'react';
import {Button, View} from 'react-native';

export class GettingStarted extends Component {

    constructor(props) {
        super(props);
        this.navigation = this.props.navigation;
    }

    navigateToSignUp() {
        this.navigation.navigate("SignUp");
    }

    navigateToSignIn() {
        this.navigation.navigate("SignIn");
    }

    render() {
        return(
            <View>
                <Button
                    title="SignUp"
                    onPress={() => this.navigateToSignUp()}
                />

                <Button
                    title="SignIn"
                    onPress={() => this.navigateToSignIn()}
                />
            </View>
        );    
    }
}