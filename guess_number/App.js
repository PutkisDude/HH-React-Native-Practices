import { StatusBar } from 'expo-status-bar';
import {useState, useEffect} from 'react';
import { StyleSheet, Text, Button, View, TextInput, Alert } from 'react-native';

export default function App() {

  const [msg, setMsg] = useState('');
  const [num, setNum] = useState();
  const [guessNum, setGuessNum] = useState();
  const [guesses, setGuesses] = useState(0);

  const start = () => {
    setNum(Math.floor(Math.random() * 100) + 1);
    setGuesses(0);
    setMsg('Guess a number between 1-100');
  }

  useEffect(() => {
    start();
  }, [])

  const guess = () => {
    if(guessNum > 0 && guessNum <= 100){
      setGuesses(guesses + 1);
      if(num == guessNum){
        Alert.alert("You guessed the number in " + guesses + " guesses");
        start();
      }else if(num < guessNum){
        setMsg('Your guess ' + guessNum + ' is too high');
      }else{
        setMsg('Your guess ' + guessNum + ' is too low');
      }
    }else{
      Alert.alert("Guess only between 1-100");
      setMsg('Guess a number between 1-100');
    }
    
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View>
        <Text style={{fontSize:20}}>{msg}</Text>
      </View>
      <View>
        <TextInput
          onChangeText={guess => setGuessNum(guess)}
          style={styles.input}
          placeholder='set number'
          keyboardType='numeric'
        />
      </View>
      <View>
        <Button onPress={() => guess()} title='guess' />
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
  },
  input: {
    width: 100,
    margin:5,
    borderWidth: 1
  }
});
