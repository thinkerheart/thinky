import {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {autorun} from 'mobx';
import {ErrorValueEnum} from 'core/domain/enum/ErrorValueEnum';

@inject("thinkyStore")
@observer
export class Introduction extends Component {

    constructor(props) {
        super(props);
        this.thinkyStore = this.props.thinkyStore;
        this.history = this.props.history;
        
        this.disposer = autorun(() => {
            if (this.thinkyStore.introductionViewModel.currentUser.id !== ""
            && this.thinkyStore.introductionViewModel.currentUser.id !== undefined) {
                this.thinkyStore.thinkViewModel.setCurrent(
                    this.thinkyStore.introductionViewModel.currentUser
                );
                this.navigateToHome();
            } else if (this.thinkyStore.introductionViewModel.defaultErrorBundle.getErrorMessage() 
            === ErrorValueEnum.current_user_account_not_found) {
                this.navigateToGettingStarted();
            }
        });

        this.checkCurrentUser();
    }

    checkCurrentUser() {
        this.thinkyStore.introductionViewModel.checkCurrentUser();
    }

    navigateToHome() {
        this.history.replace('/home');
    }

    navigateToGettingStarted() {
        this.history.replace('/gettingstarted');
    }

    dispose() {
        this.disposer();
    }

    componentWillUnmount() {
        this.dispose();
        this.thinkyStore.introductionViewModel.reinitializeStateValueProperty();
    }
}