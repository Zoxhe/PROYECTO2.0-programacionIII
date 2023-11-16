import React, {Component} from "react";
import {db} from "../firebase/config"
import { View, Text, StyleSheet, FlatList } from "react-native";

//Este posteo no es el de crear, es el que hace el diseño de cada uno
import Posteo from "./Posteo"
import { ImageBackground } from "react-native-web";


class Home extends Component { 
    constructor(){
        super()
        this.state = {
            posteos: []
        }
    }

//Ahora queremos traernos los posteos que estan en la base de datos de firebase

    componentDidMount(){
        //Para poder traer la base de datos y los posteos, hacemos lo siguiente:
        //COLLECTION ES LA TABLA (EJ: USUARIOS, POSTEOS, LO QUE FUERA)
        //DOCS/doc es cada uno de los usuarios o posteos que esten dentro
        db.collection("posts").orderBy("CreatedAt", "desc").onSnapshot(
            //Ahora tenemos que hacer es la logica interna del onSnapshot
            // creo variable con info importante de posteos y lo meto en el array "posteos"

            docs =>{
                let posts = []
                docs.forEach(doc => {
                    posts.push({
                    id: doc.id,
                    data: doc.data()
                    })
                    this.setState({
                        posteos: posts
                    })
                })
            }

        )
    }

render(){
    return(
        <View>

        <FlatList
        data={this.state.posteos}
        keyExtractor={onePost => onePost.id.string()}
        renderItem={({item}) => <Posteo posteoData ={item} navigation={this.props.navigation} /> }        
        />

        </View>
    )
}


}



const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: "rgb(255,255,255)"
    },
})


export default Home