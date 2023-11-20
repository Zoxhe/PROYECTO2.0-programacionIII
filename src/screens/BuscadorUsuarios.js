import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { db, auth } from '../firebase/config';

class BuscadorUsuarios extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      usuarios: [],
      resultados: [],
      buscando: false,
    };
  }

  componentDidMount() {
    db.collection('users').onSnapshot(
      (docs) => {
        let info = [];
        docs.forEach((doc) => {
          info.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        this.setState({
          usuarios: info,
        });
      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }

  filtrar(texto) {
    if (texto === '') {
      this.setState({
        resultados: [],
        input: '',
        buscando: false,
      });
    } else {
      let filtrado = this.state.usuarios.filter((usuario) =>
        usuario.data.email.toLowerCase().includes(texto.toLowerCase())
      );
      this.setState({
        resultados: filtrado,
        input: texto,
        buscando: true,
      });
    }
  }

  irAPerfil(item) {
    if (item === auth.currentUser.email) {
      this.props.navigation.navigate('MiPerfil');
    } else {
      this.props.navigation.navigate('PerfilUsuario', { email: item });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formularioBusqueda}>
          <TextInput
            placeholder="Buscar por email"
            keyboardType="default"
            onChangeText={(texto) => this.filtrar(texto)}
            value={this.state.input}
            style={styles.campo}
          />
          <TouchableOpacity onPress={() => this.filtrar(this.state.input)} style={styles.iconoContainer}>
            <AntDesign name="search1" size={24} color="rgb(115, 115, 115)" style={styles.icono} />
          </TouchableOpacity>
        </View>

        {this.state.resultados.length === 0 && this.state.buscando === true ? (
          <Text style={styles.aviso}> No hay usuarios que coincidan con tu búsqueda</Text>
        ) : (
          <FlatList
            data={this.state.resultados}
            keyExtractor={(unusuario) => unusuario.id.toString()}
            renderItem={({ item }) => (
             
              <TouchableOpacity onPress={() => this.irAPerfil(item.data.email)}>
                <Text style={styles.lista}>{item.data.email}</Text>
                {console.log(item)}
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(255,255,255)',
    padding: 15,
  },
  formularioBusqueda: {
    backgroundColor: 'rgb(240, 240, 240)',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },
  campo: {
    backgroundColor: 'rgb(255, 255, 255)',
    flex: 1,
    fontSize: 16,
    margin: 8,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  iconoContainer: {
    marginLeft: 10,
    borderRadius: 5,
    backgroundColor: 'rgb(200, 200, 200)',
    padding: 10,
  },
  icono: {
    marginLeft: 2,
  },
  aviso: {
    fontFamily: 'Courier',
    fontSize: 13,
    marginTop: 10,
    textAlign: 'center',
    color: 'rgb(150, 150, 150)',
  },
  lista: {
    backgroundColor: 'rgb(240, 240, 240)',
    fontFamily: 'Courier',
    fontSize: 16,
    margin: 8,
    borderRadius: 5,
    textAlign: 'left',
    padding: 10,
  },
});

export default BuscadorUsuarios;
