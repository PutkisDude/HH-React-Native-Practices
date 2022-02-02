import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, FlatList, Text, TextInput, Button, View } from 'react-native';

export default function App() {

  const [obj, setObj] = useState('');
  const [items, setItems] = useState([]);

  const addItem = () => {
    setItems([...items, obj]);
  }

  const clear = () => {
    setItems([]);
  }

  return (
    <View style={styles.container}>
      <View style={{padding:10}}>
        <TextInput style={styles.input} onChangeText={text => setObj(text)} />
        </View>
        <View style={{flexDirection: 'row', paddingTop: 10,}}> 
         <Button title='ADD'  onPress={addItem} />
         <Button title='CLEAR' onPress={clear} />
        </View>
        <View>
          <FlatList
            data={items}
            renderItem={({item}) => <Text>{item}</Text>}
            keyExtractor={(item, index) => index}
          />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60
  },
  input: {
    width: 200,
    borderWidth: 1,
    borderColor: 'red'
  }
});
