import { useEffect, useState } from 'react';
import { Alert, Button, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import {SECRET_API_KEY} from '@env'; // https://www.npmjs.com/package/react-native-dotenv
import {Picker} from '@react-native-picker/picker';

export default function App() {

  const [original, setOriginal] = useState(0); // Input value
  const [converted, setConverted] = useState(0); // Converted value
  const [values, setValues] = useState([]); // All rate values and keys
  const [currency, setCurrency] = useState(''); // Selected currency for convert

  useEffect(() => {
    fetchValues();
  },[])

  const fetchValues = () => {
    const url = 'http://api.exchangeratesapi.io/v1/latest?access_key=';
    fetch(url + SECRET_API_KEY)
    .then(res => res.json())
    .then(data => setValues(data.rates))
    .catch(e => Alert.alert('Something went wrong'))
  }

  const convert = () => { // Convert if input is number
    if(isNaN(original)){
      Alert.alert('Error', 'Try again..')
    }else{
      setConverted(parseFloat(Number(original/values[currency]).toFixed(2)))
    }
  }
  
  return (
    <View style={styles.container}>
      
      <View style={{flex: 1, marginTop: 40}}>
        <Image 
          source={{uri: 'http://putkonen.me/pics/randomicon.png'}}
         style={{width:200, height:200}}
        />
      </View>

      <View style={{flex:1}}>
        <Text style={{fontSize:20}} >
          {converted == 0 ? null : converted +'€'}
        </Text>
        <View style={{flexDirection:'row'}} >
          <TextInput
              style={{width: 100, borderBottomWidth: 1, borderColor: 'grey', margin:10}}
              onChangeText={text => setOriginal(text)}
              keyboardType='numeric'
            />
          <Picker
              selectedValue={currency}
              onValueChange={(item, index) => setCurrency(item)}
              style={{height:20, width:100}}
            >
            {Object.keys(values).map((item, index) => {
                return <Picker.Item label={item} value={item} key={index} />
              })}
            </Picker>
        </View>
        <Button title='Convert' onPress={convert} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    marginBottom: 30,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});