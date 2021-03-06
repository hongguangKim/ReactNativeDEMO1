/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
	TouchableOpacity,
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
	BackAndroid,
  View
} from 'react-native';

var SearchPage = require('./SearchPage');
var NavigationBarRouteMapper = {
   //左边Button
   LeftButton: function(route, navigator, index, navState) {
     if (route.title === 'Property Finder') {
       return null;
     }
     var previousRoute = navState.routeStack[index-1];
     return (
       <TouchableOpacity
         onPress={() => navigator.pop()}
         style={styles.navBarLeftButton}>
         <Text style={[styles.navBarText, styles.navBarButtonText]}>
           {previousRoute.title}
         </Text>
       </TouchableOpacity>
     );
   },
      //右边Button	
   RightButton: function(route, navigator, index, navState) {
    //  if (route.title === 'Property') {
    //    return null;
    //  }
     return (
			 <View/>
      //  <TouchableOpacity
      //    onPress={() => navigator.push({title:'Results'})}
      //    style={styles.navBarRightButton}>
      //    <Text style={[styles.navBarText, styles.navBarButtonText]}>
      //      Next
      //    </Text>
      //  </TouchableOpacity>
     );
   },
   //标题
   Title: function(route, navigator, index, navState) {
     return (
			 <View style={{alignSelf:'center'}}>
					<Text style={[styles.navBarText, styles.navBarTitleText,{textAlign: 'center',color:'white',paddingRight:50}]}>{route.title}</Text>
			 </View>
     );
   },
 };
class DEMO1 extends Component {
	render(){
		return(
			<View style={styles.container}>
				
				<Navigator
									initialRoute={{
										 title: 'Property Finder',
										 component: SearchPage,
										 params:{listings: ''},
									}}
									 navigationBar={
										 <Navigator.NavigationBar
              					routeMapper={NavigationBarRouteMapper}
             						style={{backgroundColor:'black',flex:1,height:46,}}
           					 /> 
									 }
									 renderScene={(route, navigator) => {
										let Component = route.component;
										this._title = route.title;
										this._navigator = navigator;
										return <Component {...route.params} navigator={navigator} />
									}}
									configureScene={(route) => {
										//跳转的动画
										return Navigator.SceneConfigs.VerticalDownSwipeJump;
									}}
								/>
			</View>
		);
	}
	componentDidMount() {
      var navigator = this._navigator;
      BackAndroid.addEventListener('hardwareBackPress', function() {
          if (navigator && navigator.getCurrentRoutes().length > 1) {
            navigator.pop();
            return true;
          }
          return false;
      });
  }
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		flexDirection:'column',
	},
	text:{
		alignSelf:'center',
		 justifyContent: 'center',
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
},
 navBar: {
  backgroundColor: 'white',
  },
  navBarText: {
    fontSize: 16,
    marginVertical: 10,
  },
  navBarTitleText: {
    color: '#373E4D',
    fontWeight: '500',
    marginVertical: 9,
		justifyContent:'center',
		paddingTop:10,
  },
  navBarLeftButton: {
    paddingLeft: 10,
  },
  navBarRightButton: {
    paddingRight: 10,
  },
  navBarButtonText: {
    color: '#5890FF',
  },
});

AppRegistry.registerComponent('DEMO1', () => DEMO1);
