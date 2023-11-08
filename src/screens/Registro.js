import React, { Component } from "react";
import FormularioRegistro from "../components/FormularioRegistro";

import { auth } from "../firebase/config";

class Registro extends Component {
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
            <FormularioRegistro navigation={this.props.navigation}/>
        )
    }
}

export default Registro;
