import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';

class MiPerfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: '',
      email: '',
      miniBio: '',
      fotoPerfil: '',
      arrayPosteos: [],
    };
  }

  componentDidMount() {
    const currentUser = auth.currentUser;

    if (currentUser) {
      db.collection('users')
        .doc(currentUser.uid)
        .onSnapshot(
          (doc) => {
            if (doc.exists) {
              const userData = doc.data();
              this.setState({
                nombre: userData.nombre || '',
                email: userData.email || '',
                miniBio: userData.miniBio || '',
                fotoPerfil: userData.fotoPerfil || '',
              });
            } else {
              console.log('No se encontraron datos de usuario');
            }
          },
          (error) => {
            console.error('Error al obtener datos de usuario:', error);
          }
        );

      // Obtener posteos del usuario
      db.collection('posteos')
        .where('creador', '==', currentUser.email)
        .onSnapshot(
          (docs) => {
            let posteos = [];
            docs.forEach((doc) => {
              posteos.push({
                data: doc.data(),
                id: doc.id,
              });
            });
            this.setState({
              arrayPosteos: posteos,
            });
          },
          (error) => {
            console.error('Error al obtener posteos del usuario:', error);
          }
        );
    }
  }

  signOut() {
    auth
      .signOut()
      .then(() => {
        this.props.navigation.navigate('Login');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          {this.state.fotoPerfil ? (
            <Image style={styles.fotoPerfil} source={{ uri: this.state.fotoPerfil }} />
          ) : (
            <Image
              style={styles.fotoPerfil}
              source={require('../../assets/icon.png')}
              resizeMode="contain"
            />
          )}
          <View>
            <Text style={styles.title}>{this.state.nombre}</Text>
            <Text style={styles.bio}>{this.state.miniBio}</Text>
            <Text style={styles.info}>Email: {this.state.email}</Text>
            <Text style={styles.info}>Cantidad de posts: {this.state.arrayPosteos.length}</Text>
          </View>
        </View>

        <Text>Posteos:</Text>
        {this.state.arrayPosteos.length >= 1 ? (
          <FlatList
            data={this.state.arrayPosteos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Text>{item.data.titulo}</Text>}
          />
        ) : (
          <Text style={styles.aviso}> Aun no hay publicaciones</Text>
        )}

        <TouchableOpacity onPress={() => this.signOut()}>
          <Text>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
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
  fotoPerfil: {
    width: 115,
    height: 115,
    marginLeft: 15,
    borderRadius: 57.5,
  },
  aviso: {
    fontFamily: 'Courier',
    fontSize: 13,
    marginTop: 10,
  },
});

export default MiPerfil;
