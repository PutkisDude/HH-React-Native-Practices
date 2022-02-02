import { useState } from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {

  const [firstNum, setFirstNum] = useState();
  const [secondNum, setSecondNum] = useState();
  const [result, setResult] = useState();
  const [history, setHistory] = useState([]);

  const calc = (method) => {
    if (!(firstNum && secondNum) || isNaN(firstNum) || isNaN(secondNum)){ // Checks that fields aren't empty and both have number
        Alert.alert("Set number on fields")
     }else{
       if(method === '+') {
         let res = parseFloat(firstNum) + parseFloat(secondNum)
        setResult(res);
        setHistory([...history, firstNum + ' + ' + secondNum + ' = ' + res]);
       }else if(method === '-'){
        let res = parseFloat(firstNum) - parseFloat(secondNum);
        setHistory([...history, firstNum + ' - ' + secondNum + ' = ' + res]);
        setResult(res);
     }
    }
  }

  return (
    <View style={styles.container}>
      <View style={{flex:1}}>
          <Text style={{fontSize:20}}>Result: {result}</Text>
        <TextInput 
          style={styles.input}
          placeholder='set number'
          onChangeText={text => setFirstNum(text)}
          keyboardType='numeric'
         />
        <TextInput 
          style={styles.input}
          placeholder='set number'
          onChangeText={text => setSecondNum(text)}
          keyboardType='numeric'
        />
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.button}>
          <Button 
           title="+" 
           onPress={() => calc('+')}
          />
        </View>
      <View style={styles.button}>
        <Button
          color="red" 
          title="-"
          onPress={() => calc('-')}
        />
      </View>
      
    </View>
      <FlatList
      data={history}
      renderItem={({item}) => <Text>{item}</Text>}
      keyExtractor={(item, index) => index}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: 200,
    borderWidth: 1
  },
  button: {
    padding:5
  },
  container: {
    paddingTop: 60,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
