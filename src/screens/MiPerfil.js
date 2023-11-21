import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet, TextInput, ScrollView, } from 'react-native';
import { auth, db } from '../firebase/config';
import firebase from 'firebase';

class MiPerfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: '',
      email: '',
      miniBio: '',
      fotoPerfil: '',
      arrayPosteos: [],
      nuevaPassword: '',
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
      db.collection('posts')
        .where('email', '==', currentUser.email)
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

  borrarPost(IdBorrar){
    db.collection('posts').doc(IdBorrar).delete().then(() => {
        console.log("Documento eliminado!");
    }).catch((error) => {
        console.error("Error eliminando documento: ", error);
    });

}


  cambiarContra=()=> {
    const user = firebase.auth().currentUser;
    const newPassword = this.state.nuevaPassword;
    
    user.updatePassword(newPassword).then(() => {
      // Update successful.
      console.log("se cambio la contra")
    }).catch((error) => {
      console.log(error)
      // ...
    });

  
}
deleteUser(id) {
  const user = auth.currentUser;
  user.delete()
    .then(() => {
      console.log('Su usuario ha sido eliminado');
    })
    .then(() => {
      db.collection('users').doc(id).delete()
      this.props.navigation.navigate("Login")
    })
    .catch((error) => {
      console.log(error);
    })
}



  render() {
    console.log(auth.currentUser)
    return (
      <ScrollView>
      
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

        <Text style={styles.title}>Posteos:</Text>
        {this.state.arrayPosteos.length >= 1 ? (
          <FlatList
            data={this.state.arrayPosteos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => 

          <View style={styles.contenedordefoto}>

            <Image style={styles.foto} source={{ uri: item.data.foto }} />
            <Text> Descripcion: {item.data.descripcion}</Text>
            <Text> Comentarios: {item.data.comentarios.length}</Text>
            <Text> Likes: {item.data.likes.length}</Text>
          
            <TouchableOpacity  style={styles.borrar} onPress={()=>this.borrarPost(item.id)}>
              <Text style = { styles.textButton}>Borrar Posteo</Text>
            </TouchableOpacity>
        
          </View>}

          />
        ) : (
          <Text style={styles.aviso}> Aun no hay publicaciones</Text>
        )}

          <TouchableOpacity  style={styles.borrar} onPress={()=>this.cambiarContra()}>
          <Text style = { styles.textButton }>Cambiar Contraseña</Text>
            <TextInput  placeholder="Constraseña Nueva" secureTextEntry={true} value= {this.state.nuevaPassword} onChangeText={text => {this.setState({ nuevaPassword:text })}} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.deleteUser(this.state.id)}>
            <Text style={styles.title}>Delete user</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => this.signOut()}>
            <Text style={styles.title}>Cerrar sesión</Text>
          </TouchableOpacity>

        
      
      
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      backgroundColor: 'pink', 
    },
  header: {
    flexDirection: 'row',
    paddingTop: 40,
    
  },
  title: {
    fontFamily: 'Courier',
    fontSize: 18,
    marginLeft: 10,
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 10,
    marginTop: 35,
    
    
  },

  
  textButton: {
    fontFamily: 'Courier',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 25,

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
    fontSize: 20,
    margin: 4,
    paddingLeft: 12,
    padding: 20,
    
    
  },
  fotoPerfil: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 20,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    
  },
  
  aviso: {
    fontFamily: 'Courier',
    marginTop: 15,
    
  },
  foto:{
    width: 115,
    height: 115,
    marginLeft: 15,
    
  },
  contenedordefoto:{
    marginVertical: 20, 
    
  },
  
 
});

export default MiPerfil;
