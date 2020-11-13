import React, { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { Dimensions, Image, StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import Carousel, {MemoizedCarousel} from './src/components/Carousel';
import ItemDisplay from './src/components/ItemDisplay';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
const assets = {
	logo: require('./assets/logo_transparent.png'),
	eye: require('./assets/splash2.png')
};
const colors = {
	themeColor: 'darkslateblue',
}
// #SPLASH
const Splash = () => {
	const styles = StyleSheet.create({
		inputIcon: {
			left: 0,
			paddingHorizontal: 10,
		},
		inputBox: {
			alignItems: 'center',
			flexDirection: 'row',
			width: '90%',
			borderRadius: 20,
			backgroundColor: 'rgba(0,0,0,.3)',
			paddingHorizontal: 5,
		},
		input: {
			width: '100%',
			height: 40,
			color: '#fff',
			paddingHorizontal: 10,
			paddingVertical: 6,
			alignItems: 'center',
		},
		logo: {
			position: 'absolute',
			height: 90,
			width: 90,
			top: -10,
			left: 10,
			resizeMode: 'contain'
		},
		splashText: {
			fontSize: 16,
			color: '#fff',
			fontWeight: '500',
			backgroundColor: 'rgba(0,0,0,.5)',
			position: 'relative',
			left: 20,
		},
		splashText2: {
			fontSize: 16,
			color: '#000',
			fontWeight: '500',
			backgroundColor: 'rgba(255,255,255,.5)',
		},
		navCart: {

		},
		eye: {
			flex: 1,
			height: 210,
			resizeMode: 'contain',
			transform: [
				{translateX: 40},
			],
		},
	});
	return (
		<View style={{ backgroundColor: colors.themeColor}}>
			<View style={{ padding: 16, flexDirection: "row", justifyContent: "space-between"}}>
				<Image source={assets.logo} style={styles.logo} />
				<Icon name="block" size={28} color={colors.themeColor} />
				<View style={{ flexDirection: "row"}}>
					<Icon style={styles.navCart} name="shopping-cart" size={28} color="#fff" />
				</View>
			</View>
			<View>
				<Image source={assets.eye} style={styles.eye} />
				<View style={{ flex: 1, width: '100%', top: 70, left: -60, justifyContent: 'center', alignItems: 'center', position: 'absolute'}}>
					<Text style={styles.splashText}>A wonderful serenity has taken</Text>
					<Text style={styles.splashText2}>possession of my entire soul.</Text>
				</View>
				<View style={{alignItems: 'center', justifyContent: 'center',  marginVertical: 20}}>
					<View style={styles.inputBox}>
						<Icon style={styles.inputIcon} name="search" size={20} color="#fff" />
						<TextInput style={styles.input} value="search.."/>
					</View>
				</View>
			</View>
		</View>
	);
}
// #APP
const App = () => {
	return (
	<View style={styles.container}>
		<StatusBar backgroundColor={'#fff'}/>
		<Splash />
		<View style={styles.divBox}>
			<ScrollView style={styles.scrollView}>
				<View style={{ height: 400, width: '100%', marginBottom: 50}}>
					<MemoizedCarousel />
				</View>
				<Text style={styles.text}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
					minim veniam, quis nostrud exercitation ullamco laboris nisi ut
					aliquip ex ea commodo consequat. Duis aute irure dolor in
					reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
					pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
					culpa qui officia deserunt mollit anim id est laborum.
				</Text>
			</ScrollView>
		</View>
	</View>
	);
}
export default App;
const styles = StyleSheet.create({
	divBox: {
		flex: 1,
		backgroundColor: '#fff',
		borderTopLeftRadius: 30,
	},
	scrollView: {
		backgroundColor: 'pink',
		marginVertical: 20,
		borderRadius: 10,
	},
	text: {
		fontSize: 40,
	},
	container: {
		flex: 1,
		// height: windowHeight,
		backgroundColor: colors.themeColor,
		margin: 0,
		padding: 0,
		marginTop: Constants.statusBarHeight,
		overflow: 'hidden',
	},
});
