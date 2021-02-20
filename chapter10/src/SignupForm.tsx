import React from 'react'
import {FancyButton} from "./FuncyButton"

type Props = {
    firstName: string
    userId: string
}

type State = {
    isLoading: boolean
}

class SignupForm extends React.Component<Props, State> {
    state = {
        isLoading: false
    }
    render() {
        return <>
            <h2>Sign up for a 7-day supply of our tasty toothpaste now, {this.props.firstName}.</h2>
            <FancyButton size={'Big'} text={'Sign up Now'} onClick={this.signUp} isDisable={this.state.isLoading} />
            </>
    }
    private signUp = async () => {
        this.setState({isLoading: true})
        try {
            await fetch("")
        } finally {
            this.setState({isLoading: false})
        }
    }
}
