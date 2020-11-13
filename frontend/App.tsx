import React, { FC, useContext, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { Dimensions, TouchableOpacity, Image, StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import Carousel, {MemoizedCarousel} from './src/components/Carousel';
import ShoppingCart from './src/components/ShoppingCart';
import ReactPaginate from 'react-paginate';
import Search from './src/components/Search';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ItemDisplay from "./src/components/ItemDisplay";
import Product from "./src/models/product";
import { observer } from "mobx-react-lite"
import { RootStoreContext } from "./src/stores/root-store";
import RootStore from "./src/stores/root-store";

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
// #SPLASH
const Splash = (props: IProps) => {
	const styles = StyleSheet.create({
		inputIcon: {
			left: 0,
			paddingHorizontal: 10,
		},
		inputBox: {
			alignItems: 'center',
			flexDirection: 'row',
			width: '90%',
			borderRadius: 20,
			backgroundColor: 'rgba(0,0,0,.3)',
			paddingHorizontal: 5,
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
		<View style={{ backgroundColor: colors.themeColor}}>
			<View style={{ padding: 16, flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }}>
				<View style={styles.inputBox}>
					<TouchableOpacity onPress={() => props.setSearched(true)} >
						<Icon style={styles.inputIcon} name="search" size={20} color="#fff" />
					</TouchableOpacity>
					<TextInput style={styles.input} value="search.."/>
				</View>
				<View style={{ flexDirection: "row"}}>
					<TouchableOpacity onPress={() => props.setVisible(true)} >
						<Icon style={styles.navCart} name="shopping-cart" size={28} color="#fff" />
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}
// #APP
const App: FC = observer(() => {
	const CTX = useContext(RootStoreContext);
	const [visible, setVisible] = useState(false);
	const [searched, setSearched] = useState(false);
	const [modal, setModal] = useState({
		id: "none",
		product: null,
	});
	const itemModal = (id: string, product: Product = null) => {
		setModal({ id: id, product: product });
	};
	
	return (
	<View style={styles.container}>
		<StatusBar backgroundColor={'#fff'}/>
		<Splash setVisible={setVisible} setSearched={setSearched}/>
		<ScrollView style={styles.scrollView}>
			<View style={styles.front}>
				<Image source={assets.eye} style={styles.eye} />
				<View style={{ flex: 1, width: '100%', top: 70, left: -60, justifyContent: 'center', alignItems: 'center', position: 'absolute'}}>
					<Text style={styles.splashText}>A wonderful serenity has taken</Text>
					<Text style={styles.splashText2}>possession of my entire soul.</Text>
				</View>
			</View>
			<View style={{ height: 400, width: '100%'}}>
				<MemoizedCarousel />
			</View>
			<View>
			<ReactPaginate  previousLabel={'previous'}
				nextLabel={'next'}
				breakLabel={'...'}
				breakClassName={'break-me'}
				pageCount={CTX.fetchStore.pageCount}
				forcePage={CTX.fetchStore.currentPage}
				marginPagesDisplayed={1}
				pageRangeDisplayed={3}
				onPageChange={({selected}) => CTX.fetchStore.setCurrentPage(selected)}
				containerClassName={'pagination'}
				nextClassName={'next'}
				activeClassName={'active'} />
			</View>
			<ItemDisplay setModal={itemModal} itemList={CTX.fetchStore.products} data-cy="item-display" />
			<View style={{ height: 100, width: '100%', alignItems: 'center'}}>
				<View style={{ width: '90%', backgroundColor: '#fff', borderRadius: 10, padding: 10, marginHorizontal: 'auto' }}>
					<Text style={styles.splashText2}>Team7</Text>
				</View>
			</View>
			
		</ScrollView>
		<ShoppingCart visible={visible} setVisible={setVisible}/>
		{/*<Search searched={searched} setSearched={setSearched}/>*/}
	</View>
	);
})
const Index = observer(() => {
	return(
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
		color: '#000',
		fontWeight: '500',
		backgroundColor: 'rgba(255,255,255,.5)',
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
			{translateX: 40},
		],
	},
	scrollView: {
		backgroundColor: 'pink',
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
