import { useState, useEffect } from 'react';
import { StyleSheet, Alert, TextInput, Text, View, Button, FlatList } from 'react-native';
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
      <View 
        style={
          { height: 2, width: '100%', borderBottomWidth: 1, borderColor: 'grey'}
        }
      />
    )
  }

  return (
    <View style={styles.container}>

      <View style={styles.inputField}>
        <Text style={{textAlign: "center", fontSize: 18, color: '#3b3135'}}>Add Item</Text>
        <TextInput style={styles.input} placeholder="Product" onChangeText={item => setItem(item)} value={item} />
        <TextInput style={styles.input} placeholder="Amount" onChangeText={amount => setAmount(amount)} value={amount} />
        <Button title="Save" onPress={addItem} />
      </View>

      <View style={styles.list}>
      <Text style={{textAlign: "center", fontSize: 18, color: '#785462'}}>The Shoppinglist</Text>
        <FlatList 
          data={shoppinglist} 
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item, id}) => 
          <View style={styles.listItem}>
            <Text style={{color:'blue', fontSize: 16}}>{item.product} - </Text>
            <Text style={{color: 'green', fontSize: 14}}>{item.amount}     </Text>
            <Text style={{color: 'red'}} onPress={() => deleteItem(item.id)}>bought</Text>
          </View>}
          ItemSeparatorComponent={itemSeparator}
          />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputField:{
    flex: 1,
    marginBottom: 60,
  },
  input: {
    borderWidth: 1,
    width: 200,
    margin: 3,
  },
  list: {
    flex: 4,
  },
  listItem: {
    flexDirection: 'row', 
    flexWrap: 'wrap' // Wrap to 2nd line if product name is too long
  }
});
