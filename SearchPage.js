import React, { Component } from 'react';
import { 
  AppRegistry,
  StyleSheet,
  Text,
  DrawerLayoutAndroid, 
  ProgressBarAndroid, 
  TouchableHighlight,
  ScrollView,
	TextInput,
	Navigator,
  Image,
	ActivityIndicator,
	ListView,
  View
} from 'react-native';
var SearchResults = require('./SearchResults');

function urlForQueryAndPage(key, value, pageNumber) {
		var data = {
				country: 'uk',
				pretty: '1',
				encoding: 'json',
				listing_type: 'buy',
				action: 'search_listings',
				page: pageNumber
		};
		data[key] = value;
		var querystring = Object.keys(data)
			.map(key => key + '=' + encodeURIComponent(data[key]))
			.join('&');
		return 'http://api.nestoria.co.uk/api?' + querystring;
	};

class SearchPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchString: 'london',
			isLoading: false,
			message: '',
		};
	}
	onSearchTextChanged(event) {
		console.log('onSearchTextChanged');
		this.setState({ searchString: event.nativeEvent.text });
		console.log(this.state.searchString);
	}
	_handleResponse(response) {
		this.setState({ isLoading: false , message: '' });
		if (response.application_response_code.substr(0, 1) === '1') {
			console.log('Properties found: ' + response.listings.length);
			this.props.navigator.push({
				title: 'Results',
				component: SearchResults,
			  params:{listings: response.listings},
			});
		} else {
			this.setState({ message: 'Location not recognized; please try again.'});
		}
	}
	_executeQuery(query) {
		console.log(query);
		fetch(query)
		.then(response => response.json())
		.then(json => this._handleResponse(json.response))
		.catch(error => 
			this.setState({
				isLoading: false,
				message: 'Something bad happened ' + error
		}));
		this.setState({ isLoading: true });
	}
	onSearchPressed() {
		var query = urlForQueryAndPage('place_name', this.state.searchString, 1);
		this._executeQuery(query);
	}
	
	render(){
		var spinner = this.state.isLoading ?(<ActivityIndicator />):(
						<View>
							<Text>{this.state.message}</Text>
						</View>
		);
		return(
			<View style={styles.row}>
				<View style={{flex:1,margin:20}}>
					<Text style={styles.text}>Search for houses to buy!</Text>
					<Text style={styles.text}>Search by place-name,postcode or search near your location.</Text>
					<View style={{flexDirection:'column'}}>
					<View style={{flex:1,flexDirection:'row'}}>
						<TextInput placeholder="Search via name or postcode" style={styles.searchInput} value={this.state.searchString} onChange={this.onSearchTextChanged.bind(this)}/>
						<TouchableHighlight style={styles.button} onPress={this.onSearchPressed.bind(this)}>
							<Text style={styles.buttonText}>GO</Text>
						</TouchableHighlight>
					</View>
					<View>
						<TouchableHighlight style={styles.button} >
								<Text style={styles.buttonText}>Location</Text>
						</TouchableHighlight>
					</View>
					<View style={{alignSelf:'center'}}>
						<Image source={require('./img/house.png')} style={styles.image}/>
					</View>
						<View style={{alignSelf:'center'}}>
							{spinner}
						</View>
					</View>
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	row:{
		flex:1,
		flexDirection:'row',
		marginTop:30,
		marginBottom:10,
	},
	text:{
		//justifyContent: 'center',
    textAlign: 'center',
		margin:5,
		fontSize:20,
	},
	image: {
  	width: 217,
  	height: 138
	},

	menu:{
		marginTop:10,
		flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
		
	},
	menuitem:{
		width: 50, 
		height: 30, 
		justifyContent:'center',
		alignItems: 'stretch',
		backgroundColor: 'red',
	},
	
	bigblue:{
		color:'blue',
		fontWeight:'bold',
		fontSize:30,
	},
	red:{
		color:'red',
	},
	flowRight: {
  flexDirection: 'row',
  alignItems: 'center',
  alignSelf: 'stretch'
},
buttonText: {
  fontSize: 18,
  color: 'white',
  alignSelf: 'center'
},
button: {
  height: 36,
  flex: 1,
  backgroundColor: '#48BBEC',
  borderColor: '#48BBEC',
  borderWidth: 1,
  borderRadius: 8,
  marginBottom: 10,
  alignSelf: 'stretch',
  justifyContent: 'center'
},
searchInput: {
  height: 36,
  padding: 4,
  marginRight: 5,
  flex: 4,
  fontSize: 18,
  borderWidth: 1,
  borderColor: '#48BBEC',
  borderRadius: 8,
  color: '#48BBEC'
}
});

module.exports = SearchPage;