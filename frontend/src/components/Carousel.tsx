import React, { useState, useCallback, useEffect, useRef, useContext } from "react";
import { FlatList, Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import Product from "../models/product";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../stores/root-store";


const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

interface IProps {
	id: string;
	image: string;
	title: string;
	subtitle: string;
}
function Slide(props: IProps) {
	// console.log(props.image);
	return (
		<View style={styles.slide}>
			<Image source={{ uri: props.image}} style={styles.image}/>
			<Text style={{ fontSize: 24 }}>{props.title}</Text>
		</View>
	);
}

const Carousel = observer(() => {
	const CTX = useContext(RootStoreContext);
	console.log(CTX.fetchStore.products)
	useEffect(() => {
		CTX.fetchStore.getAPI("name_asc", "");
	}, []);
	return (
		<FlatList data={CTX.fetchStore.products} style={styles.container} contentContainerStyle={{alignItems: 'center', justifyContent: 'center' }}
			renderItem={({ item }) => {
				return(<Slide id={item.id} image={item.image_link} title={item.name} subtitle={item.description}/>);
			}}
			pagingEnabled horizontal showsHorizontalScrollIndicator
		/>
	);
});
export default Carousel;
export const MemoizedCarousel = React.memo(Carousel);
const styles = StyleSheet.create({
	container: {
		height: 50,
		backgroundColor: '#fff',
		marginVertical: 0,
		marginLeft: 'auto',
		marginRight: 'auto',
		padding: 30,
		width: '90%',
		marginTop: Constants.statusBarHeight,
		marginBottom: 20,
		borderRadius: 20,
	},
	slide: {
		height: '100%',
		width: windowWidth/10 * 9,
		justifyContent: "center",
		alignItems: "center",
	},
	image : {
		flex: 1,
		width: '100%',
		resizeMode: 'contain',
	},
});
