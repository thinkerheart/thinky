import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {autorun} from 'mobx';
import {View, Button, TextInput, Platform, ToastAndroid, Alert} from 'react-native';

@inject("thinkyStore")
@observer
export class SignUp extends Component {

    constructor(props) {
        super(props);
        this.navigation = this.props.navigation;
        this.thinkyStore = this.props.thinkyStore;

        this.disposer = autorun(() => {
            if (this.thinkyStore.signUpViewModel.signedUpUser.id !== ""
            && this.thinkyStore.signUpViewModel.signedUpUser.id !== undefined) {
                this.notifyMessage("Signed up successfully");
                this.navigateToThinkyAppStack();
            } else {
                this.notifyMessage("Signed up unsuccessfully");
                console.log(this.thinkyStore.signUpViewModel.defaultErrorBundle.getErrorMessage());
            }
        });
    }

    notifyMessage(msg) {
        if (Platform.OS === 'android') {
            ToastAndroid.show(msg, ToastAndroid.SHORT);
        } else {
            Alert.alert(msg);
        }
    }

    navigateToThinkyAppStack() {
        this.navigation.navigate("ThinkyAppStack");
    }

    signUp() {
        this.thinkyStore.signUpViewModel.signUp();
    }

    navigateToBackScreen() {
        this.navigation.goBack();
    }

    render() {
        return(
            <View>
                <TextInput
                    placeholder="User Name"
                    value={this.thinkyStore.signUpViewModel.userName}
                    onChangeText={userName => this.thinkyStore.signUpViewModel.setUserName(userName)}
                />
                <TextInput
                    secureTextEntry={true}
                    placeholder="Password"
                    value={this.thinkyStore.signUpViewModel.password}
                    onChangeText={password => this.thinkyStore.signUpViewModel.setPassword(password)}
                />
                <TextInput
                    placeholder="First name"
                    value={this.thinkyStore.signUpViewModel.firstName}
                    onChangeText={firstName => this.thinkyStore.signUpViewModel.setFirstName(firstName)}
                />
                <TextInput
                    placeholder="Last name"
                    value={this.thinkyStore.signUpViewModel.lastName}
                    onChangeText={lastName => this.thinkyStore.signUpViewModel.setLastName(lastName)}
                />
                <Button
                    title="Sign up"
                    onPress={() => {
                        this.signUp()
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
        this.thinkyStore.signUpViewModel.reinitializeStateValueProperty();
    }
}