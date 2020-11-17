import React, { useState, useEffect, useRef, useContext } from "react";
import { Animated, TouchableOpacity, FlatList, ScrollView, Dimensions, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import CheckBox from '@react-native-community/checkbox';
import { RootStoreContext } from "../stores/root-store";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const colors = {
	themeColor: 'darkslateblue',
	darkColor: '#8364a9',
	lightColor: '#d4bbed',
	darkestColor: '#52307c',
}

interface IProps4 {
	orderByVisible: boolean;
	setOrderByVisible: (b: boolean) => void;
}
interface IRadio {
	name: string;
	value: string;
	orderByValue: string;
	setOrderByValue: (val: string) => void;
}
const Radio = (props: IRadio) => {
	const CTX = useContext(RootStoreContext);
	const [toggleRadio, setToggleRadio] = useState(false);
	const toggle = () => {
		setToggleRadio(!toggleRadio);
		if (!toggleRadio) {
			props.setOrderByValue(props.value);
			CTX.fetchStore.setOrderTerm(props.value);
		} else {
			props.setOrderByValue('name_asc');
		}
	}
	
	useEffect(() => {
		if (props.value != props.orderByValue) {
			setToggleRadio(false);
		} else {
			setToggleRadio(true);
			
		}
	}, [props.orderByValue])
	const styles = StyleSheet.create({
		radio: {
			flexDirection: 'row',
			alignItems: 'center',
			margin: 2,
			padding: 4,
			width: '100%',
			borderTopColor: 'rgba(0,0,0,.1)',
			borderTopWidth: 1,
		},
		text: {
			fontSize: 16,
			color: toggleRadio ? colors.darkestColor : '#000',
		},
		check: {
			transform: [
				{translateX: -10}
			],
			color: toggleRadio ? colors.darkestColor : '#fff',
		},
	});
	return (
		<View style={styles.radio}>
			<TouchableOpacity style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} onPress={() => toggle()}>
				<Text style={styles.text}>{props.name}</Text>
				<Icon style={styles.check} name="check" size={16} color="#000" />
			</TouchableOpacity>
		</View>
	);
}
// https://www.npmjs.com/package/react-native-dropdown-picker
const DropDown = (props: IProps4) => {
	const closeWindow = () => props.setOrderByVisible(false);
	const anim = useRef(new Animated.Value(-(windowHeight)/3)).current;
	const [orderByValue, setOrderByValue] = useState("name_asc");
	const sortRef = useRef(null);
	useEffect(() => {
		Animated.timing(anim,{
			toValue: props.orderByVisible ? 0 : -(windowHeight)/3,
			duration: 500,
			useNativeDriver: true,
		}).start();
	}, [props.orderByVisible])
	const containerStyle = {
		position: 'absolute',
		top: '15%',
		right: 0,
		width: '100%',
		height: 150,
		backgroundColor: '#fff',
		margin: 0,
		padding: 0,
		marginBottom: 20,
		zIndex: 10,
	}
	const orderBy = {
		"Name A-Z": "name_asc",
		"Name Z-A": "name_desc",
		"Price $ - $$$": "price_asc",
		"Price $$$ - $": "price_desc",
	}
	const orderBys = () => {
		return Object.entries(orderBy);
	}
	const styles = StyleSheet.create({
		windowExit: {
			position: 'absolute',
			top: 16,
			right: 16,
		},
		windowItems: {
			height: '90%',
			padding: 10,
		},
		btnReset: {
			backgroundColor: colors.themeColor,
			width: '50%',
			alignItems: 'center',
			justifyContent: 'center',
		},
		btnDone: {
			backgroundColor: colors.darkestColor,
			width: '50%',
			alignItems: 'center',
			justifyContent: 'center',
		},
		filterTitle: {
			fontWeight: '600',
			fontSize: 16,
		},
		list: {
			marginBottom: 10,
		},
	});
	// Strict mode error here v
	return (
		<Animated.View style={{ ...containerStyle, transform: [{translateY: anim}] }}>
			<View>
				<ScrollView style={styles.windowItems}>
					<FlatList data={orderBys()} style={styles.list}
						renderItem={({ item }) => {
							return <Radio name={item[0]} value={item[1]} orderByValue={orderByValue} setOrderByValue={setOrderByValue}/>;
						}}
					/>
				</ScrollView>
			</View>
		</Animated.View>
	);
};
export default DropDown;