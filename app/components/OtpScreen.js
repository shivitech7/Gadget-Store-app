import React, { useEffect, useRef, useState } from 'react'
import { Image, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'


const OtpScreen = ({route, navigation}) => {
 
    const {phoneNumber, code} = route.params;
    const [timerCount, setTimer] = useState(30);
    const [resend, setResend] = useState(false);

    useEffect(() => {
        generateCountdown();
    }, []);

    const generateCountdown = () => {
        let interval = setInterval(() => {
            setTimer(lastTimerCount => {
                lastTimerCount <= 1 && clearInterval(interval);
                if (lastTimerCount === 1) {
                    setResend(true);
                }
                return lastTimerCount - 1;
            });
        }, 1000); //each count lasts for a second
        //cleanup the interval on complete
        return () => clearInterval(interval);
    };

    const resetTimer = () => {
        setTimer(30);
        generateCountdown();
        setResend(false)
    }

    const pin1Ref = useRef()
    const pin2Ref = useRef()
    const pin3Ref = useRef()
    const pin4Ref = useRef()
    const [pin1, setPin1] = useState('')
    const [pin2, setPin2] = useState('')
    const [pin3, setPin3] = useState('')
    const [pin4, setPin4] = useState('')

    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Image style={{marginRight:14}} source={require('../constants/images/BackArrow.png')} />
                        <Text style={{ fontSize: 18, fontWeight: '500', color: '#404CCF' }}>OTP Verification</Text>
                    </View>
                    <View style={{ marginTop: 38 }}>
                        <Text style={{ fontSize: 24, fontWeight: '500', color: 'black', maxWidth: '55%', marginBottom: 10 }}>Please Enter OTP Verification</Text>
                        <Text>Code was sent to {code} {phoneNumber}</Text>
                        <Text>This code will expire in <Text style={{ color: 'red', fontWeight: '500' }}>00:{timerCount}</Text></Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 50 }}>
                        <TextInput
                            ref={pin1Ref}
                            style={styles.inputField}
                            keyboardType='number-pad'
                            secureTextEntry={true}
                            maxLength={1}
                            onChangeText={(e) => {
                                setPin1(e);
                                e && pin2Ref.current.focus()
                            }
                            }
                        />
                        <TextInput
                            ref={pin2Ref}
                            style={styles.inputField}
                            keyboardType='number-pad'
                            secureTextEntry={true}
                            maxLength={1}
                            onChangeText={(e) => {
                                setPin2(e)
                                e && pin3Ref.current.focus()
                            }}
                        />
                        <TextInput
                            ref={pin3Ref}
                            style={styles.inputField}
                            keyboardType='number-pad'
                            secureTextEntry={true}
                            maxLength={1}
                            onChangeText={(e) => {
                                setPin3(e)
                                e && pin4Ref.current.focus()
                            }}
                        />
                        <TextInput
                            ref={pin4Ref}
                            style={styles.inputField}
                            keyboardType='number-pad'
                            secureTextEntry={true}
                            maxLength={1}
                            onChangeText={(e) => setPin4(e)}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 32 }}>
                        <Text>Didn't receive an OTP?</Text>
                        <View>
                            <TouchableOpacity onPress={() => {
                                resend ? resetTimer() : <></>
                            }}>
                                <Text style={{ color: '#404CCF', fontWeight: '500' }}>

                                    Resend</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <Pressable
                        // onPress={() => navigation.navigate('Login')}
                        style={({ pressed }) => [
                            {
                                // opacity: pressed ? 0.8 : 1,
                                borderWidth: pressed ? 3 : 1,
                                borderColor: pressed ? 'white' : 'white',
                            },
                            styles.Button,
                            { backgroundColor: '#404CCF' }
                        ]}>
                        <Text style={[styles.buttonText, { color: 'white' }]}>Verify and Create Account</Text>
                    </Pressable>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default OtpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 60,
        paddingHorizontal: 17,
        justifyContent: 'space-around'
    },
    inputField: {
        // borderWidth:1,
        borderRadius: 16,
        width: 64,
        height: 62,
        backgroundColor: '#E5E5E5',
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '500'
    },
    buttonContainer: {
        width: '100%',
        marginTop: 70,
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
    }
})