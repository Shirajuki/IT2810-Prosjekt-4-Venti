import React, { useState, useCallback, useEffect, useRef, useContext } from "react";
import { TextInput, SafeAreaView, Animated, TouchableOpacity, Alert, FlatList, ScrollView, Dimensions, StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Product from "../models/product";
import Review from "../models/review";
import Items from './Items';
import {observer, useAsObservableSource } from 'mobx-react-lite';
import { RootStoreContext } from "../stores/root-store";
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const colors = {
    themeColor: 'darkslateblue',
    darkColor: '#8364a9',
    lightColor: '#d4bbed',
    darkestColor: '#52307c',
}
interface IProps {
	modal: {id: string, product: Product};
	setModal: (id:string, product: Product) => void;
}
const Modal = observer((props: IProps) => {
    const CTX = useContext(RootStoreContext);
    // props.modal.product = CTX.fetchStore.products[0]; // Debug
    const product = useAsObservableSource(props.modal.product);
	const messageRef = useRef(null);
	const nameRef = useRef(null);
	const [stars, setStars] = useState(Number);
	const [rating, setRating] = useState(0);
    const closeModal = () => {
        props.setModal('none', null);
        // Alert.alert(String(props.modal.product));
    }
    const post = async () => {
		await CTX.reviewStore.postReviews(props.modal.id, messageRef?.current?.value,  nameRef?.current?.value, stars);
	}
    const anim = useRef(new Animated.Value(windowWidth)).current;
    useEffect(() => {
		if (props.modal.id !== "none") CTX.reviewStore.getReviews(props.modal.id);
        Animated.timing(anim,{
            toValue: props.modal.id !== "none" ? 0 : windowWidth,
            duration: 500,
            useNativeDriver: true,
        }).start();
		// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.modal.id])
    const containerStyle = {
        flex: 1,
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100%',
        height: windowHeight,
        backgroundColor: '#fff',
        margin: 0,
        padding: 0,
        marginBottom: Constants.statusBarHeight,
        zIndex: 69,
    }
    const styles = StyleSheet.create({
        reviews: {
            margin: 10,  
        },
        reviewWrapper: {
            marginVertical: 10,  
            backgroundColor: 'rgba(0,0,0,.1)',
            padding: 10,
            borderRadius: 10,
        },
        nameInput: {
            width: '100%',
            backgroundColor: 'rgba(0,0,0,.1)',
            padding: 5,
            marginVertical: 5,  
        },
        reviewInput: {
            width: '100%',
            backgroundColor: 'rgba(0,0,0,.1)',
            padding: 5,
            marginBottom: 5,  
        },
        review: {
            marginVertical: 10,  
            backgroundColor: 'rgba(0,0,0,.1)',
            padding: 10,
            borderRadius: 10,
        },
    });
    // Strict mode error here v
    return (
		<Animated.View style={{ ...containerStyle, transform: [{translateX: anim}] }}>
            <View style={{height: '8%', justifyContent: 'center'}}>
                <TouchableOpacity style={styles.closeButton} data-cy="close-button" onPress={() => closeModal()}>
                    <Icon name="arrow-back" size={30} color={colors.darkestColor} style={styles.searchExit}/>
                </TouchableOpacity>
            </View>
            <ScrollView>
                <Items id={props.modal.product?.id} img={product?.image_link} name={product?.name} description={product?.description} rating={Number(product?.rating)} price={product?.price} onClick={() => void(0)} type="modal"/>
                <View>
                </View>
                <View style={styles.reviews}>
                    <Text style={{fontSize: 30, fontWeight: '900', color: colors.themeColor}}>Reviews:</Text>
                    <View style={styles.reviewWrapper}>
                        <TextInput style={styles.nameInput} editable defaultValue={"Name"} ref={nameRef} onChangeText={() => console.log("a")}/>
                        <TextInput style={styles.reviewInput} editable defaultValue={"Write your review here..."} ref={messageRef} onChangeText={() => console.log("a")}/>
                        <TouchableOpacity style={{backgroundColor: 'rgba(0,0,0,.5)', padding: 10, justifyContent: 'center', alignItems: 'center'}} onPress={() => post()} data-cy="send-area">
                            <Text style={{color: '#fff',}}>Send</Text>
                        </TouchableOpacity>
                    </View>
                    {CTX.reviewStore.reviews.map((review: Review) => (
                        <View style={styles.review} data-cy="view-reviews">
                            <Text style={styles.reviewUser}>{review.name}</Text>
                            <View style={styles.review}>
                                <Text style={styles.reviewComment}>{review.reviewText}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
            <View style={{height: '10%', marginBottom: Constants.statusBarHeight}}>
                <TouchableOpacity style={styles.closeButton} data-cy="close-button" onPress={() => Alert.alert("Added to cart!")}>
                    <View style={{flexDirection: 'row', height: '100%', backgroundColor: colors.themeColor, alignItems: 'center', justifyContent: 'center'}}>
                       <Icon name="shopping-cart" size={28} color={colors.lightColor} style={styles.searchExit}/>
                       <Text style={{fontWeight: '900', fontSize: 18, padding: 5, color: colors.lightColor}}>Add to Cart</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
});

export default Modal;
