import React, {useState} from 'react';
import { Alert, KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import List from './components/List';
import Modal from "react-native-modal";

export default function App() {
  const [shopList, setShopList] = useState();
  const [shopListDescription, setShopListDescription] = useState();
  const [shopListItems, setShopListItems] = useState([]);
  const [isModal, setIsModal] = useState(false)

  const handleAddShopList = () => {
    Keyboard.dismiss();
    console.log('shopList= ', shopList, 'shopListDescription= ', shopListDescription)
    if (shopList === null || shopListDescription === null) {
      Alert.alert("", "Name or Description can not be empty", [
        {
            text: "Oke",
            onPress: () => null,
            style: "oke"
        }
      ])
    } else {
      setShopListItems([...shopListItems, {shopList:shopList, shopListDescription:shopListDescription} ]);
      setShopList(null);
      setShopListDescription(null);
      setIsModal(false);
    }
    
  }

  const showModal = ()=>{
    setIsModal(true)
  }

  const closeModal = ()=>{
    setIsModal(false)
  }

  const completeShopList = (index) => {
    Alert.alert("", "Are you sure you want to delete this list?", [
      {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
      },
      {   
          text: "YES", 
          onPress: () => {
            let itemsCopy = [...shopListItems];
            itemsCopy.splice(index, 1);
            setShopListItems(itemsCopy)
          }
      }
    ])
};

console.log('shopListDescription = ', shopListDescription, 'shopListItems = ', shopListItems)

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1
        }}
        keyboardShouldPersistTaps='handled'
      >

      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Shopping List</Text>
        <View style={styles.items}>
          {
            shopListItems.map((item, index) => {
              console.log('item = ', item)
              return (
                <TouchableOpacity key={index}  onPress={() => completeShopList(index)}>
                  <List 
                  text={item.shopList}
                  desc={item.shopListDescription}
                  /> 
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>
      </ScrollView>

      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        {/* <TextInput style={styles.input} placeholder={'Add a list'} value={task} onChangeText={text => setTask(text)} /> */}
        <TouchableOpacity onPress={() => showModal()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <Modal
        isVisible={isModal}
        animationIn={"fadeIn"}
        animationOut={"fadeOut"}
        onBackdropPress={() => false}
      >
        <View style={styles.containerModalPopUp}>
          <Text style={styles.modalTitle}>Add New List</Text>
          <Text style={styles.text}>Name</Text>
          <TextInput style={styles.input} placeholder={'Add a name'} value={shopList} onChangeText={text => setShopList(text)} />
          <Text style={styles.text}>Description</Text>
          <TextInput style={styles.input} placeholder={'Add a description'} value={shopListDescription} onChangeText={desc => setShopListDescription(desc)} />
          <View style={{flexDirection:'row', justifyContent:'space-between', paddingLeft:10, paddingRight:10}}>
          <TouchableOpacity 
              style={styles.btnCancel}
              onPress={() => closeModal()}>
              <Text style={{color:'black'}}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity 
              style={styles.btnSave} 
              onPress={() => handleAddShopList()}>
              <Text style={{color:'white'}}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  modalTitle: {
    textAlign:'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20
  },
  text: {
    marginBottom: 10,
  },
  containerModalPopUp: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  btnCancel: {
    marginTop: 15,
    marginBottom : 5,
    borderRadius: 10,
    backgroundColor:'#DDDDDD',
    width:'30%',
    height:40,
    justifyContent:'center',
    alignItems:'center'
  },
  btnSave: {
    marginTop: 15,
    marginBottom : 5,
    borderRadius: 10,
    backgroundColor:'#2196F3',
    width:'30%',
    height:40,
    justifyContent:'center',
    alignItems:'center'
  },
  tasksWrapper: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    textAlign:'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3'
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 293,
    marginLeft: 10,
    marginBottom: 10
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#2196F3',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {
    color: 'white',
    fontSize: 25
  },
});
