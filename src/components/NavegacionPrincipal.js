import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Registro from '../screens/Registro';
import Login from '../screens/Login';
import CrearPosteo from '../screens/CrearPosteo';

import NavegacionTab from './NavegacionTab';

// import { auth, db } from '../firebase/config';

const Stack = createNativeStackNavigator();

class NavegacionPrincipal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        }
    }

    render() {
        return(
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Registro" component={Registro} options={{ headerShown: false }} />
                    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                    <Stack.Screen name="NavegacionTab" component={NavegacionTab} options={{ headerShown: false }} />
                    <Stack.Screen name="CrearPosteo" component={CrearPosteo} options={{ headerShown: false }} />
                    {/* <Stack.Screen name="Comentario" component={Comentario} options={{ headerShown: false }} />
                    <Stack.Screen name="PerfilUsuario" component={PerfilUsuario} options={{ headerShown: false }} /> */}
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
};

export default NavegacionPrincipal;
