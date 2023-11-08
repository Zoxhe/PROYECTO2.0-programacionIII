import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";

import { auth, db } from "../firebase/config";

class BuscadorUsuarios extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrayUsuarios : []
        }
    }

    render() {
        return (
            <View>
                <Text>Buscador de usuarios</Text>
            </View>
        )
    }
}

export default BuscadorUsuarios;
