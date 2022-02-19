import { StyleSheet, TextInput, Button, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { MAP_SECRET } from '@env'
import { useState } from 'react';


export default function App() {

  const [address, setAddress] = useState('')
  const [coords, setCoords] = useState({
    longitude: 0,
    latitude: 0
  })


  const fetchAddress = () => {
    // Remove empty spaces, without example "ratapihantie 13" takes to Canada instead Pasila
    // Still ignores when multiple results
    const location = address.replace(/ /g, '')
    let settings = `thumbMaps=false&key=${MAP_SECRET}&outFormat=json`
    fetch(`http://www.mapquestapi.com/geocoding/v1/address?${settings}&location=${location}`)
    .then(res => res.json())
    .then(data => setCoords({
      "latitude" : data.results[0].locations[0].latLng.lat, 
      "longitude" : data.results[0].locations[0].latLng.lng  
    }))
    .catch(e => console.log(e))
  }
  
  return (
    <View style={styles.container}>

      <MapView
        style={{flex:1}}
        region={{
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.0122,
          longitudeDelta: 0.0221
        }}
      >
        <Marker
          coordinate={{
            latitude: coords.latitude,
            longitude: coords.longitude}}
            title={address}
        />

      </MapView>

      <View style={{
        width: '100%',
        position: 'absolute', // Input field goes on the map
        top: 10, 
        flexDirection: 'row',
        justifyContent: 'center'
        }}>
        <TextInput
          style={{
            width: 200,
            borderWidth:1,
            paddingLeft: 20, 
            borderColor: 'grey',
            borderRadius: 10,
            fontSize: 18,
            backgroundColor: 'rgba(255,255,255,0.5)' // 50% transparent input field
          }}
          onChangeText={text => setAddress(text)} 
          placeholder="Search"
        />
        <Button 
          title="Show" 
          onPress={fetchAddress} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 60,
    backgroundColor: '#fff',
  },
});
