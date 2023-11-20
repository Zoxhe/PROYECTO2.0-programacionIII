import React, { Component } from "react";
import FormularioLogin from "../components/FormularioLogin";
import { auth } from "../firebase/config";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        };
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user });
                this.props.navigation.navigate("NavegacionTab");
            }
        });
    }

    render() {
        return (
            <div style={styles.container}>
                <FormularioLogin navigation={this.props.navigation} />
            </div>
        );
    }
}

const styles = {
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#F5B7B1",
        color: "#333",

        borderRadius: "10px", // Bordes redondeados
    },
};

export default Login;


