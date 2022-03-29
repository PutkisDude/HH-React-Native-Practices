import { Input, Button, ListItem } from "react-native-elements"
import { View, FlatList} from "react-native"
import {addAddress, getData, deleteAddress } from './Database';
import { G_API_KEY } from '@env';
import {useState, useEffect} from "react";


export default function NewAddress( {navigation} ) {

    const [address, setAddress] = useState('');
    const [data, setData] = useState([]);

    useEffect(() => {
        updateList();
    },[])

    const updateList = () => {
        getData()
        .then(data => setData(data));
    }

    const delAddress = async (id) => {
        await deleteAddress(id)
        updateList();
    }

    const newAddress = () => {
        const key = G_API_KEY;
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`)
        .then(res => res.json())
        .then(data => {
          let lng = data.results[0].geometry.location.lng;
          let lat = data.results[0].geometry.location.lat;
          addAddress(address, lng, lat);
          setAddress('');
        })
        .then(updateList)
        .catch(e => console.error(e)) 
    }

    return(
        <View>
            <Input placeholder="Address" label="Address" onChangeText={value => setAddress(value)} value={address} />
            <Button disabled={!address} title="SAVE" icon={{name: 'save'}} onPress={newAddress} />
            <View>
            <FlatList
                data={data}
                renderItem={({item}) => 
                    <ListItem 
                        bottomDivider
                        topDivider 
                        onLongPress={() => delAddress(item.id)} 
                        onPress={() => navigation.navigate('Map', item)} 
                    >
                        <ListItem.Content>
                            <ListItem.Title>{item.address}</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                    } 
            />
        </View>        
     </View>
    )
}
