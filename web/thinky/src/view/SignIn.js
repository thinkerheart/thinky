import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {autorun} from 'mobx';
import {TextField, Button} from '@material-ui/core';

@inject("thinkyStore")
@observer
export class SignIn extends Component {

    constructor(props) {
        super(props);
        this.history = this.props.history;
        this.thinkyStore = this.props.thinkyStore;

        this.disposer = autorun(() => {
            if (this.thinkyStore.signInViewModel.signedInUser.id !== ""
            && this.thinkyStore.signInViewModel.signedInUser.id !== undefined) {
                this.thinkyStore.thinkyViewModel.setCurrentUser(
                    this.thinkyStore.signInViewModel.signedInUser
                );
                this.navigateToHome();
            } else {
                console.log(this.thinkyStore.signInViewModel.defaultErrorBundle.getErrorMessage());
            }
        });
    }

    navigateToHome() {
        this.history.replace('/home');
    }

    signIn() {
        this.thinkyStore.signInViewModel.signIn();
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
                    value={this.thinkyStore.signInViewModel.userName}
                    onChange={_event => this.thinkyStore.signInViewModel.setUserName(_event.target.value)}
                /><br/>

                <TextField
                    id="txfPassword"
                    label="Password"
                    type="password"
                    value={this.thinkyStore.signInViewModel.password}
                    onChange={_event => this.thinkyStore.signInViewModel.setPassword(_event.target.value)}
                /><br/>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => this.signIn()}
                >Sign in</Button>
            </div>
        );
    }
}