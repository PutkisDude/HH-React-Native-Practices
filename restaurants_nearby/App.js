import { StyleSheet, TextInput, Button, View } from 'react-native';
import { G_API_KEY } from '@env';
import { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';

export default function App() {

  const [address, setAddress] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [coords, setCoords] = useState({
    longitude: 0,
    latitude: 0
    });

  const getRestaurants = (lng, lat) => {
    const key = G_API_KEY;
    const radius = 1000; // radius in meters
    const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
    fetch(`${url}location=${lat},${lng}&radius=${radius}&type=restaurant&key=${key}`)
    .then(res => res.json())
    .then(data => setRestaurants(data.results))
    .catch(e => console.error(e))
  }

  const fetchAddress = () => {
    const key = G_API_KEY;
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`)
    .then(res => res.json())
    .then(data => {
      let lng = data.results[0].geometry.location.lng;
      let lat = data.results[0].geometry.location.lat;
      setCoords({
        longitude: lng,
        latitude : lat 
      })
      getRestaurants(lng, lat)
    })
    .catch(e => console.error(e)) 
  }

  return (
    <View style={styles.container}>
      <MapView
        style={{flex:1}}
        region={{
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.034,
          longitudeDelta: 0.034
        }}
      >        

        <Marker coordinate={{latitude: coords.latitude, longitude: coords.longitude}} title="middle" pinColor="gold" />

        {restaurants.map((restaurant, index) => (
          <Marker coordinate={{latitude : restaurant.geometry.location.lat, longitude: restaurant.geometry.location.lng}}
            title={restaurant.name} key={index} description={restaurant.vicinity} pinColor={"aqua"}
          />
        )
        )}
       
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
