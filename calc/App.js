import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {

  const [firstNum, setFirstNum] = useState();
  const [secondNum, setSecondNum] = useState();
  const [result, setResult] = useState();

  const calc = (method) => {
    if (!(firstNum && secondNum) || isNaN(firstNum) || isNaN(secondNum)){ // Checks that fields aren't empty and both have number
        Alert.alert("Set number on fields")
     }else{
       if(method === 'sum') {
        setResult(parseFloat(firstNum) + parseFloat(secondNum))
       }else if(method === 'min'){
        setResult(parseFloat(firstNum) - parseFloat(secondNum))
       }
     }
  }

  return (
    <View style={styles.container}>
      <View>
          <Text style={{fontSize:20}}>Result: {result}</Text>
      </View>
      <View>
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
           onPress={() => calc('sum')}
          />
        </View>
        <View style={styles.button}>
      <Button
        color="red" 
        title="-"
        onPress={() => calc('min')}
      />
      </View>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    margin: 5,
    width: 200,
    borderWidth: 1
  },
  button: {
    padding:5
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
