import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";

import { auth, db } from "../firebase/config";

class MiPerfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: "",
            email: "",
            miniBio: "",
            fotoPerfil: "",
            arrayPosteos: []
        }
    }

    signOut() {
        auth.signOut()
            .then(() => {
                this.props.navigation.navigate("Login");
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        return (
            <View>
                <Text>Mi perfil {auth.currentUser.owner}</Text>
                <TouchableOpacity onPress={() => this.signOut()}>
                    <Text>Cerrar sesión</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default MiPerfil;
