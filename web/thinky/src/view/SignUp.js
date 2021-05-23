import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {autorun} from 'mobx';
import {TextField, Button} from '@material-ui/core';

@inject("thinkyStore")
@observer
export class SignUp extends Component {

    constructor(props) {
        super(props);
        this.history = this.props.history;
        this.thinkyStore = this.props.thinkyStore;

        this.disposer = autorun(() => {
            if (this.thinkyStore.signUpViewModel.signedUpUser.id !== ""
            && this.thinkyStore.signUpViewModel.signedUpUser.id !== undefined) {
                this.thinkyStore.thinkyViewModel.setCurrentUser(
                    this.thinkyStore.signUpViewModel.signedUpUser
                );
                this.navigateToHome();
            } else {
                console.log(this.thinkyStore.signUpViewModel.defaultErrorBundle.getErrorMessage());
            }
        });
    }

    navigateToHome() {
        this.history.replace('/home');
    }

    signUp() {
        this.thinkyStore.signUpViewModel.signUp();
    }

    navigateToBackScreen() {
        this.history.goBack();
    }

    render() {
        return(
            <div>
                <TextField
                    id="txfUserName"
                    label="Username"
                    value={this.thinkyStore.signUpViewModel.userName}
                    onChange={_event => this.thinkyStore.signUpViewModel.setUserName(_event.target.value)}
                /><br/>

                <TextField
                    id="txfPassword"
                    label="Password"
                    type="password"
                    value={this.thinkyStore.signUpViewModel.password}
                    onChange={_event => this.thinkyStore.signUpViewModel.setPassword(_event.target.value)}
                /><br/>

                <TextField
                    id="txfFirstName"
                    label="Firstname"
                    value={this.thinkyStore.signUpViewModel.firstName}
                    onChange={_event => this.thinkyStore.signUpViewModel.setFirstName(_event.target.value)}
                /><br/>

                <TextField
                    id="txflastName"
                    label="Lastname"
                    value={this.thinkyStore.signUpViewModel.lastName}
                    onChange={_event => this.thinkyStore.signUpViewModel.setLastName(_event.target.value)}
                /><br/>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => this.signUp()}
                >Sign up</Button>
            </div>
        );
    }
}