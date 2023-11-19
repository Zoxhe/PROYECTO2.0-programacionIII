import react, {Component} from "react";
import firebase from "firebase";
import {db, auth} from "../firebase/config"
import {Text, View, StyleSheet, TextInput, TouchableOpacity, Flatlist} from "react-native"


class Comments extends Component { 
    constructor(props){
        super(props)
        this.state = {
            id: this.props.route.params.id,
            comentario: "",
            comentarios: []

        }
    }

//Al principio de todo, un didMount para traernos el posteo con sus comentarios

 componentDidMount(){
    //Me traigo la informacion de la base de datos
    db.collection("posts").doc(this.state.id).onSnapshot(
        docs => {
            this.setState({
                comentarios: docs.data().comentarios
            })
        })
 }

 //Al array que tenemos de comentarios le queremos subir un nuevo nuevo, entoncesh hacemos lo siguiente
 subirNuevoComentario(comentario){
        db.collection("posts").doc(this.state.id).update({
            comentarios:  firebase.firestore.FieldValue.arrayUnion({ email: auth.currentUser.email, comentario: comentario, createdAt: Date.now() })
        })
 }

 render(){
    return(

<View>


    {
        this.state.comentarios == 0 ? 
    <Text>
        Todavia no hay comentarios. Opiná primero
    </Text>
    :

<Flatlist
data={this.state.comentarios}
keyExtractor={unComentario => unComentario.createdAt.toString()}
renderItem = {({item})=>  <Text>{item.email}: {item.comentario} </Text>  }
style = {styles.flatlist}
/>

    }

    <TextInput
     placeholder="Agregar un comentario"
     keyboardType="default" 
     onChangeText={text => this.setState({ comentario: text })}
     value={this.state.comentario}
     />

     {
        this.state.comentario == "" ?

 <Text></Text>
 :

 <TouchableOpacity onPress={()=> this.subirNuevoComentario(this.state.comentario)}>
  <Text>Subir un nuevo comentario</Text>
 </TouchableOpacity>
 
 
     }
                


</View>



    )
 }




}

const styles = StyleSheet.create({
    flatlist:{
        flex: 1,
        background: "rgb(255, 255, 255)"
    }
})

export default Comments