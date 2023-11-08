import React, { Component } from "react";
import FormularioLogin from "../components/FormularioLogin";

import { auth } from "../firebase/config";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        }
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if(user) {
                this.setState({ user });
                this.props.navigation.navigate("NavegacionTab");
            }
        })
    }

    render() {
        return(
            <FormularioLogin navigation={this.props.navigation}/>
        )
    }
}

export default Login;
