import React, { useState, useCallback, useEffect, useRef } from "react";
import { CheckBox, Animated, TextInput, TouchableOpacity, Alert, FlatList, ScrollView, Dimensions, Image, Button, StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import CheckBox from '@react-native-community/checkbox';

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const colors = {
	themeColor: 'darkslateblue',
	darkColor: '#8364a9',
	lightColor: '#d4bbed',
	darkestColor: '#52307c',
}
interface IProps {
	searched: boolean;
	setSearched: (b: boolean) => void;
}
interface IFilterWindow {
	filterVisible: boolean;
	setFilterVisible: (b: boolean) => void;
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
const Checkbox = (props: IProps3) => {
	const [toggleCheckBox, setToggleCheckBox] = useState(false);
	// props.value;
	const styles = StyleSheet.create({
		checkbox: {
			flexDirection: 'row',
			alignItems: 'center',
			margin: 0,
		}
	});
	return (
		<View style={styles.checkbox}>
			<TouchableOpacity style={{width: '100%', flexDirection: 'row', alignItems: 'center',}} onPress={() => setToggleCheckBox(!toggleCheckBox)}>
				<CheckBox style={{marginHorizontal: 5}} disabled={false} value={toggleCheckBox}/>
				<Text style={{ fontSize: 18 }}>{props.name}</Text>
			</TouchableOpacity>
		</View>
	);
}
const Radio = (props: IRadio) => {
	const [toggleRadio, setToggleRadio] = useState(false);
	const toggle = () => {
		setToggleRadio(!toggleRadio);
		if (!toggleRadio) {
			props.setOrderByValue(props.value);
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
		height: 140,
		backgroundColor: '#fff',
		margin: 0,
		padding: 0,
		marginTop: Constants.statusBarHeight,
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
const FilterWindow = (props: IFilterWindow) => {
	const closeWindow = () => props.setFilterVisible(false);
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
		marginTop: Constants.statusBarHeight,
		marginBottom: 20,
		zIndex: 10,
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
		<Animated.View style={{ ...containerStyle, transform: [{translateX: anim}] }}>
			<View style={{height: windowHeight,}}>
				<ScrollView style={styles.windowItems}>
					<Text style={styles.filterTitle}>Types</Text>
					<FlatList data={types()} style={styles.list}
						renderItem={({ item }) => {
							return <Checkbox name={item[0]} value={item[1]}/>;
						}}
					/>
					<Text style={styles.filterTitle}>Brands</Text>
					<FlatList data={brands()} style={styles.list}
						renderItem={({ item }) => {
							return <Checkbox name={item[0]} value={item[1]}/>;
						}}
					/>
				</ScrollView>
				<TouchableOpacity onPress={closeWindow} style={styles.windowExit}>
					<Icon name="close" size={28} color="#000" />
				</TouchableOpacity>
				<View style={{width: '100%', height: '10%', flexDirection: 'row'}}>
					<TouchableOpacity style={styles.btnReset} onPress={closeWindow}>
						<Text style={{color: '#fff',fontWeight: '600',}}>RESET</Text>
					</TouchableOpacity>
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
			float: 'right',
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
const Item = () => {
	const styles = StyleSheet.create({
		img: {
			width: '100%',
			height: '100%',
			backgroundColor: 'lightblue',
			borderRadius: 8,
		},
		imgWrapper: {
			width: '40%',
			height: '100%',
			padding: 5,
		},
		itemDisplay: {
			flexDirection: 'row',
			height: 120,
			margin: 10,
			marginVertical: 2,
		},
		itemInfo: {
			paddingTop: 5,
			width: '60%',
			height: '100%',
		},
		itemName: {
			fontSize: 11,
			color: '#222',
		},
		itemRating: {
			color: colors.darkestColor,
		},
		itemPrice: {
			fontSize: 16,
			fontWeight: '600',
			color: colors.darkestColor,
		},
	});	
	return(
	<View>
		<TouchableOpacity onPress={() => console.log("ITEM")}>
			<View style={styles.itemDisplay}>
				<View style={styles.imgWrapper}>
					<View style={styles.img}></View>
				</View>
				<View style={styles.itemInfo}>
					<Text numberOfLines={2} style={styles.itemName}>Craft-paper Origami DIY Handmade Lucky-Stars Colorful Mixed-Color-Set</Text>
					<Text style={styles.itemRating}>*****</Text>
					<Text style={styles.itemPrice}>420$</Text>
				</View>
			</View>
		</TouchableOpacity>
	</View>
	);
}
export default function Search(props: IProps) {
	const closeSearch = () => props.setSearched(false);
	const [filterVisible,setFilterVisible] = useState(false);
	const [orderByVisible,setOrderByVisible] = useState(false);
	const anim = useRef(new Animated.Value(windowWidth)).current;
	useEffect(() => {
		Animated.timing(anim,{
			toValue: props.searched ? 0 : windowWidth,
			duration: 200,
			useNativeDriver: true,
		}).start();
	}, [props.searched])
	const containerStyle = {
		flex: 1,
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: windowHeight,
		backgroundColor: '#fff',
		margin: 0,
		padding: 0,
		marginTop: Constants.statusBarHeight,
		marginBottom: 20,
		zIndex: 10,
	}
	// Strict mode error here v
	return (
	<Animated.View style={{ ...containerStyle, transform: [{translateX: anim}] }}>
		<View style={{height: '100%',}}>
			<DropDown orderByVisible={orderByVisible} setOrderByVisible={setOrderByVisible}/>
			<View style={styles.searchTitle}>
				<View style={styles.searchBar}>
					<TouchableOpacity onPress={closeSearch}>
						<Icon name="arrow-back" size={28} color={colors.darkestColor} style={styles.searchExit}/>
					</TouchableOpacity>
					<View style={styles.inputBox}>
						<TouchableOpacity onPress={closeSearch}>
							<Icon style={styles.inputIcon} name="search" size={20} color="#fff" />
						</TouchableOpacity>
						<TextInput style={styles.input} value="search.."/>
					</View>
				</View>
				<Filter orderByVisible={orderByVisible} setOrderByVisible={setOrderByVisible} filterVisible={filterVisible} setFilterVisible={setFilterVisible}/>
			</View>
			<ScrollView style={styles.searchItems}>
				<Item />
				<Item />
				<Item />
				<Item />
				<Item />
				<Item />
			</ScrollView>
		</View>
		<FilterWindow filterVisible={filterVisible} setFilterVisible={setFilterVisible}/>
	</Animated.View>
	);
};
const styles = StyleSheet.create({
	searchExit: {
	},
	searchBar: {
		padding: 16,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: 'center',
		height: '60%',
		width: '100%',
		margin: 0,
	},
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
	searchItems: {
		height: '85%',
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
	searchTitle: {
		backgroundColor: '#d4bbed',
		alignItems: 'center',
		height: '15%',
		margin: 0,
		padding: 0,
		zIndex: 30,
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
