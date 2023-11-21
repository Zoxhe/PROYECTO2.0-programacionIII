import React, { Component } from "react";
import { auth, db, storage } from "../firebase/config";
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import Camara from "../components/Camara";

class CrearPosteo extends Component {
  constructor() {
    super();
    this.state = {
      foto: "",
      descripcion: "",
      createdAt: "",
      mostrarCamara: true,
      likes: [],
      comentarios: [],
    };
  }

  onImageUpload(url) {
    this.setState({
      foto: url,
      mostrarCamara: false,
    });
  }

  postear() {
    db.collection("posts")
      .add({
        foto: this.state.foto,
        email: auth.currentUser.email,
        descripcion: this.state.descripcion,
        likes: this.state.likes,
        comentarios: this.state.comentarios,
        createdAt: Date.now(),
      })
      .then(() => {
        this.setState({
          foto: "",
          descripcion: "",
          createdAt: "",
          mostrarCamara: true,
          likes: [],
          comentarios: [],
        });

        this.props.navigation.navigate("Home");
      })
      .catch((error) => console.log(error));
  }

  componentWillUnmount() {
    // Restablecer el estado de la cámara
    this.setState({
      mostrarCamara: true,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Crear un posteo</Text>

        <View style={styles.seccionCamara}>
          {this.state.mostrarCamara ? (
            <Camara onImageUpload={(url) => this.onImageUpload(url)} />
          ) : (
            <View style={styles.seccionDescripcion}>
              <TextInput
                style={styles.inputDescripcion}
                placeholder="Descripción"
                keyboardType="default"
                onChangeText={(text) => this.setState({ descripcion: text })}
                value={this.state.descripcion}
                multiline={true}
              />

              <TouchableOpacity style={styles.botonPostear} onPress={() => this.postear()}>
                <Text style={styles.textoBotonPostear}>Postear</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#ffcccb", 
    },
    titulo: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 20,
    },
    seccionCamara: {
      alignItems: "center",
    },
    seccionDescripcion: {
      width: "80%",
      marginTop: 20,
    },
    inputDescripcion: {
      borderColor: "#ddd",
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
      textAlignVertical: "top",
    },
    botonPostear: {
      backgroundColor: "#3498db",
      padding: 15,
      borderRadius: 5,
    },
    textoBotonPostear: {
      color: "#fff",
      textAlign: "center",
      fontWeight: "bold",
    },
  });
  
  // ... (tu código posterior)
  
  export default CrearPosteo;