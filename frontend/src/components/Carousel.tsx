import React, { useState, useCallback, useEffect, useRef, useContext } from "react";
import { Alert, FlatList, Dimensions, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
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
    product: Product;
}
function Slide(props: IProps) {
	// console.log(props.image);
	return (
		<TouchableOpacity onPress={() => Alert.alert(String(props.id) + String(props.product))} style={styles.slide}>
            <View style={styles.slideWrapper}>
                <Image source={{ uri: ""+props.image+""}} style={styles.image}/>
                <Text style={{ fontSize: 24, width: '100%', }}>{props.title}</Text>
            </View>
		</TouchableOpacity>
	);
}
interface ICarousel {
    onClick: (id: string, product?: Product) => void;
}
const Carousel = observer(() => {
	const CTX = useContext(RootStoreContext);
    useEffect(() => {
        //CTX.fetchStore.getAPI("name_asc", "");
    },[]);
	return (
		<FlatList data={CTX.fetchStore.products} style={styles.container} contentContainerStyle={{alignItems: 'center', justifyContent: 'center' }}
			renderItem={({ item }) => {
				return(<Slide id={item.id} image={item.image_link} title={item.name} subtitle={item.description} product={item} />);
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
	},
    slideWrapper: {
        height: '100%',
		width: '82%',
        justifyContent: 'center',
        alignItems: 'center',
    },
	image : {
        flex: 1,
        width: 200,
		resizeMode: 'contain',
	},
});
