import React, { useState } from 'react'
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import productsData from '../../constants/productsData';

const Search = ({ navigation }) => {
    const [search, setSearch] = useState([]);

    const filter = (searchText) => {
        // console.log(searchText);
        const searchData = productsData.filter(task => task.productName.includes(searchText));
        console.log(searchData);
        if (searchText) {
            console.log('inside search text')
            if (searchData.length == 0) {
                console.log('inside blank')
                ToastAndroid.show('No result found...', 1000);
            }
            setSearch(searchData)
        }
        else {
            setSearch([]);
        }
    }
    return (
        <View style={styles.container}>
            <ScrollView style={{ width: '100%', height: '100%' }}
                contentContainerStyle={{ height: '100%' }}>
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
                    <View style={{ width: '80%', height: 40, justifyContent: 'center', borderWidth: 1, backgroundColor: '#21262E', borderRadius: 15 }}>
                        <TextInput
                            color='white'
                            placeholder='Search...'
                            placeholderTextColor='white'
                            style={{ marginLeft: 10 }}
                            onChangeText={(e) => filter(e)}
                        />
                    </View>
                </View >
                <View style={styles.product_details_container}>
                    <ScrollView style={{ width: '100%', paddingVertical: 25 }}>
                        <View style={styles.main}>
                            {
                                // search ?
                                search.map((product, i) => {
                                    // console.log('product in map: ', search)
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
                                                alignItems: 'center'
                                            }}>
                                                <Image
                                                    style={{
                                                        resizeMode: 'center',
                                                        width: 70,
                                                        height: 100
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
                                })
                                // : <View>
                                //     <Text style={{color:'black'}}>No result found...</Text>
                                // </View>
                            }

                        </View>
                    </ScrollView>
                </View>
            </ScrollView>
        </View >
    )
}

export default Search;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#21262E',
        // backgroundColor:'#139487',
        backgroundColor: '#7900FF',
        position: 'relative'
    },
    product_details_container: {
        width: '100%',
        // height: '83%',
        position: 'absolute',
        // backgroundColor: '#EEF2FA',
        backgroundColor: 'white',
        flex: 1,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        // borderBottomLeftRadius: 25,
        top: '20%',
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        // marginTop:10
        paddingTop: 1,
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
    main: {
        // flex: 0.7,
        paddingHorizontal: 25,
        width: '100%',
        // height: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        paddingTop: 25,
        // zIndex: -1
        // borderWidth: 1
    },
    product_container: {
        width: '45%',
        height: 300,
        borderRadius: 16,
        marginBottom: 40,
        alignItems: 'center',
        position: 'relative'
    }
})