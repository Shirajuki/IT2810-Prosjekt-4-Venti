import React, { FC, useContext, useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { Alert, AsyncStorage, Dimensions, TouchableOpacity, Image, StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import ProductCarousel from './src/components/Carousel';
import ShoppingCart from './src/components/ShoppingCart';
import Search from './src/components/Search';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ItemDisplay from "./src/components/ItemDisplay";
import Product from "./src/models/product";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "./src/stores/root-store";
import RootStore from "./src/stores/root-store";
import Modal from "./src/components/Modal";
import Pagination from "./src/components/Pagination";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
const assets = {
	logo: require('./assets/logo_transparent.png'),
	eye: require('./assets/splash2.png')
};
const colors = {
	themeColor: 'darkslateblue',
	darkColor: '#8364a9',
	lightColor: '#d4bbed',
}
interface IProps {
	setVisible: (b: boolean) => void;
	setSearched: (b: boolean) => void;
}
// Header with icons from react-native-vector-icons
const Splash = (props: IProps) => {
	const styles = StyleSheet.create({
		inputIcon: {
			left: 0,
			paddingHorizontal: 10,
		},
		input: {
			width: '100%',
			height: 40,
			color: '#fff',
			paddingHorizontal: 10,
			paddingVertical: 6,
			alignItems: 'center',
		},
		navCart: {

		},
	});
	return (
		<View style={{ backgroundColor: colors.themeColor }}>
			<Image source={assets.logo} style={{position: 'absolute', top: -10, left: 10, width: 80, height: 80, }} />
			<View style={{ padding: 16, flexDirection: "row", justifyContent: "flex-end", alignItems: 'center' }}>
				<View>
					<TouchableOpacity onPress={() => props.setSearched(true)} >
						<Icon style={styles.inputIcon} name="search" size={28} color="#fff" />
					</TouchableOpacity>
				</View>
				<View style={{ flexDirection: "row" }}>
					<TouchableOpacity onPress={() => props.setVisible(true)} >
						<Icon style={styles.navCart} name="shopping-cart" size={28} color="#fff" />
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}
/* Main app code. Calls our global variables with CTX and sets modals for displaying 
individual products with setModal.
The useEffect with PageCount and productscount gives a basis for pagination
All other components are described in their respective files
*/
const App: FC = observer(() => {
	const CTX = useContext(RootStoreContext);
	const [visible, setVisible] = useState(false);
	const [searched, setSearched] = useState(false);
	const [modal, setModal] = useState({
		id: "none",
		product: null,
	});
	const sort = "name_asc";
	const itemModal = (id: string, product: Product = null) => {
		setModal({ id: id, product: product });
	};
	useEffect(() => {
		CTX.fetchStore.setPageCount(Math.ceil(CTX.fetchStore.productsCount / CTX.fetchStore.pageSize))
	}, [CTX.fetchStore.productsCount, CTX.fetchStore.pageSize])

    const retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem('cart');
        if (value !== null && CTX.sessionStore.cart === "[]") {
            CTX.sessionStore.setCart(value);
        } else {
            await AsyncStorage.setItem('cart', '[]');
        }
      } catch (error) {
          //
      }
    };

    // AsyncStorage for localstorage storing cart	
    useEffect(() => {
        retrieveData();
		CTX.reviewStore.setSession("react-native");
        retrieveData();
		CTX.sessionStore.setSession("react-native");
	 }, [])

    useEffect(() => {
        CTX.sessionStore.getCart();
    }, [visible]);

	return (
		<View style={styles.container}>
			<StatusBar />
			<Splash setVisible={setVisible} setSearched={setSearched} />
			<ScrollView style={styles.scrollView}>
				<View style={styles.front}>
					<Image source={assets.eye} style={styles.eye} />
					<View style={{ flex: 1, width: '100%', top: 70, left: -60, justifyContent: 'center', alignItems: 'center', position: 'absolute' }}>
						<Text style={styles.splashText}>A wonderful serenity has taken</Text>
						<Text style={styles.splashText2}>possession of my entire soul.</Text>
					</View>
				</View>
				<View style={{ height: 400, width: '100%' }}>
					<ProductCarousel openModal={itemModal} />
				</View>
				<Pagination />
				<ItemDisplay setModal={itemModal} itemList={CTX.fetchStore.products} />
				<Pagination/>
				<View style={{ height: 100, width: '100%', alignItems: 'center', backgroundColor: colors.themeColor, marginTop:10 }}>
					<Text style={styles.splashText3}>Team 7</Text>
				</View>
			</ScrollView>
			<ShoppingCart visible={visible} setVisible={setVisible} />
			<Search setModal={itemModal} searched={searched} setSearched={setSearched} />
			<Modal modal={modal} setModal={itemModal}/>
		</View>
	);
})
const Index = observer(() => {
	return (
		<View>
			<RootStore>
				<App />
			</RootStore>
		</View>
	);
});
export default Index;
const styles = StyleSheet.create({
	splashText: {
		fontSize: 16,
		color: '#fff',
		fontWeight: '500',
		backgroundColor: 'rgba(0,0,0,.5)',
		position: 'relative',
		left: 20,
	},
	splashText2: {
		fontSize: 16,
		color: '#fff',
		fontWeight: '500',
		backgroundColor: 'rgba(0,0,0,.5)',
		textAlign: 'center'
	},
	splashText3: {
		fontSize: 16,
		color: '#fff',
		fontWeight: '500',
		textAlign: 'center',
		padding: 20
	},
	navCart: {

	},
	front: {
		alignItems: 'center',
	},
	eye: {
		flex: 1,
		height: 210,
		resizeMode: 'contain',
		justifyContent: 'center',
		alignItems: 'center',
		transform: [
			{ translateX: 40 },
		],
	},
	scrollView: {
		backgroundColor: '#d4bbed',
		flex: 1,
	},
	container: {
		height: windowHeight,
		backgroundColor: colors.themeColor,
		margin: 0,
		padding: 0,
		marginTop: Constants.statusBarHeight,
		marginBottom: Constants.status,
		overflow: 'hidden',
	},
});
