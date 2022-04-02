import React, { useEffect, useState, useContext } from 'react'
import { Image, StyleSheet, Text, View, Pressable, ScrollView, TouchableOpacity, ToastAndroid } from 'react-native'
import products from '../../constants/productsData.js';
import { useDrawerProgress } from '@react-navigation/drawer';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated'
import Header from '../Header.js';
import BottomNav from '../BottomNav.js';
import { connect } from 'react-redux';
import { setSelectedTab } from '../../redux/actions/TabActions.js';
import { globalState } from '../../../App.js';

const Cart = ({ route, navigation, setSelectedTab, }) => {

  const { setItemPurchased, itemPurchased, cartData, setCartData, cartBill, setCartBill } = useContext(globalState);
  const [newData, setNewData] = useState([]);
  const [updatedPurchasedItem, setUpdatedPurchasedItem] = useState(itemPurchased);
  console.log('cart item:', route.params)

  useEffect(() => {
    navigation.addListener('focus', () => {
      setSelectedTab('Cart')
    });
  }, [setSelectedTab])

  useEffect(() => {
    console.log(cartBill)
    // console.log('cartData: ', cartData)
    if (route.params != undefined) {
      console.log('inside useEffect', route.params.productDetails)
      // const newData = [...context.cartData];
      const addIndex = cartData.findIndex(item => item.key === route.params.productDetails.key);
      console.log('addIndex', addIndex)
      if (addIndex != -1) {
        ToastAndroid.show('Item already in cart', 2000);
      }
      else {
        setCartData([...cartData, route.params.productDetails])
        console.log(cartBill);
        const amount = cartBill + route.params.productDetails.cost;
        console.log('amount: ', amount)
        setCartBill(amount);
      }
    }
  }, [])




  const deleteItem = (key, cost) => {
    // console.log('cart item to delete:', cartData)
    // console.log("Inside delete function");
    console.log(key);
    const newData = [...cartData];
    const prevIndex = newData.findIndex(item => item.key === key);
    console.log(prevIndex)
    newData.splice(prevIndex, 1);
    setCartData(newData);
    setCartBill(cartBill - cost);
  }

  const placeOrder = () => {
    cartData.forEach(element => {
      // console.log('inside for each loop')
      // console.log(element)
      updatedPurchasedItem.splice(0, 0, element);
      setItemPurchased(updatedPurchasedItem);
    });
    setCartData([])
    setCartBill(0);
  }


  return (
    <View style={styles.container}>
      <Header title='Cart' navigation={navigation} />
      <View style={styles.cart_container}>
        <ScrollView style={{ width: '100%', backgroundColor: 'white' }} >

          <View style={styles.items}>
            {cartData.map((productDetails, i) => {
              console.log('element', productDetails)
              // console.log(productDetails.cost);
              // calculateBill()
              return (
                <TouchableOpacity key={i} style={styles.item_container}>
                  <Pressable
                    style={({ pressed }) => [
                      styles.delete_button,
                      {
                        opacity: pressed ? 0.6 : 1,
                        elevation: pressed ? 14 : 6,
                      },
                    ]}
                    onPress={() => { console.log(i); deleteItem(productDetails.key, productDetails.cost) }}
                  >
                    <Image style={{ resizeMode: 'center', width: 20, height: 20, tintColor: 'red' }} source={require('../../constants/images/delete.png')} />
                  </Pressable>
                  <View style={styles.item_details_container}>
                    <View style={{ width: '20%', height: 90, alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                      <Image style={{ resizeMode: 'center', height: 80, width: 60 }} source={productDetails.image} />
                    </View>
                    <View style={styles.item_details}>
                      <Text style={{ width: '50%', color: 'black', fontWeight: '500', fontSize: 14 }}>{productDetails.productName}</Text>
                      <Text style={{ width: '90%', color: 'black', fontWeight: '400', fontSize: 12 }}>{productDetails.productDetail}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            })}
            {cartData.length >= 1 ?
              <>
                <View style={styles.table_container}>
                  <View style={styles.table_row}>
                    <Text style={styles.label}>Item Total</Text>
                    <Text style={styles.cost}>${cartBill}</Text>
                  </View>
                  <View style={styles.table_row}>
                    <Text style={styles.label}>Tax & Charges</Text>
                    <Text style={styles.cost}>$7</Text>
                  </View>
                  <View style={[styles.table_row, { marginTop: 5 }]}>
                    <Text style={[styles.label, { fontSize: 18 }]}>Grand Total</Text>
                    <Text style={[styles.cost, { fontSize: 18 }]}>${cartBill + 7}</Text>
                  </View>
                </View>
                <View style={{ width: '100%' }}>
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
                      placeOrder();
                      navigation.navigate('ItemPurchased') 
                    }}>
                    <View>
                      <Text style={[styles.cost, { color: 'white' }]}>${cartBill + 7}</Text>
                      <Text style={[styles.label, { color: 'white' }]}>TOTAL</Text>
                    </View>
                    <View>
                      <Text style={{ fontSize: 16, fontWeight: '500', color: 'white' }}>Place Order </Text>
                    </View>
                  </Pressable>
                </View>
              </> :
              <></>}

          </View>

        </ScrollView>

      </View>
      <BottomNav navigation={navigation} />
    </View>
  )
}

function mapStateToProps(state) {
  return {
    selectedTab: state.tabReducer.selectedTab
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setSelectedTab: (selectedTab) => {
      return dispatch(setSelectedTab(selectedTab))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative'
    // borderWidth:1
  },
  cart_container: {
    flex: 1,
    // paddingBottom: 50,
    //  backgroundColor: '#EEF2FA',
    backgroundColor: 'white',
    zIndex: -1
  },
  items: {
    paddingHorizontal: 25,
    width: '100%',
    // height: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingBottom: 95,
    paddingTop: 25
  },
  item_container: {
    // flexDirection: 'row',
    alignItems: 'center',
    // borderWidth:1,
    // height: 100,
    width: '100%',
    borderRadius: 25,
    backgroundColor: '#7F82E2',
    elevation: 8,
    shadowColor: 'black',
    marginBottom: 10,
    position: 'relative'
  },
  item_details_container: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth:1,
    height: 100,
    width: '100%'
  },
  item_details: {
    width: '80%'
  },
  delete_button: {
    position: 'absolute',
    top: 10,
    right: 20,
    width: 20,
    height: 20
  },
  checkout_button: {
    alignItems: 'center',
    width: '100%',
    // marginTop: 20
    // paddingRight: 15,
    // paddingBottom: 10
  },
  table_container: {
    paddingHorizontal: 25,
    marginTop: 25,
    width: '100%',
    // borderWidth:1,
    // height: '40%',
    paddingVertical: 20,
    backgroundColor: 'white',
    elevation: 6,
    justifyContent: 'center',
    marginBottom: 20
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
    fontWeight: '500'
  },
  place_order_container: {
    flexDirection: 'row',
    width: '50%',
    // backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'space-between',
    alignSelf: 'flex-end',
    // marginRight: 25

  }
})