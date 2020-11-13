import React, { ReactNode, useContext } from "react";
import { FlatList, Dimensions, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import StarRating from 'react-svg-star-rating'
import { ImBin } from "react-icons/im";
import { RootStoreContext } from "../stores/root-store";
import { observer, useAsObservableSource } from "mobx-react-lite"
import Swal from 'sweetalert2'

//Declares type of title
interface IProps {
	onClick: () => void;
	id: string;
	img: string;
	name: string;
	description: string;
	rating: number;
	price: string;
	type: string;
}
const starElements: ReactNode[] = []
for (let i = 0; i <= 5; i+= 0.5) {
	starElements.push(<StarRating size={20} initialRating={i} isReadOnly={true} isHalfRating={true}/>)
}
const Items = observer((props: IProps) => {
	const CTX = useContext(RootStoreContext);
	const product = useAsObservableSource(props);
	const stars = Number(props.rating);

	switch (props.type) {
		case "carousel":
		return (
			<TouchableOpacity style={styles.items} onPress={() => props.onClick}>
				<View style={styles.imgDiv}>
					<Image source={{uri: props.img}} />
					{Number(stars)*2 === 0 ? starElements[Number(stars)*2] : null}
					{Number(stars)*2 === 1 ? starElements[Number(stars)*2] : null}
					{Number(stars)*2 === 2 ? starElements[Number(stars)*2] : null}
					{Number(stars)*2 === 3 ? starElements[Number(stars)*2] : null}
					{Number(stars)*2 === 4 ? starElements[Number(stars)*2] : null}
					{Number(stars)*2 === 5 ? starElements[Number(stars)*2] : null}
					{Number(stars)*2 === 6 ? starElements[Number(stars)*2] : null}
					{Number(stars)*2 === 7 ? starElements[Number(stars)*2] : null}
					{Number(stars)*2 === 8 ? starElements[Number(stars)*2] : null}
					{Number(stars)*2 === 9 ? starElements[Number(stars)*2] : null}
					{Number(stars)*2 === 10 ? starElements[Number(stars)*2] : null}
				</View>
				<Text style={styles.itemName}>{props.name}</Text>
				<Text style={styles.pris}>{props.price}</Text>
				<Text style={styles.quickView}>Quick View</Text>
			</TouchableOpacity>
		);
		case "modal":
		return (
			<TouchableOpacity style={styles.items-modal} onPress={() => props.onClick}>
				<View style={styles.imgDiv}>
					<Image style={styles.modal-image} source={{uri: props.img}} alt={`${props.name}`}/>
				</View>
				<View style={styles.info-container}>
					<Text style={styles.itemName}>{props.name}</Text>
					<Text style={styles.pris}>{props.price}</Text>
					{Number(stars)*2 === 0 ? starElements[Number(stars)*2] : null}
					{Number(stars)*2 === 1 ? starElements[Number(stars)*2] : null}
					{Number(stars)*2 === 2 ? starElements[Number(stars)*2] : null}
					{Number(stars)*2 === 3 ? starElements[Number(stars)*2] : null}
					{Number(stars)*2 === 4 ? starElements[Number(stars)*2] : null}
					{Number(stars)*2 === 5 ? starElements[Number(stars)*2] : null}
					{Number(stars)*2 === 6 ? starElements[Number(stars)*2] : null}
					{Number(stars)*2 === 7 ? starElements[Number(stars)*2] : null}
					{Number(stars)*2 === 8 ? starElements[Number(stars)*2] : null}
					{Number(stars)*2 === 9 ? starElements[Number(stars)*2] : null}
					{Number(stars)*2 === 10 ? starElements[Number(stars)*2] : null}
					<TouchableOpacity style={styles.button} onPress={() =>
						CTX.sessionStore.addCart(+props.id)
						Swal.fire(
							'Added to cart!',
							'The producr was added to cart!',
							'success');
					}>
						<Text>Add to cart</Text>
					</TouchableOpacity>
					<Text style={styles.itemDescription}>{props.description}</Text>
				</View>
			</TouchableOpacity>
		);
		case "cart":
		return (
			<View style={styles.item}>
				<View style={styles.imgDiv}>
					<Image src={props.img} alt={props.name}/>
				</View>
				<View style={styles.info}>
					<Text style={styles.itemName}>{props.name}</Text>
					<View style={styles.itemAdd}>
						<TouchableOpacity style={styles.button} onPress={() => CTX.sessionStore.editCart(Number(props.id), false)}>
							<Text>-</Text>
						</TouchableOpacity>
						<Text>{CTX.sessionStore.productCount(Number(props.id))}</Text>
						<TouchableOpacity style={styles.button} onPress={() => CTX.sessionStore.editCart(Number(props.id), true)}>
							<Text>+</Text>
						</TouchableOpacity>
					</View>
				</View>
				<View>
					<ImBin data-cy="remove-button" onClick={() => CTX.sessionStore.removeCart(Number(props.id))}/>
					<Text style={styles.pris}>{props.price}</Text>
				</View>
			</View>
		);
		default:
		return (
			<View style={styles.items} onClick={props.onClick}>
				<View style={styles.imgDiv}>
					<Image src={props.img} alt={`${props.name}`}/>
					<StarRating size={15} initialRating={stars} isReadOnly={true} isHalfRating={true}/>
				</View>
				<Text style={styles.itemName} data-cy="item-name">{props.name}</Text>
				<Text style={styles.itemDescription}>{props.description}</Text>
				<View>
					<Text style={styles.pris} data-cy="item-price">{props.price}</Text>
				</View>
			</View>
		);
	}
})

export default Items;
