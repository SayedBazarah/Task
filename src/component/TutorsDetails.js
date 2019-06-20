//import liraries
import React, { Component } from 'react';

import StarRating from 'react-native-star-rating';
import { View, Text, StyleSheet,TouchableOpacity,TextInput,Dimensions, Image, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// create a component
class MyClass extends Component {
    componentWillMount() {
        console.log(this.props.tutor)

    }
    render() {
        return (
            <View style={{marginHorizontal: 15 ,marginHorizontal: 15, marginTop:20,backgroundColor:'#FFF',borderWidth:1,shadowColor:'#f4511e',borderColor:'#FFF',borderRadius:7,shadowOpacity: 0.3,shadowOffset:{ width: 0, height: 2},}}>
                        <View style={{marginTop:10,marginLeft:15,marginRight:15,marginBottom:15, flexDirection:'row', justifyContent:'space-between',alignItems:'center'}}>
                            <View><Text style={{alignSelf:'center'}}>SR {this.props.tutor.tutor_average_price} </Text><Text>per hour</Text></View>
                            <View style={{}}>
                                <Text style={{alignSelf:'flex-end'}}>{this.props.tutor.username}</Text>
                                <View style={{alignSelf:'flex-end',marginTop:5}}>
                                <StarRating
                                    maxStars={5}
                                    rating={Number(this.props.tutor.avg_rating)}
                                    starSize={14}
                                    fullStarColor='orange'
                                    emptyStarColor='orange'
                                    />
                                </View>
                                <View style={{marginTop:8,flexDirection:'row', alignItems:'center',justifyContent:'center'}}>
                                 <Text> {this.props.tutor.qualification} </Text>
                                 <Text style={{marginRight: 8, textAlign:'right'}}> - qualification</Text>
                                 <Ionicons name= "md-search" style={{}} size={18}/>                                
                                </View>
                            </View>
                            <View>
                                <Image
                                    style={{width: 50, height: 50}}
                                    source={{uri: this.props.tutor.photo}}
                                />
                            </View>
                        </View>
                        <FlatList 
                            
                            columnWrapperStyle={{justifyContent:'flex-end',marginBottom:10}}
                            data={this.props.tutor.subjects}
                            showsHorizontalScrollIndicator={false} 
                            numColumns={4} 
                            scrollEnabled={false}  
                            style={{flexDirection:'row-reverse'}}
                            renderItem={({ item, index }) => (
                                <View key={item.subject_name} style={{ backgroundColor: '#f4511e', borderRadius:7, marginRight:5}}>
                                  <Text style={{color:'#fff',paddingLeft:5,paddingRight:5,}} >{item.subject_name}</Text>
                                </View>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default MyClass;
