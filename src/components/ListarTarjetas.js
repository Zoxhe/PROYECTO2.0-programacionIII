import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";

import { db } from "../firebase/config";

import Tarjeta from "./Tarjeta";

class ListarTarjetas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrayPosteos: []
        }
    }

    componentDidMount() {
        // db.collection("posts").orderBy({"createdAt" : "desc"}).onSnapshot((querySnapshot) => {
        db.collection("posts").orderBy("createdAt", "desc").onSnapshot((querySnapshot) => {
            let arrayPosteos = [];
            querySnapshot.forEach((doc) => {
                console.log(doc.data())
                arrayPosteos.push(doc.data());
            });
            this.setState({ arrayPosteos: arrayPosteos });
        })
    }

    render() {
        return (
            <View style={styles.contenedor}>
                <Text>Hasta acá funca bien</Text>
                <FlatList
                    data = {this.state.arrayPosteos}
                    renderItem = {({item}) => (
                        <Tarjeta
                            contenido = {item}
                            navigation = {this.props.navigation}
                            keyExtractor = {(item) => item.id}
                        />
                    )}
                    keyExtractor = {(item) => item.id}
                />
            </View>
        )
    }
}

export default ListarTarjetas;

const styles = StyleSheet.create({
    contenedor: {
        flex: 1
    },
})