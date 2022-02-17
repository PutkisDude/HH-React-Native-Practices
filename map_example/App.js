import { StyleSheet, View } from 'react-native';
import MapView, {Marker} from 'react-native-maps';

export default function App() {
  return (
    <View style={styles.container}>
      <MapView 
        style={{flex: 1}}
        region={{
          latitude: 60.200692,
          longitude: 24.934302,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221,
        }}
      >
      <Marker 
        coordinate={{
        latitude:60.201373, 
        longitude:24.934041}}
        title='Haaga-Helia' 
      />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
