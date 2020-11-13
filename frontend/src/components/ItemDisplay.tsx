import React from "react";
import Product from "../models/product";
import { FlatList, View } from 'react-native';
import Items from './Items';

interface IProps {
	setModal: (id:string, product: Product) => void;
	itemList: Product[];
}

const ItemDisplay = (props: IProps) => {
	return (
		<View>
			<FlatList data={props.itemList}
				renderItem={({item}) => {
					return(<Items key={item.id} id={item.id} img={item.image_link} name={item.name} description={item.description} rating={item.rating} price={item.price} type="" onClick={() => props.setModal(item.id, item) } />);
				}}
			/>
		</View>
	);
}

export default ItemDisplay;
