import React, { useEffect, useRef, useState } from 'react'
import { Pressable, StyleSheet, Text, View, Image, ImageBackground, FlatList, ScrollView } from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import { useDrawerProgress } from '@react-navigation/drawer';
import Animated, { interpolate, useAnimatedStyle, Value, event, useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import { setSelectedTab } from '../../redux/actions/TabActions';
import { connect } from 'react-redux';

const ProductDetails = ({ route, navigation, selectedTab, setSelectedTab }) => {

    // useEffect(() => {
    //     setSelectedTab('ProductDetails')
    // }, [setSelectedTab])
    const progress = useDrawerProgress();
    console.log(progress)
    // const screenStyle = useAnimatedStyle(() => {
    //     const scale = interpolate(progress.value, [0, 1], [1, 0.8],)

    //     const borderRadius = interpolate(progress.value, [0, 1], [1, 20],)

    //     return {
    //         transform: [
    //             {
    //                 scale,
    //             },
    //         ],
    //         borderRadius,
    //     }
    // })

    // const scrollX = useRef(new Value(0)).current;
    // // console.log(scrollX)
    // const dataRef = useRef(null)
    // const [currentIndex, setCurrentIndex] = useState(0)
    // const viewableItemChanged = useRef(({ viewableItems }) => {
    //     setCurrentIndex(viewableItems[0].index)
    // }).current

    // const viewConfig = useRef({ viewCoveragePercentThreshold: 50 }).current
    console.log(route.params.product)
    const [productDetails, setProductDetails] = useState(route.params.product)
    console.log('ProductDetails', productDetails)
    const image = route.params.product.image
    const data = [
        image,
        image,
        image
    ]

    // const data = [
    //     {
    //         id: 1,
    //         image: image,
    //     },
    //     {
    //         id: 2,
    //         image: image,
    //     },
    //     {
    //         id: 3,
    //         image: image,
    //     }
    // ]
    const DATA = [
        {
            id: 1,
            icon: require('../../constants/images/Microphone.png'),
            feature: 'Built in Microphone'
        },
        {
            id: 2,
            icon: require('../../constants/images/Headset.png'),
            feature: 'Headset Jack'
        },
        {
            id: 3,
            icon: require('../../constants/images/sensor.png'),
            feature: 'sensor'
        },
        {
            id: 4,
            icon: require('../../constants/images/sensor.png'),
            feature: 'sensor'
        },
        {
            id: 5,
            icon: require('../../constants/images/sensor.png'),
            feature: 'sensor'
        }
    ]

    const renderItem = ({ item }) => {
        console.log(item);

        return (
            <View style={styles.feature_card}>
                <ImageBackground
                    source={require('../../constants/images/backgroundShadow.png')}
                    style={{
                        width: '80%',
                        height: '100%',
                    }}>
                    <ImageBackground
                        source={require('../../constants/images/backgroundShadow1.png')}
                        style={{
                            width: 60,
                            height: 80,
                            position: 'absolute',
                            top: '31%',
                            left: '63%'
                        }}>

                    </ImageBackground>
                    <View style={{ position: 'absolute', top: 20, width: 24, left: 16 }}>
                        <Image style={{ resizeMode: 'center', height: 24, width: 24 }} source={item.icon} />

                    </View>
                    <View style={{ position: 'absolute', top: 100, left: 16 }}>
                        <Text style={{ bottom: 32, fontSize: 14, fontWeight: '700', color: 'black' }}>{item.feature}</Text>
                    </View>
                </ImageBackground>
            </View>
        )
    }

    return (
        // <Animated.View
        //     style={[
        //         styles.container,
        //         screenStyle
        //     ]}>
        <View style={styles.container}>
            < View style={styles.header} >
                <Pressable style={({ pressed }) => [
                    styles.button_container,
                    {
                        opacity: pressed ? 0.7 : 1,
                        // borderWidth: pressed ? 1 : 9,
                        // borderColor: pressed ? '#21262E' : '#21262E',
                        elevation: pressed ? 20 : 16
                    },
                    {
                        backgroundColor: '#7900FF',
                        shadowColor: 'black',
                    }
                ]}
                    onPress={() => navigation.goBack()}>
                    <Image style={{ tintColor: 'white', resizeMode: 'contain', height: 15 }} source={require('../../constants/images/BackArrow.png')} />
                </Pressable>
                <View style={{ width: 160, height: 36, alignItems: 'center', justifyContent: 'center' }}>
                    <Image style={{ tintColor: 'white', resizeMode: 'cover', height: 66, width: 70 }} source={require('../../constants/images/gadgetLogoIcon.png')} />
                </View>
                <Pressable style={({ pressed }) => [
                    styles.button_container,
                    {
                        opacity: pressed ? 0.7 : 1,
                        // borderWidth: pressed ? 1 : 9,
                        // borderColor: pressed ? '#21262E' : '#21262E',
                        elevation: pressed ? 20 : 16
                    },
                    {
                        backgroundColor: '#7900FF',
                        shadowColor: 'black',
                    }
                ]}>
                    <Image style={{ tintColor: 'white', resizeMode: 'center', height: 20 }} source={require('../../constants/images/Settings.png')} />
                </Pressable>
            </View >
            <View style={styles.product_details_container}>
                {/* <ScrollView style={{ width: '100%', borderWidth: 4, borderColor: 'red' }}> */}
                <View style={{ height: '40%' }}>
                    <SliderBox
                        images={data}
                        style={styles.item}
                        dotColor="blue"
                        inactiveDotColor="#90A4AE"
                        dotStyle={{
                            width: 10,
                            height: 10,
                            borderRadius: 15,
                            padding: 7,
                            marginBottom: 20
                        }}
                        // parentWidth='100%'
                        // sliderBoxStyle={{ borderWidth:1 }}
                        // sliderBoxHeight={200}
                        height={300}
                        resizeMode='center'
                    // autoplay
                    />
                </View>
                <View style={styles.features_container}>
                    <FlatList
                        style={{ paddingHorizontal: 15 }}
                        horizontal
                        bounces={false}
                        data={DATA}
                        showsHorizontalScrollIndicator={false}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
                </View>
                <View style={styles.addtocart_container}>
                    <Pressable
                        style={({ pressed }) => [
                            styles.addtocart_button,
                            {
                                elevation: pressed ? 2 : 6
                            },
                        ]}
                        onPress={() => { navigation.navigate('Cart', { productDetails }) }}
                    >
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', height: 50, alignItems: 'center' }}>
                            <Text
                                style={{
                                    lineHeight: 50,
                                    textAlign: 'center',
                                    marginRight: 5,
                                    fontSize: 20,
                                    fontWeight: '700',
                                    color: 'white',
                                    // borderWidth: 1
                                }}>Add to cart</Text>
                            <Image style={{ resizeMode: 'center', width: 22, height: 15, tintColor: 'white' }} source={require('../../constants/images/Shop.png')} />
                        </View>
                    </Pressable>
                </View>
                <View style={styles.addtocart_container}>
                    <Pressable
                        style={({ pressed }) => [
                            styles.addtocart_button,
                            {
                                elevation: pressed ? 2 : 6
                            }
                        ]}
                        onPress={() => {
                            console.log([productDetails]);
                            navigation.navigate('OrderPlaced', { productDetails })
                        }}
                    >
                        <Text
                            style={{
                                height: '100%',
                                width: '30%',
                                // backgroundColor: '#2E70E2',
                                // backgroundColor:'#39AEA9',
                                backgroundColor: '#7F82E2',
                                borderRadius: 60,
                                textAlign: 'center',
                                lineHeight: 50,
                                fontSize: 24,
                                fontWeight: '700',
                                color: 'white'
                            }}>$70</Text>
                        <Text
                            style={{
                                lineHeight: 50,
                                textAlign: 'center',
                                width: '70%',
                                fontSize: 20,
                                fontWeight: '700',
                                color: 'white'
                            }}>Buy Now</Text>
                    </Pressable>
                </View>
                {/* </ScrollView> */}
            </View>
        </View >
        // </Animated.View>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#21262E',
        // backgroundColor:'#139487',
        backgroundColor: '#7900FF',
        position: 'relative'
    },
    header: {
        paddingVertical: 25,
        paddingHorizontal: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: '#139487',
        backgroundColor: '#7900FF',
        elevation: 26,
        shadowColor: 'black',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
        // flex:0.07
    },
    button_container: {
        width: 50,
        height: 50,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        // borderWidth:1

    },
    product_details_container: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        // backgroundColor: '#EEF2FA',
        backgroundColor: 'white',
        // flex: 0.15,
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        // borderBottomLeftRadius: 25,
        top: 118,
        left: 0,
        right: 0,
        alignItems: 'center',
        // marginTop:10
        // paddingVertical: 10,
    },
    item: {
        // marginLeft: '30%',
        width: '100%',
        // borderWidth:1,
        // borderColor:'red',
        // marginBottom: 20
        // paddingVertical:30
    },
    features_container: {
        height: '19%',
        alignItems: 'center',
        // paddingVertical: 3,
        marginTop: 5,
        // borderWidth: 1,
        marginBottom: 10
        // justifyContent:'center'
    },
    feature_card: {
        width: 120,
        height: 120,
        borderRadius: 40,
        elevation: 6,
        backgroundColor: '#EEF2FA',
        position: 'relative',
        marginRight: 20,
        marginLeft: 5,
        // borderWidth:1,
        // marginTop: 10,
    },
    addtocart_container: {
        width: '100%',
        // marginHorizontal: 40,
        alignItems: 'center',
        marginBottom: 10
    },
    addtocart_button: {
        width: '90%',
        height: 50,
        borderRadius: 60,
        backgroundColor: '#21262E',
        // backgroundColor:'#A2D5AB',
        flexDirection: 'row'
    }
})