import React, { useContext, useEffect } from "react";
import Product from "../models/product";
import { FlatList, View, StyleSheet} from 'react-native';
import Items from './Items';
import { RootStoreContext } from "../stores/root-store";

interface IProps {
	setModal: (id:string, product: Product) => void;
	itemList: Product[];
}
/*Displays all the products received from the database with all filters and sorting applied.
Gets the products from out global list of products and displays them underneath the carousel*/

const ItemDisplay = (props: IProps) => {
	const CTX = useContext(RootStoreContext);
	

	return (
		<View style={styles.container}>
			<FlatList data={CTX.fetchStore.products}
				renderItem={({item}) => {
					return(<Items key={"" + item.id + ""} id={item.id} img={item.image_link} name={item.name} description={item.description} brand={item.brand} price={item.price} type="" onClick={() => props.setModal(item.id, item) } />);
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		justifyContent:'center',
		alignItems:'center',
		padding: 30
	}
})

export default ItemDisplay;
