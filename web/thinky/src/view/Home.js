import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import {autorun} from 'mobx';
import Button from '@material-ui/core/Button';
import {UserAccountUIModel} from 'core/adapter/model/UserAccountUIModel';

@inject("thinkyStore")
@observer
export class Home extends Component {

    constructor(props) {
        super(props);
        this.history = this.props.history;
        this.thinkyStore = this.props.thinkyStore;

        this.disposer = autorun(() => {
            if (this.thinkyStore.homeViewModel.isSignOut === true) {
                this.thinkyStore.thinkViewModel.setCurrentUser(new UserAccountUIModel());
                this.navigateToGettingStarted();
            } else
                console.log(this.thinkyStore.homeViewModel.defaultErrorBundle.getErrorMessage());
        });
    }

    navigateToGettingStarted() {
        this.history.replace('/gettingstarted');
    }

    signOut() {
        this.thinkyStore.homeViewModel.signOut();
    }

    render() {
        return(
            <div>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => this.signOut()}
                >Sign out</Button>
            </div>
        );
    }
}