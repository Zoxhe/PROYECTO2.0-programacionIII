import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

import { FontAwesome } from '@expo/vector-icons';

import { auth, db } from "../firebase/config";

class Tarjeta extends Component {
    constructor(props) {
        super(props);
        this.state = {
            owner: "",
            descripcion: "",
            imagen: "",
            liked: false,
            arrayLikes: [],
            arrayComentarios: [],
        }
    }

    componentDidMount() {
        if (this.props.contenido) {
            this.setState({
                owner: this.props.contenido.owner,
                descripcion: this.props.contenido.texto,
                imagen: this.props.contenido.imagen,
                liked: false,
                arrayLikes: this.props.contenido.arrayLikes || [],
                arrayComentarios: this.props.contenido.arrayComentarios || [],
            })
        }
    }

    likePosteo(emailUsuario) {
        this.setState({ liked: !this.state.liked });

        let arrayLikes = this.state.arrayLikes;
        arrayLikes.push(emailUsuario);
        this.setState({ arrayLikes: arrayLikes });

        db.collection("posts").doc(this.props.contenido.id).update({
            arrayLikes: arrayLikes
        })
            .then(() => {
                console.log("Document successfully updated!");
            })
            .catch((error) => {
                console.error("Error updating document: ", error);
            });
    }

    quitarLikePosteo(emailUsuario) {
        this.setState({ liked: !this.state.liked });

        let arrayLikes = this.state.arrayLikes;
        arrayLikes = arrayLikes.filter((email) => email != emailUsuario);
        this.setState({ arrayLikes: arrayLikes });

        db.collection("posts").doc(this.props.contenido.id).update({
            arrayLikes: arrayLikes
        })
            .then(() => {
                console.log("Document successfully updated!");
            })
            .catch((error) => {
                console.error("Error updating document: ", error);
            });
    }

    render() {
        return (
            <View style={styles.contenedor}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("PerfilUsuario", { owner: this.props.owner })}>
                    <Text>{this.props.owner}</Text>
                </TouchableOpacity>
                <Image
                    source={{ uri: this.state.imagen }}
                    style={styles.imagen}
                />
                <Text>{this.state.descripcion}</Text>
                <Text>
                    {
                        this.state.liked ?
                        <TouchableOpacity onPress={() => this.quitarLikePosteo(auth.currentUser.email)}>
                            <Text>
                                <FontAwesome name="heart" size={24} color="red" />
                            </Text>
                        </TouchableOpacity> :
                        <TouchableOpacity onPress={() => this.likePosteo(auth.currentUser.email)}>
                            <Text>
                                <FontAwesome name="heart" size={24} color="gray" />
                            </Text>
                        </TouchableOpacity>
                    }
                    {
                        this.state.arrayLikes ?
                        <Text>
                            {this.state.arrayLikes.length} Likes
                        </Text> : 
                        <Text>
                            0 Likes
                        </Text>
                    }
                </Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("Comentario", { idPosteo: this.props.idPosteo })}>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Tarjeta;

const styles = StyleSheet.create({
    contenedor: {
        flex: 1
    },
    imagen: {
        width: 300,
        height: 300,
        resizeMode: "contain"
    }
});

