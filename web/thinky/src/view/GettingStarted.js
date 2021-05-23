import React, {Component} from 'react';
import Button from '@material-ui/core/Button'

export class GettingStarted extends Component {

    constructor(props) {
        super(props);
        this.history = this.props.history;
    }
    
    navigateToSignUp() {
        this.history.push('/signup');
    }

    navigateToSignIn() {
        this.history.push('/signin');
    }

    render() {
        return(
            <div>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => this.navigateToSignUp()}>
                    Sign up
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => this.navigateToSignIn()}>
                    Sign in
                </Button>
            </div>
        );
    }
}