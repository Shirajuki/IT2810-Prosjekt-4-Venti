import React, { useState, useCallback, useEffect, useRef } from "react";
import { FlatList, Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
const slideList = Array.from({ length: 30 }).map((_, i) => {
	return {
		id: i,
		image: `https://picsum.photos/1440/2842?random=${i}`,
		title: `This is the title! ${i + 1}`,
		subtitle: `This is the subtitle ${i + 1}!`,
	};
});
interface IProps {
	id: number;
	image: string;
	title: string;
	subtitle: string;
}
function Slide(props: IProps) {
	return (
		<View style={styles.slide}>
			<Image source={{ uri: props.image }} style={styles.image}/>
			<Text style={{ fontSize: 24 }}>{props.title}</Text>
			<Text style={{ fontSize: 18 }}>{props.subtitle}</Text>
		</View>
	);
}

export default function ItemDisplay() {
	return (
		<FlatList data={slideList} style={styles.container}
			renderItem={({ item }) => {
				return <Slide id={item.id} image={item.image} title={item.title} subtitle={item.subtitle}/>;
			}}
			pagingEnabled horizontal showsHorizontalScrollIndicator 
		/>
	);
};
export const MemoizedItemDisplay = React.memo(ItemDisplay);
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		margin: 0,
		padding: 0,
		marginTop: Constants.statusBarHeight,
		marginBottom: 20,
	},
	slide: {
		height: windowHeight,
		width: windowWidth,
		justifyContent: "center",
		alignItems: "center",
	},
	image : {
		flex: 1,
		width: '90%',
		height: '90%',
		resizeMode: 'contain',
	},
});
