import React, { useState } from 'react'
import { Image, View, Text, StyleSheet, Pressable, ImageBackground, TouchableOpacity, ActivityIndicator } from 'react-native'

const Home = ({ navigation }) => {

    const [loginButtonClicked, setLoginButtonClicked] = useState(false);
    const [registerButtonClicked, setRegisterButtonClicked] = useState(false);

    const callLoginLoading = () => {
        setLoginButtonClicked(true);

        setTimeout(() => {
            setLoginButtonClicked(false)
        }, 1000);
    }

    const callRegisterLoading = () => {
        setRegisterButtonClicked(true);

        setTimeout(() => {
            setRegisterButtonClicked(false)
        }, 1000);
    }
    return (
        <View style={{ flex: 1, backgroundColor: 'black', width: '100%', alignItems: 'center' }}>
            {/* <ImageBackground
                source={require('../constants/images/backgroundShadow.png')}
                style={{
                    width: '100%',
                    // height: '100%',
                    // flex: 1,
                    // borderWidth: 1,
                    zIndex:-4,
                    // opacity:0.7
                }}>
                     </ImageBackground> */}
                <View style={{ width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={{ alignItems: 'center' }}>
                        <Image style={{tintColor:'#7F82E2', resizeMode: 'cover', width:185, height:170 }} source={require('../constants/images/gadgetLogo.png')} />
                    </TouchableOpacity>
                    <Text style={{ color: 'white', fontWeight: '900', textAlign: 'center' }}>Welcome to gadgets store</Text>
                </View>
                <View style={styles.bottomContainer}>
                    <Pressable
                        onPress={() => {
                            navigation.navigate("login");
                        }}
                        style={({ pressed }) => [
                            {
                                opacity: pressed ? 0.8 : 1,
                                borderWidth: pressed ? 2 : 1,
                                elevation: pressed ? 2 : 8,
                                // borderColor: pressed ? 'white' : 'white',
                            },
                            styles.Button,
                            {
                                // backgroundColor: '#139487',
                                backgroundColor: '#7900FF'
                            }
                        ]}>
                        <Text style={[styles.buttonText, { color: 'white' }]}>Login</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => {
                            navigation.navigate("signup");
                        }}
                        style={({ pressed }) => [
                            {
                                opacity: pressed ? 0.9 : 1,
                                borderWidth: pressed ? 2 : 1,
                                elevation: pressed ? 2 : 8,
                                // borderColor: pressed ? '#7900FF' : '#7900FF',
                            },
                            styles.Button,
                            { backgroundColor: 'white' }
                        ]}>
                        <Text style={[styles.buttonText, { color: 'black' }]}>Register</Text>
                    </Pressable>
                </View>
           
            {/* <View style={{ alignItems: 'center', width: '100%', flex: 1, justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image style={{ marginBottom: 16.82 }} source={require('../constants/images/PLSlogo.png')} />
                </View>
                <Text style={{ color: 'white', fontWeight: '700' }}>No more paper receipt!</Text>
            </View>
            <View style={styles.bottomContainer}>
                <Pressable
                    onPress={() => navigation.navigate('login')}
                    style={({ pressed }) => [
                        {
                            opacity: pressed ? 0.8 : 1,
                            borderWidth: pressed ? 2 : 1,
                            elevation: pressed ? 2 : 8,
                            borderColor: pressed ? 'white' : 'white',
                        },
                        styles.Button,
                        { backgroundColor: 'white' }
                    ]}>
                    <Text style={[styles.buttonText, { color: '#4187FF' }]}>Login</Text>
                </Pressable>
                <Pressable
                    onPress={() => navigation.navigate('signup')}
                    style={({ pressed }) => [
                        {
                            opacity: pressed ? 0.8 : 1,
                            borderWidth: pressed ? 3 : 1,
                            elevation: pressed ? 2 : 8,
                            borderColor: pressed ? '#4187FF' : '#4187FF',
                        },
                        styles.Button,
                        { backgroundColor: '#4187FF' }
                    ]}>
                    <Text style={[styles.buttonText, { color: 'white' }]}>Register</Text>
                </Pressable>
            </View> */}
        </View>
    )
}

export default Home;

const styles = StyleSheet.create({
    bottomContainer: {
        // marginBottom: 41,
        alignItems: 'center',
        flex: 1,
        width: '100%',
        // borderWidth: 1,
        paddingHorizontal: 25,
        justifyContent: 'center'
    },
    Button: {
        // borderWidth: 1,
        // borderColor: 'white',
        width: '100%',
        alignItems: 'center',
        height: 45,
        borderRadius: 12,
        justifyContent: 'center',
        marginBottom: 15
    },
    buttonText: {
        fontSize: 20,
        fontWeight: '700',
        marginRight: 5
    }
})