import React, { useState, useCallback, useEffect, useRef, useContext } from "react";
import { FlatList, Dimensions, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import Product from "../models/product";


const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

interface IProps {
	id: string;
	image: string;
	title: string;
	subtitle: string;
	//onClick: () => void;
}
function Slide(props: IProps) {
	// console.log(props.image);
	return (
		<TouchableOpacity onPress={() => console.log("TRYKKET")} style={styles.slide}>
			<Image source={{ uri: ""+props.image+""}} style={styles.image}/>
			<Text style={{ fontSize: 24 }}>{props.title}</Text>
		</TouchableOpacity>
	);
}


const Carousel = () => {
	const [products, setProducts] = useState<Product[]>([]);
	//console.log(CTX.fetchStore.products)
	useEffect(() => {
		const getAPI = async () => {
			const response = await fetch('http://it2810-07.idi.ntnu.no:3000');
			const data = await response.json();
			try {
				setProducts(data);
			} catch (error) {
				console.log(error);
			}
		};
		getAPI();
	}, []);

	return (
		<FlatList data={products} style={styles.container} contentContainerStyle={{alignItems: 'center', justifyContent: 'center' }}
			renderItem={({ item }) => {
				return(<Slide id={item.id} image={item.image_link} title={item.name} subtitle={item.description} />);
			}}
			pagingEnabled horizontal showsHorizontalScrollIndicator
		/>
	);
};
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
		width: 200,
		height: 200,
		resizeMode: 'contain',
	},
});
