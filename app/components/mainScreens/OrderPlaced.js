import React, { useContext, useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { globalState } from '../../../App';
import BottomNav from '../BottomNav';
import Header from '../Header';

const OrderPlaced = ({ navigation, route }) => {



    const { productDetails } = route.params;
    console.log('your order: ', productDetails)
    const { setItemPurchased, itemPurchased, cartData, setCartData } = useContext(globalState);
    const [updatedPurchasedItem, setUpdatedPurchasedItem] = useState(itemPurchased)

    // const deleteItem = (key) => {
    //     console.log("Inside delete function");
    //     console.log(key);

    // }

    const addItemToOrderHistory = () => {
        console.log('inside add order history')
        // deleteItem(productDetails.key);
        updatedPurchasedItem.splice(0, 0, productDetails)
        // setItemPurchased([...itemPurchased, productDetails])
        setItemPurchased(updatedPurchasedItem)

    }

    return (
        <View style={styles.container}>
            <Header title='Your Order' navigation={navigation} />
            <View style={styles.order_item_container}>
                <ScrollView style={{ width: '100%', paddingTop: 15, height: '100%', paddingBottom: 70 }}>

                    <View style={styles.Item_container}>
                        <View style={{ width: '70%' }}>
                            <Text style={styles.label}>{productDetails.productName}</Text>
                            <Text style={styles.cost}>${productDetails.cost}</Text>
                        </View>
                        <View style={{ width: '30%' }}>
                            <Image style={{ resizeMode: 'center' }} width='100%' height='100%' source={productDetails.image} />
                        </View>
                    </View>

                    <View style={styles.table_container}>
                        <View style={styles.table_row}>
                            <Text style={styles.label}>Item Total</Text>
                            <Text style={styles.cost}>${productDetails.cost}</Text>
                        </View>
                        <View style={styles.table_row}>
                            <Text style={styles.label}>Tax & Charges</Text>
                            <Text style={styles.cost}>$7</Text>
                        </View>
                        <View style={[styles.table_row, { marginTop: 5 }]}>
                            <Text style={[styles.label, { fontSize: 18, }]}>Grand Total</Text>
                            <Text style={[styles.cost, { fontSize: 18 }]}>${productDetails.cost + 7}</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
            <Pressable style={({ pressed }) => [
                styles.place_order_container,
                {
                    opacity: pressed ? 0.6 : 1,
                    elevation: pressed ? 3 : 9,
                },
                {
                    backgroundColor: 'red'
                }
            ]}
                onPress={() => {
                    console.log('add to history success'); addItemToOrderHistory();
                    navigation.navigate('ItemPurchased')
                }}>
                <View>
                    <Text style={[styles.cost, { color: 'white' }]}>${productDetails.cost + 7}</Text>
                    <Text style={[styles.label, { color: 'white' }]}>TOTAL</Text>
                </View>
                <View>
                    <Text style={{ fontSize: 16, fontWeight: '500', color: 'white' }}>Place Order </Text>
                </View>
            </Pressable>
        </View>
    )
}

export default OrderPlaced;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        position: 'relative',
        paddingBottom: 25
        // borderWidth:1
    },
    order_item_container: {
        // borderWidth: 1,
        // borderColor:'red',
        flex: 1,
    },
    Item_container: {
        flexDirection: 'row',
        // borderWidth: 1,
        height: 100,
        paddingHorizontal: 25,
        marginBottom: 5,
        alignItems: 'center',
        backgroundColor: 'white',
        elevation: 6
    },
    table_container: {
        paddingHorizontal: 25,
        marginTop: 25,
        // borderWidth:1,
        // height: '40%',
        paddingVertical: 20,
        backgroundColor: 'white',
        elevation: 6,
        justifyContent: 'center',
        marginBottom: 50
    },
    table_row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5
    },
    label: {
        color: 'black',
        fontWeight: '500'
    },
    cost: {
        color: 'black',
        fontWeight: '500',
        paddingHorizontal: 5
    },
    place_order_container: {
        flexDirection: 'row',
        width: '50%',
        // backgroundColor: 'red',
        padding: 10,
        borderRadius: 10,
        justifyContent: 'space-between',
        alignSelf: 'flex-end',
        marginRight: 25

    }
})