import { StyleSheet, TextInput, Button, Text, View } from 'react-native';
import * as Speech from 'expo-speech';
import { useState } from 'react';
import {Picker} from '@react-native-picker/picker';

// https://youtu.be/TE-4O_aM6ug 

export default function App() {

  const [text, setText] = useState('')
  const [language, setLanguage] = useState('en-EN')

  const speak = () => {
    if(text) Speech.speak(text, {rate: 0.9, pitch:1, language: language, maxLength: 250});
    else Speech.speak('Write something', {pitch: 1.8});
  }
  
  return (
    <View style={styles.container}>
      <TextInput 
        style={{borderWidth: 2, padding: 10, textAlignVertical: 'top', fontSize: 20, width:'70%', height: '50%'}}
        value={text}
        autoFocus={true}
        multiline={true}
        placeholder='Type your text' 
        onChangeText={tx => setText(tx)}
        maxLength={250} 
      />
      <View style={{flexDirection: 'row', margin: 5}}>
      <Picker
        style={{width:100, height:50, backgroundColor: 'orange'}}
        selectedValue={language}
        onValueChange={(itemValue, itemIndex) => setLanguage(itemValue)}
      >
        <Picker.Item label="EN" value="en-EN" />
        <Picker.Item label="FI" value="fi-FI" />
        <Picker.Item label="SWE" value="sv-SV" />
        <Picker.Item label="DE" value="de-DE" />
      </Picker>
      <Button title="Press to hear" onPress={speak} />
      <Button color={'red'} title="Clear" onPress={() => setText('')} />

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
});
