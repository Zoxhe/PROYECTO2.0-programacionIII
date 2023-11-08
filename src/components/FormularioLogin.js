import React, { Component } from 'react';

import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";

import { auth } from "../firebase/config";

class FormularioLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }

    iniciarSesion(email, password) {
        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({
                    email: "",
                    password: ""
                })
                this.props.navigation.navigate("NavegacionTab");
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        return(
            <View>
                <Text>Iniciar sesión</Text>
                <Text>Correo electrónico</Text>
                <TextInput placeholder="Email" onChangeText={(email) => this.setState({ email })} />
                <Text>Contraseña</Text>
                <TextInput placeholder="Password" onChangeText={(password) => this.setState({ password })} />
                <TouchableOpacity onPress={() => this.iniciarSesion(this.state.email, this.state.password)}>
                    <Text>Iniciar sesión</Text>
                </TouchableOpacity>
                <Text>
                    ¿Todavía no tenés una cuenta?
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Registro")}>
                        <Text> Registrarte</Text>
                    </TouchableOpacity>
                </Text>
            </View>
        )
    }
}

const Style = StyleSheet.create({
    contenedor: {
        flex: 1,
    }
});

export default FormularioLogin;
