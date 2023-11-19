import React, {Component} from "react";
import firebase from "firebase"
import {db, auth} from "../firebase/config"
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from "react-native";



class Posteo extends Component { 
    constructor(props){ 
        super(props)
        this.state = {
            numeroLikes: this.props.posteoData.data.likes.length,
            miLike: false,
            comentarios: this.props.posteoData.data.comentarios
        }
    }


    componentDidMount(){

         //Chequear que mi like en un posteo como usuario no se pueda volver a poner

            if(this.props.posteoData.data.likes.includes(auth.currentUser.email)){
                this.setState({
                    miLike: true
                })
            }

    }

    //Fncionalidad de like
like(){

    //Acceder al array de likes, y si puedo darle like, entonces le sumo uno al numerito 
    db.collection("posts").doc(this.props.posteoData.id).update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
    })

    //Hacemos un then porque el "update" es una promesa, que puede pasar como no puede pasar, si pasa...entonces se ejecuta el then
    .then(()=>this.setState({
        numeroLikes: this.state.numeroLikes +1,
        miLike: true, 
    })
    )
    .catch(error => console.log(error))

}
    //Funcionalidad que te saca el like (unlike)
    dislike(){

        //Acceder al array de likes, y si puedo darle like, entonces le sumo uno al numerito 
        db.collection("posts").doc(this.props.posteoData.id).update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
    
        //Hacemos un then porque el "update" es una promesa, que puede pasar como no puede pasar, si pasa...entonces se ejecuta el then
        .then(()=>this.setState({
            numeroLikes: this.state.numeroLikes -1,
            miLike: false, 
        })
        )
        .catch(error => console.log(error))
    
    }

//En caso de poder eliminar el posteo usamos esta funcion
borrarPosteo(){
    confirm("Seguro que quieres borrar esta publicacion")?
    db.collection("posts").doc(this.props.posteoData.id).delete()
    :
    console.log("No se borro la publicacion")
}

render(){
    return(
<View>
<View>
    <Image
        style={styles.imagen}
        source={{uri: this.props.posteoData.data.foto}}
        resizeMode ="cover"
        />

    <Text>{this.props.posteoData.data.descripcion}</Text>
            </View>



    {
        this.state.miLike ?
        <TouchableOpacity onPress={()=>this.dislike()}>
                likear
        </TouchableOpacity>
        :
        <TouchableOpacity onPress={()=>this.like()}>
            dislikear
        </TouchableOpacity>
    }
     <Text>Likes: {this.state.numeroLikes}</Text>
    
    

<Text>Comentarios: {this.state.comentarios.length}</Text>


<FlatList
        data={this.state.comentarios.slice(0,3)}
        keyExtractor={oneComment => oneComment.createdAt.toString()}
        renderItem={({item}) =>   <Text>{item.email}: {item.comentario} </Text>  }        
        />



<View>


<TouchableOpacity onPress={()=>this.props.navigation.navigate("Comments", {id:this.props.posteoData.id})}>

Ver todos los comentarios 
</TouchableOpacity>

   
</View>
</View>


        

    )
}






}

const styles = StyleSheet.create({
    imagen: {
        height: "70vh",
        width: "70vh",
    }
})



export default Posteo;