import React, { Component } from 'react';

import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";

import { auth, db } from "../firebase/config";

class FormularioRegistro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            nombre: "",
            miniBio: "",
            fotoPerfil: ""
        }
    }

    registrarse(email, password, nombre, miniBio, fotoPerfil) {
        // COLECCION A USAR --> "users" (SOLO PARA miniBio y fotoPerfil [la URL, la imagen se guarda en storage])
        auth.createUserWithEmailAndPassword(email, password)
            .then((data) => {
                db.collection("users").doc(data.user.uid).set({
                    email: email,
                    nombre: nombre,
                    miniBio: miniBio,
                    fotoPerfil: fotoPerfil
                })
                .then(() => {
                    console.log("Usuario registrado");
                    this.setState({
                        email: "",
                        password: "",
                        nombre: "",
                        miniBio: "",
                        fotoPerfil: ""
                    })
                })
                .catch((error) => {
                    console.log(error);
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        return(
            <View>
                <Text>Registrarse</Text>
                <Text>Correo electrónico</Text>
                <TextInput placeholder="Email" onChangeText={(email) => this.setState({ email })} />

                <Text>Contraseña</Text>
                <TextInput placeholder="Password" onChangeText={(password) => this.setState({ password })} />

                <Text>Nombre de usuario</Text>
                <TextInput placeholder="Usuario" onChangeText={(nombre) => this.setState({ nombre })} />

                <Text>Bio</Text>
                <TextInput placeholder="Bio" onChangeText={(miniBio) => this.setState({ miniBio })} />
                
                <Text>Foto de perfil</Text>
                <TextInput placeholder="Foto de perfil" onChangeText={(fotoPerfil) => this.setState({ fotoPerfil })} />


                <TouchableOpacity onPress={() => this.registrarse(this.state.email, this.state.password, this.state.nombre, this.state.miniBio, this.state.fotoPerfil)}>
                    <Text>Registrarse</Text>
                </TouchableOpacity>
                <Text>
                    ¿Ya tienes una cuenta?
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Login")}>
                        <Text> Iniciá sesión</Text>
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

export default FormularioRegistro;
