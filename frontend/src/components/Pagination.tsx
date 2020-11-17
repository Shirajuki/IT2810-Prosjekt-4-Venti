import React, { FC, useContext, useState, useEffect } from "react";
import { Dimensions, TouchableOpacity, Image, StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';
import { RootStoreContext } from "../stores/root-store";

function Pagination () {
            const CTX = useContext(RootStoreContext);
            return (<View style={styles.wrapper}>
				{CTX.fetchStore.currentPage > 0 ? <TouchableOpacity style={styles.text} onPress={() => CTX.fetchStore.setCurrentPage(CTX.fetchStore.currentPage -= 1)}>
                    <Text>Previous</Text>
                    </TouchableOpacity> 
                    : null}
				{CTX.fetchStore.currentPage > 1 ? <TouchableOpacity style={styles.pages} onPress={() => CTX.fetchStore.setCurrentPage(CTX.fetchStore.currentPage -= 2)}><Text>{CTX.fetchStore.currentPage - 1}</Text></TouchableOpacity> : null}
				{CTX.fetchStore.currentPage > 0 ? <TouchableOpacity style={styles.pages} onPress={() => CTX.fetchStore.setCurrentPage(CTX.fetchStore.currentPage -= 1)}><Text>{CTX.fetchStore.currentPage}</Text></TouchableOpacity> : null}
				<Text style={styles.current}>{CTX.fetchStore.currentPage + 1}</Text>
				{CTX.fetchStore.currentPage < CTX.fetchStore.pageCount - 1 ? <TouchableOpacity style={styles.pages} onPress={() => CTX.fetchStore.setCurrentPage(CTX.fetchStore.currentPage += 1)}><Text>{CTX.fetchStore.currentPage + 2}</Text></TouchableOpacity> : null}
				{CTX.fetchStore.currentPage < CTX.fetchStore.pageCount - 2? <TouchableOpacity style={styles.pages} onPress={() => CTX.fetchStore.setCurrentPage(CTX.fetchStore.currentPage += 2)}><Text>{CTX.fetchStore.currentPage + 3}</Text></TouchableOpacity> : null}
				{CTX.fetchStore.currentPage != CTX.fetchStore.pageCount - 1? (<TouchableOpacity style={styles.text} onPress={() => CTX.fetchStore.setCurrentPage(CTX.fetchStore.currentPage += 1)}><Text>Next</Text></TouchableOpacity>) : null}
				</View>);
}
export default Pagination;


const styles = StyleSheet.create({
    wrapper: {
        display: "flex",
        flexDirection: "row",
    },
    pages: {
        backgroundColor: "#FFFF",
        padding: 10,
    },
    current: {
        backgroundColor: "#483D8B",
        color: "white",
        padding: 10,
    },
    text: {
        color: "#483D8B"
    },
});