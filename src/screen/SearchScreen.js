//import liraries
import React, { Component } from 'react';
import { View,FlatList,Platform, Text,Alert, StyleSheet,TextInput, StatusBar,TouchableOpacity, Dimensions  } from 'react-native';


//
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios'
import ModalDropdown from 'react-native-modal-dropdown';


// create a component
class SearchScreen extends Component {

    constructor(props){
        super(props)
        this.state={
            tutor:[
                {id:1,title:'Engineering'},
                {id:2,title:'Science'},
                {id:3,title:'Law'},
                {id:4,title:'Medicine'},
                {id:5,title:'Business'},
                {id:6,title:'English'},
            ],
            test:[],
            city:['Cairo','Alex','Jeddah','Riyadh','Dubai','Doha','Abu Dhabi','Kuwait'],
            cities: [],
            citySelected:null,
            courseTitle:null,
            isLoading: true
        }
    }
    async componentWillMount() {
        try {
            axios.post('https://faheemapp.com/api-server/api/search/locations',{
              api_key_val: "1"
            }) .then((response) => {
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
    }
    
   
    static navigationOptions = {
        title: 'Find a Tutor',
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
        headerRight: <TouchableOpacity style={{marginRight:15}}><Ionicons name='md-arrow-forward' color='#fff' size={28} /></TouchableOpacity>,
        headerLeft: <TouchableOpacity style={{marginLeft:15}}><Ionicons name='md-more' color='#fff' size={28} /></TouchableOpacity>
      };
   
    render() {
        return (
            <View style={styles.container}>
                <StatusBar 
                    backgroundColor="#FFF"
                    barStyle="light-content" 
                />
                <Text style={{fontSize: 16,textAlign: 'center', alignSelf: 'center',width: Dimensions.get('window').width * .9, marginTop: 25,fontWeight: '500'}}>Compare the best teacher and choose the most appropriate</Text>
                <Text style={{color:'#f4511e',fontSize: 18,textAlign: 'center', alignSelf: 'center', marginTop: 25,fontWeight: '500', marginBottom:20}}>Here is best tutor in</Text>
               <View>
                <FlatList 
                    columnWrapperStyle={{alignSelf:'center',marginBottom:10}}
                    data={this.state.tutor}
                    showsHorizontalScrollIndicator={false} 
                    numColumns={4} 
                    scrollEnabled={false}  
                    style={{}}
                    renderItem={({ item, index }) =>
                        {
                            if ( index == 5 )
                        {
                            return     <TouchableOpacity key={index}>
                                     <Text >{item.title}  </Text>
                                </TouchableOpacity> 
                            
                        }else{
                            return <TouchableOpacity key={index}>
                             <Text >{item.title}  |  </Text>
                            </TouchableOpacity>
                        }
                    }}
                    keyExtractor={(item, index) => index.toString()}
                />
                </View>
                <TouchableOpacity onPress={() => {this.refs.dropdown_2.show()}}  style={{alignSelf:'center',flexDirection:'row-reverse',paddingRight:8,paddingLeft:8, borderColor:'#D8D8D8',borderWidth:.5,borderRadius: 7,height:50,alignItems: 'center',justifyContent:'space-between',  width: Dimensions.get('window').width * .9, }} >  
                   <ModalDropdown 
                    ref="dropdown_2"
                    onSelect={(idx, value) => this.setState({citySelected: value})}
                    style={{flexDirection:'row-reverse',alignItems: 'center',}}
                    dropdownStyle={{ width: Dimensions.get('window').width * .9,justifyContent:'center',alignItems:'center',alignSelf:'center'}} 
                    textStyle={{fontSize:14,fontWeight:"300"}} 
                    options={this.state.cities.map(city => {return city.name})}
                    defaultValue='Select City'
                />
                   <Ionicons name= "md-arrow-dropdown" style={{color:'#D8D8D8',marginLeft:10}} color={'#D8D8D8'} size={36}/>
                </TouchableOpacity>
                {this._SearchBox()}
                <TouchableOpacity style={{marginLeft: 20,marginTop:20}}>
                <Text>Advanced Search?</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>this._navigateToResultScreen() } style={{marginTop:30, backgroundColor: '#f4511e',borderRadius: 24, marginHorizontal:20, height:50,justifyContent:'center',alignItems:'center',}}>
                    <Text style={{color:'#FFF',fontSize: 18, fontWeight: '500' }}>Search</Text>
                </TouchableOpacity>
                </View>
        );
    }
 
    _navigateToResultScreen(){
        console.log(this.state.citySelected )
        console.log(this.state.courseTitle)

       if(this.state.citySelected != null&& this.state.courseTitle != null){
          return  this.props.navigation.navigate('Result')
       }else{
        Alert.alert(
            'Wrong',
            'Plz Select City and Course Title',
        )
       }
    }
    _SearchBox(){
        return(
            <View style={styles.SearchBar}>
                <View style={styles.SearchBarTextInput}>
                    <Ionicons name= "md-search" color='#C7CAD1' size={22}/>
                    <TextInput 
                        placeholder= 'Search the Course or test Name'
                        placeholderTextColor = '#D8D8D8'
                        style={{alignItems:'flex-end', paddingRight:15}}
                        onChangeText={(course) => this.setState({courseTitle: course})}
                        value={this.state.courseTitle}
                    >
                    </TextInput>
                </View>
               
            </View>
        )
    }
}
// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
       
    },
    SearchBar:{
        flexDirection:'row',        

    },
    SearchBarTextInput:{
        
        width: Dimensions.get('window').width * .9,
        height:50,
        marginTop:30,
        flexDirection:'row',
        borderWidth:.5,
        borderRadius: 7,
        borderColor:'#D8D8D8',
        marginLeft: 20,
        paddingLeft: 15,
        alignItems:'center',
        justifyContent:'space-between',
        marginRight:15
    },
});

//make this component available to the app
export default SearchScreen;


/***
 * 
 * 
 * 
 

  var params = {
                api_key_val: "1",
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
            
            let response = await fetch('https://faheemapp.com/api-server/api/search/locations', request)
            console.log(response)
           
 */