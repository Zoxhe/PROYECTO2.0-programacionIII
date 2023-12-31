import React, { Component } from "react";
import { db } from "../firebase/config";
import { View, StyleSheet, FlatList } from "react-native";
import Posteo from "./Posteo";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posteos: [],
        };
    }

    componentDidMount() {
        db.collection("posts").orderBy("createdAt", "desc").onSnapshot(
            (docs) => {
                let posts = [];
                docs.forEach((doc) => {
                    posts.push({
                        id: doc.id,
                        data: doc.data(),
                    });
                });
                this.setState({
                    posteos: posts,
                });
            },
            (error) => {
                console.error("Error al obtener los posteos:", error);
            }
        );
    }

    render() {
        return (
            <View style={styles.contenedor}>
                <FlatList
                    data={this.state.posteos}
                    keyExtractor={(onePost) => onePost.id.toString()}
                    renderItem={({ item }) => (
                        <Posteo posteoData={item} navigation={this.props.navigation} />
                    )}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: "#F5B7B1", 
        padding: 10,
    },
    
});

export default Home;
