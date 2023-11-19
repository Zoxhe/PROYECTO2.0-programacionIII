import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { auth } from "../firebase/config";

class FormularioLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }

    iniciarSesion(email, password) {
        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({
                    email: "",
                    password: ""
                });
                this.props.navigation.navigate("NavegacionTab");
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Iniciar sesión</Text>
                <TextInput
                    placeholder="Correo electrónico"
                    style={styles.input}
                    onChangeText={(email) => this.setState({ email })}
                />
                <TextInput
                    placeholder="Contraseña"
                    style={styles.input}
                    onChangeText={(password) => this.setState({ password })}
                    secureTextEntry
                />
                <TouchableOpacity onPress={() => this.iniciarSesion(this.state.email, this.state.password)}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Iniciar sesión</Text>
                    </View>
                </TouchableOpacity>
                <Text>
                    ¿Todavía no tenés una cuenta?
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Registro")}>
                        <Text style={styles.link}> Registrarte</Text>
                    </TouchableOpacity>
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    button: {
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    link: {
        color: '#3498db',
    },
});

export default FormularioLogin;
