import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

//
import { createAppContainer, createStackNavigator } from 'react-navigation'


//
import SearchScreen from './src/screen/SearchScreen'
import ResultScreen from './src/screen/ResultScreen'

const StackNavigator =  createStackNavigator({
  Search:{
    screen: SearchScreen
    ,
      navigationOptions:{
        backgroundColor: '#eeb42b'
      }
    
  },
  Result:{
    screen: ResultScreen
    ,
      navigationOptions:{
        backgroundColor: '#eeb42b'
      }
    
  }
  
},
{
  initialRouteName: 'Search'
}
)

const AppContainer =  createAppContainer(StackNavigator)

export default function App() {
  return (
    <AppContainer />
  );
}
//just added a comment :D 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
