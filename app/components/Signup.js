import React, { useEffect, useState, useContext } from 'react'
import { ActivityIndicator, Image, KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native'
import { SelectCountry } from 'react-native-element-dropdown';
import { Dropdown } from 'react-native-element-dropdown';
import data from '../constants/CountryCodeData.js';
import DropDownPicker from 'react-native-dropdown-picker';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { globalState } from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Signup = ({ navigation }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('+91');
    console.log(code)
    const [emailValidation, setEmailValidation] = useState()
    const [registerButtonClicked, setRegisterButtonClicked] = useState(false);

    const { setLogedin, setUser } = useContext(globalState);

    const ref = firestore()
        .collection('users');

    async function addUserInfoInDb(id) {
        try {
            await ref.doc(id)
                .set({
                    name: name,
                    phoneNumber: phoneNumber,
                    countryCode: code
                })
                .then(() => {
                    console.log('User added!');
                });
        } catch (e) {
            console.log(e);
        }
    }

    const validEmail = (e) => {
        var re = /\S+@\S+\.\S+/;
        const emailIsValid = re.test(e)
        setEmailValidation(emailIsValid);
        console.log(emailIsValid);
        setEmail(e)
    }

    const signup = async () => {
        console.log('inside signup')
        if (emailValidation == true) {
            if (password.length >= 8) {
                setRegisterButtonClicked(true)
                auth()
                    .createUserWithEmailAndPassword(email, password)
                    .then((res) => {
                        console.log(res);
                        ToastAndroid.show('User account created & signed in!', 1000);

                        addUserInfoInDb(res.user.uid)

                        setTimeout(async () => {
                            // await AsyncStorage.setItem('@storage_Key', res.user.uid);
                            // setLogedin(true)
                            setUser(res.user);
                            setRegisterButtonClicked(false)
                        }, 2000);
                    })
                    .catch(error => {
                        if (error.code === 'auth/email-already-in-use') {
                            console.log('That email address is already in use!');
                        }

                        if (error.code === 'auth/invalid-email') {
                            console.log('That email address is invalid!');
                        }

                        console.error(error);
                    });
            } else {
                ToastAndroid.show("Password must be atleast 8 character long", 1000)
            }
        } else {
            ToastAndroid.show("Enter a valid email", 1000)
        }

    }

    // const [codeData, setCodeData] = useState(data);

    // console.log(item)
    // const countryCodeData = async () => {
    //     try {
    //         const response = await fetch(
    //             'https://gist.githubusercontent.com/DmytroLisitsyn/1c31186e5b66f1d6c52da6b5c70b12ad/raw/01b1af9b267471818f4f8367852bd4a2814cbae6/country_dial_info.json'
    //         );
    //         const json = await response.json();
    //         console.log(json)
    //         setCodeData(json)
    //         //   return json.movies;
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    // useEffect(() => {
    //     countryCodeData()
    // }, [])

    const DropdownItems = ({ item }) => {
        return (
            <View>
                <Text style={{ color: 'black' }}>
                    {item.image} {item.code} {item.dial_code}
                </Text>
            </View>
        )
    }
    const [semesterItem, setSemesterItem] = useState(data);
    const [semesterValue, setSemesterValue] = useState(null);
    const [openSemester, setOpenSemester] = useState(false);
    return (
        <View style={styles.container}>
            <ScrollView style={{ width: '100%' }}
                contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
            >
                <View style={styles.logoContainer}>
                    <Image style={{ resizeMode: 'contain', tintColor: '#7F82E2' }} source={require('../constants/images/gadgetLogo.png')} />
                </View>
                <View style={styles.signupForm}>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Full Name</Text>
                        <TextInput
                            style={styles.inputField}
                            placeholder="Enter Full Name"
                            placeholderTextColor='gray'
                            color='white'
                            onChangeText={(e) => setName(e)} />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email Address</Text>
                        <TextInput
                            style={styles.inputField}
                            placeholder="Enter Email Address"
                            placeholderTextColor='gray'
                            color='white'
                            onChangeText={(e) => validEmail(e)} />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Phone Number</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            {/* <DropDownPicker
                                    style={styles.dropdown}
                                    // placeholder="Select country code..."
                                    placeholderStyle={{
                                        color: "grey",
                                        fontWeight: "400"
                                    }}
                                    // dropDownContainerStyle={{
                                    //     height: 260,
                                    // }}
                                    renderListItem={(item) => <DropdownItems item={item} />}
                                    searchable={true}
                                    listMode="SCROLLVIEW"
                                    open={openSemester}
                                    value={semesterValue}
                                    items={semesterItem}
                                    setOpen={setOpenSemester}
                                    setValue={setSemesterValue}
                                    setItems={setSemesterItem}
                                /> */}
                            {/* <SelectCountry
                                style={[styles.dropdown, { width: '30%' }]}
                                selectedTextStyle={styles.selectedTextStyle}
                                placeholderStyle={styles.placeholderStyle}
                                imageStyle={styles.imageStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                iconStyle={styles.iconStyle}
                                // renderItem={(item) => <DropdownItems item={item} />}
                                search
                                maxHeight={200}
                                value={code}
                                data={data}
                                valueField="number"
                                labelField='number'
                                imageField="image"
                                placeholder="Select country"
                                searchPlaceholder="Search..."
                                onChange={e => {
                                    setCode(e.number);
                                }}
                            /> */}
                            <Dropdown
                                style={{ borderBottomWidth: 1, width: '30%', borderColor: 'white' }}
                                data={data}
                                renderItem={(item) => <DropdownItems item={item} />}
                                renderInputSearch={(item) => <DropdownItems item={item} />}
                                valueField='dial_code'
                                labelField='image'
                                imageField='image'
                                search={true}
                                dropdownPosition='auto'
                                //  search
                                // searchPlaceholder='search..'
                                onChange={e => { setCode(e.dial_code) }}
                                placeholder='Select country code'
                                //  label={item}
                                maxHeight={300}
                                // labelField={item.dial_code}
                                // valueField={item.dial_code}
                                value={code}
                            />
                            <TextInput
                                style={[styles.inputField, { width: '65%' }]}
                                placeholder="Enter Phone Number"
                                placeholderTextColor='gray'
                                color='white'
                                onChangeText={(e) => setPhoneNumber(e)} />
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            style={styles.inputField}
                            placeholder="Enter New Password"
                            placeholderTextColor='gray'
                            color='white'
                            onChangeText={(e) => setPassword(e)} />
                    </View>

                </View>
                <View style={styles.buttonContainer}>
                    <Pressable
                        onPress={() => {
                            (name && email && password && phoneNumber && code && (registerButtonClicked == false)) ? signup() :
                                ToastAndroid.show("fill all details", 1000)
                        }}
                        style={({ pressed }) => [
                            {
                                opacity: pressed ? 0.8 : 1,
                                borderWidth: pressed ? 2 : 1,
                                elevation: pressed ? 2 : 8,
                                // borderColor: pressed ? 'white' : 'white',
                            },
                            styles.Button,
                            { backgroundColor: '#7900FF' }
                        ]}>
                        {registerButtonClicked ?
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[styles.buttonText, { color: 'white' }]}>Continue</Text>
                                <ActivityIndicator animating={registerButtonClicked} />
                            </View>
                            :
                            <Text style={[styles.buttonText, { color: 'white' }]}>Continue</Text>}

                    </Pressable>
                </View>
            </ScrollView>
        </View>
    )
}

export default Signup;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 25,
        // paddingVertical: 25,
        justifyContent: 'center',
        backgroundColor: 'black',
        // borderWidth:1,
        // borderColor:'red'
    },
    logoContainer: {
        marginBottom: 15
        // borderWidth:1,
        // flex: 0.15,
        // justifyContent: 'center'
    },
    signupForm: {
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
        marginTop: 40,
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
        fontWeight: '400',
        marginRight: 5
    },
    dropdown: {
        // margin: 16,
        height: 50,
        // width:'30%',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
    imageStyle: {
        // width: 24,
        // height: 24,
        borderWidth: 1,
        // backgroundColor:'red'
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
        // marginLeft: 8,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
})