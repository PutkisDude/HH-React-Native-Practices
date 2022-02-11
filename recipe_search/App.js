import React, {useState} from 'react';
import { StyleSheet, TextInput, Text, Image, Button, View, Alert, FlatList } from 'react-native';

export default function App() {

  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState('');

  const searchRecipe = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
    .then(res => res.json())
    .then(data => setData(data.meals))
    .catch(err => {
      Alert.alert('Something went wrong')
    })
  }

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "90%",
          backgroundColor: "#484e57",
          marginLeft: "5%"
        }}
      />
    );
  };



  return (
    <View style={styles.container}>
      <Text style={{fontSize:20, color: 'red'}}>Search meals with ingredient</Text>
      <FlatList 
        data={data}
        ItemSeparatorComponent={listSeparator}
        keyExtractor={item => item.idMeal}
        renderItem={({item}) => 
          <View style={{margin:9, alignItems:'center'}}>
            <Text style={{fontSize: 16,fontWeight:'bold', marginBottom:10}}>{item.strMeal} </Text>
            <Image
              style={{width: 100, height:100}}
              source={{uri: item.strMealThumb}} 
            />
          </View>
      } 

        />
      <TextInput 
        style={{borderColor:'grey', borderWidth:1, width: 200}}
        placeholder='Search...'
        onChangeText={text => setKeyword(text)}
      />
      <Button title='Search' onPress={searchRecipe} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:20,
    marginTop:60,
    justifyContent: 'flex-end'
  },
});
