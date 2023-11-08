import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AntDesign, Foundation, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

import { View, StyleSheet } from "react-native";

import Home from '../screens/Home';
import BuscadorUsuarios from '../screens/BuscadorUsuarios';
import CrearPosteo from '../screens/CrearPosteo';
import MiPerfil from '../screens/MiPerfil';

const Tab = createBottomTabNavigator();

class NavegacionTab extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return(
            <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
                <Tab.Screen name="Home" component={Home} options={
                    {tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    )}
                } />
                <Tab.Screen name="BuscardorUsuarios" component={BuscadorUsuarios} option={
                    {tabBarIcon: ({ color, size }) => (
                        <AntDesign name="search1" color={color} size={size} />
                    )}
                } />
                <Tab.Screen name="CrearPosteo" component={CrearPosteo} options={
                    {tabBarIcon: ({ color, size }) => (
                        <AntDesign name="pluscircleo" color={color} size={size} />
                    )}
                }/>
                <Tab.Screen name="MiPerfil" component={MiPerfil} options={
                    {tabBarIcon: ({color, size}) => (
                        <Foundation name="torso" color={color} size={size} />
                    )}
                }/>
            </Tab.Navigator>
        )
    }
};

const Style = StyleSheet.create({
    contenedor: {
        flex: 1,
    }
});

export default NavegacionTab;
