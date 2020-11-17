import React, { useState, useEffect, useRef, useContext } from "react";
import { Animated, TextInput, TouchableOpacity, FlatList, Dimensions, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Items from "./Items";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../stores/root-store";
import Product from "../models/product";
import DropDown from "./Sort";
import {Filter, FilterWindow} from "./Filter";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const colors = {
	themeColor: 'darkslateblue',
	darkColor: '#8364a9',
	lightColor: '#d4bbed',
	darkestColor: '#52307c',
}
interface IModal {
	id: string;
	product: Product[];
}
interface IProps {
	searched: boolean;
	setSearched: (b: boolean) => void;
    setModal: ({}: IModal) => void; 
}

const Search = observer((props: IProps) => {
	const CTX = useContext(RootStoreContext);
	const closeSearch = () => props.setSearched(false);
	const [filterVisible,setFilterVisible] = useState(false);
    const [filterDone, setFilterDone] = useState(false);
	const [orderByVisible,setOrderByVisible] = useState(false);
	const anim = useRef(new Animated.Value(windowWidth)).current; 
	useEffect(() => {
		Animated.timing(anim,{
			toValue: props.searched ? 0 : windowWidth,
			duration: 800,
			useNativeDriver: true,
		}).start();
	}, [props.searched])
	useEffect(() => {
		CTX.fetchStore.getAPI();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [CTX.fetchStore.currentPage, CTX.fetchStore.pageSize, CTX.fetchStore.orderTerm, CTX.fetchStore.searchTerm, filterDone]);

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
		marginBottom: 20,
		zIndex: 10,
	}
	// Strict mode error here v
	return (
	<Animated.View style={{ ...containerStyle, transform: [{translateX: anim}] }}>
		<View style={{height: '100%'}}>
			<DropDown orderByVisible={orderByVisible} setOrderByVisible={setOrderByVisible}/>
			<View style={styles.searchTitle}>
				<View style={styles.searchBar}>
					<TouchableOpacity onPress={closeSearch}>
						<Icon name="arrow-forward" size={28} color={colors.darkestColor} style={styles.searchExit}/>
					</TouchableOpacity>
					<View style={styles.inputBox}>
						<TouchableOpacity onPress={closeSearch}>
							<Icon style={styles.inputIcon} name="search" size={20} color="#fff" />
						</TouchableOpacity>
						<TextInput style={styles.input} editable placeholder={"search.."} onSubmitEditing={(e) => { CTX.fetchStore.setSearchTerm(e.nativeEvent.text)}} />
					</View>
				</View>
				<Filter orderByVisible={orderByVisible} setOrderByVisible={setOrderByVisible} filterVisible={filterVisible} setFilterVisible={setFilterVisible}/>
			</View>
			<FlatList style={styles.searchItems} data={CTX.fetchStore.products}
				renderItem={({item}) => {
					return(<Items type={'search'} key={"" + item.id + ""} id={item.id} img={item.image_link} name={item.name} description={item.description} brand={item.brand} price={item.price} onClick={() => props.setModal(item.id, item) } />);
				}}
			/>
		</View>
		<FilterWindow filterVisible={filterVisible} setFilterVisible={setFilterVisible} filterDone={filterDone} setFilterDone={setFilterDone}/>
	</Animated.View>
	);
});
export default Search;

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
		marginBottom: 20,
		zIndex: 10,
	},
});
