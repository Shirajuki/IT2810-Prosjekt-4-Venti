import React, { useState, useCallback, useEffect, useRef } from "react";
import { Animated, TouchableOpacity, Alert, FlatList, ScrollView, Dimensions, Image, Button, StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const colors = {
	themeColor: 'darkslateblue',
	darkColor: '#8364a9',
	lightColor: '#d4bbed',
	darkestColor: '#52307c',
}
interface IProps {
	visible: boolean;
	setVisible: (b: boolean) => void;
}
export default function ShoppingCart(props: IProps) {
	const closeCart = () => props.setVisible(false);
	const anim = useRef(new Animated.Value(windowWidth)).current;
	useEffect(() => {
		Animated.timing(anim,{
			toValue: props.visible ? 0 : windowWidth,
			duration: 1000,
			useNativeDriver: true,
		}).start();
	}, [props.visible])
	const containerStyle = {
		flex: 1,
		position: 'absolute',
		top: 0,
		right: 0,
		width: '85%',
		height: windowHeight,
		backgroundColor: '#fff',
		margin: 0,
		padding: 0,
		marginBottom: 20,
		zIndex: 10,
	}
	// Strict mode error here v
	return (
		<Animated.View style={{ ...containerStyle, transform: [{translateX: anim}] }}>
			<View style={styles.cartTitle}>
				<Icon name="shopping-cart" size={28} color="#000" />
				<Text style={{ fontSize: 20, fontWeight: '600'}}>Handlekurv</Text>
				<TouchableOpacity onPress={closeCart} style={styles.cartExit}>
					<Icon  name="close" size={28} color="#000" />
				</TouchableOpacity>
			</View>
			<ScrollView style={styles.cartItems}>
				
			</ScrollView>
			<View style={styles.cartInfo}>
				<Text style={styles.text}>Total: 0$</Text>
				<TouchableOpacity style={styles.button} onPress={closeCart}>
					<Text style={{color: '#fff',fontWeight: '600',}}>BUYBUYBUY</Text>
				</TouchableOpacity>
			</View>
		</Animated.View>
	);
};
const styles = StyleSheet.create({
	cartItems: {
		height: '70%',
	},
	button: {
		alignItems: "center",
		backgroundColor: colors.darkColor,
		paddingVertical: 15,
		paddingHorizontal: 20,
		width: '80%',
	},
	text: {
		color: colors.darkestColor,
		fontSize: 16,
		fontWeight: '600',
		padding: 10,
	},
	cartInfo: {
		height: '20%',
		backgroundColor: '#d4bbed',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: Constants.statusBarHeight,
	},
	cartExit: {
		position: 'absolute',
		top: 18,
		right: 18,
	},
	cartTitle: {
		flexDirection: 'row',
		backgroundColor: '#d4bbed',
		alignItems: 'center',
		justifyContent: 'center',
		height: '10%',
	},
	container: {
		flex: 1,
		position: 'absolute',
		top: 0,
		right: 0,
		width: '85%',
		height: windowHeight,
		backgroundColor: '#fff',
		margin: 0,
		padding: 0,
		marginTop: Constants.statusBarHeight,
		marginBottom: 20,
		zIndex: 10,
	},
});
