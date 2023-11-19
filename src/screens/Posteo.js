import React, { Component } from "react";
import firebase from "firebase";
import { db, auth } from "../firebase/config";
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from "react-native";

class Posteo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numeroLikes: this.props.posteoData.data.likes.length,
      miLike: false,
      comentarios: this.props.posteoData.data.comentarios,
    };
  }

  componentDidMount() {
    //Chequear que mi like en un posteo como usuario no se pueda volver a poner
    if (this.props.posteoData.data.likes.includes(auth.currentUser.email)) {
      this.setState({
        miLike: true,
      });
    }
  }

  //Funcionalidad de like
  like() {
    //Acceder al array de likes, y si puedo darle like, entonces le sumo uno al numerito
    db.collection("posts")
      .doc(this.props.posteoData.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email),
      })
      //Hacemos un then porque el "update" es una promesa, que puede pasar como no puede pasar, si pasa...entonces se ejecuta el then
      .then(() =>
        this.setState({
          numeroLikes: this.state.numeroLikes + 1,
          miLike: true,
        })
      )
      .catch((error) => console.log(error));
  }

  //Funcionalidad que te saca el like (unlike)
  dislike() {
    //Acceder al array de likes, y si puedo darle like, entonces le sumo uno al numerito
    db.collection("posts")
      .doc(this.props.posteoData.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email),
      })
      //Hacemos un then porque el "update" es una promesa, que puede pasar como no puede pasar, si pasa...entonces se ejecuta el then
      .then(() =>
        this.setState({
          numeroLikes: this.state.numeroLikes - 1,
          miLike: false,
        })
      )
      .catch((error) => console.log(error));
  }

  //En caso de poder eliminar el posteo usamos esta funcion
  borrarPosteo() {
    confirm("Seguro que quieres borrar esta publicacion")
      ? db.collection("posts").doc(this.props.posteoData.id).delete()
      : console.log("No se borro la publicacion");
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.avatar} source={{ uri: this.props.posteoData.data.avatar }} />
          <Text style={styles.username}>{this.props.posteoData.data.username}</Text>
        </View>

        <Image style={styles.imagen} source={{ uri: this.props.posteoData.data.foto }} resizeMode="cover" />
        <Text style={styles.descripcion}>{this.props.posteoData.data.descripcion}</Text>

        <View style={styles.interactionContainer}>
          {this.state.miLike ? (
            <TouchableOpacity style={styles.likeButton} onPress={() => this.dislike()}>
              <Text style={styles.buttonText}>❤️</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.dislikeButton} onPress={() => this.like()}>
              <Text style={styles.buttonText}>🤍</Text>
            </TouchableOpacity>
          )}
          <Text style={styles.likesText}>{this.state.numeroLikes} Likes</Text>
        </View>

        <Text style={styles.commentsText}>Comentarios: {this.state.comentarios.length}</Text>

        <FlatList
          data={this.state.comentarios.slice(0, 5)}
          keyExtractor={(oneComment) => oneComment.createdAt.toString()}
          renderItem={({ item }) => (
            <Text style={styles.comment}>
              <Text style={styles.commentAuthor}>{item.email}:</Text> {item.comentario}
            </Text>
          )}
        />

        <TouchableOpacity
          style={styles.commentsButton}
          onPress={() =>
            this.props.navigation.navigate("Comments", {
              id: this.props.posteoData.id,
            })
          }
        >
          <Text style={styles.buttonText}>Ver todos los comentarios</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        margin: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ddd",
        overflow: "hidden",
        width: "45%", 
        alignSelf: "center", 
      },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
  },
  imagen: {
    height: 200,
    width: "100%",
  },
  descripcion: {
    padding: 10,
  },
  interactionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  likeButton: {
    backgroundColor: "#ED4956",
    padding: 10,
    borderRadius: 5,
  },
  dislikeButton: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ED4956",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
  likesText: {
    marginLeft: 10,
  },
  commentsText: {
    marginLeft: 10,
    marginBottom: 5,
  },
  comment: {
    marginLeft: 10,
    marginBottom: 5,
  },
  commentAuthor: {
    fontWeight: "bold",
  },
  commentsButton: {
    backgroundColor: "#3897f1",
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
});

export default Posteo;