import React, { Component } from 'react';
import { 
  StyleSheet,
  Image, 
  View,
  Text,
} from 'react-native';

class PropertyView extends Component {
  
  render() {
    var property = this.props.property;
    var stats = property.bedroom_number + ' bed ' + property.property_type;
    if (property.bathroom_number) {
      stats += ', ' + property.bathroom_number + ' ' + (property.bathroom_number > 1
        ? 'bathrooms' : 'bathroom');
    }
 
    var price = property.price_formatted.split(' ')[0];
 
    return (
      <View style={{flex:1,marginTop:40}}>
        <Image style={styles.image}
            source={{uri: property.img_url}} />
        <View style={styles.heading}>
          <Text style={styles.price}>{price}</Text>
          <Text style={styles.title}>{property.title}</Text>
          <View style={styles.separator}/>
          <Text style={styles.description}>{stats}</Text>
          <Text style={styles.description}>{property.summary}</Text>
        </View>
      </View>
    );
  }
}
var styles = StyleSheet.create({
  heading: {
    backgroundColor: '#F8F8F8',
    flex:5
  },
  separator: {
    height: 1,
    backgroundColor: '#DDDDDD'
  },
  image: {
    height: 300,
    flex:1,
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 5,
    color: '#48BBEC'
  },
  title: {
    fontSize: 20,
    margin: 5,
    color: '#656565'
  },
  description: {
    fontSize: 18,
    margin: 5,
    color: '#656565'
  }
});
module.exports = PropertyView;