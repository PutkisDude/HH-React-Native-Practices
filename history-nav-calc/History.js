import { React } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function History( {route, navigation} ) {

    return(
        <FlatList
            style={{paddingTop:30}}
            alignItems='center'
            data={route.params}
            renderItem={({item}) => <Text>{item}</Text>}
            keyExtractor={(item, index) => index}
        />



    )
}