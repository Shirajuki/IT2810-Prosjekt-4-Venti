import React, { useState, useCallback, useEffect, useRef } from "react";
import { FlatList, Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import PaginationDot from 'react-native-animated-pagination-dot'
import Constants from 'expo-constants';
import Product from "../models/product";


const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

interface IProps {
	id: string;
	image: string;
	title: string;
	subtitle: string;
}
function Slide(props: IProps) {
	return (
		
		<View style={styles.slide}>
			<Image source={{ uri: props.image}}/>
			<Text style={{ fontSize: 24 }}>{props.title}</Text>
			<Text style={{ fontSize: 18 }}>{props.subtitle}</Text>
		</View>
		
	);
}

export default function Carousel() {

	const [loading, setLoading] = useState(false);
	const [products, setProducts] = useState<Product[]>([]);

	useEffect(() => {
		const getAPI = async () => {
		  const response = await fetch("http://localhost:8080/");
		  const data = await response.json();
	
		  try {
			console.log(data);
			setLoading(false);
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
				return <Slide id={item.id} image={item.image_link} title={item.name} subtitle={item.description}/>;
			}}
			
			pagingEnabled horizontal showsHorizontalScrollIndicator 
		/>
	);
};
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
