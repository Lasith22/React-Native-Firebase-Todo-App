/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import type {Node} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';

 const App  = () => {
  const [text,setText] = useState('')
  const ref = firestore().collection('todos');
  const[list,setList] = useState([])
  useEffect(()=>{
    return ref.onSnapshot((querySnapshot) => {
      const list=[]
      querySnapshot.forEach(doc=> {
        list.push({
          id:doc.data().id,
          title:doc.data().title,
          complete:doc.data().complete
        })
      })
      setList(list)
    });

  },[])
  const onSubmitPress=async()=>{
    console.log(text,"Hllo")
    if(text.length==0){
      alert("Please enter todo")
      return
    }
    await ref.add({
      title:text,
      complete:false
    })
    setText('')
  }
  console.log(list)
  return (
    <View style={ style.mainContainer}>

      <View style={{flexDirection:'row'}}>

       <TextInput
       value={text}
        onChangeText={setText}
        style={ style.textInput}

        />

        <TouchableOpacity
        disabled={text.length===0}
        onPress={onSubmitPress}
        style={ style.button}>
 

<Text style={{color:'red'}}>Submitd</Text>

 


        </TouchableOpacity>
    </View>
  
    <FlatList
    data={list}
    renderItem={({item})=>(
      <View style={{width:'100%',height:40,backgroundColor:'brown',flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginVertical:10}}>
        <Text style={{color:'white'}}> {item.title}</Text>
        </View>

    )}
    />
    </View>
  );
};

 const style=StyleSheet.create({
  textInput:{
    backgroundColor:'blue',
    width:'70%',
    height:50,
    padding:3,
   color:'white',
   borderRadius:5



  },
  mainContainer:{
    flex:1,
    
    padding:10,
    paddingTop:20

  },
  button:{
    width:90,
    height:50,
    backgroundColor:'yellow',
    borderRadius:5,
    alignItems:'center',
    justifyContent:'center',
    marginLeft:10


  }



 })

export default App;
