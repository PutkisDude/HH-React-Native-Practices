import MapView, {Marker} from "react-native-maps";
import {StyleSheet, View } from "react-native";


export default function Map({ route }) {

    return(
        <View style={StyleSheet.absoluteFillObject}>
            <MapView 
                style={StyleSheet.absoluteFillObject} 
                initialRegion={{
                        latitude: parseFloat(route.params.latitude), 
                        longitude: parseFloat(route.params.longitude), 
                        latitudeDelta: 0.04, 
                        longitudeDelta: 0.04
                        }
                    }>
                <Marker coordinate={{ 
                    latitude: parseFloat(route.params.latitude), 
                    longitude: parseFloat(route.params.longitude) }} 
                    title={route.params.address} />
            </MapView>
        </View>
    )
}