import React, { Component } from "react";

import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";

import { auth, db, storage } from "../firebase/config";

class FormularioCrearPosteo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imagen: "",
            texto: "",
        }
    }

    crearPosteo(imagen, texto) {
        console.log(imagen, texto);
        db.collection("posts").doc().set({
            imagen: imagen,
            texto: texto,
            createdAt: Date.now(),
            emailUsuario: auth.currentUser.email,
            arrayLikes: [],
            arrayComentarios: []
        })
            .then(() => {
                this.setState({
                    imagen: "",
                    texto: ""
                })
                console.log("Posteo creado");
                this.props.navigation.navigate("Login");
            })
            .catch((error) => console.log(error))
    }

    render() {
        return(
            <View>
                <Text>Crear un posteo</Text>
                <Text>Imagen</Text>
                <TextInput placeholder="Imagen" onChangeText={(imagen) => this.setState({ imagen })} />

                <Text>Texto descriptivo</Text>
                <TextInput placeholder="Texto" onChangeText={(texto) => this.setState({ texto })} />

                <TouchableOpacity onPress={() => this.crearPosteo(this.state.imagen, this.state.texto)}>
                    <Text>Postear</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const Style = StyleSheet.create({
    contenedor: {
        flex: 1,
        
    }
});

export default FormularioCrearPosteo;


