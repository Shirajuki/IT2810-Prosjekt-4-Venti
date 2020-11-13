import React, { useEffect, useRef, useContext, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, Button, Alert} from 'react-native';
import StarRating from 'react-svg-star-rating'
import Product from "../models/product";
import Review from "../models/review"
import Items from './Items';
import { RootStoreContext } from "../stores/root-store";
import { observer, useAsObservableSource } from "mobx-react-lite";
import { Dimensions } from "react-native";

interface IProps {
	modal: {id: string, product: Product},
	setModal: (id:string, product: Product) => void;
}

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
const width_Content = '80%';
const height_Content = '75%';
const width_Review = '80%';

const Modal = observer(( props: IProps ) => {
	const product = useAsObservableSource(props.modal.product);
	const CTX = useContext(RootStoreContext);
	const messageRef = useRef(null);
	const nameRef = useRef(null);
	const [stars, setStars] = useState(Number);
	const [rating, setRating] = useState(0);

	const post = async () => {
		if (await CTX.reviewStore.postReviews(props.modal.id, messageRef?.current?.value,  nameRef?.current?.value, stars)) {
			messageRef.current.value = "";
			nameRef.current.value = "";
			setStars(0);
			setTimeout(() => {
				document.getElementsByClassName("modalContent")[0].scrollTop = 999999;
			}, 500);
		}
	}
	
	useEffect(() => {
		if (!isNaN(Number(props.modal.id))) {
			CTX.reviewStore.getReviews(props.modal.id);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.modal.id]);

  return (
    <SafeAreaView style={styles.modalContainer}>
		<View style={styles.modalContainer}>
			<View>
				<TouchableOpacity style={styles.closeButton} data-cy="close-button" onPress={() => Alert.alert("closing")}>
					<Text>&#10006;</Text>
				</TouchableOpacity>
			</View>
			<Items id={props.modal.product?.id} img={product?.image_link} name={product?.name} description={product?.description} rating={Number(product?.rating)} price={product?.price} onClick={() => void(0)} type="modal"/>
			<View /*style={"star"}*/>
				<StarRating data-cy="star-area" roundedCorner={true} isHalfRating={true}  handleOnClick={(rating:number) => {setStars(rating)}}/>
			</View>
			<View style={styles.reviews}>
				<View style={styles.reviewInput}>
					<textarea ref={nameRef} placeholder="Name" data-cy="name-area"></textarea>
					<StarRating size={20} isHalfRating={true}/>
					<textarea ref={messageRef} placeholder="Write your review here..." data-cy="review-area"></textarea>
					<TouchableOpacity style={styles.sendButton} onPress={() => post()} data-cy="send-area"><Text>Send</Text></TouchableOpacity>
				</View>
				{CTX.reviewStore.reviews.map((review: Review) => (
					<View style={styles.review} data-cy="view-reviews">
						<Text style={styles.reviewUser}>{review.name}</Text>
						<StarRating size={20} initialRating={review.stars} isReadOnly={true} isHalfRating={true}/>
						<Text style={styles.reviewComment}>{review.reviewText}</Text>
					</View>
					))}
			</View>
		</View>
    </SafeAreaView>
  );
})

const styles = StyleSheet.create({
    container: {
		flex: 1,
		backgroundColor: '#fff',
		//alignItems: 'center',
		//justifyContent: 'center'
	},
	modalContainer : {
		backgroundColor: 'rgba(0, 0, 0, 0.95)',
		top: 0,
		left: 0,
		width: width,
		height: height,
		flex:1,
		alignItems: 'center',
		justifyContent: 'center',
		opacity:0

	},
	modalContent: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: 'rgb(255, 255, 255)',
		width: width_Content,
		height: height_Content
	},
	modalHeader: {
		//fontSize: 10,
	},
	closeButton: {
		padding: 10,
		top: 10,
		right: 10,
		zIndex: 10,
		color:'#FFFFFF',
		justifyContent: 'flex-end',
		position:'absolute',
	},
	sendButton: {
		padding:'10px',
	},
	reviews: {
		width: width_Review,
		padding: '0 10px 10px 10px',
		zIndex: 10
	},
	review: {
		padding: '10px',
	},
	reviewInput: {
		//Fikse grid
		flexDirection: 'row',
		justifyContent: 'space-between'
		//display: grid;
		//grid-template-columns: 50% 50%;
		//grid-gap: 0%;
	},
	reviewUser: {
		width: '30%',
	},
	reviewComment: {
		width: '60%',
	}
  })
  
export default Modal;
