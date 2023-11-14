import React, {Component} from "react"; 
import {Camera} from "expo-camera"
import {storage} from "../firebase/config"
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native"

class Camara extends Component { 
    constructor(props){
        super(props)
        this.state = {
            permiso: false, 
            mostrarCamara: true, 
            url: ""
        }
        this.metodosCamara = ""
    }

    componentDidMount(){

        Camera.requestCameraPermissionsAsync()
        .then(()=> {
            this.setState({
                permiso: true
            })
        }).catch(error => console.log(error))
    }


    sacarFoto(){
        this.metodosCamara.takePictureAsync()
        .then(foto => {
            this.setState({
                url: foto.uri,
                mostrarCamara: false,
            })
        }).catch(error => console.log(error))
    }

    guardar(){
        fetch(this.state.url)
        .then(res=> res.blob()).then(img => {
            const refStorage = storage.ref(`photos/${Date.now()}.jpg`);
            refStorage.put(img)
            .then(()=>{
                refStorage.getDownloadURL()
                .then(url => this.props.onImageUpload(url))
            })
        })
        .catch(e => console.log(e))
    }


    rechazar(){
        this.setState({
            url: "",
            mostrarCamara: true
        })
    }


render(){
    <View>
        {
           this.state.permiso ?  
            this.state.mostrarCamara ?
                <View style={styles.cuerpoCamara}>
                    <TouchableOpacity onPress={()=>this.sacarFoto()}>
                        Sacar foto
                    </TouchableOpacity>
                    <Camera
                    style={styles.cuerpoCamara}
                    type = {Camera.Constants.Type.front}
                    ref = { metodosCamara => this.metodosCamara = metodosCamara}
                    />
                </View>
            :
            <View>
                <TouchableOpacity onPress={()=>this.rechazar()}>
                       Rechazar
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.guardar()}>
                        Guardar
                    </TouchableOpacity>

                    <Image
                    style={styles.preview}
                    source={{uri: this.state.url}}
                    resizeMode= "cover"
                    />
            </View>
            :
            <Text>
                Permitir acceso a la camara para sacar la foto
            </Text>


        }
    </View>
}



}

const styles = StyleSheet.create({

    cuerpoCamara: {
        height: "100vh",
        width: "100vh",
    },

    preview: {
        height: "100vh",
        width: "100vh"
    }


})

export default Camara