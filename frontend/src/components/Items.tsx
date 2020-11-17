import React, { ReactNode, useContext } from "react";
import { Alert, FlatList, Dimensions, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { RootStoreContext } from "../stores/root-store";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { observer, useAsObservableSource } from "mobx-react-lite"

//Declares type of title
interface IProps {
	onClick: () => void;
	id: string;
	img: string;
	name: string;
    brand: string;
	description: string;
	price: string;
	type: string;
}
/* Adds separate styling for different types of items i.e modals, plain items etc*/
const Items = observer((props: IProps) => {
	const CTX = useContext(RootStoreContext);
	const product = useAsObservableSource(props);
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
			fontSize: 16,
			color: '#222',
			fontWeight: '700'
		},
		itemPrice: {
			fontWeight: '600',
			color: colors.darkestColor,
		},
		imgModal: {
			resizeMode: "contain", 
			flex: 1,
			borderRadius: 8,
		},
		modalImgWrapper: {
			width: '100%', 
			height: 400, 
			justifyContent: 'center', 
			alignContent: 'center'
		},
		modalInfo: {
			padding: 10, 
			marginHorizontal: 10, 
			marginTop: 10, 
			backgroundColor: colors.lightColor, 
			borderRadius: 10
		},
		modalName:{
			fontSize: 20, 
			color: colors.darkestColor
		},
		modalPrice: {
			fontSize: 18, 
			color: colors.darkColor 
		},
		modalDesc: {
			paddingTop:10
		},
        itemAdd: {
            padding: 5,
            margin: 5,
            width: 30,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,.1)',
        },
        itemCount: {
            padding: 5,
            margin: 5,
        },
	});	
	switch (props.type) {
		case "modal":
			return (
				<View>
					<View style={styles.modalImgWrapper}>
						<Image source={{uri: ""+props.img+""}} style={styles.imgModal}/>
					</View>
					<View style={styles.modalInfo}>
						<Text style={styles.modalName}>{props.name}</Text>
						<Text style={styles.modalPrice}>${props.price}</Text>
						<Text style={styles.modalDesc}>{props.description}</Text>
					</View>
				</View>
			);
		case "cart":
		return (
            <View style={styles.itemDisplay}>
				<View style={styles.imgWrapper}>
					<Image source={{uri: ""+props.img+""}} style={styles.img}/>
				</View>
				<View style={styles.itemInfo}>
					<Text numberOfLines={2} style={styles.itemName}>{props.name}</Text>
                    <Text style={styles.itemPrice}>{`${props.price}$`}</Text>
					<View style={{flexDirection: 'row'}}>
                        <TouchableOpacity style={styles.itemAdd} onPress={() => CTX.sessionStore.editCart(Number(props.id), false)}>
                            <Text>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.itemCount}>{CTX.sessionStore.productCount(Number(props.id))}</Text>
                        <TouchableOpacity style={styles.itemAdd} onPress={() => CTX.sessionStore.editCart(Number(props.id), true)}>
                            <Text>+</Text>
                        </TouchableOpacity>
					</View>
				</View>
                <TouchableOpacity style={{position: 'absolute', bottom: 0, right: 0,}} onPress={() => {
                    CTX.sessionStore.deleteCart(Number(props.id));
                    Alert.alert("Deleted product from cart!");
                }}>
                     <Icon size={28} color={colors.darkestColor} name="delete" />
                </TouchableOpacity>
			</View>
		);
		case "search":
			return(
				<TouchableOpacity onPress={props.onClick} style={{marginTop: 15, marginBottom: 15, padding:5}}>
					<View style={styles.itemDisplay}>
						<View style= {styles.imgWrapper}>
							<Image source={{uri: ""+props.img+""}}  style={styles.img}/>
						</View>
						<View style={styles.itemInfo}>
							<Text style={styles.itemName} >{props.name}</Text>
							<Text style={{color:"gray"}}>{props.brand}</Text>
							<Text style={styles.itemPrice}>${props.price}</Text>
						</View>
					</View>
				</TouchableOpacity>
			);
		default:
			return (
				<TouchableOpacity onPress={props.onClick} style={{marginTop: 15, marginBottom: 15, backgroundColor:'#e0cff2', borderColor:'#a995bd', borderWidth:1, padding:5}}>
				<View>
					<Image source={{uri: ""+props.img+""}}  style={{resizeMode: "stretch", width: 300, height: 300, alignSelf:'center'}}/>
				</View>
				<View style={{alignItems:'center', paddingTop:10}}>
					<Text style={{fontWeight: '700'}} >{props.name}</Text>
					<Text >${props.price}</Text>
				</View>
				</TouchableOpacity>
			);
		}
	}
)

export default Items;


