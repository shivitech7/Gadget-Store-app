import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View, Pressable, ScrollView, TouchableOpacity } from 'react-native'
import products from '../../constants/productsData.js';
import { useDrawerProgress } from '@react-navigation/drawer';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated'
import { connect } from 'react-redux';
import { setSelectedTab } from '../../redux/actions/TabActions.js';
import BottomNav from '../BottomNav.js';
const Products = ({ navigation, selectedTab, setSelectedTab }) => {
    console.log(selectedTab)

    useEffect(() => {
        navigation.addListener('focus', () => {
            setSelectedTab('Home')
        });
    }, [setSelectedTab])

    const [selectedProduct, setSelectedProduct] = useState()
    const progress = useDrawerProgress();
    const screenStyle = useAnimatedStyle(() => {
        const scale = interpolate(progress.value, [0, 1], [1, 0.8],)

        const borderRadius = interpolate(progress.value, [0, 1], [1, 20],)

        return {
            transform: [
                {
                    scale,
                },
            ],
            borderRadius,
        }
    })
    return (
        // {/* Header---- */}
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable style={({ pressed }) => [
                    styles.button_container,
                    {
                        opacity: pressed ? 0.6 : 1,
                        borderWidth: pressed ? 6 : 4,
                        // borderColor: pressed ? '#139487' : '#139487',
                        borderColor: pressed ? '#7900FF' : '#7900FF',
                        elevation: pressed ? 14 : 8,
                    },
                    {
                        // backgroundColor: '#EEF2FA',
                        shadowColor: 'black',
                        backgroundColor: 'white'
                    }
                ]}
                    onPress={() => navigation.openDrawer()}>
                    <Image style={{ tintColor: '#7F82E2', resizeMode: 'center', height: 15 }} source={require('../../constants/images/Menu.png')} />
                </Pressable>
                <View style={{ width: 80, height: 36, alignItems: 'center', justifyContent: 'center' }}>
                    <Image style={{ resizeMode: 'cover', height: 96, width: 110, tintColor: '#7F82E2' }} source={require('../../constants/images/gadgetLogo.png')} />
                </View>
                <Pressable style={({ pressed }) => [
                    styles.button_container,
                    {
                        opacity: pressed ? 0.6 : 1,
                        elevation: pressed ? 14 : 8,

                    },
                    {
                        shadowColor: 'black',
                        backgroundColor: 'white'

                    }
                ]}>
                    <Image style={{ tintColor: '#7900FF', resizeMode: 'center', height: 20 }} source={require('../../constants/images/Settings.png')} />
                </Pressable>
            </View>

            {/* products container-----  */}
            <View style={{
                flex: 1, paddingBottom: 50,
                //  backgroundColor: '#EEF2FA',
                backgroundColor: 'white',
                zIndex: -1
            }} >
                <ScrollView style={{ width: '100%', backgroundColor: 'white' }}
                >
                    <View style={styles.main}>
                        {products.map((product, i) => {
                            // console.log('map products',product)
                            return (
                                <Pressable
                                    onPress={() => { navigation.navigate('ProductDetails', { product }) }}
                                    key={i}
                                    style={({ pressed }) =>
                                        [
                                            styles.product_container,
                                            {
                                                elevation: pressed ? 2 : 6,
                                                backgroundColor: pressed ? '#7F82E2' : '#EEF2FA',
                                            },
                                        ]}>
                                    <TouchableOpacity style={{ position: 'absolute', left: 16, top: 16 }}>
                                        <Image source={require('../../constants/images/like.png')} />
                                    </TouchableOpacity>
                                    <View style={{
                                        position: 'absolute',
                                        top: 40,
                                        bottom: 70,
                                        justifyContent: 'center',
                                        // borderWidth:1,
                                        // width: '100%',
                                        height: '40%',
                                        alignItems:'center'
                                    }}>
                                        <Image
                                            style={{
                                                resizeMode: 'center',
                                                width: 70,
                                                height:100
                                            }}
                                            width={150}
                                            source={product.image} />
                                    </View>
                                    <View style={{ bottom: 15, position: 'absolute', width: '100%', paddingHorizontal: 15, height: 85 }}>
                                        <Text style={{ marginBottom: 8, fontSize: 10, fontWeight: '500', color: '#21262E' }}>{product.productName}</Text>
                                        <Text style={{ fontSize: 12, fontWeight: '700', color: 'black' }}>{product.productDetail}</Text>
                                    </View>
                                </Pressable>
                            )
                        })}
                    </View>
                </ScrollView>
            </View>

            {/* /* footer------- */}
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

export default connect(mapStateToProps, mapDispatchToProps)(Products);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#EEF2FA',
        backgroundColor: 'white',
        position: 'relative',
        // borderWidth:1
    },
    header: {
        //    borderWidth:1,
        paddingVertical: 25,
        paddingHorizontal: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: '#EEF2FA',
        // backgroundColor: '#139487',
        backgroundColor: 'white',
        elevation: 10,
        // shadowColor:'black',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        // flex:0.15
    },
    button_container: {
        width: 50,
        height: 50,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        // shadowRadius: 50,
    },
    main: {
        // flex: 0.7,
        paddingHorizontal: 25,
        width: '100%',
        // height: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        paddingVertical: 25,
        // borderWidth:1
    },
    product_container: {
        width: '45%',
        height: 300,
        borderRadius: 16,
        marginBottom: 40,
        alignItems: 'center',
        position: 'relative'
    },
    footer: {
        position: 'absolute',
        width: '100%',
        // position: 'relative',
        bottom: 0,
        backgroundColor: '#EEF2FA',
        elevation: 16,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
        // flex: 0.15
    },
    bottom_navigation: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#21262E',
        height: 90,
        borderRadius: 60,
        zIndex: 4,
        elevation: 6
    },
})