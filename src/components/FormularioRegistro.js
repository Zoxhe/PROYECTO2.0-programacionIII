import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';
import Camara from './Camara';

class FormularioRegistro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      nombre: '',
      miniBio: '',
      fotoPerfil: '',
      mostrarCamara: false,
    };
  }

  registrarse(email, password, nombre, miniBio, fotoPerfil) {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((data) => {
        db.collection('users')
          .doc(data.user.uid)
          .set({
            email: email,
            nombre: nombre,
            miniBio: miniBio,
            fotoPerfil: fotoPerfil,
          })
          .then(() => {
            console.log('Usuario registrado');
            this.setState({
              email: '',
              password: '',
              nombre: '',
              miniBio: '',
              fotoPerfil: '',
            });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onImageUpload(url) {
    this.setState({
      fotoPerfil: url,
      mostrarCamara: false,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Inicia sesion</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(email) => this.setState({ email })}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={(password) => this.setState({ password })}
        />

        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={(nombre) => this.setState({ nombre })}
        />

        <TextInput
          style={styles.input}
          placeholder="Bio"
          onChangeText={(miniBio) => this.setState({ miniBio })}
        />

        {this.state.mostrarCamara ? (
          <View>
            <Camara onImageUpload={(url) => this.onImageUpload(url)} style={{ width: "50vh", height: "50vh", alignItems: 'center' }} />
          </View>
        ) : (
          <TouchableOpacity onPress={() => this.setState({ mostrarCamara: true })}>
            <Text style={styles.uploadPhotoButton}>Subir foto para tu perfil</Text>
          </TouchableOpacity>
        )}

        {this.state.email === "" || this.state.password === "" || this.state.nombre === "" ? (
          <TouchableOpacity disabled={true} style={styles.buttonDisabled}>
            <Text style={styles.buttonText}>Registrarme</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              this.registrarse(
                this.state.email,
                this.state.password,
                this.state.nombre,
                this.state.miniBio,
                this.state.fotoPerfil
              )
            }>
            <Text style={styles.buttonText}>Registrarme</Text>
          </TouchableOpacity>
        )}

        <Text style={styles.loginText}>
          ¿Ya tenes una cuenta? 
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
            <Text style={styles.linkText}> Iniciá Sesion</Text>
          </TouchableOpacity>
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#3498db', 
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#D8D8D8',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  loginText: {
    marginTop: 20,
    textAlign: 'center',
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  uploadPhotoButton: {
    fontFamily: 'Courier',
    fontSize: 14,
    textAlign: 'center',
    margin: 10,
    backgroundColor: '#E1306C', 
    borderRadius: 10,
    padding: 10,
    color: 'white', 
  },
});

export default FormularioRegistro;
