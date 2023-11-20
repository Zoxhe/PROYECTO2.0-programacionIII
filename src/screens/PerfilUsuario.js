import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import { db } from '../firebase/config';

class PerfilUsuario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: {},
      posteos: [],
      error: '',
    };
  }

  componentDidMount() {
    const { route } = this.props;
    const { email } = route.params;

    // Obtener datos del usuario
    db.collection('users')
      .where('email', '==', email)
      .onSnapshot((docs) => {
        let usuario = {};
        docs.forEach((doc) => {
          usuario = {
            id: doc.id,
            data: doc.data(),
          };
        });

        this.setState({
          usuario: usuario.data || {},
        });
      });

    // Obtener posteos del usuario
    db.collection('posts')
      .where('email', '==', email)
      .onSnapshot((docs) => {
        let posteos = [];
        docs.forEach((doc) => {
          posteos.push({
            data: doc.data(),
            id: doc.id,
          });
        });
        this.setState({
          posteos: posteos,
        });
      });
  }

  render() {
    console.log(this.state.posteos)
    return (
      <View style={profileStyles.container}>
        <View style={profileStyles.header}>
          {this.state.usuario.foto ? (
            <Image style={profileStyles.profileImage} source={{ uri: this.state.usuario.foto }} />
          ) : (
            <Image
              style={profileStyles.profileImage}
              source={require('../../assets/icon.png')}
              resizeMode="contain"
            />
          )}
          <View>
            <Text style={profileStyles.title}>{this.state.usuario.nombre}</Text>
            <Text style={profileStyles.bio}>{this.state.usuario.miniBio}</Text>
            <Text style={profileStyles.info}>Email: {this.state.usuario.email}</Text>
            <Text style={profileStyles.info}>Cantidad de posts: {this.state.posteos.length}</Text>
          </View>
        </View>

        {this.state.posteos.length >= 1 ? (
          <FlatList
            data={this.state.posteos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => 
              <View style={profileStyles.postContainer}>
                <Image style={profileStyles.fotoPerfil} source={{uri:item.data.foto}}resizeMode= 'contain' />
                <Text>Descripción: {item.data.descripcion}</Text>
                <Text>Likes: {item.data.likes.length}</Text>
                <Text>Comentarios: {item.data.comentarios.length}</Text>
                {/* Puedes mostrar más detalles del posteo según tus necesidades */}
              </View>
            }
          />
        ) : (
          <Text style={profileStyles.notice}> Aun no hay publicaciones</Text>
        )}
      </View>
    );
  }
}

const profileStyles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    paddingTop: 40,
  },
  title: {
    fontFamily: 'Courier',
    fontSize: 18,
    marginLeft: 10,
  },
  info: {
    fontFamily: 'Courier',
    fontSize: 11,
    margin: 4,
    paddingLeft: 12,
    color: 'rgb(115, 115, 115)',
  },
  bio: {
    fontFamily: 'Courier',
    fontSize: 13,
    margin: 4,
    paddingLeft: 12,
  },
  profileImage: {
    height: 115,
    width: 115,
    marginLeft: 15,
    borderRadius: 57.5,
  },
  notice: {
    fontFamily: 'Courier',
    fontSize: 13,
    marginTop: 10,
  },
  postContainer: {
    heigth:100,
    width:100,
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
  },
  fotoPerfil:{
    width: 115,
    height: 115,
    marginLeft: 15,
  }
});

export default PerfilUsuario;