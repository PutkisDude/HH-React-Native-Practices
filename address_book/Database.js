import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('addressbook.db');

const createDatabase = () => {
    db.transaction(tx => {
        tx.executeSql('create table if not exists addressbook (id integer primary key not null, address text, longitude text, latitude text);');
      });
}
    
const getData = async () => {
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql('SELECT * FROM addressbook;', [], (_, {rows}) => {
              resolve(rows._array)
            });
          });
        });
      }

const addAddress = async (address, longitude, latitude) => {
  if(!address) {
    Alert.alert('Type address first')
  }else{
    db.transaction(tx => {
      tx.executeSql('insert into addressbook (address, longitude, latitude) values (?,?,?);', [address,longitude,latitude])
      }
    )
  }
}

const deleteAddress = (id) => {
  db.transaction(
    tx => {
      tx.executeSql('delete from addressbook where id = ?;', [id])
    }
  );
}

module.exports = { createDatabase, getData, addAddress, deleteAddress };