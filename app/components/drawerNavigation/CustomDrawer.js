import React, { useContext, useEffect, useState } from 'react';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { TouchableOpacity, View, Text, Image, ToastAndroid } from 'react-native';
import ProductDetails from '../mainScreens/ProductDetails';
import Products from '../mainScreens/Products';
import { connect } from 'react-redux';
import { setSelectedTab } from '../../redux/actions/TabActions';
import Cart from '../mainScreens/Cart';
import Profile from '../mainScreens/Profile';
import OrderHistory from '../mainScreens/OrderHistory';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalState } from '../../../App';
import auth from '@react-native-firebase/auth';
import MainLayout from './MainLayout';
import firestore from '@react-native-firebase/firestore';


const Drawer = createDrawerNavigator();

const CustomDrawerItem = ({ label, isFocused, onPress, icon }) => {
    return (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                height: 40,
                marginBottom: 5,
                alignItems: 'center',
                paddingLeft: 10,
                borderRadius: 10,
                // borderWidth:1,
                // backgroundColor: isFocused ? '#21262E' : null
                backgroundColor: isFocused ? '#7900FF' : null,
                // elevation: isFocused ? 8 : 0
            }}
            onPress={onPress}
        >
            <Image
                source={icon}
                style={{
                    width: 20,
                    height: 20,
                    tintColor: isFocused ? 'white' : 'white',
                    resizeMode: 'center',
                    // height: 15,
                    // borderWidth:1
                }} />
            <Text
                style={{
                    marginLeft: 10,
                    color: isFocused ? 'white' : 'white',
                    fontSize: 14,
                    fontWeight: '500'
                }}>
                {label}
            </Text>
        </TouchableOpacity>
    )
}


const CustomDrawerContent = ({ navigation, selectedTab, setSelectedTab, userName }) => {
    const { user } = useContext(globalState)

    return (
        <DrawerContentScrollView
            scrollEnabled={true}
            contentContainerStyle={{ flex: 1 }}
        >
            <View
                style={{
                    flex: 1,
                    paddingHorizontal: 10,
                }}>
                {/* close */}
                <View
                    style={{
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        // borderWidth:1
                    }}>
                    <TouchableOpacity
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom:10
                            // borderWidth:1
                        }}
                        onPress={() => navigation.closeDrawer()}
                    >
                        <Image
                            source={require('../../constants/images/cross.png')}
                            style={{
                                height: 15,
                                width: 15,
                                tintColor: 'white',
                                resizeMode:'center'
                            }} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 20
                    }}
                    onPress={() => console.log('Profile')}
                >
                    <Image
                        source={require('../../constants/images/Profile.png')}
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 10,
                            backgroundColor: 'black',
                            tintColor: '#EEF2FA'
                        }}
                    />
                    <View
                        style={{
                            marginLeft: 10
                        }}
                    >
                        <Text style={{ color: 'white', fontSize: 15, fontWeight: '700' }}>{userName}</Text>
                        <Text style={{ color: 'white', fontSize: 10, fontWeight: '500' }}>{user.email}</Text>
                    </View>
                </TouchableOpacity>
                <View
                    style={{
                        flex: 1,
                        marginTop: 15
                    }}>
                    <CustomDrawerItem
                        label='Home'
                        isFocused={selectedTab == 'Home'}
                        icon={require('../../constants/images/Home.png')}
                        onPress={() => {
                            setSelectedTab('Home')
                            navigation.navigate('MainLayout')
                        }}
                    />
                    <CustomDrawerItem
                        label='Cart'
                        isFocused={selectedTab == 'Cart'}
                        icon={require('../../constants/images/Shop.png')}
                        onPress={() => {
                            setSelectedTab('Cart')
                            navigation.navigate('MainLayout')
                        }}
                    />
                    <CustomDrawerItem
                        label='Profile'
                        isFocused={selectedTab == 'Profile'}
                        icon={require('../../constants/images/Profile.png')}
                        onPress={() => {
                            setSelectedTab('Profile')
                            navigation.navigate('MainLayout')
                        }}
                    />
                    <CustomDrawerItem
                        label='Order history'
                        isFocused={selectedTab == 'OrderHistory'}
                        icon={require('../../constants/images/timer.png')}
                        onPress={() => {
                            setSelectedTab('OrderHistory')
                            navigation.navigate('MainLayout')
                        }}
                    />
                </View>
                <View
                    style={{
                        marginBottom: 20
                    }}>
                    <CustomDrawerItem
                        label='logout'
                        icon={require('../../constants/images/logout.png')}
                        onPress={() => {
                            auth()
                                .signOut()
                                .then(() => {
                                    console.log('User signed out!')
                                    ToastAndroid.show("User Signed out!", 1000);
                                });
                            AsyncStorage.clear();
                            // context.setLogedin(false)
                        }}
                    />
                </View>
            </View>
        </DrawerContentScrollView>
    )
}

const CustomDrawer = ({ selectedTab, setSelectedTab }) => {

    const { user } = useContext(globalState);
    const [userDetails, setUserDetails] = useState('');

    const getUserData = async (id) => {
        const getUser = await firestore().collection('users').doc(id).get();
        console.log('drawer data', getUser.data())
        setUserDetails(getUser.data())
    }

    useEffect(() => {
        console.log(user.uid);
        getUserData(user.uid)
    }, [])

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#6F737B',
            }}
        >
            <Drawer.Navigator
                screenOptions={{
                    headerShown: false,
                    drawerStyle: {
                        flex: 1,
                        width: '65%',
                        paddingRight: 20,
                        backgroundColor: 'black'
                        // borderWidth:1
                    },
                    drawerType: 'slide',
                    overlayColor: 'transparent',
                    sceneContainerStyle: {
                        backgroundColor: 'black',
                        // borderWidth:1
                    }
                }}
                initialRouteName='MainLayout'
                drawerContent={props => {
                    return (
                        <CustomDrawerContent
                            navigation={props.navigation}
                            selectedTab={selectedTab}
                            setSelectedTab={setSelectedTab}
                            userName={userDetails.name}
                        />
                    )
                }}
            >
                <Drawer.Screen name='MainLayout' component={MainLayout} />
            </Drawer.Navigator>

        </View>
    )
}

// export default CustomDrawer
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawer)