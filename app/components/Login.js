import React, { useEffect, useState, useContext } from 'react'
import { ActivityIndicator, Image, KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { globalState } from '../../App';
import auth from '@react-native-firebase/auth';

const Login = ({ navigation }) => {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [emailValidation, setEmailValidation] = useState()
    const [loginButtonClicked, setLoginButtonClicked] = useState(false);

    const context = useContext(globalState);

    const validEmail = (e) => {
        var re = /\S+@\S+\.\S+/;
        const emailIsValid = re.test(e)
        setEmailValidation(emailIsValid);
        console.log(emailIsValid);
        setEmail(e)
    }

    const login = async () => {
        try {
            // console.log({ email, password })

            if (password != '' && password != undefined && email != '' && email != undefined) {
                if (emailValidation == true) {
                    if (password.length >= 8) {
                        setLoginButtonClicked(true)
                        auth()
                            .signInWithEmailAndPassword(email, password)
                            .then(async (res) => {
                                console.log(res.user.uid)
                                context.setUser(res.user);
                                setLoginButtonClicked(false)

                            })
                            .catch((error) => {
                                setLoginButtonClicked(false)
                                console.log(error)
                                ToastAndroid.show('Invalid email or password!', 1000);
                            })
                    } else {
                        // if (password == undefined) {
                        //     ToastAndroid.show("Password must be atleast 8 character long", 1000)
                        // } else {
                        setLoginButtonClicked(false)
                        ToastAndroid.show("Password must be atleast 8 character long", 1000)
                        // }
                    }
                } else {
                    ToastAndroid.show("Enter a valid email", 1000)
                }
            } else {
                ToastAndroid.show("Enter all fields", 1000)
            }


        } catch (err) {
            console.log(err)
        }
    }
    return (
        <ScrollView style={{ width: '100%' }}
            contentContainerStyle={{ justifyContent: 'center', height: '100%' }}
        >
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image style={{ resizeMode: 'contain', tintColor: '#7F82E2' }} source={require('../constants/images/gadgetLogo.png')} />
                </View>
                <View style={styles.signinForm}>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email Address</Text>
                        <TextInput
                            style={styles.inputField}
                            placeholder="Enter Email Address"
                            placeholderTextColor='gray'
                            color='white'
                            onChangeText={(e) => { validEmail(e) }} />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            style={styles.inputField}
                            placeholder="Enter Password"
                            placeholderTextColor='gray'
                            color='white'
                            onChangeText={(e) => setPassword(e)}
                        />
                    </View>

                </View>
                <View style={styles.buttonContainer}>
                    <Pressable
                        onPress={() => loginButtonClicked == false ? login() : <></>}
                        style={({ pressed }) => [
                            {
                                opacity: pressed ? 0.8 : 1,
                                borderWidth: pressed ? 2 : 1,
                                elevation: pressed ? 2 : 8,
                                // borderColor: pressed ? '#4187FF' : '#4187FF',
                                // borderColor: pressed ? 'white' : 'white'
                            },
                            styles.Button,
                            { backgroundColor: '#7900FF' }
                        ]}>
                        {loginButtonClicked ?
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[styles.buttonText, { color: 'white' }]}>Login</Text>
                                <ActivityIndicator animating={loginButtonClicked} color='white' />
                            </View>
                            :
                            <Text style={[styles.buttonText, { color: 'white' }]}>Login</Text>
                        }
                    </Pressable>
                </View>
                <View style={styles.bottomContainer}>
                    <TouchableOpacity style={{ marginBottom: 10 }}>
                        <Text style={{ color: 'gray' }}>Forgot Password?</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ marginRight: 5, color: 'gray' }}>New User?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('signup')}>
                            <Text style={{ color: '#404CCF', fontSize: 14, fontWeight: '500' }}>Create Account</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 25,
        paddingVertical: 25,
        justifyContent: 'center',
        backgroundColor: 'black'
        // borderWidth:1,
    },
    logoContainer: {
        marginBottom: 20,
        // borderWidth: 1,
        // flex: 0.15,
        // justifyContent: 'center'
    },
    signinForm: {
        // borderWidth: 1,
        width: '100%',
        // flex: 0.5,
        justifyContent: 'center',

    },
    inputContainer: {
        //  borderWidth:1
        marginBottom: 32
    },
    label: {
        fontSize: 15,
        fontWeight: '700',
        color: 'white'
    },
    inputField: {
        borderBottomWidth: 1,
        borderColor: 'white'
    },
    buttonContainer: {
        width: '100%',
        marginTop: 20,
        marginBottom: 20
        // flex: 0.15,
        // justifyContent:'center'
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
        fontWeight: '400'
    },
    bottomContainer: {
        alignItems: 'center'
    }
})