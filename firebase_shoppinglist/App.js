import { StyleSheet, Text, TextInput, Button, FlatList, View } from 'react-native';
import {useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, onValue, remove} from 'firebase/database';
import { firebaseConfig } from './firebase';


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default function App() {

  const [amount, setAmount] = useState('');
  const [product, setProduct] = useState('');
  const [shoppinglist, setShoppinglist] = useState([]);


  useEffect(() => { 
    const itemsRef = ref(database, 'shoppinglist/');
    onValue(itemsRef, (snapshot) => {
      if(snapshot.val()){
      var items = [];
      snapshot.forEach((child) => { // forEach loop to get the keys
        items.push({
          id: child.key,
          product: child.val().product,
          amount: child.val().amount
        })
        setShoppinglist(items);
      })
    }else { setShoppinglist([])  }
    })
  }, [])

  const addItem = () => {
    if(product) {
      push(
        ref(database, 'shoppinglist/'),
        {'product': product, 'amount': amount});
    } clearInputs();
  }
  
  const clearInputs = () => {
    setAmount('');
    setProduct('');
  }

  const removeItem = (id) => {
    remove(ref(database, 'shoppinglist/' + id))
  }

  const itemSeparator = () => {
    return ( 
      <View style={{ height: 2, width: '100%', borderBottomWidth: 1, borderColor: 'grey'} } />
    )
  }

  return (
    <View style={styles.container}>

      <View style={styles.inputField}>
        <Text style={{textAlign: "center", fontSize: 18, color: '#3b3135'}}>Add Item</Text>
        <TextInput style={styles.input} placeholder="Product" onChangeText={product => setProduct(product)} value={product} />
        <TextInput style={styles.input} placeholder="Amount" onChangeText={amount => setAmount(amount)} value={amount} />
        <Button title="Save" onPress={addItem} />
      </View>

      <View style={styles.list}>
      <Text style={{textAlign: "center", fontSize: 18, color: '#785462'}}><Text style={{color:'red'}}>Firebase</Text> Shoppinglist</Text>
        <FlatList 
          data={shoppinglist}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item, id}) => 
          <View style={styles.listItem}>
            <Text style={{color:'blue', fontSize: 16}}>{item.product} - </Text>
            <Text style={{color: 'green', fontSize: 14}}>{item.amount}     </Text>
            <Text style={{color: 'red'}} onPress={() => removeItem(item.id)}>bought</Text>

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