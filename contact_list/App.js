import * as Contacts from 'expo-contacts';
import { StyleSheet, Button, Text, FlatList, View } from 'react-native';
import { useState } from 'react';

export default function App() {

  const [contacts, setContacts] = useState([]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if ( status === 'granted')  {
      const { data } = await Contacts.getContactsAsync(
        { fields : [Contacts.Fields.PhoneNumbers] }
      );
      if (data.length > 0) {
        setContacts(data);
      }
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => 
        <View>
          <Text style={{fontSize:18}}>{item.name} - {item.phoneNumbers[0].number}</Text>
        </View>}
      />
      <Button title='Get contacts' onPress={getContacts} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    marginBottom: 60,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
