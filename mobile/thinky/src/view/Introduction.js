import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {autorun} from 'mobx';
import {ErrorValueEnum} from '../../../../core/domain/enum/ErrorValueEnum';
import {View} from 'react-native';

@inject("thinkyStore")
@observer
export class Introduction extends Component {

    constructor(props) {
        super(props);
        this.thinkyStore = this.props.thinkyStore;
        this.navigation = this.props.navigation;

        this.disposer = autorun(() => {
            if (this.thinkyStore.introductionViewModel.currentUser.id !== "" &&
                this.thinkyStore.introductionViewModel.currentUser.id !== undefined) {
                    this.navigateToThinkyAppStack();
                } else if (this.thinkyStore.introductionViewModel.defaultErrorBundle.getErrorMessage() 
                === ErrorValueEnum.current_user_account_not_found) {
                    this.navigateToAuthenticationStack();
                }
        });

        this.checkCurrentUser();
    }

    checkCurrentUser() {
        this.thinkyStore.introductionViewModel.checkCurrentUser();
    }

    navigateToThinkyAppStack() {
        this.navigation.navigate("ThinkyAppStack");
    }

    navigateToAuthenticationStack() {
        this.navigation.navigate("AuthenticationStack");
    }

    render() { return( <View/> ) }

    dispose() {
        this.disposer();
    }

    componentWillUnmount() {
        this.dispose();
        this.thinkyStore.introductionViewModel.reinitializeStateValueProperty();
    }

}