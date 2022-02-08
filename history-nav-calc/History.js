import { React } from 'react';
import { View, Text, FlatList } from 'react-native';

export default function History( {route} ) {

    return(
        <View style={{alignItems:'center', paddingTop:20}}>
            <Text style={{fontSize: 20, color:'grey'}}>History</Text>
            <FlatList
               style={{paddingTop:15}}
               alignItems='center'
             data={route.params}
             renderItem={({item}) => <Text style={{fontSize:15}}>{item}</Text>}
             keyExtractor={(item, index) => index}
         />
        </View>
    )
}