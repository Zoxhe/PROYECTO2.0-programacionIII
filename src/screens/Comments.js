import React, { Component } from "react";
import firebase from "firebase";
import { db, auth } from "../firebase/config";
import { Text, View, StyleSheet, TextInput, TouchableOpacity, FlatList } from "react-native";

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.route.params.id,
      comentario: "",
      comentarios: [],
    };
  }

  componentDidMount() {
    // Me traigo la información de la base de datos
    db.collection("posts")
      .doc(this.state.id)
      .onSnapshot((docs) => {
        this.setState({
          comentarios: docs.data().comentarios,
        });
      });
  }

  // Al array que tenemos de comentarios le queremos subir un nuevo comentario
  subirNuevoComentario(comentario) {
    db.collection("posts")
      .doc(this.state.id)
      .update({
        comentarios: firebase.firestore.FieldValue.arrayUnion({
          email: auth.currentUser.email,
          comentario: comentario,
          createdAt: Date.now(),
        }),
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("Home")} style={styles.backButton}>
          <Text style={styles.buttonText}>← Volver a la Home</Text>
        </TouchableOpacity>

        {this.state.comentarios.length === 0 ? (
          <Text style={styles.noCommentsText}>Todavía no hay comentarios. Opiná primero</Text>
        ) : (
          <FlatList
            data={this.state.comentarios}
            keyExtractor={(unComentario) => unComentario.createdAt.toString()}
            renderItem={({ item }) => (
              <Text style={styles.commentText}>
                {item.email}: {item.comentario}
              </Text>
            )}
            style={styles.flatlist}
          />
        )}

        <TextInput
          placeholder="Agregar un comentario"
          keyboardType="default"
          onChangeText={(text) => this.setState({ comentario: text })}
          value={this.state.comentario}
          style={styles.commentInput}
        />

        {this.state.comentario === "" ? (
          <Text></Text>
        ) : (
          <TouchableOpacity onPress={() => this.subirNuevoComentario(this.state.comentario)} style={styles.postCommentButton}>
            <Text style={styles.buttonText}>Subir un nuevo comentario</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

// ...

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: "#FFC0CB",  
    },
  
  backButton: {
    backgroundColor: "#3897f1",
    padding: 10,
    margin: 5,
    width: 120,
    height: 50,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  flatlist: {
    flex: 1,
    backgroundColor: "rgb(255, 255, 255)",
  },
  noCommentsText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    
    
  },
  commentText: {
    fontSize: 16,
    marginBottom: 10,
    
  },
  commentInput: {
    fontSize: 16,
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    
    
    
  },
  postCommentButton: {
    backgroundColor: "#3897f1",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
});

export default Comments;