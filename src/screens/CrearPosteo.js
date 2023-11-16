import React, { Component } from "react";
import { auth, db, storage } from "../firebase/config";
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { render } from "react-dom";

//Importar camara para linkearla y poder usarla aca! //
import Camara from "../components/Camara"


class CrearPosteo extends Component { 
    constructor(){
        super()
        this.state = {
                foto: "",
                descripcion: "",
                createdAt: "",
                mostrarCamara: true, 
                likes:[],
                comentarios:[] 
        }
    }

//OnImageUpload(url)

onImageUpload(url){
    this.setState({
        foto: url,
        mostrarCamara: false 
    })
}


//Postear//
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
                mostrarCamara: true, 
                likes:[],
                comentarios:[] 
            })

            //Despues de todo, me redirige//
            this.props.navigation.navigate("Home")
        }). catch(error => console.log(error))
    }


//Esto va a tener sentido si tenemos funcionando la camara

//Ahora vamos a renderizar los datos con Render//

render(){ 
    return(
        <View>
        <Text>Crear un posteo</Text>

        <View>
            {
                this.state.mostrarCamara ?
                <Camara onImageUpload={url => this.onImageUpload(url)}/> 
                :
                <View>
                    <TextInput 
                    placeholder="descripcion"
                    keyboardType="default"
                    onChangeText={text => this.setState({ descripcion: text })} 
                    value= {this.state.descripcion}
                    />

                    <TouchableOpacity onPress={()=>this.postear()}>Postear</TouchableOpacity>

                </View>
            }
        </View>

       
        
    </View>
    )
}

}
export default CrearPosteo;


