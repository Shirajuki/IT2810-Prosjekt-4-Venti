import React, { ReactNode, useContext } from "react";
import { FlatList, Dimensions, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
//import StarRating from 'react-svg-star-rating'
import { ImBin } from "react-icons/im";
import { RootStoreContext } from "../stores/root-store";
import { observer, useAsObservableSource } from "mobx-react-lite"
//import Swal from 'sweetalert2'

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
//for (let i = 0; i <= 5; i+= 0.5) {
//	starElements.push(<StarRating size={20} initialRating={i} isReadOnly={true} isHalfRating={true}/>)
//}
const Items = observer((props: IProps) => {
	const CTX = useContext(RootStoreContext);
	const product = useAsObservableSource(props);
	const stars = Number(props.rating);
	const colors = {
		themeColor: 'darkslateblue',
		darkColor: '#8364a9',
		lightColor: '#d4bbed',
		darkestColor: '#52307c',
	}
	const styles = StyleSheet.create({
		img: {
			width: '100%',
			height: '100%',
			backgroundColor: 'lightblue',
			borderRadius: 8,
		},
		imgWrapper: {
			width: '40%',
			height: '100%',
			padding: 5,
		},
		itemDisplay: {
			flexDirection: 'row',
			height: 120,
			margin: 10,
			marginVertical: 2,
		},
		itemInfo: {
			paddingTop: 5,
			width: '60%',
			height: '100%',
		},
		itemName: {
			fontSize: 11,
			color: '#222',
		},
		itemRating: {
			color: colors.darkestColor,
		},
		itemPrice: {
			fontSize: 16,
			fontWeight: '600',
			color: colors.darkestColor,
		},
	});	
	switch (props.type) {
		case "carousel":
		return (
			<TouchableOpacity onPress={() => props.onClick}>
				<View >
					<Image source={{uri: props.img}} style={{resizeMode: "contain",width: 400, height: 400}}/>
				</View>
				<Text >{props.name}</Text>
				<Text >{props.price}</Text>
				<Text >Quick View</Text>
			</TouchableOpacity>
		);
		case "modal":
		return (
			<View >
				<View style={{width: '100%', backgroundColor: colors.darkColor, height: 400, justifyContent: 'center', alignContent: 'center'}}>
					<Image source={{uri: ""+props.img+""}} style={{resizeMode: "contain", flex: 1,}}/>
				</View>
				<View style={{padding: 10, marginHorizontal: 10, marginTop: 10, backgroundColor: colors.lightColor, borderRadius: 10}}>
					<Text style={{fontSize: 20, color: colors.darkestColor}}>{props.name}</Text>
					<Text style={{fontSize: 18, color: colors.darkColor }}>{props.price}</Text>
				</View>
				<View style={{padding: 10, margin: 10, backgroundColor: colors.lightColor, borderRadius: 10}}>
					<Text >{props.description}</Text>
                </View>
            </View>
		);
		case "cart":
		return (
			<View >
				<View >
					<Image source={{uri: ""+props.img+""}} style={{resizeMode: "contain", width: 400, height: 400}}/>
				</View>
				<View>
					<Text >{props.name}</Text>
					<View >
						<TouchableOpacity  onPress={() => CTX.sessionStore.editCart(Number(props.id), false)}>
							<Text>-</Text>
						</TouchableOpacity>
						<Text>{CTX.sessionStore.productCount(Number(props.id))}</Text>
						<TouchableOpacity  onPress={() => CTX.sessionStore.editCart(Number(props.id), true)}>
							<Text>+</Text>
						</TouchableOpacity>
					</View>
				</View>
				<View>
					<ImBin data-cy="remove-button" onClick={() => CTX.sessionStore.removeCart(Number(props.id))}/>
					<Text >{props.price}</Text>
				</View>
			</View>
		);
		case "normal":
		return(
			<View>
				<TouchableOpacity onPress={() => console.log("ITEM")}>
					<View style={styles.itemDisplay}>
						<View style={styles.imgWrapper}>
							<Image style={styles.img} source={{uri: ""+props.img}}/>
						</View>
						<View>
							<Text numberOfLines={2} style={styles.itemName}>{props.name}</Text>
							<View>
							</View>
							<Text style={styles.itemPrice}>{props.price}$</Text>
						</View>
					</View>
				</TouchableOpacity>
			</View>
		);
		default:
		return (
			<TouchableOpacity onPress={props.onClick} style={{marginTop: 15, marginBottom: 15, backgroundColor:'#e0cff2', borderColor:'#a995bd', borderWidth:1, padding:5}}>
				<View>
					<Image source={{uri: ""+props.img+""}}  style={{resizeMode: "stretch", width: 300, height: 300}}/>
				</View>
				<View style={{alignItems:'center', paddingTop:10}}>
					<Text style={{fontWeight: '700'}} >{props.name}</Text>
					<Text >${props.price}</Text>
				</View>
			</TouchableOpacity>
		);
	}
})

export default Items;


