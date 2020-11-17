import React, { useState, useEffect} from "react";
import {Dimensions, StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import Product from "../models/product";
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import Modal from "./Modal";

const { width: screenWidth } = Dimensions.get('window')


interface IProps {
	item: Product;
	index: number;
}

/* Uses react-native-snap-components to create a parallax carousel which passes it's
information to the modal component defined in App on click*/

const MyCarousel =({openModal})=> {

	const [products, setProducts] = useState<Product[]>([]);
	const [modal, setModal] = useState({
		id: "none",
		product: null,
	});

	const itemModal = (id: string, product: Product = null) => {
		setModal({ id: id, product: product });
	};
	
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

    const _renderItem = ({item, index} : IProps, parallaxProps) => {
        return (
			<TouchableOpacity onPress={() => openModal(item.id,item)}>
            <View style={styles.item}>
                <ParallaxImage
                    source={{ uri: item.image_link }}
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                    parallaxFactor={0.4}
                    {...parallaxProps}
                />
				<View style={styles.description}>
                	<Text style={styles.title} numberOfLines={2}>
                    	{ item.name }
                	</Text>
					<Text style={styles.price} numberOfLines={2}>
                	    {"$" + item.price}
                	</Text>
				</View>
            </View>
			</TouchableOpacity>
        );
    }

        return (
			<View>
            <Carousel
                sliderWidth={screenWidth}
                sliderHeight={screenWidth}
                itemWidth={screenWidth - 60}
                data={products}
                renderItem={_renderItem}
                hasParallaxImages={true}
            />
			</View>
		);
}



export default MyCarousel;

const styles = StyleSheet.create({
  item: {
    width: screenWidth - 60,
    height: screenWidth - 60,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
  },
  description: {
	backgroundColor: "#8364a9"
  },
  title: {
	color: "#FFFF",
	textAlign: "center",
  },
  price: {
	color: "#FFFF",
	textAlign: "center",
  },
})