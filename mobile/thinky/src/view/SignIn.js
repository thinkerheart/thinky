import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {autorun} from 'mobx';
import {View, Button, TextInput} from 'react-native';

@inject("thinkyStore")
@observer
export class SignIn extends Component {

    constructor(props) {
        super(props);
        this.navigation = this.props.navigation;
        this.thinkyStore = this.props.thinkyStore;

        this.disposer = autorun(() => {
            if (this.thinkyStore.signInViewModel.signedInUser.id !== ""
            && this.thinkyStore.signInViewModel.signedInUser.id !== undefined) {
                this.navigateToThinkyAppStack();
            } else {
                console.log(this.thinkyStore.signInViewModel.defaultErrorBundle.getErrorMessage());
            }
        });
    }

    navigateToThinkyAppStack() {
        this.navigation.navigate("ThinkyAppStack");
    }

    signIn() {
        this.thinkyStore.signInViewModel.signIn();
    }

    navigateToBackScreen() {
        this.navigation.goBack();
    }

    render() {
        return(
            <View>
                <TextInput
                    placeholder="User Name"
                    value={this.thinkyStore.signInViewModel.userName}
                    onChangeText={userName => this.thinkyStore.signInViewModel.setUserName(userName)}
                />
                <TextInput
                    secureTextEntry={true}
                    placeholder="Password"
                    value={this.thinkyStore.signInViewModel.password}
                    onChangeText={password => this.thinkyStore.signInViewModel.setPassword(password)}
                />
                <Button
                    title="Sign in"
                    onPress={() => this.signIn()}
                />
            </View>
        );
    }

    dispose() {
        this.disposer();
    }

    componentWillUnmount() {
        this.dispose();
        this.thinkyStore.signInViewModel.reinitializeStateValueProperty();
    }
}