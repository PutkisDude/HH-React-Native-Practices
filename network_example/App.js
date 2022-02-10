import React, {useState} from 'react';
import { StyleSheet, Button, View, TextInput, Alert, FlatList, Text } from 'react-native';


export default function App() {

  const [keyword, setKeyword] = useState('');
  const [repositories, setRepositories] = useState([]);
  
  const fetchData = () => {
    fetch(`https://api.github.com/search/repositories?q=${keyword}`)
    .then(response => response.json()) // if response.status(200)...
    .then(data => setRepositories(data.items))
    .catch(e => {
      Alert.alert('error', e);
    })
  }

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: "#CED0CE",
          marginLeft: "10%"
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={repositories}
        ItemSeparatorComponent={listSeparator}
        keyExtractor={item => item.id}
        renderItem={({item}) => 
          <View style={{ margin:10}}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>{item.full_name}</Text>
            <Text style={{fontSize: 16}}>{item.description}</Text>
          </View>
      }
        />
      <TextInput
        style={{ width: 200, borderColor: 'grey', borderWidth: 1}}
        placeholder='Search...'
        onChangeText={text => setKeyword(text)}
      />
      <Button title='Find' onPress={fetchData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    marginBottom: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
