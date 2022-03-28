import { useState, useEffect } from 'react';
import { StyleSheet, FlatList, Alert, View, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { Header, Input, Button, ListItem, Icon } from 'react-native-elements';

import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('shoppinglist.db');

export default function App() {

  const [item, setItem] = useState('');
  const [amount, setAmount] = useState('');
  const [shoppinglist, setShoppinglist] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists shopping (id integer primary key not null, product text, amount text);');
    }, null, updateShoppingList);
  }, []);

  const updateShoppingList = () => {
      db.transaction(tx => {
        tx.executeSql('select * from shopping;', [], (_, { rows }) =>
          setShoppinglist(rows._array)
        ); 
      });
    }

  const addItem = () => {
    if(!item) {
      Alert.alert('Type item first');
    }else{
      db.transaction(tx => {
        tx.executeSql('insert into shopping (product, amount) values (?,?);', [item, amount]);
        }, null, updateShoppingList
      )
      clearFields();
    }
  }

  const deleteItem = (id) => {
    db.transaction(
      tx => {
        tx.executeSql('delete from shopping where id = ?;', [id]);
      }, null, updateShoppingList
    );
  }

  const clearFields = () => {
    setAmount('');
    setItem('');
  }

  const itemSeparator = () => {
    return ( 
      <View style={{ height: 2, width: '100%', borderBottomWidth: 1, borderColor: 'grey'}} />
    )
  }

  return (
      <View style={styles.container}>
        <Header centerComponent={{text: 'SHOPPING LIST', style: {color: '#FFFFFF'}}} />

    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View>
        <Input placeholder="Product" label="Product" onChangeText={item => setItem(item)} value={item} />
        <Input placeholder="Amount" label="Amount" onChangeText={amount => setAmount(amount)} value={amount} />
        <Button title="Add product" icon={{name: 'add'}} onPress={addItem} />
      </View>
    </TouchableWithoutFeedback>

      <View style={{flex: 1}}>
        <FlatList
          ItemSeparatorComponent={itemSeparator}
          data={shoppinglist}
          renderItem={({item} ) =>
            <ListItem.Swipeable
              rightContent={
              <Button
                buttonStyle={{backgroundColor: 'red', minHeight: '100%'}}
                title="Delete" 
                icon={{name: 'delete', color: 'white'}} 
                onPress={() => deleteItem(item.id)}
              />}>
              <ListItem.Content>
                <ListItem.Title>{item.product}</ListItem.Title>
                <ListItem.Subtitle>{item.amount}</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron />

            </ListItem.Swipeable>
            }
        />  
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});