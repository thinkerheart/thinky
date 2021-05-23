import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { Button, Text, View } from "react-native";
import {autorun} from 'mobx';

@inject("thinkyStore")
@observer
export class Home extends Component {

    constructor(props) {
        super(props);
        this.navigation = this.props.navigation;
        this.thinkyStore = this.props.thinkyStore;

        this.disposer = autorun(() => {
            if (this.thinkyStore.homeViewModel.isSignOut === true)
                this.navigateToAuthenticationStack();
            else
                console.log(this.thinkyStore.homeViewModel.defaultErrorBundle.getErrorMessage());
        });
    }

    navigateToAuthenticationStack() {
        this.navigation.navigate("AuthenticationStack");
    }

    signOut() {
        this.thinkyStore.homeViewModel.signOut();
    }

    render() {
        return(
            <View>
                <Button
                    title="Sign out"
                    onPress={() => {
                        this.signOut();
                        this.navigateToAuthenticationStack();
                    }}
                />
            </View>
        );
    }

    dispose() {
        this.disposer();
    }

    componentWillUnmount() {
        this.dispose();
        this.thinkyStore.homeViewModel.reinitializeStateValueProperty();
    }
}