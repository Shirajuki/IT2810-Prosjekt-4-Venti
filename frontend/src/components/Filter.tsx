import React, { useState, useEffect, useRef, useContext } from "react";
import { CheckBox, Animated, TouchableOpacity, ScrollView, Dimensions, StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
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

interface IFilterWindow {
	filterVisible: boolean;
	setFilterVisible: (b: boolean) => void;
    filterDone: boolean;
    setFilterDone: (b: boolean) => void;
}
interface IProps2 {
	filterVisible: boolean;
	setFilterVisible: (b: boolean) => void;
	orderByVisible: boolean;
	setOrderByVisible: (b: boolean) => void;
}
interface IProps3 {
	name: string;
	value: string;
    type: string;
}
const Checkbox1 = (props: IProps3) => {
    const CTX = useContext(RootStoreContext);
	const [toggleCheckBox, setToggleCheckBox] = useState(false);
	const styles = StyleSheet.create({
		checkbox: {
			flexDirection: 'row',
			alignItems: 'center',
			margin: 0,
		}
	});
    const setToggle = (bool) => {
        setToggleCheckBox(bool);
        CTX.fetchStore.addOrRemoveFilter(`${props.type}=${props.name}`);
    };
	return (
		<View style={styles.checkbox}>
			<TouchableOpacity style={{width: '100%', flexDirection: 'row', alignItems: 'center',}} onPress={() => setToggle(!toggleCheckBox)}>
				<CheckBox style={{marginHorizontal: 5}} disabled={false} value={toggleCheckBox} onChange={() => setToggle(!toggleCheckBox)}/>
				<Text style={{ fontSize: 18 }}>{props.name}</Text>
			</TouchableOpacity>
		</View>
	);
}
const FilterWindow = (props: IFilterWindow) => {
	const closeWindow = () => {
	    props.setFilterVisible(false);
        props.setFilterDone(!props.filterDone);
    }
	const anim = useRef(new Animated.Value(windowWidth)).current;
	useEffect(() => {
		Animated.timing(anim,{
			toValue: props.filterVisible ? 0 : windowWidth,
			duration: 1000,
			useNativeDriver: true,
		}).start();
	}, [props.filterVisible])
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
		zIndex: 40,
	}
	const type = {
		"foundation": "Foundation",
		"bronzer": "Bronzer",
		"eyeshadow": "Eyeshadow",
		"eyeliner": "Eyeliner",
		"mascara": "Mascara",
		"lipstick": "Lipstick",
	}
	const brand = {
		"clinique": "Clinique",
		"covergirl": "Covergirl",
		"dior": "Dior",
		"e.l.f.": "e.l.f",
		"l'oreal": "L'oreal",
		"lotus cosmetics usa": "Lotus Cosmetics USA",
		"marienatie":"Marienatie",
		"nyx":"nyx",
		"smashbox":"Smashbox",
	}
	const types = () => {
		return Object.entries(type);
	}
	const brands = () => {
		return Object.entries(brand);
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
			flex: 1,
		},
		btnDone: {
			backgroundColor: colors.themeColor,
			width: '100%',
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
		<Animated.View style={{ ...containerStyle, transform: [{translateX: anim}] }}>
			<View style={{height: windowHeight}}>
				<ScrollView style={styles.windowItems}>
					<Text style={styles.filterTitle}>Types</Text>
                    {types().map((item: any) => (
                        <Checkbox1 name={item[0]} value={item[1]} type="product_type"/>
                    ))}
					<Text style={styles.filterTitle}>Brands</Text>
                    {brands().map((item: any) => (
                        <Checkbox1 name={item[0]} value={item[1]} type="brand"/>
                    ))}
				</ScrollView>
				<TouchableOpacity onPress={closeWindow} style={styles.windowExit}>
					<Icon name="close" size={28} color="#000" />
				</TouchableOpacity>
				<View style={{width: '100%', height: '10%', flexDirection: 'row', marginBottom: Constants.statusBarHeight}}>
					<TouchableOpacity style={styles.btnDone} onPress={closeWindow}>
						<Text style={{color: '#fff',fontWeight: '600',}}>DONE</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Animated.View>
	);
};
const Filter = (props: IProps2) => {
	const openFilter = () => props.setFilterVisible(true);
	const styles = StyleSheet.create({
		filterDiv: {
			height: '40%',
			width: '100%',
			backgroundColor: colors.lightColor,
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			margin: 0,
			paddingBottom: 8,
		},
		searchFilter: {
			flexDirection: 'row',
			width: '30%',
			height: '100%',
			backgroundColor: '#fff',
			borderRadius: 20,
			margin: 5,
			padding: 5,
			alignItems: 'center',
			justifyContent: 'center',
		},
		searchSort: {
			width: '40%',
			height: '100%',
			backgroundColor: '#fff',
			borderRadius: 20,
			margin: 5,
			padding: 5,
			alignItems: 'center',
			justifyContent: 'center',
		},
	});
	return(
		<View style={styles.filterDiv}>
			<TouchableOpacity style={styles.searchSort} onPress={() => props.setOrderByVisible(!props.orderByVisible)}>
				<Text>Sort by: A-Z</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={openFilter} style={styles.searchFilter}>
				<Icon name="filter-list" size={28} color="#000" />
				<Text>Filter</Text>
			</TouchableOpacity>
		</View>
	);
}
export {Filter, FilterWindow};