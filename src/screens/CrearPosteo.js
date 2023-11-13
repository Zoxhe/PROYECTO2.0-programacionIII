import React, { Component } from "react";
import { auth, db, storage } from "../firebase/config";
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { render } from "react-dom";

//Importar camara para linkearla y poder usarla aca! //



class CrearPosteo extends Component { 
    constructor(){
        super()
        this.state = {
                foto: "",
                descripcion: "",
                createdAt: "",
                mostrarCamra: true, 
                likes:[],
                comentarios:[] 
        }
    }


    //Hacemos la funcionalidad que manda la foto que me saque al firebase

    postear() {
        db.collection("posts").add(
            { 
                foto: this.state.foto,
                email: auth.currentUser.email,
                descripcion: this.state.descripcion,
                likes: this.state.likes,
                comentarios: this.state.comentarios,
                createdAt: Date.now()
              }

        )

        //Si se llega a poder crear el usuario quiero de vuelta todos los campos vacios, entonces los limpio con set State
        .then(()=>{
            this.setState({
                foto: "",
                descripcion: "",
                createdAt: "",
                mostrarCamra: true, 
                likes:[],
                comentarios:[] 
            })

            //Despues de todo, me redirige//
            this.props.navigation.navigate("Home")
        }). catch(error => console.log(error))
    }



}


//Esto va a tener sentido si tenemos funcionando la camara



//Ahora vamos a renderizar los datos con Render//

render(){ 
    return(
        <View>
        <Text>Crear un posteo</Text>

       
        <TouchableOpacity onPress={() => this.postear()}>
            <Text>Postear</Text>
        </TouchableOpacity>
    </View>
    )
}


export default CrearPosteo;


