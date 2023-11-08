import { View, Text, StyleSheet } from "react-native";

import ListarTarjetas from "../components/ListarTarjetas";

export default function Home(props) {
    return(
        <View style={styles.contenedor}>
            <ListarTarjetas navigation={props.navigation} />
        </View>
    )
}

const styles = StyleSheet.create({
    contenedor: {
        flex: 1
    },
})