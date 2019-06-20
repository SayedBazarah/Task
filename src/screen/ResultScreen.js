//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,TextInput,Dimensions, Image, FlatList } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import ModalDropdown from 'react-native-modal-dropdown';
import axios from 'axios';
import { Content } from 'native-base'
import StarRating from 'react-native-star-rating';

import TutorsDetails from '../component/TutorsDetails'
// create a component
class ResultScreen extends Component {
    constructor(props){
        super(props);
        this.state={
            cities: [],
            nearBy:[
               'near by 1...',
               'near by 2...'
            ],
            tutors:[]
        }
    }
    async componentWillMount() {
        try {
            axios.post('https://faheemapp.com/api-server/api/search/locations',{
              api_key_val: "1"
            }) .then((response) => {
                console.log(response.data)
                this.setState({
                    cities: response.data
                })
              })
              .catch(function (error) {
                console.log(error);
              });
             
            
            
          } catch (error) {
          
            console.error('err',error);
      
          }
          try {
            axios.post('https://faheemapp.com/api-server/api/search/tutors',{
              api_key_val: "1",
              student_id: 0,
              lat: 26.236126,
              long:50.039303
            }) .then((response) => {
                this.setState({
                    tutors: response.data
                })

              })
              .catch(function (error) {
                console.log(error);
              });
             
            
            
          } catch (error) {
          
            console.error('err',error);
      
          }
    }
   

    static navigationOptions = {
        title: 'Search Result',
        headerStyle: {
            backgroundColor: '#f4511e',
        
        },
        headerTitleStyle: {
            fontWeight: '400',
            textAlign: 'center',
            flexGrow:1,
            alignSelf:'center',
        },
        headerTintColor: '#fff',
        headerRight: <TouchableOpacity TouchableOpacity style={{marginRight:15}}><Ionicons name='md-arrow-forward' color='#fff' size={28} /></TouchableOpacity>,
        headerLeft: <TouchableOpacity style={{marginLeft:15, flexDirection:'row', alignItems:'center',justifyContent:'center'}}><Ionicons name='md-more' color='#fff' size={28} /><Ionicons name='md-search' style={{marginLeft:10}} color='#fff' size={24} /></TouchableOpacity>
    };
    _SearchBox(){
        return(
            <View style={styles.SearchBar}>
                <View style={styles.SearchBarTextInput}>
                    <TextInput 
                        placeholder= 'Search here...'
                        placeholderTextColor = '#D8D8D8'
                        style={{alignItems:'flex-end', paddingRight:15}}
                        onChangeText={(course) => this.setState({courseTitle: course})}
                        value={this.state.courseTitle}
                    >
                    </TextInput>
                    <View style={{backgroundColor:'#f4511e',height:50, width: 50,alignItems:'center',justifyContent: 'center' ,borderBottomRightRadius: 7,borderTopRightRadius: 7,}} >
                    <Ionicons  name= "md-search" color='#FFF' size={22}/>
                    </View>
                </View>
               
            </View>
        )
    }
    render() {
        return (
            <View style={styles.container}>
               <View style={{marginTop:20, marginRight:20,flexDirection:'row-reverse',alignItems: 'center',justifyContent:'space-between'}}>
                  {this._SearchBox()}
                   <TouchableOpacity onPress={() => {this.refs.dropdown_1.show()}} style={{alignSelf:'center',flexDirection:'row-reverse',paddingRight:8,paddingLeft:8, borderColor:'#D8D8D8',borderWidth:.5,borderRadius: 7,height:50,alignItems: 'center',justifyContent:'space-between',  width: Dimensions.get('window').width * .25, }} >  
                   <ModalDropdown 
                   ref="dropdown_1"
                    style={{flexDirection:'row-reverse',alignItems: 'center',}}
                    dropdownStyle={{borderRadius: 7,top:25,left:5}} 
                    textStyle={{fontSize:14,fontWeight:"300"}} 
                    options={this.state.cities.map(city => {return city.name})}
                    defaultValue='City'
                />
                
                   <Ionicons name= "md-arrow-dropdown" style={{color:'#D8D8D8'}} color={'#D8D8D8'} size={28}/>
                </TouchableOpacity>
               </View>
               <TouchableOpacity  style={{marginRight: 10,marginTop:20, alignItems:'flex-end',paddingRight:10}}>
                <Text style={{color:'#f4511e',fontSize:18}}>Advanced Search?</Text>
               </TouchableOpacity>
               <TouchableOpacity onPress={() => {this.refs.dropdown_2.show()}} style={{marginHorizontal:15,marginTop:20,marginBottom:5, flexDirection:'row-reverse',paddingRight:15,paddingLeft:15, borderColor:'#D8D8D8',borderWidth:.5,borderRadius: 7,height:50,alignItems: 'center',justifyContent:'space-between',   }} >  
                   <ModalDropdown 
                   ref="dropdown_2"
                    style={{flexDirection:'row-reverse',alignItems: 'center',}}
                    dropdownStyle={{borderRadius: 7,left:50, width: Dimensions.get('window').width * .9,}} 
                    textStyle={{fontSize:14,fontWeight:"300"}} 
                    options={this.state.nearBy}
                    defaultValue='Near By'
                 />
                   <Ionicons name= "md-arrow-dropdown" style={{color:'#D8D8D8'}} color={'#D8D8D8'} size={28}/>
                </TouchableOpacity>
                <Content>
                    {this._renderTutors()}
                </Content>
            </View>
        );
    }
    _renderTutors(){
       const list =[] 
       console.log(this.state.tutors.length)
       for(let i =0; i < this.state.tutors.length;i++){
           const tutor =this.state.tutors[i]
           console.log(tutor)
           list.push(
            <TutorsDetails
                key={i}
                tutor= {tutor}
            />
           )
       }
       return list
    }
    
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
       
    },
    SearchBar:{

    },
    SearchBarTextInput:{
        marginLeft:10,
        width: Dimensions.get('window').width * .65,
        height:50,
        flexDirection:'row',
        borderWidth:.5,
        borderRadius: 7,
        borderColor:'#D8D8D8',
        paddingLeft: 15,
        alignItems:'center',
        justifyContent:'space-between',
        marginRight:15
    },
});

//make this component available to the app
export default ResultScreen;


/**
 * 
 * 
 * 
 
async componentWillMount() {
        try {
            var params = {
                api_key_val: '1',
            };
            
            var formData = new FormData();
            
            for (var k in params) {
                formData.append(k, params[k]);
            }
            
            var request = {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',},
                body: formData
            };
            
            let response = await fetch('https://faheemapp.com/api-server/api/search/tutors', request)
            console.log(response.status)

            let responseJson = await response.json()
            console.log(responseJson)

            
        } catch (error) {
        
          console.error('err',error);
    
        }
        
    }

 */